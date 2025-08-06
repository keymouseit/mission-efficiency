import { DrupalNode } from "next-drupal";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import DynamicTemplateClient from "@/components/DynamicTemplateClient";

interface DynamicTemplateScreenProps {
  templateData: DrupalNode;
  headerData: any;
  footerData: DrupalNode;
}

export default function DynamicTemplateServer({
  templateData,
  headerData,
  footerData,
}: DynamicTemplateScreenProps) {
  return (
    <>
      <Header data={headerData} />

      <DynamicTemplateClient templateData={templateData} />

      <LandingFooter data={footerData} />
    </>
  );
}
