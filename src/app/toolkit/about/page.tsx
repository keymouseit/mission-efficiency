export const revalidate = 60;

import { Metadata } from "next";
import { DrupalService } from "@/services";
import AboutUsScreen from "./screen";

export async function generateMetadata(): Promise<Metadata> {
  const data = await DrupalService.getCommonMetaTags();
  return {
    title: data?.[0]?.field_tools_meta_title || "",
    description: data?.[0]?.field_tools_meta_description || "",
    openGraph: {
      title: data?.[0]?.field_tools_meta_title || "",
      description: data?.[0]?.field_tools_meta_description || "",
      images: [data?.[0]?.field_tools_meta_image || ""],
    },
  };
}

const AboutUs = ({ searchParams }: { searchParams: any }) => {
  return <AboutUsScreen searchParams={searchParams} />;
};

export default AboutUs;
