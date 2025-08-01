import React from "react";
import { DrupalService, getPageTemplateNew } from "@/lib/DrupalService";
import { DrupalNode } from "next-drupal";
import NotFoundPage from "@/components/NotFound";
import DynamicTemplateServer from "./screen";

const TemplatePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Fetch all necessary Drupal data
  const headerSection = await DrupalService.getHeaderSection();
  const footerSection = await DrupalService.getFooterSection();
  const newData = await getPageTemplateNew();

  const matchedTemplate = newData.find((template: DrupalNode) =>
    template.field_page_slug.includes(slug)
  );

  if (!matchedTemplate) {
    return <NotFoundPage />;
  }

  return (
    <>
      <DynamicTemplateServer
        templateData={matchedTemplate}
        headerData={headerSection[0]}
        footerData={footerSection[0]}
      />
    </>
  );
};

export default TemplatePage;
