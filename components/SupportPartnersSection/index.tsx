import { DrupalNode } from "next-drupal";
import SupportPartnersClient from "./SupportPartnersSection.client";
import { DrupalService } from "@/lib/DrupalService";

async function SupportPartnersSection() {
  let newPledgeAlignCards: DrupalNode[] = [];
  let newSupporterCards: DrupalNode[] = [];
  const pageData = await DrupalService.getCallToActionPageData();
  const allCards = await DrupalService.getAllCards();
  const allSupporterCards = await DrupalService.getSupporterCards();

  pageData?.[0]?.field_cta_pledge_align_cards.forEach(
    (pledgeCard: DrupalNode) => {
      const matchedCards = allCards?.find(
        (card) => card?.id === pledgeCard?.id
      );
      if (matchedCards) {
        newPledgeAlignCards.push(matchedCards);
      }
    }
  );

  pageData?.[0]?.field_cta_supporter_cards?.forEach(
    (supporterCards: DrupalNode) => {
      const matchedSupporterCards = allSupporterCards?.find(
        (card) => card?.id === supporterCards?.id
      );
      if (matchedSupporterCards) {
        newSupporterCards.push(matchedSupporterCards);
      }
    }
  );

  if (!pageData?.[0]?.field_cta_pledge_align_title) return null;

  const data = {
    field_cta_pledge_align_title:
      pageData?.[0]?.field_cta_pledge_align_title ?? "",
    field_cta_pledge_align_cards: newPledgeAlignCards,
    field_cta_supporter_cards: newSupporterCards,
  };

  return <SupportPartnersClient data={data} />;
}

export default SupportPartnersSection;
