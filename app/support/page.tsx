import { DrupalService } from "@/lib/DrupalService";
import { buildIterableSectors, normaliseCardsData } from "@/lib/utils";
import { Metadata } from "next";
import { DrupalNode } from "next-drupal";
import SupportScreen from "./screen";

export async function generateMetadata(): Promise<Metadata> {
  const data = await DrupalService.getSupportPageData();
  return {
    title: data?.[0]?.field_support_meta_title || "",
    description: data?.[0]?.field_support_meta_description || "",
    openGraph: {
      title: data?.[0]?.field_support_meta_title || "",
      description: data?.[0]?.field_support_meta_description || "",
      images: [data?.[0]?.field_support_meta_image || ""],
    },
  };
}

const Support = async () => {
  const pageData = await DrupalService.getSupportPageData();
  const allCards = await DrupalService.getAllCards();
  const headerSection = await DrupalService.getHeaderSection();
  const footerSection = await DrupalService.getFooterSection();
  const normalisedData = normaliseCardsData(pageData[0], allCards);
  const iterableSectors = buildIterableSectors(normalisedData);
  let newEconomyWideCards: DrupalNode[] = [];
  let newResourceAndToolsCards: DrupalNode[] = [];
  let newtrainingSection: DrupalNode = {} as DrupalNode;

  let newbottomFooterCard: DrupalNode = {} as DrupalNode;
  const matchedCard = allCards.find(
    (card) => card.id === pageData[0]?.field_support_footer_section?.id
  );

  if (matchedCard) {
    newbottomFooterCard = matchedCard;
  }

  pageData[0].field_economy_wide_cards?.forEach(
    (economyWideCard: DrupalNode) => {
      const matchedCard = allCards.find(
        (card) => card.id === economyWideCard.id
      );

      if (matchedCard) {
        newEconomyWideCards.push(matchedCard);
      }
    }
  );
  pageData[0].field_resource_and_tools_cards?.forEach(
    (resourceAndToolsCard: DrupalNode) => {
      const matchedCard = allCards.find(
        (card) => card.id === resourceAndToolsCard.id
      );

      if (matchedCard) {
        newResourceAndToolsCards.push(matchedCard);
      }
    }
  );
  const matchedTrainingSectionCard = allCards.find(
    (card) => card.id === pageData[0]?.field_support_training_section?.id
  );
  if (matchedTrainingSectionCard) {
    newtrainingSection = matchedTrainingSectionCard;
  }

  const supportPageData = {
    ...normalisedData,
    field_economy_wide_cards: newEconomyWideCards,
    field_resource_and_tools_cards: newResourceAndToolsCards,
    field_support_footer_section: newbottomFooterCard,
    field_support_training_section: newtrainingSection,
  };
  return (
    <>
      <SupportScreen
        pageData={supportPageData}
        iterableSectors={iterableSectors}
        headerData={headerSection[0]}
        footerData={footerSection[0]}
      />
    </>
  );
};

export default Support;
