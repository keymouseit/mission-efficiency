export const revalidate = 60;
import DetailScreen from "@/components/templates/DetailScreen";
import { DrupalService } from "@/services";
import { Metadata } from "next";
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

const NewsDetailPage = async ({ params }: { params: { newsSlug: string } }) => {
  const { newsSlug } = params;
  const cardDetails = await DrupalService.getNormalisedCardDataFromId(
    newsSlug,
    "NEWS"
  );

  return <DetailScreen cardDetails={cardDetails} displayType="NEWS" />;
};

export default NewsDetailPage;
