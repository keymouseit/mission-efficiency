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
  // Load only essential data on server side
  const queryObject = prepareQueryObject(searchParams);

  const [headerSection, menuData, footerSection] = await Promise.all([
    getNewHeader() as Promise<RawHeaderNode[]>,
    getMenuDetails(),
    getNewFooter(),
  ]);

  const processedMenuItems = processMenuData(menuData);
  const headerProps = prepareHeaderProps(headerSection, processedMenuItems);

  const { search: searchParam, ...filterParams } = searchParams;
  const showClearBtn = Boolean(Object.keys(filterParams).length);

  const {
    topic = "",
    language = "",
    organization = "",
    sector = "",
    search = "",
    region = "",
    modality = "",
    resource = "",
  } = searchParams;

  const queryObjectt = {
    topic,
    language,
    organization,
    sector,
    searchQuery: search,
    region,
    modality,
    resource,
  };

  const { data: filteredTrainingData, totalRecords } =
    (await DrupalService.getFilteredTrainingCards(queryObjectt)) ||
    ({} as { data: DrupalNode[]; totalRecords: number });

  return (
    <TrainingScreen
      searchParams={searchParams}
      trainingDataQuery={queryObjectt}
      headerData={headerProps}
      footerData={footerSection[0]}
      // Filter data will be loaded progressively on client side
      topicData={[]}
      languagefilterData={[]}
      resourcesData={[]}
      organizationData={[]}
      modalityData={[]}
      regionData={[]}
      sectorData={[]}
      filteredTrainingData={filteredTrainingData || []}
      totalFilteredRecords={totalRecords || 0}
      selectedLanguage={language}
      showClearBtn={showClearBtn}
      selectedTopic={splitParams(topic)}
      selectedOrganization={splitParams(organization)}
      selectedSector={splitParams(sector)}
      selectedRegion={splitParams(region)}
      selectedModality={splitParams(modality)}
      selectedResources={splitParams(resource)}
      // Add flag to indicate progressive loading
      useProgressiveLoading={true}
    />
  );
};

export default Training;
