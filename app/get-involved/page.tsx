import { DrupalService } from "@/lib/DrupalService";
import { Metadata } from "next";
import { DrupalNode } from "next-drupal";
import GetInvolvedScreen from "./screen";

export async function generateMetadata(): Promise<Metadata> {
  const data = await DrupalService.getGetInvolvedPageData();
  return {
    title: data?.[0]?.field_get_involved_meta_title || "",
    description: data?.[0]?.field_get_involved_meta_description || "",
    openGraph: {
      title: data?.[0]?.field_get_involved_meta_title || "",
      description: data?.[0]?.field_get_involved_meta_description || "",
      images: [data?.[0]?.field_get_involved_meta_image || ""],
    },
  };
}

const GetInvolved = async () => {
  const allCards = await DrupalService.getAllCards();
  const pageData = await DrupalService.getGetInvolvedPageData();
  const joinMissionData = await DrupalService.getTheMissionPageData();
  const allPartnerCards = await DrupalService.getPartnerCards();
  const headerSection = await DrupalService.getHeaderSection();
  const footerSection = await DrupalService.getFooterSection();
  const getTestimonialcards = await DrupalService.getInvolvedTestimonial();
  const newPartnerCards: DrupalNode[] = [] as DrupalNode[];
  const newMemberCards: DrupalNode[] = [] as DrupalNode[];
  const newJoinCards: DrupalNode[] = [] as DrupalNode[];
  const newDropdownCards: DrupalNode[] = [] as DrupalNode[];
  const newTestimonialCards: DrupalNode[] = [] as DrupalNode[];
  const newbannerCards: DrupalNode[] = [] as DrupalNode[];

  pageData[0].field_me_partners_cards.forEach((partnerCards: DrupalNode) => {
    const matchedPartnerCard = allPartnerCards.find(
      (card) => card?.id === partnerCards?.id
    );

    if (matchedPartnerCard) {
      newPartnerCards.push(matchedPartnerCard);
    }
  });

  pageData[0].field_me_member_cards?.forEach((memberCards: DrupalNode) => {
    const matchedMemberCard = allPartnerCards.find(
      (card) => card?.id === memberCards?.id
    );

    if (matchedMemberCard) {
      newMemberCards.push(matchedMemberCard);
    }
  });

  pageData[0].field_roles_mission_efficiency?.forEach(
    (joinCard: DrupalNode) => {
      const matchedMemberCard = allCards.find(
        (card) => card?.id === joinCard?.id
      );

      if (matchedMemberCard) {
        newJoinCards.push(matchedMemberCard);
      }
    }
  );

  pageData[0].field_get_involved_options?.forEach((joinCard: DrupalNode) => {
    const matchedMemberCard = allCards.find(
      (card) => card?.id === joinCard?.id
    );

    if (matchedMemberCard) {
      newDropdownCards.push(matchedMemberCard);
    }
  });

  pageData[0].field_task?.forEach((testCard: DrupalNode) => {
    const matchedMemberCard = getTestimonialcards.find(
      (card) => card?.id === testCard?.id
    );

    if (matchedMemberCard) {
      newTestimonialCards.push(matchedMemberCard);
    }
  });

  pageData[0].field_get_involve_energy?.forEach((bannerCard: DrupalNode) => {
    const matchedBannerCard = allCards.find(
      (card) => card?.id === bannerCard?.id
    );

    if (matchedBannerCard) {
      newbannerCards.push(matchedBannerCard);
    }
  });

  const getInvovedPage = {
    ...pageData[0],
    field_roles_mission_efficiency: newJoinCards,
    field_get_involved_options: newDropdownCards,
    field_task: newTestimonialCards,
    field_get_involve_energy: newbannerCards,
    field_me_partners_cards: newPartnerCards,
    field_me_member_cards: newMemberCards,
  };

  return (
    <GetInvolvedScreen
      data={getInvovedPage}
      joinMissionData={joinMissionData[0]}
      countryCards={newMemberCards}
      headerData={headerSection[0]}
      footerData={footerSection[0]}
    />
  );
};

export default GetInvolved;
