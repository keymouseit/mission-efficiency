import { drupalClient, pantheonStore, pantheonStoreNew } from "../drupal";
import slugify from "slugify";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import {
  normaliseKeysFromNewsAndTrainings,
  populateArrayElements,
} from "../utils";

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

async function getCountryList(): Promise<DrupalNode[]> {
  const fetchFields = ["title", "uid", "field_iso_code"].join();

  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--country_data",
    params: `include=uid,field_region&&filter[status]=1&&sort=title&&fields[node--country_data]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalNode[];
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

const getCountryDataByCountrySlug = async (countrySlug: string) => {
  const allCountries = await getMapData();
  let foundCountry = null;
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

async function getAllCards(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--card",
    params: `include=uid,field_image_icon&&filter[status]=1`,
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

async function getHomePageData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--home_page",
    params: `include=uid,field_about_section_content,field_about_section_images,field_home_page_banner&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getSupportPageData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--support_page",
    params: `include=uid,field_economy_wide_cards,field_resource_and_tools_cards&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getInvestPageData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--invest_page",
    params: `include=uid,field_energy_financing_images&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getElevatePageData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--elevate_page",
    params: `include=uid,field_power_energy_image,field_power_activity_image,field_power_objective_image,field_energy_objective_images_,field_opportunity_cards,field_energy_efficient_image,field_ready_to_move_main_image,field_ready_to_join_form&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}
async function getCfdToolPage(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--airflow_building",
    params: `include=uid&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}
