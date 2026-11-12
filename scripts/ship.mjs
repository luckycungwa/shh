#!/usr/bin/env node
/**
 * Ship: build, verify, commit, push, and wait for a working production deployment.
 *
 * Usage:
 *   npm run ship -- -m "Your commit message"
 *
 * What it does, in order:
 *   1. Refuses to run off `main` or with nothing to commit.
 *   2. Runs content validation, lint, tests and the production build.
 *   3. Commits everything (build artifacts are gitignored) with your message.
 *   4. Pushes to origin/main.
 *   5. Polls the commit status until Vercel reports success or failure.
 *   6. Runs the production-freshness check against the deployed commit.
 *
 * Exits non-zero on any failure, so it is safe to chain in CI or a terminal.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPO = process.cwd();
const MAX_WAIT_MS = 15 * 60 * 1000;
const POLL_MS = 15 * 1000;

// Windows resolves `npm` to npm.cmd, which needs a shell. Calling npm's JS entry
// point through the current node binary avoids that and keeps output warning-free.
const NPM_CLI = path.join(
  path.dirname(process.execPath),
  "node_modules",
  "npm",
  "bin",
  "npm-cli.js",
);
const HAS_NPM_CLI = fs.existsSync(NPM_CLI);

function npmCommand(args) {
  if (HAS_NPM_CLI) return { exe: process.execPath, args: [NPM_CLI, ...args], shell: false };
  return { exe: "npm", args, shell: process.platform === "win32" };
}

function run(cmd, args, opts = {}) {
  let exe = cmd;
  let finalArgs = args;
  let shell = false;
  if (cmd === "npm") ({ exe, args: finalArgs, shell } = npmCommand(args));

  const res = spawnSync(exe, finalArgs, {
    cwd: REPO,
    stdio: opts.capture ? ["ignore", "pipe", "pipe"] : "inherit",
    encoding: "utf8",
    shell,
  });
  if (res.error) throw res.error;
  return res;
}

function out(cmd, args) {
  const res = run(cmd, args, { capture: true });
  if (res.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed:\n${res.stderr || res.stdout}`);
  }
  return res.stdout.trim();
}

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function step(name) {
  console.log(`\n▶ ${name}`);
}

// ---- args -----------------------------------------------------------------
const argv = process.argv.slice(2);
let message = "";
for (let i = 0; i < argv.length; i += 1) {
  if (argv[i] === "-m" || argv[i] === "--message") message = argv[i + 1] || "";
}
if (!message) {
  fail('Missing commit message. Use: npm run ship -- -m "What changed"');
}

// ---- preflight ------------------------------------------------------------
step("Preflight");
const branch = out("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
if (branch !== "main") fail(`On branch "${branch}". Switch to main before shipping.`);

const dirty = out("git", ["status", "--porcelain", "-uall"]);
if (!dirty) fail("Nothing to commit. Working tree is clean.");

run("git", ["fetch", "origin", "--prune", "--quiet"]);
const behind = out("git", ["rev-list", "--count", "HEAD..origin/main"]);
if (behind !== "0") {
  fail(
    `Local main is ${behind} commit(s) behind origin/main. ` +
      "Pull or reset first so you do not push a stale tree.",
  );
}

// ---- checks ---------------------------------------------------------------
step("Content validation");
run("npm", ["run", "validate:content"]);

step("Lint");
run("npm", ["run", "lint"]);

step("Tests");
run("npm", ["test"]);

step("Production build");
run("npm", ["run", "build"]);

// ---- commit + push --------------------------------------------------------
step("Commit");
run("git", ["add", "-A"]);
const staged = out("git", ["diff", "--cached", "--name-only"]);
if (!staged) fail("Nothing staged after the build. Working tree is clean.");
console.log(staged.split("\n").map((f) => `  ${f}`).join("\n"));
run("git", ["commit", "-m", message]);

const sha = out("git", ["rev-parse", "HEAD"]);
step(`Push ${sha.slice(0, 7)} to origin/main`);
run("git", ["push", "origin", "main"]);

// ---- wait for Vercel ------------------------------------------------------
step("Waiting for the Vercel deployment");
const api = `https://api.github.com/repos/${out("git", [
  "remote",
  "get-url",
  "origin",
])
  .replace(/^.*github\.com[:/]/, "")
  .replace(/\.git$/, "")}/commits/${sha}/status`;

const started = Date.now();
let state = "pending";
let statuses = [];

while (Date.now() - started < MAX_WAIT_MS) {
  try {
    const res = await fetch(api, {
      headers: { "User-Agent": "shh-ship", Accept: "application/vnd.github+json" },
    });
    if (res.ok) {
      const body = await res.json();
      state = body.state;
      statuses = body.statuses || [];
      const summary = statuses.map((s) => `${s.context}=${s.state}`).join(", ");
      console.log(`  ${new Date().toISOString().slice(11, 19)}  ${state}  ${summary}`);
      if (state !== "pending") break;
    }
  } catch (error) {
    console.log(`  status check failed: ${error.message}`);
  }
  await new Promise((resolve) => setTimeout(resolve, POLL_MS));
}

if (state !== "success") {
  console.error("\nDeployment contexts:");
  for (const s of statuses) console.error(`  ${s.context}: ${s.state} → ${s.target_url}`);
  fail(
    state === "pending"
      ? "Timed out waiting for the deployment. Check Vercel manually."
      : "Deployment reported failure. Fix the build, then ship again.",
  );
}

// ---- verify production ----------------------------------------------------
step("Verify production");
const freshCmd = npmCommand(["run", "check:production-freshness"]);
const fresh = spawnSync(freshCmd.exe, freshCmd.args, {
  cwd: REPO,
  stdio: "inherit",
  env: { ...process.env, EXPECTED_COMMIT_SHA: sha },
  shell: freshCmd.shell,
});
if (fresh.status !== 0) fail("Production freshness check failed.");

console.log(`\n✔ Shipped ${sha.slice(0, 7)} — production is READY and serving it.\n`);
