import { readFile } from "node:fs/promises";

const baseUrl = (process.env.PRODUCTION_URL || "https://www.sassahelphub.co.za").replace(/\/$/, "");
const expectedCommit = process.env.EXPECTED_COMMIT_SHA || process.env.GITHUB_SHA;
const waitSeconds = Number(process.env.DEPLOYMENT_WAIT_SECONDS || 900);
const pollSeconds = Number(process.env.DEPLOYMENT_POLL_SECONDS || 30);

if (!expectedCommit) {
  throw new Error("Set EXPECTED_COMMIT_SHA or GITHUB_SHA to the commit expected in production.");
}
if (!Number.isFinite(waitSeconds) || waitSeconds <= 0 || !Number.isFinite(pollSeconds) || pollSeconds <= 0) {
  throw new Error("Deployment wait and poll intervals must be positive numbers.");
}

async function fetchResponse(path) {
  const response = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`${path} returned HTTP ${response.status}`);
  }
  return response;
}

async function waitForExpectedDeployment() {
  const deadline = Date.now() + waitSeconds * 1000;
  let lastObserved = "no deployment status response";

  while (Date.now() <= deadline) {
    try {
      const response = await fetchResponse("/api/deployment-status");
      const status = await response.json();
      lastObserved = `production commit ${status.commit || "(missing)"}`;
      if (status.commit === expectedCommit) {
        console.log(`Production is serving expected commit ${expectedCommit}.`);
        return;
      }
    } catch (error) {
      lastObserved = error instanceof Error ? error.message : String(error);
    }

    await new Promise((resolve) => setTimeout(resolve, pollSeconds * 1000));
  }

  throw new Error(
    `Production did not serve expected commit ${expectedCommit} within ${waitSeconds} seconds; last observed: ${lastObserved}.`,
  );
}

function assertEqualJson(actual, expected, label) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Production ${label} does not match the checked-out main branch.`);
  }
  console.log(`Production ${label} matches the checked-out main branch.`);
}

function getDisplayedMonth(forecast, now = new Date()) {
  const currentKey = `${now.toLocaleDateString("en-ZA", { month: "long" }).toLowerCase()}-${now.getFullYear()}`;
  const currentIndex = forecast.findIndex((month) => month.month_key === currentKey);
  const current = forecast[currentIndex];

  if (!current) return forecast[0];

  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const lastConfirmedDate = [
    current.older_persons,
    current.disability,
    current.children,
    current.srd,
    current.under_review,
  ]
    .filter((row) => row.status === "confirmed" && /^\d{4}-\d{2}-\d{2}$/.test(row.endDate || row.date))
    .map((row) => row.endDate || row.date)
    .sort()
    .at(-1);

  if (!lastConfirmedDate || lastConfirmedDate >= today || now.getDate() <= 20) return current;
  return forecast[currentIndex + 1] || current;
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

await waitForExpectedDeployment();

const localForecast = JSON.parse(await readFile(new URL("../public/data/payment-schedule-forecast.json", import.meta.url), "utf8"));
const localUpdates = JSON.parse(await readFile(new URL("../public/data/updates.json", import.meta.url), "utf8"));
const [productionForecast, productionUpdates] = await Promise.all([
  fetchResponse("/data/payment-schedule-forecast.json").then((response) => response.json()),
  fetchResponse("/data/updates.json").then((response) => response.json()),
]);

assertEqualJson(productionForecast, localForecast, "payment schedule");
assertEqualJson(productionUpdates, localUpdates, "updates feed");

const displayMonth = getDisplayedMonth(localForecast);
if (!displayMonth) {
  throw new Error("No payment schedule is available for the displayed month.");
}
const october2026 = localForecast.find((month) => month.month_key === "october-2026");

const [homeHtml, statusHtml, monthHtml, octoberHtml] = await Promise.all([
  fetchResponse("/").then((response) => response.text()),
  fetchResponse("/status-check").then((response) => response.text()),
  fetchResponse(`/dates/${displayMonth.month_key}`).then((response) => response.text()),
  october2026
    ? fetchResponse("/dates/october-2026").then((response) => response.text())
    : Promise.resolve(""),
]);

const homeText = visibleText(homeHtml);
const statusText = visibleText(statusHtml);
const monthText = visibleText(monthHtml);
const octoberText = visibleText(octoberHtml);

if (!homeText.includes(`Updated for ${displayMonth.label}`)) {
  throw new Error(`Homepage does not show the expected month ${displayMonth.label}.`);
}
if (!statusText.includes(displayMonth.label)) {
  throw new Error(`Status-check page does not show the expected month ${displayMonth.label}.`);
}
if (displayMonth.srd.status === "confirmed" && !homeText.includes(displayMonth.srd.day)) {
  throw new Error(`Homepage is missing the confirmed SRD dates for ${displayMonth.label}.`);
}
if (
  displayMonth.governance?.lastVerified &&
  !monthText.includes(displayMonth.governance.lastVerified)
) {
  throw new Error(`The ${displayMonth.label} schedule page is missing its last-verified date.`);
}
if (october2026) {
  if (!octoberText.includes(october2026.governance?.lastVerified || "")) {
    throw new Error("The October 2026 schedule page is missing its last-verified date.");
  }
  if (october2026.srd.status === "confirmed" && !octoberText.includes(october2026.srd.day)) {
    throw new Error("The October 2026 schedule page is missing its confirmed SRD dates.");
  }
}

const latestUpdate = [...localUpdates].sort((a, b) => b.date.localeCompare(a.date))[0];
if (latestUpdate) {
  const updateText = visibleText(
    await fetchResponse(`/updates/${encodeURIComponent(latestUpdate.id)}`).then((response) => response.text()),
  );
  if (!updateText.includes(latestUpdate.title)) {
    throw new Error(`The latest update page is missing: ${latestUpdate.title}.`);
  }
}

console.log(`Production freshness checks passed for ${displayMonth.label}.`);
