import { NextRequest, NextResponse } from "next/server";
import { postAdminApi } from "@/lib/website/public-api";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);

  const result = await postAdminApi({
    path: "/api/public/leads",
    apiKey: process.env.WEBSITE_LEAD_API_KEY,
    body,
  });

  return NextResponse.json(result.data, { status: result.status });
}