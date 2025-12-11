import { DrupalService } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const categoryData = await DrupalService.getCategoryData();
  if (categoryData) {
    return NextResponse.json({
      data: categoryData,
      status: 200,
    });
  }
}
