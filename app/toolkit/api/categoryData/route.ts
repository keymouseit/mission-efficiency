import { DrupalService } from "@/lib/DrupalService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const categoryData = await DrupalService.getCategoryData();
  if (categoryData) {
    return NextResponse.json({
      data: categoryData,
      status: 200,
    });
  }
}
