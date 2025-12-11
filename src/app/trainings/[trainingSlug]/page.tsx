export const revalidate = 60;

import DetailScreen from "@/components/templates/DetailScreen";
import { DrupalService } from "@/services";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await DrupalService.getCommonMetaTags();
  return {
    title: data?.[0]?.field_training_meta_title || "",
    description: data?.[0]?.field_training_meta_description || "",
    openGraph: {
      title: data?.[0]?.field_training_meta_title || "",
      description: data?.[0]?.field_training_meta_description || "",
      images: [data?.[0]?.field_training_meta_image || ""],
    },
  };
}

const TrainingDetailPage = async ({
  params,
}: {
  params: { trainingSlug: string };
}) => {
  const { trainingSlug } = params;
  const cardDetails = await DrupalService.getNormalisedCardDataFromId(
    trainingSlug,
    "TRAINING"
  );

  return <DetailScreen cardDetails={cardDetails} displayType="TRAINING" />;
};

export default TrainingDetailPage;
