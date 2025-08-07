import {
  getMenuDetails,
  getNewFooter,
  getNewHeader,
  getPageTemplateNew,
} from "@/lib/DrupalService";
import { DrupalNode } from "next-drupal";
import DynamicTemplateServer from "./screen";
import NotFoundPage from "@/components/NotFound";
import { processMenuData } from "@/lib/processMenuData";
import { RawHeaderNode } from "@/types/header";

const HomePage = async ({ params }: { params: { slug?: string[] } }) => {
  const slugArray = params?.slug || [];
  const slug = slugArray.length === 0 ? "/" : slugArray.join("/");

  const newData = await getPageTemplateNew();
  const rawHeaderData = (await getNewHeader()) as RawHeaderNode[];
  const footerData = await getNewFooter();
  const MenuData = await getMenuDetails();
  const processedMenuItems = processMenuData(MenuData);

  const headerProps: any = {
    field_logo: rawHeaderData[0]?.field_logo,
    field_header_menus_items: processedMenuItems,
  };

  const matchedTemplate = newData.find(
    (template: DrupalNode) => template.field_page_slug === slug
  );

  if (!matchedTemplate) {
    return <NotFoundPage />;
  }

  return (
    <DynamicTemplateServer
      templateData={matchedTemplate}
      headerData={headerProps}
      footerData={footerData[0]}
    />
  );
};

export default HomePage;
