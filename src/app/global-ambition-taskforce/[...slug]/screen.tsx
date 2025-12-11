"use client";

import { DrupalNode } from "next-drupal";
import NewsBackgroundBanner from "@/components/sections/NewsBackgroundBanner";
import { buildMediaTypeAndSrc } from "@/utils";
import { config } from "@/lib/config";
import CaseStudies from "@/components/sections/CaseStudies";

interface DetailScreenProps {
  cardDetails: DrupalNode;
  displayType: "NEWS" | "TRAINING";
}

const TaskforceDetailScreen: React.FC<DetailScreenProps> = ({
  cardDetails,
}) => {
  const taskforceDetails = cardDetails as any;

  const normalizedBannerDetails = {
    ...taskforceDetails,
    title: taskforceDetails?.field_title,
    date: taskforceDetails?.field_date,
    download: `${config.apiBase}${taskforceDetails?.field_document?.field_media_document?.uri?.url}`,
    media: `${config.apiBase}${taskforceDetails?.field_task_image?.uri?.url}`,
    link: taskforceDetails?.field_link,
    resource: { name: taskforceDetails?.field_resource },
  };

  const mediaTypeAndSrc = buildMediaTypeAndSrc(
    normalizedBannerDetails?.media || ""
  );

  const descriptionHtml = taskforceDetails?.field_description?.processed || "";

  return (
    <div className="pt-20 bg-mapGray">
      <NewsBackgroundBanner
        cardDetails={normalizedBannerDetails as DrupalNode}
        mediaTypeAndSrc={mediaTypeAndSrc}
      />

      <div className="py-[120px] mini-container">
        {descriptionHtml && (
          <div
            className="--font-poppins news-article list-inside text-left text-[16px] text-[#828282] leading-7 mb-5 mobileMax:text-xsmall mobileMax:leading-normal"
            dangerouslySetInnerHTML={{
              __html: descriptionHtml,
            }}
          />
        )}
      </div>
      {cardDetails.field_taskforce_card_section && (
        <CaseStudies data={cardDetails.field_taskforce_card_section} />
      )}
    </div>
  );
};

export default TaskforceDetailScreen;
