import React from "react";
import {
  DrupalService,
  getNewFooter,
  getPageTemplateNew,
} from "@/lib/DrupalService";
import { DrupalNode } from "next-drupal";
import DynamicTemplateServer from "./screen";
import NotFoundPage from "@/components/NotFound";
import { redirect } from "next/navigation";

const TemplatePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  if (!slug) {
    redirect("/home");
  }

  // Fetch all necessary Drupal data
  const headerSection = await DrupalService.getHeaderSection();
  const newData = await getPageTemplateNew();
  const footerData = await getNewFooter();

  const matchedTemplate = newData.find((template: DrupalNode) =>
    template.field_page_slug.includes(slug)
  );

  if (!matchedTemplate) {
    return <NotFoundPage />;
  }

  return (
    <DynamicTemplateServer
      templateData={matchedTemplate}
      headerData={headerSection[0]}
      footerData={footerData[0]}
    />
  );
};

export default TemplatePage;
