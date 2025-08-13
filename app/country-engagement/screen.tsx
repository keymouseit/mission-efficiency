"use client";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { DrupalNode } from "next-drupal";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DynamicImage from "@/components/ResuableDynamicImage";

interface countryProps {
  data: DrupalNode;
  getAllCountries: DrupalNode;
  headerData: DrupalNode;
  footerData: DrupalNode;
}

const CountryScreen: React.FC<countryProps> = ({
  data,
  getAllCountries,
  headerData,
  footerData,
}) => {
  const { title = "", field_ce_description = "" } = data;
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
          isSmallImage={true}
        />
        <div className="overflow-hidden">
          <div className="pt-16 pb-8 bg-mapGray mobileMax:pt-8 relative">
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
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation mobileMax:w-full --font-poppins text-medium text-center mb-5 mt-3 leading-8 text-cardText mobileMax:mb-5 mobileMax:text-xsmall mobileMax:leading-normal"
                dangerouslySetInnerHTML={{
                  __html: field_ce_description?.processed,
                }}
              />
            </div>
          </div>
          {/* country card */}
          <div className="pt-16 pb-20 bg-mapGray mobileMax:pb-8 mobileMax:pt-8 relative">
            <div className="mini-container relative z-[2]">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation desktop:text-[56px] text-numans mb-[30px] leading-normal text-center history-title-gradient text-clip text-[48px] mobileMax:text-[28px] mobileMax:px-0 mobileMax:mb-5"
              >
                Countries
              </motion.h2>
              <div className="flex justify-center box-border">
                <Link
                  href="/country-engagement/india"
                  className="remove-animation-fluctuation animate-cardHover-speed px-[15px] mb-[30px] w-[33%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-[15px] cursor-pointer"
                >
                  <motion.div
                    className="animate-cardHover-speed flex items-start flex-col box-border h-full w-full rounded-[23px] overflow-hidden card-shadow bg-white"
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      duration: 0,
                    }}
                  >
                    <motion.div className="transition bg-white p-4 flex items-center flex-col h-full box-border w-full card-shadow">
                     
                      <DynamicImage
                        src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
                          getAllCountries?.field_country_image?.uri?.url || ""
                        }`}
                        alt="category img"
                        height={200}
                        width={200}
                        className="h-full w-full mb-5"
                      />
                      <h3 className="text-numans text-center text-[23px] text-landingBlue leading-7 mobileMax:text-medium mobileMax:leading-7 hover:underline">
                        {getAllCountries?.title}
                      </h3>
                    </motion.div>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LandingFooter data={footerData} />
    </>
  );
};

export default CountryScreen;
