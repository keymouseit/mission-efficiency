import { NextRequest, NextResponse } from "next/server";
import {
  DrupalService,
  getMenuDetails,
  getNewFooter,
  getNewHeader,
} from "@/lib/DrupalService";
import { processMenuData } from "@/lib/processMenuData";

interface SearchParams {
  topic?: string;
  language?: string;
  organization?: string;
  sector?: string;
  search?: string;
  region?: string;
  modality?: string;
  resource?: string;
  loadType?: "essential" | "complete";
}

const prepareQueryObject = (searchParams: SearchParams) => ({
  topic: searchParams.topic || "",
  language: searchParams.language || "",
  organization: searchParams.organization || "",
  sector: searchParams.sector || "",
  searchQuery: searchParams.search || "",
  region: searchParams.region || "",
  modality: searchParams.modality || "",
  resource: searchParams.resource || "",
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params: SearchParams = {};

  // Extract search parameters
  searchParams.forEach((value, key) => {
    if (key === "loadType" && (value === "essential" || value === "complete")) {
      params.loadType = value; // valid type now
    } else {
      params[key as Exclude<keyof SearchParams, "loadType">] = value;
    }
  });

  const loadType = params.loadType || "essential";
  const queryObject = prepareQueryObject(params);

  try {
    if (loadType === "essential") {
      // Load only critical data for initial render
      console.log("🚀 Loading essential data...");
      const essentialStart = Date.now();

      const [headerSection, menuData, footerSection] = await Promise.all([
        getNewHeader(),
        getMenuDetails(),
        getNewFooter(),
      ]);

      const processedMenuItems = processMenuData(menuData);
      const headerProps = {
        ...headerSection[0],
        field_logo: headerSection[0]?.field_logo,
        field_header_menus_items: processedMenuItems,
      };

      const essentialEnd = Date.now();
      console.log(
        `⚡ Essential data loaded: ${essentialEnd - essentialStart}ms`
      );

      return NextResponse.json({
        type: "essential",
        data: {
          headerData: headerProps,
          footerData: footerSection[0],
        },
        loadTime: essentialEnd - essentialStart,
      });
    } else if (loadType === "complete") {
      // Load all filter data in background
      console.log("🔄 Loading complete filter data...");
      const completeStart = Date.now();

      const [
        topicData,
        languagefilterData,
        resourcesData,
        organizationData,
        modalityData,
        regionData,
        sectorData,
        trainingCardImages,
        filteredTrainingResult,
      ] = await Promise.all([
        DrupalService.getTopicData(),
        DrupalService.getLanguageData(),
        DrupalService.getResourcesData(),
        DrupalService.getOrganizationData(),
        DrupalService.getModalityData(),
        DrupalService.getTrainingRegionData(),
        DrupalService.getTrainingSectorData(),
        DrupalService.getTrainingCardImages(),
        DrupalService.getFilteredTrainingCards(queryObject),
      ]);

      const { data: filteredTrainingData = [], totalRecords = 0 } =
        filteredTrainingResult || {};

      const completeEnd = Date.now();
      console.log(`📊 Complete data loaded: ${completeEnd - completeStart}ms`);

      return NextResponse.json({
        type: "complete",
        data: {
          topicData,
          languagefilterData,
          resourcesData,
          organizationData,
          modalityData,
          regionData,
          sectorData,
          trainingCardImages,
          filteredTrainingData,
          totalFilteredRecords: totalRecords,
        },
        loadTime: completeEnd - completeStart,
      });
    }

    return NextResponse.json({ error: "Invalid loadType" }, { status: 400 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to load training data" },
      { status: 500 }
    );
  }
}
