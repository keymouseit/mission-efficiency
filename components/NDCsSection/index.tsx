import { DrupalService } from "@/lib/DrupalService";
import NDCsSectionClient from "./NDCsSection.client";

async function NDCsSection() {
  const pageData = await DrupalService.getCallToActionPageData();
  const page = pageData?.[0];

  if (!page?.field_cta_ndcs) return null;

  return <NDCsSectionClient data={page?.field_cta_ndcs} />;
}

export default NDCsSection;
