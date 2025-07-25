import React from "react";
import { DrupalService, getPageTemplateNew } from "@/lib/DrupalService";
import { DrupalNode } from "next-drupal";
import NotFoundPage from "@/components/NotFound";
import DynamicTemplateScreen from "./screen";

const TemplatePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Fetch all necessary Drupal data
  const headerSection = await DrupalService.getHeaderSection();
  const footerSection = await DrupalService.getFooterSection();
  const templateListData = await DrupalService.getPageTemplate();
  const newData = await getPageTemplateNew();

  const matchedTemplate = newData.find((template: DrupalNode) =>
    template.field_page_slug.includes(slug)
  );

  // console.dir(newData, { depth: null, colors: true });

  if (!matchedTemplate) {
    return <NotFoundPage />;
  }

  return (
    <>
      <DynamicTemplateScreen
        templateData={matchedTemplate}
        headerData={headerSection[0]}
        footerData={footerSection[0]}
      />
    </>
  );
};

export default TemplatePage;
