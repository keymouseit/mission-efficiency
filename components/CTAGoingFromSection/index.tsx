import { DrupalService } from "@/lib/DrupalService";
import CTAGoingFromClient from "./CTAGoingFromSection.client";

const CTAGoingFromSection = async () => {
  const pageData = await DrupalService.getCallToActionPageData();
  const page = pageData?.[0];

  if (!page) return null;

  const data = {
    field_cta_going_from_title: page.field_cta_going_from_title,
    field_cta_going_from_subtitle: page.field_cta_going_from_subtitle,
    field_cta_going_from_content: page.field_cta_going_from_content,
    field_cta_going_from_image: page.field_cta_going_from_image,
  };

  return <CTAGoingFromClient data={data} />;
};

export default CTAGoingFromSection;
