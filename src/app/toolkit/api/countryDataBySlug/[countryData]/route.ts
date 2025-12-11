import { DrupalService } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  // Next.js may provide params either directly or as a Promise depending on
  // the runtime/type definitions. Handle both cases safely.
  let params: { countryData: string };
  if (context?.params && typeof context.params.then === "function") {
    params = await context.params;
  } else {
    params = context?.params || {};
  }

  const countrySlug = params.countryData;

  const countryData = await DrupalService.getCountryDataByCountrySlug(
    countrySlug
  );

  if (countryData) {
    return NextResponse.json({ data: countryData, status: 200 });
  }

  return NextResponse.json({ data: null, status: 404 }, { status: 404 });
}
