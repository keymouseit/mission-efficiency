import {
  DrupalService,
  getMenuDetails,
  getNewFooter,
  getNewHeader,
} from "@/lib/DrupalService";
import TrainingScreen from "./screen";
import { DrupalNode } from "next-drupal";
import { Metadata } from "next";
import { RawHeaderNode } from "@/types/header";
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
}

interface QueryObject {
  [key: string]: string;
  topic: string;
  language: string;
  organization: string;
  sector: string;
  searchQuery: string;
  region: string;
  modality: string;
  resource: string;
}

const splitParams = (param: string): string[] =>
  param.length ? param.split(",") : [];

const prepareHeaderProps = (
  headerSection: RawHeaderNode[],
  processedMenuItems: any
): DrupalNode => {
  const baseHeader = headerSection[0];
  return {
    ...baseHeader,
    field_logo: baseHeader?.field_logo,
    field_header_menus_items: processedMenuItems,
  } as DrupalNode;
};

const prepareQueryObject = (searchParams: SearchParams): QueryObject => ({
  topic: searchParams.topic || "",
  language: searchParams.language || "",
  organization: searchParams.organization || "",
  sector: searchParams.sector || "",
  searchQuery: searchParams.search || "",
  region: searchParams.region || "",
  modality: searchParams.modality || "",
  resource: searchParams.resource || "",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await DrupalService.getCommonMetaTags();
    const metaData = data?.[0];

    if (!metaData) {
      return {
        title: "",
        description: "",
      };
    }

    const title = metaData.field_training_meta_title || "";
    const description = metaData.field_training_meta_description || "";
    const image = metaData.field_training_meta_image || "";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: image ? [image] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "",
      description: "",
    };
  }
}

const Training = async ({ searchParams }: { searchParams: SearchParams }) => {
  const totalStart = Date.now();

  console.log("🚀 Starting Training page load...");

  // Track API calls
  const queryObject = prepareQueryObject(searchParams);

  const apiStart = Date.now();
  const [
    headerSection,
    menuData,
    footerSection,
    topicData,
    languagefilterData,
    resourcesData,
    organizationData,
    modalityData,
    regionData,
    sectorData,
    filteredTrainingResult,
    trainingCardImages,
  ] = await Promise.all([
    getNewHeader() as Promise<RawHeaderNode[]>,
    getMenuDetails(),
    getNewFooter(),
    DrupalService.getTopicData(),
    DrupalService.getLanguageData(),
    DrupalService.getResourcesData(),
    DrupalService.getOrganizationData(),
    DrupalService.getModalityData(),
    DrupalService.getTrainingRegionData(),
    DrupalService.getTrainingSectorData(),
    DrupalService.getFilteredTrainingCards(queryObject),
    DrupalService.getTrainingCardImages(),
  ]);
  const apiEnd = Date.now();
  console.log(`📡 All API calls completed: ${apiEnd - apiStart}ms`);
  const processedMenuItems = processMenuData(menuData);

  // Track data processing
  const processStart = Date.now();
  const headerProps = prepareHeaderProps(headerSection, processedMenuItems);

  const { data: filteredTrainingData = [], totalRecords = 0 } =
    filteredTrainingResult || {};

  const { search: searchParam, ...filterParams } = searchParams;
  const showClearBtn = Boolean(Object.keys(filterParams).length);

  const {
    topic = "",
    language = "",
    organization = "",
    sector = "",
    region = "",
    modality = "",
    resource = "",
  } = searchParams;
  const processEnd = Date.now();
  console.log(`⚙️ Data processing: ${processEnd - processStart}ms`);

  const totalEnd = Date.now();
  console.log(`✅ Total server execution: ${totalEnd - totalStart}ms`);
  return (
    <TrainingScreen
      searchParams={searchParams}
      trainingDataQuery={queryObject}
      headerData={headerProps}
      footerData={footerSection[0]}
      topicData={topicData}
      languagefilterData={languagefilterData}
      resourcesData={resourcesData}
      organizationData={organizationData}
      modalityData={modalityData}
      regionData={regionData}
      sectorData={sectorData}
      filteredTrainingData={filteredTrainingData}
      totalFilteredRecords={totalRecords}
      selectedLanguage={language}
      showClearBtn={showClearBtn}
      selectedTopic={splitParams(topic)}
      selectedOrganization={splitParams(organization)}
      selectedSector={splitParams(sector)}
      selectedRegion={splitParams(region)}
      selectedModality={splitParams(modality)}
      selectedResources={splitParams(resource)}
    />
  );
};

export default Training;
