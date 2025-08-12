"use client";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { DrupalNode } from "next-drupal";
import React from "react";
import { motion } from "framer-motion";
import DynamicImage from "@/components/ResuableDynamicImage";

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
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 2.8,
            }}
            className="absolute pointer-events-none max-w-[15%] top-[150px] left-0 betweenMobiletab:max-w-[90%] mobileMax:max-w-[40%]"
          >
            <DynamicImage
              width={224}
              height={445}
              src="/static/images/cta-section-bg.svg"
              alt="overlay-bg"
              className="w-full h-full opacity-40 "
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 2.8,
            }}
            className="absolute pointer-events-none max-w-[15%] bottom-0 right-0 betweenMobiletab:max-w-[90%] mobileMax:max-w-[40%]"
          >
            <DynamicImage
              src="/static/images/cta-section-bg.svg"
              alt="overlay-bg"
              className="w-full h-full rotate-180 opacity-40 "
              width={316}
              height={567}
            />
          </motion.div>
          <div className="mini-container relative z-[2]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
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
