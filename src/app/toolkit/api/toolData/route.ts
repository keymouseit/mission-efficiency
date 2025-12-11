import { DrupalService } from "@/services";
import { DrupalNode } from "next-drupal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const sector = searchParams.get("sector") || "";
    const region = searchParams.get("region") || "";
    const category = searchParams.get("category") || "";

    // Safe split with empty string check
    const sectorArray = sector ? sector.split(",") : [];
    const regionArray = region ? region.split(",") : [];
    const categoryArray = category ? category.split(",") : [];

    const toolData = await DrupalService.getToolData();
    let filteredToolData: DrupalNode[] = [...toolData];

    if (region && regionArray.length > 0) {
      filteredToolData = filteredToolData.filter(
        (toolElement) =>
          toolElement?.field_tool_d_region?.name &&
          regionArray.includes(toolElement.field_tool_d_region.name)
      );
    }

    if (sector && sectorArray.length > 0) {
      filteredToolData = filteredToolData.filter((toolElement) => {
        return (
          toolElement?.field_tool_d_sector?.name &&
          sectorArray.includes(toolElement.field_tool_d_sector.name)
        );
      });
    }

    if (category && categoryArray.length > 0) {
      filteredToolData = filteredToolData.filter(
        (toolElement) =>
          toolElement?.field_tool_d_category?.name &&
          categoryArray.includes(toolElement.field_tool_d_category.name)
      );
    }

    return NextResponse.json({
      data: filteredToolData,
      status: 200,
    });
  } catch (error) {
    console.error("Error in toolData API:", error);
    return NextResponse.json(
      { error: "Failed to fetch tool data", status: 500 },
      { status: 500 }
    );
  }
}
