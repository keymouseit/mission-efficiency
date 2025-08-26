import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { DrupalNode } from "next-drupal";
import React from "react";
import DynamicImage from "@/components/ResuableDynamicImage";
import FadeInWrapper from "@/components/FadeInWrapper";

interface termsConditionProps {
  headerData: DrupalNode;
  footerData: DrupalNode;
  pageData: DrupalNode;
}

const TermsConditionScreen: React.FC<termsConditionProps> = ({
  headerData,
  footerData,
  pageData,
}) => {
  const { title = "", field_terms_condition_content = {} } = pageData;
  return (
    <>
      <Header data={headerData} />
      <div className="pt-20">
        <CommonBanner
          leftImg={"/static/images/left-home-hero.svg"}
          rightImg={"/static/images/elevate-right-img.svg"}
          title={"Terms and Conditions"}
          noHeight={true}
          lightBgClip={true}
          isSmallImage={true}
        />
        <div className="py-12 bg-mapGray relative overflow-hidden">
          <FadeInWrapper
            x={-100}
            once={true}
            type="spring"
            duration={2.8}
            className="absolute pointer-events-none max-w-[15%] top-[150px] left-0 betweenMobiletab:max-w-[90%] mobileMax:max-w-[40%]"
          >
            <DynamicImage
              width={224}
              height={445}
              src="/static/images/cta-section-bg.svg"
              alt="overlay-bg"
              className="w-full h-full opacity-40 "
            />
          </FadeInWrapper>
          <FadeInWrapper
            y={90}
            duration={2.8}
            once={true}
            type="spring"
            className="absolute pointer-events-none max-w-[15%] bottom-0 right-0 betweenMobiletab:max-w-[90%] mobileMax:max-w-[40%]"
          >
            <DynamicImage
              src="/static/images/cta-section-bg.svg"
              alt="overlay-bg"
              className="w-full h-full rotate-180 opacity-40 "
              width={316}
              height={567}
            />
          </FadeInWrapper>
          <div className="mini-container relative z-[2]">
            <FadeInWrapper
              y={40}
              duration={0}
              once={true}
              className="remove-animation-fluctuation policy-page-text text-medium text-cardText --font-poppins leading-normal mb-5 !text-left mobileMax:text-xsmall mobileMax:leading-normal"
              dangerouslySetInnerHTML={{
                __html: field_terms_condition_content?.value,
              }}
            />
          </div>
        </div>
      </div>
      <LandingFooter data={footerData} />
    </>
  );
};

export default TermsConditionScreen;
