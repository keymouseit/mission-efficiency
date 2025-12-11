export const revalidate = 60;
import MapScreen from "@/components/sections/MapScreen";
import { DrupalService } from "@/services";
import { Metadata } from "next";

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

export default async function Home() {
  const mapData = await DrupalService.getMapData();
  return (
    <>
      <MapScreen mapData={mapData} />
    </>
  );
}
