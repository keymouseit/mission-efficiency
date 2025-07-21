import { DrupalNode } from "next-drupal";
import FAQSectionClient from "./FAQSection.client";
import { DrupalService } from "@/lib/DrupalService";

async function FAQSection() {
  let newLeftFaqCards: DrupalNode[] = [];
  let newRightFaqCards: DrupalNode[] = [];
  const pageData = await DrupalService.getCallToActionPageData();
  const faqCards = await DrupalService.getFaqCards();

  pageData?.[0]?.field_cta_faq_left_cards.forEach((leftFaqCard: DrupalNode) => {
    const matchedLeftFaqCards = faqCards.find(
      (card) => card?.id === leftFaqCard?.id
    );
    if (matchedLeftFaqCards) {
      newLeftFaqCards.push(matchedLeftFaqCards);
    }
  });

  pageData?.[0]?.field_cta_faq_right_cards.forEach(
    (rightFaqCard: DrupalNode) => {
      const matchedRightFaqCards = faqCards.find(
        (card) => card?.id === rightFaqCard?.id
      );
      if (matchedRightFaqCards) {
        newRightFaqCards.push(matchedRightFaqCards);
      }
    }
  );

  const faqData = {
    ...pageData[0],
    field_cta_faq_left_cards: newLeftFaqCards,
    field_cta_faq_right_cards: newRightFaqCards,
  };

  return <FAQSectionClient data={faqData} />;
}

export default FAQSection;