async function getCountryEngagementPage(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--country_engagement",
    params: `include=uid&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getAllCountriesData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--engagement_counntries",
    params: `include=uid,field_country_image,field_work_description_cards,field_work_image,field_work_image_2,field_ec_recent_news,field_ec_recent_news.field_card_image&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getElevateJoinFormSubmissions(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--join_form_data",
    params: `include=uid&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getTheMissionPageData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--the_mission_page",
    params: `include=uid,field_mission_approach_image&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getGetInvolvedPageData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--get_involved_page",
    params: `include=uid,field_me_partners_cards&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getCallToActionPageData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--call_to_action_page",
    params: `include=uid,field_cta_efficiency_image,field_cta_mission_cop28_image,field_cta_going_from_image&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getFaqCards(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--faq_cards",
    params: `include=uid&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getSupporterCards(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--supporter_list_cards",
    params: `include=uid,field_supporter_list_image&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}
async function getCategoryData(): Promise<DrupalTaxonomyTerm[]> {
  const fetchFields = ["name", "vid"].join();
  const pantheonData = await pantheonStore.getObject<DrupalTaxonomyTerm[]>({
    objectName: "taxonomy_term--tool_category",
    params: `include=vid&&filter[status]=1&&fields[taxonomy_term--tool_category]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalTaxonomyTerm[];
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

async function getResourcesData(): Promise<DrupalTaxonomyTerm[]> {
  const fetchFields = ["name", "vid"].join();
  const pantheonData = await pantheonStore.getObject<DrupalTaxonomyTerm[]>({
    objectName: "taxonomy_term--training_resource",
    params: `include=vid&&filter[status]=1&&fields[taxonomy_term--training_resource]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalTaxonomyTerm[];
}

async function getOrganizationData(): Promise<DrupalTaxonomyTerm[]> {
  const fetchFields = ["name", "vid"].join();
  const pantheonData = await pantheonStore.getObject<DrupalTaxonomyTerm[]>({
    objectName: "taxonomy_term--training_organisation",
    params: `include=vid&&filter[status]=1&&fields[taxonomy_term--training_organisation]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalTaxonomyTerm[];
}

async function getModalityData(): Promise<DrupalTaxonomyTerm[]> {
  const fetchFields = ["name", "vid"].join();
  const pantheonData = await pantheonStore.getObject<DrupalTaxonomyTerm[]>({
    objectName: "taxonomy_term--training_modality",
    params: `include=vid&&filter[status]=1&&fields[taxonomy_term--training_modality]=${fetchFields}`,
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

async function getTrainingEventData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--training_and_events_page",
    params: `include=uid&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getTrainingEventCards(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--events_cards",
    params: `include=uid,field_event_image&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getMissionPledgePageData(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--mission_efficiency_pledge",
    params: `include=uid&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getAllPledgesCard(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--pledge_cards",
    params: `include=uid,field_pledge_card_image&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getHeaderSection(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--header_section",
      params: `include=uid,field_header_logo,field_header_menus_items&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  const populatedHeaderMenuItems = (await getHeaderMenuItems())
    .filter((menuItem) => {
      const matchedId = pantheonData[0].field_header_menus_items.find(
        (DataItem: { id: string }) => DataItem.id === menuItem.id
      );

      if (matchedId) {
        return true;
      }
    })
    .sort((a, b) => {
      return a.drupal_internal__nid - b.drupal_internal__nid;
    });

  return [
    { ...pantheonData[0], field_header_menus_items: populatedHeaderMenuItems },
  ] as DrupalNode[];
}

async function getHeaderMenuItems(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--menu_items",
    params: `include=uid,field_sub_menu_title&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getNewsCards(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--news",
      params: `include=uid,field_n_resource&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  return pantheonData as DrupalNode[];
}

async function getCountryNewsCards(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--country_news_cards",
      params: `include=uid,field_card_image&&filter[status]=1`,
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
  console.log({ filteredNewsCards });

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

async function getTrainingCardImages(): Promise<DrupalNode[]> {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "media--image",
    params: `include=uid,thumbnail&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getTrainingsCard(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--training",
      params: `include=uid,field_t_language,field_t_modality,field_t_resource,field_t_organization,field_t_region,field_t_sector,field_t_topic&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  return pantheonData as DrupalNode[];
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
  // field_footer_social_icons
  const allData = [
    { ...pantheonData[0], field_footer_social_icons: socialIcons },
  ];
  return allData as DrupalNode[];
}

const normaliseCards = async (pageData: DrupalNode) => {
  const allCards = await getAllCards();

  const populatedData = { ...pageData };

  for (const key in pageData) {
    if (key.endsWith("_cards") && Array.isArray(pageData[key])) {
      const cardIds = pageData[key];

      const populatedCards = cardIds.map((id: string) => {
        return allCards.find((card) => card.id === id);
      });

      populatedData[key] = populatedCards;
    }
  }

  return populatedData;
};

interface ElevatePageFormDataInterface {
  title: string;
  field_join_form_email: string;
  field_join_form_age: string;
  field_join_form_gender: string;
  field_join_form_country: string;
}

const postElevatePageFormData = async (data: ElevatePageFormDataInterface) => {
  return await drupalClient.createResource("node--join_form_data", {
    data: {
      attributes: data,
    },
  });
};

interface PageDataInterface {
  title: string;
  field_form_support_to: string;
  field_form_commitment: string;
  field_form_first_name: string;
  field_form_last_name: string;
  field_form_email: string;
  field_form_country: string;
}

const postGetInvolvedPageData = async (data: PageDataInterface) => {
  await drupalClient.createResource("node--get_involved_page_data", {
    data: {
      attributes: data,
    },
  });
};
const postLogoImage = async (data: any) => {
  const fileResponseData = await drupalClient.createFileResource("file--file", {
    data: {
      attributes: {
        type: "media--image",
        field: "field_media_image",
        filename: "filename.jpg",
        file: data,
      },
    },
  });
  if (fileResponseData) {
    return fileResponseData;
  }
};

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

const getPledgeDetailFromId = async (findFromId: string) => {
  const existCards = await getMissionPledgePageData();
  const allCards = await DrupalService.getAllPledgesCard();

  const newMissionPledgeCards = [] as DrupalNode[];

  existCards[0].field_mission_pledges_cards.forEach(
    (pledgeData: DrupalNode) => {
      const matchedPledgeData = allCards?.find(
        (card) => card?.id === pledgeData?.id
      );
      if (matchedPledgeData) {
        newMissionPledgeCards.push(matchedPledgeData);
      }
    }
  );

  const foundDetailCard = newMissionPledgeCards.find((card: { id: string }) =>
    findFromId.includes(card.id)
  );

  return foundDetailCard;
};

const getPledgeDashboard = async () => {
  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--mission_pledge_dashboard_cards",
    params: `include=uid&&filter[status]=1`,
    all: true,
  });

  return pantheonData as DrupalNode[];
};

const getFormChecklists = async () => {
  const formChecklistData = (await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--checklist_item",
    params: `include=uid,field_checklist_item_sublist&&filter[status]=1`,
    all: true,
  })) as DrupalNode[];

  return formChecklistData as DrupalNode[];
};

const getInvolvedTestimonial = async () => {
  const getInvolvedCards = (await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--testimonial_cards",
    params: `include=uid,field_testimonial_image&&filter[status]=1`,
    all: true,
  })) as DrupalNode[];

  return getInvolvedCards as DrupalNode[];
};

const getFormFields = async () => {
  const formFieldsData = (await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--forms_fields",
    params: `include=uid,field_form_field_checklist&&filter[status]=1`,
    all: true,
  })) as DrupalNode[];

  const allFormChecklistsWithPopulatedSublists = await getFormChecklists();

  const populatedFormFieldData = formFieldsData.map((formField) => {
    const newFormInputsArray = populateArrayElements(
      formField.field_form_field_checklist,
      allFormChecklistsWithPopulatedSublists
    );

    return {
      ...formField,
      field_form_field_checklist: newFormInputsArray as DrupalNode[],
    };
  });

  return populatedFormFieldData as DrupalNode[];
};

const getPrivacyPolicy = async () => {
  const getPolicyData = (await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--privacy_policy",
    params: `include=uid&&filter[status]=1`,
    all: true,
  })) as DrupalNode[];

  return getPolicyData as DrupalNode[];
};

