import React from "react";
import PrimaryCTAClient from "./PrimaryCTASection.client";
import { DrupalService } from "@/lib/DrupalService";

async function PrimaryCTASection() {
  const pageData = await DrupalService.getCallToActionPageData();
  const page = pageData?.[0];

  if (!page) return null;

  const data = {
    field_cta_efficiency_title: page.field_cta_efficiency_title,
    field_cta_efficiency_cop28: page.field_cta_efficiency_cop28,
    field_cta_left_button_link: page.field_cta_left_button_link,
    field_cta_left_button_text: page.field_cta_left_button_text,
    field_cta_right_button_link: page.field_cta_right_button_link,
    field_cta_right_button_text: page.field_cta_right_button_text,
    field_cta_efficiency_image: page.field_cta_efficiency_image,
    field_cta_efficiency_content: page.field_cta_efficiency_content,
  };

  return <PrimaryCTAClient data={data} />;
}

export default PrimaryCTASection;
