import { DrupalService } from "@/lib/DrupalService";
import { NextRequest, NextResponse } from "next/server";

interface QueryObject {
  topic: string;
  language: string;
  organization: string;
  sector: string;
  searchQuery: string;
  region: string;
  modality: string;
  resource: string;
  offset?: string;
  limit?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const queryObject: QueryObject = {
      topic: searchParams.get("topic") || "",
      language: searchParams.get("language") || "",
      organization: searchParams.get("organization") || "",
      sector: searchParams.get("sector") || "",
      searchQuery: searchParams.get("search") || "",
      region: searchParams.get("region") || "",
      modality: searchParams.get("modality") || "",
      resource: searchParams.get("resource") || "",
      offset: searchParams.get("offset") || "0",
      limit: searchParams.get("limit") || "11",
    };

    // Parse offset and limit as numbers
    const offset = parseInt(queryObject.offset || "0", 10);
    const limit = parseInt(queryObject.limit || "11", 10);

    // Create query object for DrupalService (without offset/limit as strings)
    const drupalQuery = {
      topic: queryObject.topic,
      language: queryObject.language,
      organization: queryObject.organization,
      sector: queryObject.sector,
      searchQuery: queryObject.searchQuery,
      region: queryObject.region,
      modality: queryObject.modality,
      resource: queryObject.resource,
      offset,
      limit,
    };

    // Call the DrupalService
    const result = await DrupalService.getFilteredTrainingCards(drupalQuery);

    if (!result) {
      return NextResponse.json({ data: [], totalRecords: 0 }, { status: 200 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching training data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch training data",
        data: [],
        totalRecords: 0,
      },
      { status: 500 }
    );
  }
}