const getTermConditionData = async () => {
  const getTermsConditionPage = (await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--terms_and_condition",
    params: `include=uid&&filter[status]=1`,
    all: true,
  })) as DrupalNode[];

  return getTermsConditionPage as DrupalNode[];
};

const getFormSections = async () => {
  const formSectionsData = (await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--pledge_form_section",
    params: `include=uid,field_pledge_form_section_inputs&&filter[status]=1`,
    all: true,
  })) as DrupalNode[];
  const allFormFieldsWithPopulatedChecklists = await getFormFields();

  const populatedSectionsData = formSectionsData.map((formSection) => {
    const newFormInputsArray = populateArrayElements(
      formSection.field_pledge_form_section_inputs,
      allFormFieldsWithPopulatedChecklists
    );

    return {
      ...formSection,
      field_pledge_form_section_inputs: newFormInputsArray as DrupalNode[],
    };
  });

  return populatedSectionsData as DrupalNode[];
};
const getPledgeFormPage = async () => {
  const pledgeFormPageData = (await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--pledge_form_page",
    params: `include=uid,field_pledge_form&&filter[status]=1`,
    all: true,
  })) as DrupalNode[];
  const formSections = await getFormSections();
  const newGovFormData = [] as DrupalNode[];
  pledgeFormPageData[0].field_pledge_form.forEach((formSection: DrupalNode) => {
    const populatedFormSection = formSections.find(
      (populatedSection) => populatedSection.id === formSection.id
    );
    if (populatedFormSection) {
      newGovFormData.push(populatedFormSection);
    }
  });

  return {
    ...pledgeFormPageData[0],
    field_pledge_form: newGovFormData,
  } as DrupalNode;
};

interface PledgeFormDataInterface {
  title: string;
  field_pledge_data_type: string;
  field_pledge_data_first_name: string;
  field_pledge_data_last_name: string;
  field_pledge_data_email: string;
  field_pledge_data_position: string;
  field_pledge_data_org_name: string;
  field_pledge_data_org_website: string;
  field_pledge_data_pledge_ids: string;
  field_pledge_data_custom_pledge: string;
  field_pledge_data_pledge_actions: string;
  field_pledge_data_pledge_commits: string;
  field_pledge_data_pledge_goals: string;
  field_pledge_data_focus_sectors: string;
  field_pledge_data_support_action: string;
  field_pledge_data_percentage_inc: string;
}

const postPledgeFormData = async (data: PledgeFormDataInterface) => {
  await drupalClient.createResource("node--pledge_form_data", {
    data: {
      attributes: data,
    },
  });
};

async function getCommonMetaTags(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--common_meta_tags",
      params: `include=uid&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  return pantheonData as DrupalNode[];
}

async function getEmailTemplates(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--email_templates",
      params: `include=uid&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  return pantheonData as DrupalNode[];
}

async function getMailChimpInterval(): Promise<DrupalNode[]> {
  const pantheonData =
    (await pantheonStore.getObject<DrupalNode[]>({
      objectName: "node--mailchimp_interval",
      params: `include=uid&&filter[status]=1`,
      all: true,
    })) || ([{}] as DrupalNode[]);

  return pantheonData as DrupalNode[];
}

