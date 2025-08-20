import { DrupalNode } from "next-drupal";
import { DrupalService } from "@/lib/DrupalService";
import NewsAndEventsSection from "./NewsAndEventsSection";

type NewsAndEventsSectionProps = {
  data: DrupalNode;
};

async function NewsAndEventBlockServer({ data }: NewsAndEventsSectionProps) {
  const allCards = await DrupalService.getNewsCards();
  const sortedAndLimitedCards = allCards
    ?.sort((a: DrupalNode, b: DrupalNode) => {
      const dateA = new Date(a.field_news_date);
      const dateB = new Date(b.field_news_date);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);

  return (
    <NewsAndEventsSection
      data={data}
      newsAndEventSlider={sortedAndLimitedCards}
    />
  );
}

export default NewsAndEventBlockServer;
