/* eslint-disable @typescript-eslint/no-explicit-any */
import { pantheonStore } from "@/lib/pantheon";
import { normaliseKeysFromNewsAndTrainings } from "@/utils";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import slugify from "slugify";

async function getPageData(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--page_component",
      params: `include=uid,
      field_add_section.field_image,
      field_add_section.field_icon,
      field_add_section.field_add_card.field_image,
      field_add_section.field_add_card.field_icon,
      field_add_section.field_add_card_section.field_icon,
      field_add_section.field_add_card_section.field_image,
      field_add_section.field_add_card_section.field_add_card.field_image,
      field_add_section.field_add_card_section.field_add_card.field_icon,
      field_add_section.field_add_form_field,
      field_add_section.field_add_section.field_add_question,
      field_add_section.field_add_partner.field_icon&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  return pantheonData as DrupalNode[];
}

async function getPageBySlug(slug: string): Promise<DrupalNode | null> {
  const params =
    `filter[field_page_slug][value]=${encodeURIComponent(slug)}` +
    `&filter[status]=1` +
    `&include=` +
    [
      "uid",
      "field_add_section.field_image",
      "field_add_section.field_icon",
      "field_add_section.field_add_card.field_image",
      "field_add_section.field_add_card.field_icon",
      "field_add_section.field_add_card_section.field_icon",
      "field_add_section.field_add_card_section.field_image",
      "field_add_section.field_add_card_section.field_add_card.field_image",
      "field_add_section.field_add_card_section.field_add_card.field_icon",
      "field_add_section.field_add_form_field",
      "field_add_section.field_add_section.field_add_question",
      "field_add_section.field_add_partner.field_icon",
    ].join(",");

  const response =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--page_component",
      params,
    })) || [];

  return response?.[0] || null;
}

async function getFooterSection(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<any>({
    objectName: "node--footer_section",
    params: `include=uid,field_footer_logo,field_footer_menu&&filter[status]=1`,
    all: true,
  });
  const socialIcons = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--social_media_icons",
    params: `include=uid,field_social_media_logo&&filter[status]=1`,
    all: true,
  });
  const allData = [
    { ...pantheonData[0], field_footer_social_icons: socialIcons },
  ];
  return allData as DrupalNode[];
}

async function getGetInvolvedPageData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--get_involved_page",
    params: `include=uid,field_me_partners_cards&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getPartnerCards(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--the_mission_partners_card",
    params: `include=uid,field_mission_card_image&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getMenuData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--header_menu",
    params: `include=uid,field_add_route.field_add_child_route.field_icon&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getCommonMetaTags(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--common_meta_tags",
      params: `include=uid&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  return pantheonData as DrupalNode[];
}

const getFilteredNewsCards = async ({
  resource = "",
  month = "",
  year = "",
  searchQuery = "",
}: {
  resource?: string;
  month?: string;
  year?: string;
  searchQuery?: string;
}) => {
  const resourceArray = resource?.split(",") || [];
  const monthArray = month?.split(",") || [];
  const yearArray = year?.split(",") || [];

  const newsCards = await getNewsCards();
  let filteredNewsCards: DrupalNode[] = [...newsCards];

  if (month) {
    filteredNewsCards = filteredNewsCards.filter((newsCard) => {
      const newsMonth = newsCard.field_news_date.split("-")[1];
      return monthArray.includes(newsMonth);
    });
  }

  if (resource) {
    filteredNewsCards = filteredNewsCards.filter((newsCard) => {
      return resourceArray.includes(newsCard.field_n_resource?.name);
    });
  }

  if (year) {
    filteredNewsCards = filteredNewsCards.filter((newsCard) => {
      const newsYear = newsCard.field_news_date.split("-")[0];
      return yearArray.includes(newsYear);
    });
  }

  if (searchQuery) {
    const searchQueryLowercase = searchQuery.toLowerCase();
    filteredNewsCards = filteredNewsCards.filter((newsCard) => {
      const titleLowercase = newsCard.title.toLowerCase();
      return titleLowercase.includes(searchQueryLowercase);
    });
  }

  if (filteredNewsCards) {
    return filteredNewsCards;
  }
};

async function getNewsCards(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--news",
      params: `include=uid,field_n_resource,field_add_speakers.field_speaker_image&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  return pantheonData as DrupalNode[];
}

async function getNewsResourcesData(): Promise<DrupalTaxonomyTerm[]> {
  const fetchFields = ["name", "vid"].join();
  const pantheonData = await pantheonStore.getObject<DrupalTaxonomyTerm[]>({
    objectName: "taxonomy_term--news_resource",
    params: `include=vid&&filter[status]=1&&fields[taxonomy_term--news_resource]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalTaxonomyTerm[];
}

const getNormalisedCardDataFromId = async (
  idToFind: string,
  type: "NEWS" | "TRAINING"
) => {
  let initCards: any[] = [];

  if (type === "TRAINING") {
    const trainingCards = await getTrainingsCard();
    initCards = trainingCards;
  }
  if (type === "NEWS") {
    const newsCards = await getNewsCards();
    initCards = newsCards;
  }

  const foundCard = initCards.find((card) => idToFind.includes(card.id));
  const normalisedCard = foundCard
    ? normaliseKeysFromNewsAndTrainings(foundCard)
    : {};

  return normalisedCard;
};

async function getTrainingsCard(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--training",
      params: `include=uid,field_t_language,field_t_modality,field_t_resource,field_t_organization,field_t_region,field_t_sector,field_t_topic&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  return pantheonData as DrupalNode[];
}

async function getTopicData(): Promise<DrupalTaxonomyTerm[]> {
  const fetchFields = ["name", "vid"].join();
  const pantheonData = await pantheonStore.getObject<DrupalTaxonomyTerm[]>({
    objectName: "taxonomy_term--training_topic",
    params: `include=vid&&filter[status]=1&&fields[taxonomy_term--training_topic]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalTaxonomyTerm[];
}

async function getLanguageData(): Promise<DrupalTaxonomyTerm[]> {
  const fetchFields = ["name", "vid"].join();
  const pantheonData = await pantheonStore.getObject<DrupalTaxonomyTerm[]>({
    objectName: "taxonomy_term--training_language",
    params: `include=vid&&filter[status]=1&&fields[taxonomy_term--training_language]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalTaxonomyTerm[];
}

async function getTrainingRegionData(): Promise<DrupalTaxonomyTerm[]> {
  const fetchFields = ["name", "vid"].join();

  const pantheonData = await pantheonStore.getObject<DrupalTaxonomyTerm[]>({
    objectName: "taxonomy_term--training_region",
    params: `include=vid&&filter[status]=1&&fields[taxonomy_term--training_region]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalTaxonomyTerm[];
}

async function getTrainingSectorData(): Promise<DrupalTaxonomyTerm[]> {
  const fetchFields = ["name", "vid"].join();

  const pantheonData = await pantheonStore.getObject<DrupalTaxonomyTerm[]>({
    objectName: "taxonomy_term--training_sector",
    params: `include=vid&&filter[status]=1&&fields[taxonomy_term--training_sector]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalTaxonomyTerm[];
}

interface filteredTrainingCardsArgs {
  topic?: string;
  language?: string;
  organization?: string;
  sector?: string;
  searchQuery?: string;
  region?: string;
  modality?: string;
  resource: string;
  offset?: number;
  limit?: number;
}

const getFilteredTrainingCards = async ({
  topic = "",
  language = "",
  organization = "",
  sector = "",
  searchQuery = "",
  modality = "",
  region = "",
  resource = "",
  offset = 0,
  limit = 11,
}: filteredTrainingCardsArgs) => {
  const topicArray = topic?.split(",") || [];
  const languageArray = language?.split(",") || [];
  const organizationArray = organization?.split(",") || [];
  const sectorArray = sector?.split(",") || [];
  const regionArray = region?.split(",") || [];
  const modalityArray = modality?.split(",") || [];
  const resourceArray = resource?.split(",") || [];

  const trainingsCards = await getTrainingsCard();
  let filteredTrainingsCards: DrupalNode[] = [...trainingsCards];

  if (topic) {
    filteredTrainingsCards = filteredTrainingsCards.filter((trainingsCards) => {
      return topicArray.includes(
        (trainingsCards.field_t_topic.name as string).replaceAll(",", "-")
      );
    });
  }

  if (language) {
    filteredTrainingsCards = filteredTrainingsCards.filter((trainingsCards) => {
      return languageArray.includes(trainingsCards.field_t_language.name);
    });
  }

  if (organization) {
    filteredTrainingsCards = filteredTrainingsCards.filter((trainingsCards) => {
      return organizationArray.includes(
        (trainingsCards.field_t_organization.name as string).replaceAll(
          ",",
          "-"
        )
      );
    });
  }

  if (sector) {
    filteredTrainingsCards = filteredTrainingsCards.filter((trainingsCards) => {
      return sectorArray.includes(
        (trainingsCards.field_t_sector.name as string).replaceAll(",", "-")
      );
    });
  }

  if (region) {
    filteredTrainingsCards = filteredTrainingsCards.filter((trainingsCards) => {
      return regionArray.includes(
        (trainingsCards.field_t_region.name as string).replaceAll(",", "-")
      );
    });
  }

  if (resource) {
    filteredTrainingsCards = filteredTrainingsCards.filter((trainingsCards) => {
      return resourceArray.includes(trainingsCards.field_t_resource.name);
    });
  }

  if (modality) {
    filteredTrainingsCards = filteredTrainingsCards.filter((trainingsCards) => {
      return modalityArray.includes(trainingsCards.field_t_modality.name);
    });
  }

  if (searchQuery) {
    const searchQueryLowercase = searchQuery.toLowerCase();
    filteredTrainingsCards = filteredTrainingsCards.filter((trainingsCards) => {
      const titleLowercase = trainingsCards.title.toLowerCase();
      return titleLowercase.includes(searchQueryLowercase);
    });
  }

  const totalRecordsBeforePagination = filteredTrainingsCards.length;

  const sortedTrainingCards = filteredTrainingsCards.sort((a: any, b: any) => {
    // Convert date strings to Date objects
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [monthA, yearA] = (a?.field_t_date || "")?.split("-");
    const [monthB, yearB] = (b?.field_t_date || "")?.split("-");
    const indexA = months.indexOf(monthA);
    const indexB = months.indexOf(monthB);

    // Compare years first
    if (yearA !== yearB) {
      return parseInt(yearB) - parseInt(yearA);
    } else {
      // If years are the same, compare months
      if (indexA !== indexB) {
        return indexB - indexA;
      } else {
        // If months are the same, no need to reorder
        return 0;
      }
    }
  });

  filteredTrainingsCards = sortedTrainingCards.slice(
    offset,
    offset + limit + 1
  );

  if (filteredTrainingsCards) {
    return {
      data: filteredTrainingsCards,
      totalRecords: totalRecordsBeforePagination,
    };
  }
};

async function getCategoryData(): Promise<DrupalTaxonomyTerm[]> {
  const fetchFields = ["name", "vid"].join();
  const pantheonData = await pantheonStore.getObject<DrupalTaxonomyTerm[]>({
    objectName: "taxonomy_term--tool_category",
    params: `include=vid&&filter[status]=1&&fields[taxonomy_term--tool_category]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalTaxonomyTerm[];
}

async function getCountryList(): Promise<DrupalNode[]> {
  const fetchFields = ["title", "uid", "field_iso_code"].join();

  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--country_data",
    params: `include=uid,field_region&&filter[status]=1&&sort=title&&fields[node--country_data]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getMapData(): Promise<DrupalNode[]> {
  const fetchFields = [
    "title",
    "uid",
    "field_iso_code",
    "field_transport_score",
    "field_services_score",
    "field_residential_score",
    "field_industry_score",
    "field_electricity_and_heat_score",
    "field_country_score",
    "field_region",
    "field_ai_country",
    "field_ai_electricity_and_heat",
    "field_ai_industry",
    "field_ai_residential",
    "field_ai_service",
    "field_ai_transport",
  ].join();

  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--country_data",
    params: `include=uid,field_region&&filter[status]=1&&sort=title&&fields[node--country_data]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

const getCountryDataByCountrySlug = async (countrySlug: string) => {
  const allCountries = await getMapData();

  let foundCountry: DrupalNode | null = null;

  allCountries.forEach((country) => {
    if (slugify(country.title, { lower: true }) === countrySlug) {
      foundCountry = country;
    }
  });

  return foundCountry;
};

async function getRegionData(): Promise<DrupalTaxonomyTerm[]> {
  const fetchFields = ["name", "vid"].join();

  const pantheonData = await pantheonStore.getObject<DrupalTaxonomyTerm[]>({
    objectName: "taxonomy_term--tool_region",
    params: `include=vid&&filter[status]=1&&fields[taxonomy_term--tool_region]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalTaxonomyTerm[];
}

async function getToolData(): Promise<DrupalNode[]> {
  const fetchFields = [
    "title",
    "uid",
    "field_tool_d_category",
    "field_tool_d_country",
    "field_tool_d_region",
    "field_tool_d_sector",
    "field_tool_d_subsector",
    "field_tool_d_type",
    "field_tool_d_partner",
    "field_tool_d_link",
  ].join();

  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--tool_data",
    params: `include=uid,field_tool_d_subsector,field_tool_d_sector,field_tool_d_region,field_tool_d_category,field_tool_d_type,field_tool_d_country&&filter[status]=1&&sort=-created&&fields[node--tool_data]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

const getFilteredToolData = async ({
  sector = "",
  region = "",
  category = "",
}: {
  sector?: string;
  region?: string;
  category?: string;
}) => {
  const sectorArray = sector?.split(",") || [];
  const regionArray = region?.split(",") || [];
  const categoryArray = category?.split(",") || [];

  const toolData = await getToolData();
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
    return filteredToolData;
  }
};

async function getTaskforcesSubpages(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--taskforces_subpages",
      params: `include=uid,field_document.field_media_document,field_task_image,field_taskforce_card_section.field_add_section&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  return pantheonData as DrupalNode[];
}

async function getFAQData(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--country_page_faq",
      params: `include=uid,field_country_faq_cards&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  return pantheonData as DrupalNode[];
}

export const DrupalService = {
  getPageBySlug,
  getPageData,
  getTaskforcesSubpages,
  getFooterSection,
  getGetInvolvedPageData,
  getPartnerCards,
  getMenuData,
  getCommonMetaTags,
  getFilteredNewsCards,
  getNewsCards,
  getNewsResourcesData,
  getNormalisedCardDataFromId,
  getTrainingsCard,
  getTopicData,
  getLanguageData,
  getTrainingRegionData,
  getTrainingSectorData,
  getFilteredTrainingCards,
  getCategoryData,
  getCountryList,
  getMapData,
  getCountryDataByCountrySlug,
  getRegionData,
  getToolData,
  getFilteredToolData,
  getFAQData,
};
