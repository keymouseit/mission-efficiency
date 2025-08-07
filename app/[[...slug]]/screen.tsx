import { DrupalNode } from "next-drupal";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import DynamicTemplateClient from "@/components/DynamicTemplateClient";
import { HeaderData } from "@/types/header";

interface DynamicTemplateScreenProps {
  templateData: DrupalNode;
  headerData?: HeaderData;
  footerData: DrupalNode;
}

export default function DynamicTemplateServer({
  templateData,
  headerData,
  footerData,
}: DynamicTemplateScreenProps) {
  return (
    <>
      <Header data={headerData as any} />
      <DynamicTemplateClient templateData={templateData} />
      <LandingFooter data={footerData} />
    </>
  );
}
