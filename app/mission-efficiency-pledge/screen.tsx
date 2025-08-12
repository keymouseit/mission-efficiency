"use client";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { DrupalNode } from "next-drupal";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import slugify from "slugify";
import { usePathname } from "next/navigation";
import DynamicImage from "@/components/ResuableDynamicImage";
interface missionPledgeProps {
  headerData: DrupalNode;
  footerData: DrupalNode;
  pageData: DrupalNode;
}

const MissionPledgeScreen: React.FC<missionPledgeProps> = ({
  headerData,
  footerData,
  pageData,
}) => {
  const path = usePathname();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [num, setNum] = useState(1);
  const {
    field_mission_pledges_cards = [],
    field_pledge_supporter_cards = [],
    field_pledge_supporter_content = "",
    field_pledge_testimonial = [],
    field_dashboard_cards = [],
  } = pageData;

  const limit =
    Number(
      field_dashboard_cards?.find?.(
        (a: DrupalNode) => a?.field_dashboard_title_type === "Number"
      )?.title
    ) || 0;

  useEffect(() => {
    let interval = setInterval(() => setNum((p) => p + 1), 270);
    setIntervalId(interval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (num >= limit) {
      clearInterval(intervalId);
    }
  }, [num, limit, intervalId]);
  
  return (
    <>
      <Header data={headerData} />
      <div className="pt-20 bg-mapGray">
        <CommonBanner
          leftImg={"/static/images/left-home-hero.svg"}
          rightImg={"/static/images/elevate-right-img.svg"}
          title={"Mission efficiency Pledge"}
          noHeight={true}
          isSmallImage={true}
        />
        {/* dollars card */}
        <div className="py-16 bg-white relative mobileMax:py-6 betweenMobileTab:py-10 overflow-hidden">
          <div className="mini-container">
            <div className="flex flex-wrap justify-between box-border pledge-dashboard-cards">
              {field_dashboard_cards.map(
                (dashboardCard: DrupalNode, index: number) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                      key={index}
                      className="remove-animation-fluctuation px-[15px] w-[32%] mobileMax:w-[47%] mobileMax:px-0 mobileMax:w-[48%] mobileMax:px-0 border-t-2 border-b-2 border-[#43A7E8] border-line"
                    >
                      <div className="flex items-center flex-col box-border h-full w-full overflow-hidden  py-6 mobileMax:py-3">
                        {dashboardCard.field_dashboard_title_type ==
                          "Number" ? (
                          <div className="min-h-[80px] min-w-[80px] category-gradient rounded-full overflow-hidden flex items-center justify-center mb-3 laptopMax:min-h-[55px] laptopMax:min-w-[55px]">
                            <div className="flex items-center justify-center text-numans text-center text-[35px] rounded-full overflow-hidden min-h-[70px] min-w-[70px] laptopMax:min-h-[45px] laptopMax:min-w-[45px] bg-white font-bold leading-10 --font-poppins laptopMax:text-medium laptopMax:leading-7">
                              <p className="category-gradient text-clip">
                                {/* {num} */}
                                {dashboardCard?.title}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <h5 className="font-bold text-lg category-gradient text-numans text-clip betweenMobileTab:text-[25px] mobileMax:text-medium">
                            {dashboardCard?.title}
                          </h5>
                        )}
                        <div
                          className="--font-poppins text-[#545D6F] text-center font-semibold text-xmedium mobileMax:text-xsmall leading-normal lieTablets:text-small"
                          dangerouslySetInnerHTML={{
                            __html:
                              dashboardCard.field_pledge_dashboard_content
                                .processed,
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
          {/* buttons */}
          <div className="pt-[82px]" id="pledge-submit">
            <div className="mini-container">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation px-[15px] mobileMax:px-0 flex justify-center mx-auto items-center mobileMax:flex-wrap mobileMax:w-full"
              >
                <Link
                  href="/pledge-form?type=GOVERNMENT"
                  className="!px-8 !py-2 mx-4 mobileMax:mx-0 mobileMax:mb-2.5 laptop:max-w-[360px] w-full cursor-pointer block text-center rounded-[65px] justify-center text-medium text-white font-medium visit-site-btn --font-poppins mobileMax:text-small"
                >
                  Mission Efficiency Pledge for Governments
                </Link>
                <Link
                  href="/pledge-form?type=ORGANIZATION"
                  className="!px-8 !py-2 mx-4 mobileMax:mx-0 mobileMax:mb-2.5 laptop:max-w-[360px] w-full cursor-pointer block text-center rounded-[65px] justify-center text-medium text-white font-medium visit-site-btn --font-poppins mobileMax:text-small"
                >
                  Mission Efficiency Pledge for Organizations
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        {/* pledge cards */}
        <div className="py-16 bg-mapGray mobileMax:py-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation absolute pointer-events-none z-[1] max-w-[50%] top-[10%] mobileMax:max-w-[60%] mobileMax:top-[5%]"
          >
            <DynamicImage
              src="/static/images/cta-section-bg.svg"
              alt="overlay-bg"
              width={316}
              height={576}
              className="mobileMax:opacity-40"
            />
          </motion.div>
          <div className="mini-container box-border relative z-[1]">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation category-gradient text-clip desktop:text-xlarge leading-tight text-center text-numans capitalize text-[48px] mobileMax:text-[28px] desktop:mb-14 mb-8 mobileMax:mb-5"
            >
              Pledges
            </motion.h2>
            <div className="flex w-full justify-start flex-wrap">
              {field_mission_pledges_cards?.map(
                (pledgeData: DrupalNode, index: number) => {
                  const sluggedLink = `${path}/${slugify(
                    `${pledgeData.title} ${pledgeData.id}`
                  )}`;
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                      key={index}
                      className="remove-animation-fluctuation px-[15px] mb-[25px] w-[33%] mobileMax:w-full mt-2 mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0"
                    >
                      <div
                        className="border-2 border-transparent hover:border-blueBorder transition flex items-start flex-col box-border h-full w-full rounded-[23px] overflow-hidden card-shadow bg-white">
                        <Link
                          href={sluggedLink || "#"}
                          className="rounded-xl bg-white px-[25px] py-[30px] h-full flex items-center flex-col box-border w-full card-shadow"
                        >
                          <div className="max-w-[200px] h-[100px] w-full mx-auto">
                            <div className="font-medium block text-center learnBtn text-clip --font-poppins h-full w-full min-w-[200px] min-h-[100px] h-[100px] object-contain">

                              <DynamicImage
                                src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
                                  }${pledgeData?.field_pledge_card_image?.uri
                                    ?.url || ""
                                  }`}
                                alt="country flag"
                                width={200}
                                height={100}
                                className="h-full w-full min-w-[200px] min-h-[100px] h-[100px] object-contain"
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        {/* our Supporters */}
        <div
          className="relative z-[1] support-bottom-banner"
          id="our-supporters"
        >
          <div className="overflow-hidden relative min-h-[560px] py-16 box-border mobileMax:py-10 betweenMobileTab:py-14">
            <div className="absolute top-[50%] -translate-y-2/4 left-0 pointer-events-none max-w-[80%] opacity-25 mobileMax:max-w-full betweenMobileTab:top-[35%] mobileMax:top-[15%] mobileMax:translate-y-unset">
              <DynamicImage width={445} height={892} src="/static/images/cta-blue-bg.svg" alt="left-bg" />


            </div>
            <div className="mini-container h-full flex flex-col items-center justify-center relative z-[3]">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation category-gradient text-clip desktop:text-xlarge leading-tight text-center text-numans capitalize text-[48px] mobileMax:text-[28px] mb-14 betweenMobileTab:mb-8"
              >
                Our Supporters
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation flex justify-between flex-wrap items-center text-small text-white text-center mb-14 font-normal --font-poppins leading-normal laptopMax:mb-4 our-supports-card mobileMax:text-xsmall"
                dangerouslySetInnerHTML={{
                  __html: field_pledge_supporter_content.value,
                }}
              />
              <div className="flex flex-wrap justify-center box-border">
                {field_pledge_supporter_cards
                  ?.sort((a: any, b: any) =>
                    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                  )
                  .map((supporterCards: DrupalNode, index: number) => {
                    return (
                      <motion.div
                        key={index}
                        className="remove-animation-fluctuation px-[15px] mb-[30px] w-[16%] mobileMax:w-[50%] betweenMobileTab:w-[25%] mobileMax:mb-5 mobileMax:px-[10px]"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0,
                        }}
                      >
                        <div className="rounded-[23px] flex justify-center items-center bg-white px-[15px] py-[10px] box-border w-full card-shadow">
                          <div className="max-w-[160px] w-full h-[110px] max-h-[110px] min-w-[120px] min-h-[100px] overflow-hidden">
                            <DynamicImage
                              src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${supporterCards?.field_supporter_list_image?.uri
                                  ?.url || ""
                                }`}
                              alt="sponser img"
                              width={160}
                              height={100}
                              className="w-full h-full max-w-full object-scale-down min-w-[120px] min-h-[100px]"
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        {/* testominal last section === resources*/}
        <div className="pt-[60px] pb-[140px] bg-mapGray relative z-[2] mobileMax:pt-5  mobileMax:pb-14 betweenMobileTab:pb-24 betweenMobileTab:pt-[60px] overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 2.8,
            }}
            className="absolute pointer-events-none left-0 z-[1] bottom-0 mobileMax:w-[40%]"
          >
            <DynamicImage
              src="/static/images/cta-section-bg.svg"
              alt="overlay-bg"
              width={316}
              height={576}
              className="mobileMax:opacity-40"
            />
          </motion.div>
          <div className="mini-container relative z-[1]">
            {field_pledge_testimonial?.map(
              (testimonialData: DrupalNode, index: number) => {
                return (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                      className="remove-animation-fluctuation mt-24 mobileMax:mt-12 remove-animation-fluctuation"
                    >
                      <div
                        className="Cta-testomonial --font-poppins font-medium text-[24px] leading-snug italic text-center text-[#545d6f] leading-8 mb-8 resources-links mobileMax:text-xsmall mobileMax:leading-normal relative"
                        dangerouslySetInnerHTML={{
                          __html: testimonialData?.field_content.processed,
                        }}
                      />
                      <h6 className="text-numans text-right font-semibold text-[32px] uppercase italic category-gradient text-clip mobileMax:text-xsmall leading-normal pr-2">
                        - {testimonialData.title}
                      </h6>
                    </motion.div>
                  </>
                );
              }
            )}
          </div>
        </div>
      </div>
      <LandingFooter data={footerData} />
    </>
  );
};

export default MissionPledgeScreen;
