import React from "react";
import {
  getMenuDetails,
  getNewFooter,
  getNewHeader,
  getPageTemplateNew,
} from "@/lib/DrupalService";
import { DrupalNode } from "next-drupal";
import DynamicTemplateServer from "./screen";
import NotFoundPage from "@/components/NotFound";
import { redirect } from "next/navigation";
import { processMenuData } from "@/lib/processMenuData";

const TemplatePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  if (!slug) {
    redirect("/home");
  }

  // Fetch all necessary Drupal data
  const newData = await getPageTemplateNew();
  const rawHeaderData = await getNewHeader();
  const footerData = await getNewFooter();
  const MenuData = await getMenuDetails();

  const processedMenuItems = processMenuData(MenuData);

  const headerProps = {
    field_header_logo: rawHeaderData[0]?.field_logo,
    field_header_menus_items: processedMenuItems,
  };

  const matchedTemplate = newData.find((template: DrupalNode) =>
    template.field_page_slug.includes(slug)
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

export default TemplatePage;
