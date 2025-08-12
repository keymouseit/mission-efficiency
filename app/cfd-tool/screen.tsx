"use client";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { DrupalNode } from "next-drupal";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdImages } from "react-icons/io";
import CategoryCard from "@/components/LandingWebsiteComponents/CateogriesCard";
import CfdToolSlider from "@/components/CfdToolSlider";
import Link from "next/link";
import DynamicImage from "@/components/ResuableDynamicImage";

interface cfdToolProps {
  data: DrupalNode;
  headerData: DrupalNode;
  footerData: DrupalNode;
}

const CfdToolScreen: React.FC<cfdToolProps> = ({
  data,
  headerData,
  footerData,
}) => {
  const {
    title = "",
    field_afb_about_title = "",
    field_afb_abcfd_title = "",
    field_afb_about_content = "",
    field_afb_illustration_title = "",
    field_afb_does_through_title = "",
    field_afb_illustration_cards = [],
    field_afb_design_support_title = "",
    field_afb_design_support_cards = [],
    field_afb_does_through_cards = [],
    field_afb_abcfd_cards = [],
    field_afb_download_button_link = "",
  } = data;
  const [showContent, setShowContent] = useState(false);

  const handleViewAllClick = () => {
    setShowContent(!showContent);
  };

  return (
    <>
      <Header data={headerData} />
      <div className="pt-20">
        <CommonBanner
          leftImg={"/static/images/left-home-hero.svg"}
          rightImg={"/static/images/elevate-right-img.svg"}
          title={title}
          noHeight={true}
          lightBgClip={true}
          isCfdpage={true}
          isSmallImage={true}
        />
        <div className="pt-16 pb-6 bg-mapGray mobileMax:pt-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 2.5,
            }}
            className="absolute pointer-events-none left-0 top-[100px] mobileMax:top-[55px] max-w-[30%] mobileMax:max-w-[55%] betweenMobileTab:max-w-[40%] z-[1]"
          >
            <DynamicImage
              src="/static/images/cta-section-bg.svg"
              alt="overlay-bg"
              width={316}
              height={576}
              className="opacity-50 desktopLg:opacity-100"
            />
          </motion.div>
          <div className="mini-container relative z-[2]">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation desktop:text-[56px] text-numans mb-[30px] leading-normal text-center category-gradient text-clip text-[48px] mobileMax:text-[28px] mobileMax:px-0 mobileMax:mb-5"
            >
              {field_afb_about_title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation mobileMax:w-full --font-poppins text-medium text-center mb-12 mt-3 leading-8 text-cardText mobileMax:mb-8 mobileMax:text-xsmall mobileMax:leading-normal"
              dangerouslySetInnerHTML={{
                __html: field_afb_about_content?.processed,
              }}
            />
            {/* download tool btn */}
            <div className="flex justify-center">
              <Link
                href={field_afb_download_button_link || ""}
                className="flex items-center justify-center min-w-[220px] --font-poppins learnBtn !text-white text-medium min-h-[55px] rounded-lg hover:!text-[#1468a0] hover:!underline !no-underline mobileMax:min-w-full mobileMax:text-medium mobileMax:mb-3"
              >
                Download Tool
              </Link>
            </div>
          </div>
        </div>
        {/* slider */}

        <div className="py-16 mobileMax:py-10">
          <div className="mini-container">
            <motion.h3
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation desktop:text-[56px] text-numans mb-[35px] leading-normal text-center category-gradient text-clip text-[48px] mobileMax:text-[28px] mobileMax:px-0 mobileMax:mb-8"
            >
              {field_afb_illustration_title}
            </motion.h3>
            {/* carousel card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation mb-16 mobileMax:py-6"
            >
              <CfdToolSlider sliderData={field_afb_illustration_cards} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation flex justify-center"
            >
              <button
                onClick={handleViewAllClick}
                className="flex justify-center items-center get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg min-w-[200px] px-5"
              >
                {showContent ? "Hide All" : "View All"}
              </button>
            </motion.div>
            {/* expanded slider */}
            {showContent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap justify-start box-border w-full mt-10"
              >
                {/* card */}
                {field_afb_illustration_cards?.map(
                  (item: DrupalNode, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`desktop:px-[15px] mb-8 w-full betweenMobileTab:mb-6 laptopMax:mb-0 laptopMax:py-3 laptopMax:border-t-[1px] laptopMax:border-[#8A8C8E] ${item?.length >= 1
                          ? "desktop:w-full"
                          : "desktop:w-[50%]"
                          }`}
                      >
                        <motion.div
                          className="animate-cardHover-speed flex items-start box-border exactLaptop:bg-white remove-news-shadow card-shadow w-full h-[200px] aboveMinMobile:h-[160px] minMobile:h-[140px] exactLaptop:rounded-[4px] overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0,
                          }}
                        >
                          <div className="tab:w-[40%] tab:max-w-[50%] flex justify-center items-center w-full overflow-hidden relative mobileMax:mb-0 h-full minMobile:w-[90%] mobileMax:mr-2 lieTablets:mr-3">
                            {item?.field_image_icon?.uri?.url ? (
                              <DynamicImage
                                src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
                                  }${item?.field_image_icon?.uri?.url || ""}`}
                                alt="category img"
                                height={200}
                                width={200}
                                className="h-full w-full"
                              />
                            ) : (
                              <div className="w-full h-full bg-placeholder flex items-center justify-center">
                                <IoMdImages className="text-white w-[60%] h-[60%]" />
                              </div>
                            )}
                          </div>
                          <div className="exactLaptop:w-[60%] exactLaptop:p-4 flex flex-col h-full w-full laptopMax:py-0.5">
                            <div className="w-full h-full flex flex-col justify-between">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item?.field_content?.processed,
                                }}
                                className="mb-2 flex items-start text-left line-clamp-5 webkit-box text-small text-cardText leading-6 mobileMax:text-xsmall mobileMax:leading-normal"
                              />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                )}
              </motion.div>
            )}
          </div>
        </div>
        {/* designed to support card section */}
        <div className="py-20 bg-white betweenMobileTab:py-5 overflow-hidden">
          <div className="mini-container">
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation text-clip support-gradient tracking-tight text-[35px] leading-normal mb-[50px] text-center text-numans mobileMax:text-[28px] mobileMax:mb-8"
            >
              {field_afb_design_support_title}:
            </motion.h3>
            <div className="flex flex-wrap justify-center box-border">
              {field_afb_design_support_cards.map(
                (designCard: DrupalNode, index: number) => {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                      className="remove-animation-fluctuation px-[15px] mb-[30px] w-[25%] betweenMobileTab:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5"
                    >
                      <div className="rounded-xl h-full flex items-start flex-col box-border w-full">
                        <div className="mb-5 mx-auto h-[34px]">
                          <DynamicImage
                            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${designCard?.field_image_icon?.uri?.url || ""
                              }`}
                            alt="category img"
                            height={34}
                            width={34}
                            className="h-full w-full"
                          />
                        </div>
                        <div className="h-full w-full">
                          <h4 className="--font-poppins text-center text-medium mb-4 text-landingBlue leading-8 capitalize">
                            {designCard?.title}
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        {/* design through cards */}
        <div className="py-[100px] bg-graybg mobileMax:pt-12 pb-16 betweenMobileTab:py-10 overflow-hidden relative">
          <DynamicImage
            src="/static/images/cta-section-bg.svg"
            alt="overlay-bg"
            height={300}
            width={300}
            className="rotate-180 absolute pointer-events-none right-0 top-[50%] -translate-y-1/2 largeDesk:opacity-50 laptopMax:opacity-50 max-w-[35%] mobileMax:max-w-[45%] mobileMax:top-[300px] betweenMobileTab:max-w-[25%]"
          />
          <div className="mini-container relative z-[2]">
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation text-clip support-gradient tracking-tight text-[35px] leading-normal mb-[50px] text-center text-numans mobileMax:text-[28px] mobileMax:mb-8"
            >
              {field_afb_does_through_title}:
            </motion.h3>
            <div className="flex flex-wrap justify-center box-border">
              {field_afb_does_through_cards?.map(
                (card: DrupalNode, index: number) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                      key={index}
                      className="remove-animation-fluctuation px-[15px] mb-[30px] w-[33%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-[15px]"
                    >
                      <motion.div className="border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white desktop:px-10 px-5 py-[25px] flex items-center flex-col h-full box-border w-full card-shadow">
                        <div className="h-full w-full">
                          <div
                            className="--font-poppins text-center text-small text-[#7b99c7] leading-5 desktop:leading-6 --font-poppins mobileMax:text-xsmall"
                            dangerouslySetInnerHTML={{
                              __html: card?.field_content?.processed,
                            }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        {/* last cards of ABCFD */}
        <div className="py-16 bg-mapGray mobileMax:pb-8 mobileMax:pt-8 relative overflow-hidden">
            <motion.img
              src="/static/images/cta-section-bg.svg"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.5,
              }}
              className="absolute pointer-events-none max-w-[40%] top-[150px] left-0 mobileMax:max-w-[55%] mobileMax:opacity-40 z-[1]"
            />
          <div className="mini-container relative z-[2]">
            <motion.h3
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation desktop:text-[56px] text-numans mb-[60px] leading-normal text-center category-gradient text-clip text-[48px] mobileMax:text-[28px] mobileMax:px-0 mobileMax:mb-12"
            >
              {field_afb_abcfd_title}
            </motion.h3>
            <div className="flex flex-wrap justify-center box-border">
              {field_afb_abcfd_cards?.map(
                (abcdCard: DrupalNode, index: number) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                      key={index}
                      className="remove-animation-fluctuation px-[15px] mb-[30px] w-[33%] mobileMax:w-full mobileMax:px-0 home-category-card mobiuleMax:mb-5"
                    >
                      <CategoryCard
                        img={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${abcdCard?.field_image_icon?.uri?.url}`}
                        title={abcdCard.title}
                        isCfdTool={true}
                      />
                    </motion.div>
                  );
                }
              )}
            </div>
            {/* download tool btn */}
            <div className="flex justify-center mt-10 mobileMax:mt-5">
              <Link
                href={field_afb_download_button_link || ""}
                className="flex items-center justify-center min-w-[220px] --font-poppins learnBtn !text-white text-medium min-h-[55px] rounded-lg hover:!text-[#1468a0] hover:!underline !no-underline mobileMax:min-w-full mobileMax:text-medium"
              >
                Download Tool
              </Link>
            </div>
          </div>
        </div>
      </div>
      <LandingFooter data={footerData} />
    </>
  );
};
export default CfdToolScreen;
