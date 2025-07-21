import { DrupalService } from "@/lib/DrupalService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const regionData = await DrupalService.getRegionData();
  if (regionData) {
    return NextResponse.json({
      data: regionData,
      status: 200,
    });
  }
}
