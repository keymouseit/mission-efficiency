import { DrupalService } from "@/lib/DrupalService";
import { DrupalNode } from "next-drupal";
import TitleDescriptionBlock from "./TitleDescriptionBlock";

interface TitleDescriptionBlockServerProps {
  data?: DrupalNode;
}

async function TitleDescriptionBlockServer({
  data,
}: TitleDescriptionBlockServerProps) {
  let elevatePageData;
  if (data?.field_cta_title === "Join the Energy Efficient Life Campaign") {
    let newBanner: DrupalNode[] = [];
    const [elevateFormData, allCards] = await Promise.all([
      DrupalService.getElevatePageData(),
      DrupalService.getAllCards(),
    ]);

    elevateFormData[0].field_campaign_life_banner.forEach(
      (bannerCard: DrupalNode) => {
        const matchedCard = allCards.find((card) => card.id === bannerCard.id);

        if (matchedCard) {
          newBanner.push(matchedCard);
        }
      }
    );

    elevatePageData = {
      ...elevateFormData[0],
      field_campaign_life_banner: newBanner,
    };
  }

  return <TitleDescriptionBlock data={data} newBanner={elevatePageData} />;
}

export default TitleDescriptionBlockServer;
