import { DrupalService } from "@/lib/DrupalService";
import { DrupalNode } from "next-drupal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const sector = searchParams.get("sector") || "";
  const region = searchParams.get("region") || "";
  const category = searchParams.get("category") || "";
  const sectorArray = sector?.split(",") || [];
  const regionArray = region?.split(",") || [];
  const categoryArray = category?.split(",") || [];

  const toolData = await DrupalService.getToolData();
  let filteredToolData: DrupalNode[] = [...toolData];

  if (region) {
    filteredToolData = filteredToolData.filter((toolElement) =>
      regionArray.includes(toolElement.field_tool_d_region?.name)
    );
  }

  if (sector) {
    filteredToolData = filteredToolData.filter((toolElement) => {
      return sectorArray.includes(toolElement.field_tool_d_sector.name);
    });
  }

  if (category) {
    filteredToolData = filteredToolData.filter((toolElement) =>
      categoryArray.includes(toolElement.field_tool_d_category?.name)
    );
  }

  if (filteredToolData) {
    return NextResponse.json({
      data: filteredToolData,
      status: 200,
    });
  }
}
