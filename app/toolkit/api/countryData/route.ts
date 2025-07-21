import { DrupalService } from "@/lib/DrupalService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const listOnly = JSON.parse(searchParams.get("list") as string);
  const countryData = listOnly
    ? await DrupalService.getCountryList()
    : await DrupalService.getMapData();
  if (countryData) {
    return NextResponse.json({
      data: countryData,
      status: 200,
    });
  }
}