async function getTemplates(): Promise<DrupalNode[]> {
  const fetchFields = [
    "title",
    "uid",
    "field_page_components",
    "field_test_page_route",
  ].join();
  const populateFields = [
    "uid",
    "field_page_components",
    "field_page_components.field_image_with_text",
    "field_page_components.field_cta_background_image",
    "field_page_components.field_hero_background_image",
    "field_page_components.field_slider_images",
    "field_page_components.field_add_timeline_slides",
    "field_page_components.field_add_timeline_slides.field_tl_images",
  ].join();

  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--testing_template",
    params: `include=${populateFields}&&filter[status]=1&&fields[node--testing_template]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

async function getPageTemplate(): Promise<DrupalNode[]> {
  const fetchFields = [
    "title",
    "uid",
    "field_page_component",
    "field_page_slug",
  ].join(",");

  const includeFields = [
    "uid",
    "field_page_component",
    "field_page_component.field_twi_image",
  ].join(",");

  const pantheonData = await pantheonStore.getObject<DrupalNode[]>({
    objectName: "node--page_template",
    params: `include=${includeFields}&filter[status]=1&fields[node--page_template]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

export async function getPageTemplateNew(): Promise<DrupalNode[]> {
  const fetchFields = [
    "title",
    "uid",
    "field_page_component",
    "field_page_slug",
  ].join(",");

  const includeFields = [
    "uid",
    "field_page_component",
    "field_page_component.field_twi_image",
    "field_page_component.field_faq_left_section",
    "field_page_component.field_faq_right_section",
    "field_page_component.field_resources_cards",
    "field_page_component.field_resources_cards.field_image",
    "field_page_component.field_slider_configuration",
    "field_page_component.field_add_slide.field_slider_image",
    "field_page_component.field_add_card.field_icon",
    "field_page_component.field_slide.field_icon",
    "field_page_component.field_images",
    "field_page_component.field_background_image",
    "field_page_component.field_add_objective",
    "field_page_component.field_add_section.field_icon",
    "field_page_component.field_add_tasks.field_add_activities",
    "field_page_component.field_add_tasks.field_author_details.field_image",
    "field_page_component.field_create_category.field_add_card.field_icon",
  ].join(",");

  const pantheonData = await pantheonStoreNew.getObject<DrupalNode[]>({
    objectName: "node--page_template",
    params: `include=${includeFields}&filter[status]=1&fields[node--page_template]=${fetchFields}`,
    all: true,
  });

  return pantheonData as DrupalNode[];
}

export const DrupalService = {
  getPageTemplate,
  normaliseCards,
  getMapData,
  getCountryList,
  getToolData,
  getFilteredToolData,
  getCountryDataByCountrySlug,
  getRegionData,
  getCategoryData,
  getHomePageData,
  getAllCards,
  getPartnerCards,
  getFaqCards,
  getSupporterCards,
  getSupportPageData,
  getInvestPageData,
  getElevatePageData,
  getTheMissionPageData,
  getCallToActionPageData,
  getGetInvolvedPageData,
  getTrainingEventData,
  getTrainingEventCards,
  getHeaderSection,
  getFooterSection,
  postGetInvolvedPageData,
  getLanguageData,
  getResourcesData,
  getOrganizationData,
  getModalityData,
  getNewsCards,
  getNewsResourcesData,
  getFilteredNewsCards,
  getTrainingsCard,
  getFilteredTrainingCards,
  getTrainingRegionData,
  getTrainingSectorData,
  getTopicData,
  getMissionPledgePageData,
  getNormalisedCardDataFromId,
  getPledgeDetailFromId,
  getPledgeDashboard,
  getPledgeFormPage,
  postPledgeFormData,
  postLogoImage,
  getTrainingCardImages,
  getFormChecklists,
  postElevatePageFormData,
  getElevateJoinFormSubmissions,
  getAllPledgesCard,
  getInvolvedTestimonial,
  getCommonMetaTags,
  getEmailTemplates,
  getPrivacyPolicy,
  getTermConditionData,
  getMailChimpInterval,
  getCfdToolPage,
  getCountryEngagementPage,
  getAllCountriesData,
  getCountryNewsCards,
  getTemplates,
};
