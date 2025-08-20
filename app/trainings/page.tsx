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
  const [headerSection, menuData, footerSection] = await Promise.all([
    getNewHeader() as Promise<RawHeaderNode[]>,
    getMenuDetails(),
    getNewFooter(),
  ]);

  const processedMenuItems = processMenuData(menuData);
  const headerProps = prepareHeaderProps(headerSection, processedMenuItems);

  return (
    <TrainingScreen
      searchParams={searchParams}
      headerData={headerProps}
      footerData={footerSection[0]}
    />
  );
};

export default Training;
