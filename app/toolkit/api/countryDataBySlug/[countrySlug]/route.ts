import { DrupalService } from "@/lib/DrupalService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { countrySlug: string } }
) {
  const { countrySlug } = params;
  const countryData = await DrupalService.getCountryDataByCountrySlug(
    countrySlug
  );
  if (countryData) {
    return NextResponse.json({
      data: countryData,
      status: 200,
    });
  }
}
