export const dynamic = "force-dynamic";

export function GET() {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA;

  if (!commit) {
    return Response.json(
      { error: "Vercel deployment commit SHA is unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  return Response.json(
    { commit },
    { headers: { "Cache-Control": "no-store" } },
  );
}
