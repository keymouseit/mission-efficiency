export const dynamic = "force-static";

import DynamicTemplateClient from "@/components/templates/DynamicTemplateClient";
import { DrupalService } from "@/services";
import { DrupalNode } from "next-drupal";
import { notFound } from "next/navigation";

const DynamicRoutes = async ({ params }: { params: { slug?: string[] } }) => {
  const slugArray = params?.slug || [];

  if (slugArray[0] === ".well-known") return notFound();

  const slug = slugArray.length === 0 ? "/" : `/${slugArray.join("/")}`;

  if (slug === "/") {
    // Parallel data fetching for home page
    const [getInvolvedPageData, allPartnerCards, filteredNewsCards, homePage] =
      await Promise.all([
        DrupalService.getGetInvolvedPageData(),
        DrupalService.getPartnerCards(),
        DrupalService.getFilteredNewsCards({
          resource: "",
          month: "",
          year: "",
          searchQuery: "",
        }),
        DrupalService.getPageBySlug("/"),
      ]);

    // Create partner card lookup map for O(1) access
    const partnerCardMap = new Map(
      allPartnerCards.map((card) => [card?.id, card])
    );

    // Match & reorder partner cards efficiently
    const newPartnerCards = getInvolvedPageData[0].field_me_partners_cards
      .map((partnerCard: DrupalNode) => partnerCardMap.get(partnerCard?.id))
      .filter(Boolean) as DrupalNode[];

    // Partition and sort news/events in single pass
    const newsData: any[] = [];
    const eventData: any[] = [];

    for (const item of filteredNewsCards || []) {
      const isEvent = item?.field_n_resource?.name === "Event";
      const target = isEvent ? eventData : newsData;

      if (target.length < 3) {
        target.push(item);
      } else {
        // Replace oldest if current is newer
        const oldestIdx = target.reduce(
          (minIdx, curr, idx, arr) =>
            +new Date(curr.created) < +new Date(arr[minIdx].created)
              ? idx
              : minIdx,
          0
        );

        if (+new Date(item.created) > +new Date(target[oldestIdx].created)) {
          target[oldestIdx] = item;
        }
      }
    }

    // Final sort (only 3 items max)
    const sortByDate = (a: any, b: any) =>
      +new Date(b.created) - +new Date(a.created);
    newsData.sort(sortByDate);
    eventData.sort(sortByDate);

    return (
      <div className="w-full min-h-screen bg-white">
        <DynamicTemplateClient
          templateData={homePage}
          partnersData={newPartnerCards}
          newsCarouselCards={newsData}
          eventCarouselCards={eventData}
        />
      </div>
    );
  }

  const pageData = await DrupalService.getPageBySlug(slug);
  if (!pageData) notFound();

  return (
    <div className="w-full min-h-screen bg-white">
      <DynamicTemplateClient templateData={pageData} />
    </div>
  );
};

export default DynamicRoutes;
