import { Metadata } from "next";
import { DrupalNode } from "next-drupal";
import NewsScreen from "./screen";
import { DrupalService } from "@/services";

export async function generateMetadata(): Promise<Metadata> {
  const data = await DrupalService.getCommonMetaTags();
  return {
    title: data?.[0]?.field_news_meta_title || "",
    description: data?.[0]?.field_news_meta_description || "",
    openGraph: {
      title: data?.[0]?.field_news_meta_title || "",
      description: data?.[0]?.field_news_meta_description || "",
      images: [data?.[0]?.field_news_meta_image || ""],
    },
  };
}

const News = async ({ searchParams }: any) => {
  const { resource = "", month = "", year = "", search = "" } = searchParams;
  const filteredNewsCards =
    (await DrupalService.getFilteredNewsCards({
      resource,
      month,
      year,
      searchQuery: search,
    })) || ([] as DrupalNode[]);
  const resourcesFilteredData = await DrupalService.getNewsResourcesData();
  const { search: searchParam, ...filterParams } = searchParams;

  const findQueryLength = Boolean(Object.keys(filterParams).length);

  return (
    <>
      <NewsScreen
        searchParams={searchParams}
        filteredNewsCards={filteredNewsCards}
        resourcesFilteredData={resourcesFilteredData}
        selectedResources={
          resource.length ? (resource.split(",") as string[]) : []
        }
        showClearBtn={findQueryLength}
      />
    </>
  );
};

export default News;
