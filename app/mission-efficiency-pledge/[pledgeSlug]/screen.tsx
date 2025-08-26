import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { DrupalNode } from "next-drupal";
import React from "react";
import DynamicImage from "@/components/ResuableDynamicImage";
import FadeInWrapper from "@/components/FadeInWrapper";

interface PledgeDetailScreenProps {
  headerData: DrupalNode;
  footerData: DrupalNode;
  detailCard: DrupalNode;
}

const PledgeDetailScreen: React.FC<PledgeDetailScreenProps> = ({
  headerData,
  footerData,
  detailCard,
}) => {
  return (
    <>
      <Header data={headerData} />
      <div className="pt-20">
        <CommonBanner
          leftImg={"/static/images/the-mission-hero-1.svg"}
          rightImg={"/static/images/home-hero-3.svg"}
          noHeight={true}
          title={detailCard?.title}
          isSmallImage={true}
        />
        <div className="py-14 bg-white relative mobileMax:py-10">
          <FadeInWrapper
            y={40}
            duration={0}
            once={true}
            className="remove-animation-fluctuation w-full mission-Pledge-Card overflow-hidden z-[1] relative"
          >
            <div className="mini-container py-12 h-full box-border w-full">
              <div className="max-w-[200px] h-[100px] w-full mx-auto bg-white ">
                <DynamicImage
                  src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${detailCard?.field_pledge_card_image?.uri?.url}`}
                  alt="country flag"
                  width={200}
                  height={100}
                  className="h-full w-full min-w-[200px] min-h-[100px] h-[100px] object-contain border-box px-2"
                />
              </div>
              <div
                className="h-full mt-5 break-words w-full text-left text-medium mb-5 leading-8 --font-poppins mobileMax:text-xsmall mobileMax:leading-normal"
                dangerouslySetInnerHTML={{
                  __html: detailCard.field_pledge_card_content.processed,
                }}
              />
            </div>
            <div className="absolute top-[50%] -translate-y-2/4 max-w-[50%] opacity-25 left-0 z-[-2] overflow-hidden">
              <FadeInWrapper
                x={-100}
                once={true}
                type="spring"
                duration={2.5}
              >
                <DynamicImage
                  src="/static/images/cta-blue-bg.svg" alt="left-bg"
                  width={445}
                  height={892}
                />
              </FadeInWrapper>
            </div>
          </FadeInWrapper>
        </div>
      </div>
      <LandingFooter data={footerData} />
    </>
  );
};

export default PledgeDetailScreen;
