"use client";
import React from "react";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import CommonBottomFooter from "@/components/LandingWebsiteComponents/CommonTopFooterSection";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import PartnerCard from "@/components/LandingWebsiteComponents/PartnersCard";
import { DrupalNode } from "next-drupal";
import SectorResourceList from "@/components/SectorResourceLIst";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface SupportScreenProps {
  pageData: DrupalNode;
  headerData: DrupalNode;
  footerData: DrupalNode;
  iterableSectors: { [key: string]: DrupalNode[] }[];
}

const SupportScreen: React.FC<SupportScreenProps> = ({
  pageData,
  headerData,
  footerData,
  iterableSectors,
}) => {
  const {
    title = "",
    field_support_sub_title = "",
    field_sector_section_title = "",
    field_economy_wide_title = "",
    field_economy_wide_cards = [],
    field_resource_and_tools_title = "",
    field_resource_and_tools_cards = [],
    field_support_footer_section = {} as DrupalNode,
    field_support_training_section = {},
  } = pageData;
  return (
    <>
      <Header data={headerData} />
      <div className="pt-20">
        <CommonBanner
          leftImg={"/static/images/support-hero-1.svg"}
          rightImg={"/static/images/support-hero-2.svg"}
          lightBgClip={true}
          title={title}
          subTitle={field_support_sub_title}
        />
        <div
          id="economy-wide-resources-partners"
          className="py-[100px] bg-mapGray mobileMax:pt-12 betweenMobileTab:py-10 overflow-hidden relative"
        >
          <Image
            src="/static/images/cta-section-bg.svg"
            alt="overlay-bg"
            height={300}
            width={300}
            className="rotate-180 absolute pointer-events-none right-0 top-[50%] -translate-y-1/2 largeDesk:opacity-50 laptopMax:opacity-50 max-w-[35%] mobileMax:max-w-[45%] mobileMax:top-[300px] betweenMobileTab:max-w-[25%]"
          />
          <div className="desktop:top-[-13%] right-0 z-[-2] absolute pointer-events-none max-w-[40%] top-[120px] desktop:opacity-100 opacity-[0.6]">
            <img src="/static/images/ewpartners-bg-2.svg" alt="right-bg" />
          </div>
          {/* title section */}
          <div className="mini-container relative z-[2] h-full flex flex-col items-center justify-center mobileMax:block">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation mobileMax:pt-[60px] category-gradient text-clip tracking-tight desktop:text-xlarge desktop:mb-[70px] mt-0 leading-tight text-center text-numans text-[45px] mobileMax:text-[32px] mb-10"
            >
              {field_resource_and_tools_title}
            </motion.h2>
            <div className="flex flex-wrap justify-center box-border w-full">
              {field_resource_and_tools_cards?.map(
                (card: DrupalNode, index: number) => {
                  return (
                    <motion.div
                      key={index}
                      className="remove-animation-fluctuation px-[15px] mb-[30px] w-[33%] min-h-[280px] mobileMax:w-full mobileMax:px-0 mobileMax:w-full mobileMax:min-h-full"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                    >
                      <PartnerCard
                        img={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${card?.field_image_icon?.uri?.url}`}
                        title={card?.title || ""}
                        buttonText={card?.field_button_text}
                        link={card?.field_link}
                      />
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className="pt-10 pb-[140px] bg-graybg betweenMobileTab:pb-20 mobileMax:pb-10 mobileMax:pt-0">
          <div className="mini-container">
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation pt-[82px] text-numans category-gradient tracking-tight desktop:text-[66px] desktop:leading-[85px] text-center text-clip text-[48px] leading-[60px] mb-14 desktop:mb-[100px] mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-8"
            >
              {field_sector_section_title}
            </motion.h3>
            {/* cards Sector resources and partners*/}
            {iterableSectors.map((sector, index) => {
              return (
                <div
                  id="sector-resources-and-partners"
                  key={index}
                  className="flex items-start w-full justify-between desktop:flex-nowrap flex-wrap mb-[30px] border-b border-[#aec9f1] last:border-0"
                >
                  <div className="desktop:w-[30%] w-full mb-5">
                    <motion.h3
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                      className="remove-animation-fluctuation text-clip support-gradient text-[32px] tracking-tight leading-10 mr-5 text-numans mobileMax:text-[25px]   desktop:px-0 px-5 mobileMax:px-5 mobileMax:leading-8 mobileMax:mr-0"
                    >
                      {Object.keys(sector)[0]}:
                    </motion.h3>
                  </div>
                  <SectorResourceList list={Object.values(sector)[0]} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* last section Economy-wide resources & partners */}
      <div
        id="economy-wide-resources-partners"
        className="relative support-bottom-banner"
      >
        <img
          src="/static/images/blue-curve.png"
          alt="curve"
          className="absolute z-[3] w-full top-[-14px] h-[15px] pointer-events-none"
        />
        <div className="overflow-hidden relative min-h-[560px] pt-[140px] pb-[100px] box-border mobileMax:py-10">
          <div className="absolute desktop:top-[-13%] top-[120px] left-0 z-[-2] pointer-events-none max-w-full max-w-[38%]">
            <img src="/static/images/ewpartners-bg-1.svg" alt="left-bg" />
          </div>
          <div className="desktop:top-[-13%] right-0 z-[-2] absolute pointer-events-none max-w-[40%] top-[120px] desktop:opacity-100 opacity-[0.6]">
            <img src="/static/images/ewpartners-bg-2.svg" alt="right-bg" />
          </div>
          {/* title section */}
          <div className="mini-container h-full flex flex-col items-center justify-center mobileMax:block">
            <div className="mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation mobileMax:pt-[60px] title-green-gradient text-clip tracking-tight desktop:text-xlarge desktop:mb-[70px] mt-0 leading-tight text-center text-numans text-[45px] mobileMax:text-[32px] mb-10"
              >
                {field_economy_wide_title}
              </motion.h2>
              <div className="flex flex-wrap justify-center box-border">
                {field_economy_wide_cards?.map(
                  (card: DrupalNode, index: number) => {
                    return (
                      <motion.div
                        key={index}
                        className="remove-animation-fluctuation px-[15px] mb-[30px] w-[33%] min-h-[280px] mobileMax:w-full mobileMax:px-0 mobileMax:w-full mobileMax:min-h-full"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0,
                        }}
                      >
                        <PartnerCard
                          img={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${card?.field_image_icon?.uri?.url}`}
                          title={card?.title || ""}
                          buttonText={card?.field_button_text}
                          link={card?.field_link}
                        />
                      </motion.div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
        {/* bottom raining cards AND training cards  */}
        <div className="pt-[100px] pb-[90px] bg-white relative mobileMax:py-10 betweenMobileTab:py-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 3,
            }}
            className="absolute pointer-events-none top-[-55%] right-0 mobileMax:top-[-20%] betweenMobileTab:max-w-[67%] aboveLaptop:top-[-52%] lieTablets:top-[-36%] desktop:max-w-[46%]"
          >
            <img
              src="/static/images/training-bg.svg"
              alt="overlay-bg"
              className="w-full -h-full"
            />
          </motion.div>
          <div className="mini-container relative z-[1] flex items-center justify-between mobileMax:flex-col">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.5,
              }}
              className="w-[50%] mobileMax:w-full mobileMax:order-2 mobileMax:mt-5"
            >
              <motion.h4
                // initial={{ opacity: 0, y: 40 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true }}
                // transition={{
                // 	type: 'spring',
                // 	duration: 2.5,
                // }}
                className="desktop:text-[55px] text-numans mb-6 tracking-tight leading-normal text-left multi-text text-clip text-[48px] mobileMax:text-[28px] mobileMax:mb-3"
              >
                {field_support_training_section?.title}
              </motion.h4>
              <motion.div
                // initial={{ opacity: 0, y: 40 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true }}
                // transition={{
                // 	type: 'spring',
                // 	duration: 2.5,
                // }}
                dangerouslySetInnerHTML={{
                  __html:
                    field_support_training_section?.field_content?.processed,
                }}
                className="--font-poppins text-left text-medium text-cardText mb-4 leading-8 mobileMax:text-xsmall mobileMax:leading-normal"
              />
              <motion.div
              // initial={{ opacity: 0, y: 20 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // viewport={{ once: true }}
              // transition={{
              // 	type: 'spring',
              // 	duration: 2.5,
              // }}
              >
                <Link
                  href={"/trainings"}
                  className="h-[46px] rounded-md bg-buttonOverlay px-[30px] flex max-w-[160px] items-center justify-center mt-10 text-[#0077e4] font-mediums --font-poppins text-xsmall hover:bg-blueHover"
                >
                  {field_support_training_section?.field_button_text}
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.5,
              }}
              className="w-[50%] mobileMax:w-full mobileMax:order-1"
            >
              <motion.div
                className="max-h-[480px] rounded-[25px] overflow-hidden no-bottom-space"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  duration: 1.8,
                }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
                    field_support_training_section?.field_image_icon?.uri
                      ?.url || ""
                  }`}
                  alt="boardImg"
                  className="h-full w-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <CommonBottomFooter data={field_support_footer_section} />
      <LandingFooter data={footerData} />
    </>
  );
};

export default SupportScreen;
