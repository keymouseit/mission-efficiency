"use client";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import FlipFlopCard from "@/components/LandingWebsiteComponents/FlipFlopCard";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MdChevronRight } from "react-icons/md";
import Image from "next/image";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import geos from "../../public/resources/mappings/countries.geo.json";
import ElevateJoiningForm from "@/components/LandingWebsiteComponents/ElevateJoiningForm";
import { useState } from "react";
import { formatSubmissions } from "@/lib/utils";
import CommonBottomFooter from "@/components/LandingWebsiteComponents/CommonTopFooterSection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryCard from "@/components/LandingWebsiteComponents/CateogriesCard";
import { CaptchaProvider } from "@/lib/CaptchaService/Provider";
import PledgeSuccessModal from "@/components/LandingWebsiteComponents/PledgeSuccessModal";
import { MonitorDotIcon } from "lucide-react";

interface ElevateScreenProps {
  data: DrupalNode;
  joinFormSubmissions: DrupalNode[];
  opportunityCards: DrupalNode[];
  headerData: DrupalNode;
  footerData: DrupalNode;
}

const ElevateScreen: React.FC<ElevateScreenProps> = ({
  data,
  joinFormSubmissions,
  opportunityCards,
  headerData,
  footerData,
}) => {
  const [isDesktop, setIsDesktop] = useState<Boolean>(false);
  const [isTablet, setIsTablet] = useState<Boolean>(false);
  const [isOpenJoinForm, setIsOpenJoinForm] = useState<any>(false);
  const {
    title = "",
    field_elevate_subtitle = "",
    field_elevate_energy_title = "",
    field_energy_related_title = "",
    field_elevate_benefits_title = "",
    field_elevate_benefits_subtitle = "",
    field_energy_related_cards = [],
    field_elevate_benefits_cards = [],
    field_elevate_energy_content = {},
    field_elevate_efficiency_banner = {},
    field_elevate_training_section = {},
    field_elevate_bottom_footer = {},
    field_energy_efficiency_101 = [],
    field_energy_efficient_title = "",
    field_energy_efficient_content = {},
    field_energy_objective_images_ = [],
    field_energy_objective_content = {},
    field_enery_objective_title = "",
    field_energy_activity_cards = [],
    field_energy_activity_title = "",
    field_power_energy_title = "",
    field_power_energy_subtitle = "",
    field_power_energy_content = {},
    field_global_taskforce_title = "",
    field_global_taskforce_content = {},
    field_ready_to_join_content = {},
    field_ready_to_move_cards = [],
    field_ready_to_join_form = [],
    field_elevate_campaign_materials = [],
    field_elevate_campaign_resources = [],
    field_energy_efficient_image = "",
    field_ready_to_move_section = {},
    field_ready_to_move_main_image = "",
    field_opportunity_section_title = "",
    field_opportunity_section_subtit = "",
    field_power_objective_content = {},
    field_power_activity_content = {},
    field_power_energy_image = {},
    field_power_objective_image = {},
    field_power_activity_image = {},
    field_map_title = "",
    field_campaign_materials_title = "",
    field_campaign_resources_title = "",
    field_campaign_life_banner = [],
  } = data;

  // const { toast } = useToast();
  const [hoveredCountryData, setHoveredCountryData] = useState<{
    name: string;
    records: number;
  }>({ name: "", records: 0 });
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // const handleMouseEnterCountry = (geo: any) => {
  //   let hoveredCountryName = geo.properties.name;
  //   const recordsInHoveredCountry = joinFormSubmissions?.filter(
  //     (submissionData: DrupalNode) =>
  //       hoveredCountryName.includes(
  //         submissionData.attributes.field_join_form_country
  //       )
  //   );

  //   const totalSubmissionsInHoveredCountry =
  //     recordsInHoveredCountry?.length || 0;
  //   if (totalSubmissionsInHoveredCountry) {
  //     hoveredCountryName =
  //       recordsInHoveredCountry[0].attributes.field_join_form_country;
  //   }

  //   setHoveredCountryData({
  //     name: hoveredCountryName,
  //     records: totalSubmissionsInHoveredCountry,
  //   });
  //   setShowTooltip(true);
  // };
  const handleMouseEnterCountry = (geo: any) => {
    let hoveredCountryName = geo.properties.name;
    const recordsInHoveredCountry = joinFormSubmissions.filter(
      (submissionData: DrupalNode) =>
        submissionData.data.country === hoveredCountryName
    );

    const totalSubmissionsInHoveredCountry = recordsInHoveredCountry.length;
    if (totalSubmissionsInHoveredCountry > 0) {
      hoveredCountryName = recordsInHoveredCountry[0].data.country;
    }

    setHoveredCountryData({
      name: hoveredCountryName,
      records: totalSubmissionsInHoveredCountry,
    });
    setShowTooltip(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTooltip(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth > 1200) {
        setIsDesktop(true);
      }
      if (window?.innerWidth < 1024) {
        setIsTablet(true);
      }
    }
  }, []);
  return (
    <>
      <CaptchaProvider>
        <Header data={headerData} />
        <div className="pt-20">
          <CommonBanner
            leftImg={"/static/images/left-home-hero.svg"}
            rightImg={"/static/images/elevate-right-img.svg"}
            title={title}
            subTitle={field_elevate_subtitle}
            lightBgClip={true}
          />
          {/* Energy Efficiency 101 */}
          <div
            id="energy-efficiency-101"
            className="pb-12 pt-2 bg-mapGray mobileMax:py-6 relative overflow-hidden"
          >
            <motion.img
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.5,
              }}
              src="/static/images/cta-section-bg.svg"
              alt="overlay-bg"
              className="absolute pointer-events-none max-w-[50%] top-[250px] mobileMax:max-w-[40%] mobileMax:opacity-40 z-[1] opacity-80"
            />
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.5,
              }}
              className="absolute pointer-events-none max-w-[50%] bottom-5 right-0 mobileMax:max-w-[40%] mobileMax:opacity-40 z-[1] opacity-80"
            >
              <img
                src="/static/images/cta-section-bg.svg"
                alt="overlay-bg"
                className="rotate-180 mobileMax:opacity-40 opacity-80"
              />
            </motion.div>
            <div className="mini-container flex items-center justify-between laptopMax:flex-col relative z-[2]">
              <div className="w-full mt-[72px]">
                <motion.h3
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="remove-animation-fluctuation desktop:text-[56px] text-numans mb-[30px] leading-normal text-center category-gradient text-clip text-[48px] mobileMax:text-[28px] mobileMax:px-0 mobileMax:mb-5"
                >
                  {field_elevate_energy_title}
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="remove-animation-fluctuation mb-12 mobileMax:mb-8 text-center elevate-planet-title text-medium leading-normal --font-poppins mobileMax:text-small"
                  dangerouslySetInnerHTML={{
                    __html: field_elevate_energy_content.processed,
                  }}
                />
                <div className="flex flex-wrap justify-start m-auto box-border">
                  {/* this card reference */}
                  {field_energy_efficiency_101?.map(
                    (eneryEfficiencyCard: DrupalNode, index: number) => {
                      return (
                        <motion.div
                          key={index}
                          className="remove-animation-fluctuation px-[15px] mb-[25px] w-[33%] remove-animation-fluctuation mobileMax:w-full mt-2 mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5 mobileMax:mt-0"
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0,
                          }}
                        >
                          <div className="border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white p-5 h-full flex items-center flex-col box-border w-full card-shadow">
                            <div className="min-h-[80px] min-w-[80px] category-gradient rounded-full overflow-hidden flex items-center justify-center mb-3 mobileMax:min-h-[55px] mobileMax:min-w-[55px]">
                              <div
                                className="flex items-center justify-center text-numans text-center text-[35px] rounded-full overflow-hidden min-h-[70px] min-w-[70px] mobileMax:min-h-[45px]
                                                            mobileMax:min-w-[45px] bg-white font-bold  leading-10 --font-poppins mobileMax:text-medium mobileMax:leading-7"
                              >
                                <p className="category-gradient text-clip">
                                  {index + 1}
                                </p>
                              </div>
                            </div>
                            <div className="h-full flex items-center justify-between flex-col w-full">
                              <h4 className="text-numans text-center text-[22px] mb-3 text-landingBlue leading-7 mobileMax:text-medium mobileMax:leading-7">
                                {eneryEfficiencyCard?.title}
                              </h4>
                              <div
                                className="--font-poppins text-center text-small mb-5 text-[#7b99c7] leading-6 elevate-card-ellipse mobileMax:text-xsmall mobileMax:leading-normal font-normal"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    eneryEfficiencyCard?.field_content
                                      .processed,
                                }}
                              />
                              <Link
                                href={eneryEfficiencyCard?.field_link || "#"}
                                target="_blank"
                                className="--font-poppins text-small text-defaultLink leading-6 flex items-center justify-center cursor-pointer  mobileMax:text-xsmall"
                              >
                                {eneryEfficiencyCard?.field_button_text}
                                <MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Energy efficiency banner */}
          <div className="py-[100px] bg-graybg mobileMax:pt-12 pb-16 betweenMobileTab:py-10 overflow-hidden">
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
                {field_energy_related_title}
              </motion.h3>
              <div className="flex flex-wrap justify-center box-border !overflow-hidden">
                {field_energy_related_cards?.map(
                  (relatedCard: DrupalNode, index: number) => {
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
                            <Image
                              src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
                                relatedCard?.field_image_icon?.uri?.url || ""
                              }`}
                              alt="category img"
                              height={34}
                              width={34}
                              className="h-full w-full"
                            />
                          </div>
                          <div className="h-full w-full">
                            <h4 className="--font-poppins text-center text-medium mb-4 text-landingBlue leading-8 capitalize">
                              {relatedCard?.title}
                            </h4>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: relatedCard?.field_content?.processed,
                              }}
                              className="--font-poppins text-center text-xsmall text-[#788ba9] leading-6"
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </div>
              <div className="h-[100px] mobileMax:h-[50px] betweenMobileTab:h-[60px]" />
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation rounded-xl h-full w-full blueBg-gradient px-5 py-[48px] mobileMax:py-10 flex items-center justify-center flex-col box-border laptop:min-w-[340px]"
              >
                <div className="flex items-center flex-col box-border desktop:w-[52%] w-[70%] mobileMax:w-full">
                  <div className="mb-8 h-[34px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
                        field_elevate_efficiency_banner?.field_image_icon?.uri
                          ?.url || ""
                      }`}
                      alt="category img"
                      className="h-full w-full"
                      height={34}
                      width={34}
                    />
                  </div>
                  <div className="h-full w-full">
                    <h4 className="text-numans text-center text-[40px] mb-8 text-white tracking-tight leading-8 capitalize mobileMax:text-[28px] mobileMax:mb-6 mobileMax:leading-6">
                      {field_elevate_efficiency_banner?.title}
                    </h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          field_elevate_efficiency_banner?.field_content
                            ?.processed,
                      }}
                      className="--font-poppins text-center text-small text-[#C9DEFF] mb-4 leading-[26px] mobileMax:text-xsmall mobilemax:leading-normal"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          {/*multiple benefit section */}
          <div
            id="multiple-benefit"
            className="pt-20 pb-20 relative bg-white mobileMax:pt-10 mobileMax:pb-5"
          >
            <div className="mini-container">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation category-gradient text-clip text-xlarge mb-[40px] mt-0 leading-tight text-center text-numans mobileMax:text-[28px] mobileMax:mb-5 betweenMobileTab:text-[42px]"
              >
                {field_elevate_benefits_title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation --font-poppins text-medium text-center text-cardText leading-7 mb-20 mobileMax:text-xsmall mobileMax:leading-normal mobileMax:mb-10"
              >
                {field_elevate_benefits_subtitle}
              </motion.p>
              <div className="flex items-center flex-wrap">
                {field_elevate_benefits_cards?.map(
                  (benefitsCard: DrupalNode, index: number) => {
                    return (
                      <motion.div
                        key={index}
                        className="remove-animation-fluctuation px-[15px] mb-[30px] w-[25%] betweenMobileTab:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0,
                        }}
                      >
                        <FlipFlopCard data={benefitsCard} />
                      </motion.div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
          {/* opportunity cards */}
          <div className=" py-[60px] bg-mapGray mobileMax:py-10">
            <div className="mini-container">
              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation px-5 mobileMax:px-0 desktop:text-[66px] desktop:leading-[85px] text-numans text-center category-gradient text-clip text-[48px] leading-[60px] mb-5 mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-5"
              >
                {field_opportunity_section_title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation text-lightBlueText mb-20 text-[22px] text-center mobileMax:text-small mobileMax:mb-8"
              >
                {field_opportunity_section_subtit}
              </motion.p>
              <div className="flex flex-wrap justify-center box-border">
                {opportunityCards &&
                  opportunityCards?.map(
                    (opportunityCard: DrupalNode, index: number) => {
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0,
                          }}
                          key={index}
                          className="remove-animation-fluctuation px-[15px] mb-[30px] w-[33%] laptop:min-h-[255px] mobileMax:w-full mobileMax:px-0 home-category-card"
                        >
                          <CategoryCard
                            img={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${opportunityCard?.field_image_icon?.uri?.url}`}
                            title={opportunityCard.title}
                            subTitle={opportunityCard.field_content.value}
                          />
                        </motion.div>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
          {/* Energy efficiency life */}
          <div
            id="energy-efficiency-life"
            className="!overflow-hidden pt-5 relative bg-graybg top-gray-ellipsed-img mobileMax:pt-0 betweenMobileTab:pt-12"
          >
            {/* <motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{
							type: 'spring',
							duration: 3.5,
							delay: 0.5,
						}}
						className="absolute top-[300px] max-w-[25%] left-0 z-[1] betweenMobileTab:max-w-[40%] lieTablets:top-[600px] aboveLaptop:top-[480px] mobileMax:top-[7%] mobileMax:max-w-[45%]"
					>
						<img
							src="/static/images/cta-blue-bg.svg"
							alt="left-bg"
							className="opacity-25"
						/>
					</motion.div> */}
            <img
              src="/static/images/gray-curve.png"
              alt="curve"
              className="absolute z-[3] w-full top-[-14px] h-[18px]"
            />
            <div className="mini-container z-[2] relative">
              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation pt-[82px] desktop:text-[56px] text-numans mb-[30px] leading-normal text-center category-gradient text-clip text-[48px] mobileMax:text-[28px] mobileMax:px-0 mobileMax:mb-5"
              >
                {field_energy_efficient_title}
              </motion.h3>
              <div className="flex items-center mobileToDesk:flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="remove-animation-fluctuation w-[50%] mr-10 mobileToDesk:w-full mobileToDesk:mr-0 mobileToDesk:mt-6 mobileToDesk:order-2"
                >
                  <motion.div
                    // initial={{ opacity: 0, y: 40 }}
                    // whileInView={{ opacity: 1, y: 0 }}
                    // viewport={{ once: true }}
                    // transition={{
                    //   type: "spring",
                    //   duration: 2.5,
                    // }}
                    className="mobileMax:mb-5 text-left text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
                    dangerouslySetInnerHTML={{
                      __html: field_energy_efficient_content.value,
                    }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="remove-animation-fluctuation w-[50%] overflow-hidden h-full rounded-[50px] mobileToDesk:rounded-[30px] mobileToDesk:w-full mobileToDesk:order-1"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
                      field_energy_efficient_image?.uri?.url || ""
                    }`}
                    alt="grid-img"
                    height={350}
                    unoptimized={true}
                    width={350}
                    objectFit="cover"
                    className="w-full h-full max-w-full mobileToDesk:max-h-[500px] mobileMax:max-h-[300px] card-shadow object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="mt-12 mobileMax:mt-8 remove-animation-fluctuation "
              >
                <motion.div
                  // initial={{ opacity: 0, y: 40 }}
                  // whileInView={{ opacity: 1, y: 0 }}
                  // viewport={{ once: true }}
                  // transition={{
                  //   type: "spring",
                  //   duration: 2.5,
                  // }}
                  className="flex items-center justify-between rounded-[30px] gradient-border-bg overflow-hidden"
                >
                  {/*object images cards */}
                  <motion.div
                    // initial={{ opacity: 0, y: 40 }}
                    // whileInView={{ opacity: 1, y: 0 }}
                    // viewport={{ once: true }}
                    // transition={{
                    //   type: "spring",
                    //   duration: 2.5,
                    // }}
                    className="w-full py-3 px-5 flex flex-col justify-start"
                  >
                    <motion.h5 className="h-full mb-5 text-clip support-gradient tracking-tight text-[35px] leading-normal text-center text-numans mobileMax:text-[28px]">
                      {field_enery_objective_title}
                    </motion.h5>
                    <motion.div
                      className="elevate-list-view text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
                      dangerouslySetInnerHTML={{
                        __html: field_energy_objective_content.value,
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="mt-12 mobileMax:mt-8 remove-animation-fluctuation "
              >
                <motion.h5
                  //   initial={{ opacity: 0, y: 40 }}
                  //   whileInView={{ opacity: 1, y: 0 }}
                  //   viewport={{ once: true }}
                  //   transition={{
                  //     type: "spring",
                  //     duration: 2.5,
                  //   }}
                  className="text-clip support-gradient tracking-tight text-[35px] leading-normal mb-8 text-center text-numans mobileMax:text-[28px] mobileMax:mb-5"
                >
                  {field_energy_activity_title}
                </motion.h5>
                {/* activity cards */}

                <div className="flex flex-wrap justify-start box-border mb-14 mobileMax:mb-8">
                  {field_energy_activity_cards?.map(
                    (activityCard: DrupalNode, index: number) => {
                      return (
                        <motion.div
                          key={index}
                          className="remove-animation-fluctuation px-[15px] mb-[25px] w-[33%] mobileMax:w-full mt-2 mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5 mobileMax:mt-0"
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0,
                          }}
                        >
                          <div className="border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white p-5 h-full flex items-center flex-col box-border w-full card-shadow">
                            <h4 className="text-numans text-center text-[22px] mb-3 text-landingBlue leading-7 mobileMax:text-medium mobileMax:leading-7">
                              {activityCard?.title}
                            </h4>
                            <div
                              className="--font-poppins text-center text-small text-[#7b99c7] leading-6 mobileMax:text-xsmall mobileMax:leading-normal font-normal"
                              dangerouslySetInnerHTML={{
                                __html: activityCard?.field_content.processed,
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    }
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  id="joining-card"
                  className="remove-animation-fluctuation text-center mb-8 mobileMax:mb-5 text-cardText text-medium leading-normal --font-poppins mobileMax:text-small font-medium joining-card"
                  dangerouslySetInnerHTML={{
                    __html: field_ready_to_join_content.value,
                  }}
                />
                {/* ready to joining cards */}
                <div className="flex flex-wrap justify-start box-border mt-12 mb-6 mobileMax:mt-6">
                  {/* ready cards */}
                  <div className="flex items-center justify-between mb-14 mobileMax:mb-8 mobileToDesk:flex-col">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                      className="remove-animation-fluctuation w-[50%] mobileToDesk:w-full mobileToDesk:order-2 mobileToDesk:mr-0 mobileToDesk:mt-6 mr-12 elevate-list-view text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
                      dangerouslySetInnerHTML={{
                        __html: field_ready_to_move_section.value,
                      }}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                      className="remove-animation-fluctuation w-[50%] mobileToDesk:w-full mobileToDesk:order-1"
                    >
                      <div className="h-full w-full rounded-[40px] mobileToDesk:rounded-[30px] mobileToDesk:order-1 overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
                            field_ready_to_move_main_image?.uri?.url || ""
                          }`}
                          alt="grid-img"
                          height={350}
                          width={350}
                          unoptimized={true}
                          objectFit="cover"
                          className="w-full h-full max-w-full max-h-[600px] mobileToDesk:max-h-full card-shadow rounded-[12px] object-cover transform transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
                {/* Joining Form */}
              </motion.div>
            </div>
            {/* joining banner */}
            {field_campaign_life_banner?.map(
              (bannerCard: DrupalNode, index: number) => {
                return (
                  <>
                    <div
                      key={index}
                      className="py-14 elevate-joining-banner relative"
                      id="join-energy-campaign"
                      style={{
                        backgroundImage: `url(${
                          process.env.NEXT_PUBLIC_DRUPAL_BASE_URL +
                          bannerCard?.field_image_icon?.uri?.url
                        })`,
                      }}
                    >
                      <div className="absolute top-0 left-0 bg-blackHighOpacity h-full w-full" />
                      <div className="mini-container relative z-[2]">
                        <motion.h3
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0,
                          }}
                          className="remove-animation-fluctuation font-bold desktop:text-[55px] text-numans tab:min-h-[300px] mobileMax:min-h-[200px] desktop:leading-[85px] text-white text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-10 text-center"
                        >
                          {bannerCard?.title}
                        </motion.h3>
                        <Dialog
                          open={isOpenJoinForm}
                          onOpenChange={(value) => setIsOpenJoinForm(value)}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0,
                            }}
                            className="remove-animation-fluctuation"
                          >
                            <DialogTrigger className="block mx-auto min-w-[220px] get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg focus:!outline-none">
                              {bannerCard?.field_button_text}
                            </DialogTrigger>
                          </motion.div>
                          <DialogContent
                            hideOverlay={true}
                            className="z-[99999] success-pledge-modal aboveLaptop:w-[75%] laptopMax:w-[95%] desktop:w-[70%] desktopMd:w-1/2 desktopLg:w-2/5 px-3 py-5"
                          >
                            <DialogHeader>
                              <DialogTitle className="commonGradientColor text-[32px] font-normal font-numans mobileMax:text-odd mt-3">
                                {bannerCard?.title}
                              </DialogTitle>
                              <ScrollArea className="max-h-[65vh] desktopMd:max-h-[70vh] m-0 px-3">
                                <DialogDescription>
                                  <ElevateJoiningForm
                                    formFields={field_ready_to_join_form}
                                    afterFormSubmission={() => {
                                      setOpenSuccessModal(true);
                                      setIsOpenJoinForm(false);
                                    }}
                                  />
                                </DialogDescription>
                              </ScrollArea>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </>
                );
              }
            )}
          </div>
          {/* MAP */}
          <div className="bg-white pt-16">
            <motion.h5
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation text-[40px] font-medium text-numans mb-8 mobileMax:mb-5 leading-normal text-center history-title-gradient text-clip mobileMax:text-[28px]"
            >
              {field_map_title}
            </motion.h5>

            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 100,
              }}
              style={{
                width: "100%",
                height: isTablet ? "60vh" : "100vh",
                pointerEvents: "none",
              }}
            >
              <Geographies geography={geos}>
                {({ geographies }) =>
                  geographies.map((geo: any) => (
                    <Geography
                      key={`${geo.rsmKey}`}
                      data-tooltip-id="joinee-tooltip"
                      data-tooltip-float
                      geography={geo}
                      onMouseEnter={() => handleMouseEnterCountry(geo)}
                      onMouseOver={() => handleMouseEnterCountry(geo)}
                      style={{
                        default: {
                          fill: "#C2D1EE",
                          outline: "none",
                          stroke: "white",
                          strokeWidth: 0.1,
                          opacity: 1,
                          pointerEvents: "auto",
                        },
                        hover: {
                          fill: "blue",
                          outline: "none",
                          stroke: "white",
                          strokeWidth: 1,
                          opacity: 0.7,
                          cursor: "pointer",
                          pointerEvents: "auto",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ComposableMap>
            {showTooltip && (
              <ReactTooltip
                id="joinee-tooltip"
                className="joinee-tooltip"
                {...({} as any)}
                place={"top"}
                render={() => {
                  return (
                    <>
                      <div className="z-[4] mobileMax:w-full mobileMax:max-w-full text-ellipsis overflow-hidden whitespace-nowrap">
                        <h6 className="text-odd text-center text-ellipsis overflow-hidden whitespace-nowrap pl-2 pt-2 mobileMax:text-small font-bold font-numans max-w-full text-ellipsis overflow-hidden whitespace-nowrap">
                          {hoveredCountryData.name}
                        </h6>
                        <p className="text-center text-small m-0 mobileMax:text-xsmall mobileMax:leading-normal font-poppins betweenMobileTab:text-small">
                          {formatSubmissions(hoveredCountryData.records)}{" "}
                          Pledges
                        </p>
                      </div>
                    </>
                  );
                }}
              />
            )}
          </div>
          <div className="relative bg-mapGray overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 2.5,
              }}
              className="absolute right-0 pointer-events-none max-w-[50%] top-[50%] -translate-y-1/2 mobileMax:max-w-[40%] z-[1]"
            >
              <img
                src="/static/images/cta-section-bg.svg"
                alt="overlay-bg"
                className="mobileMax:opacity-30 opacity-50 rotate-180"
              />
            </motion.div>
            <div className="mini-container relative z-[2]">
              {/* Campaign material */}
              <div className="my-16 mobileMax:my-8">
                <motion.h3
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="remove-animation-fluctuation text-[48px] text-numans mb-8 mobileMax:mb-5 leading-normal text-center history-title-gradient text-clip mobileMax:text-[28px]"
                >
                  {field_campaign_materials_title}
                </motion.h3>
                <div className="flex flex-wrap justify-start box-border mt-8 mobileMax:mt-6">
                  {field_elevate_campaign_materials.map(
                    (materialCard: DrupalNode, index: number) => {
                      return (
                        <motion.div
                          key={index}
                          className="remove-animation-fluctuation px-[15px] mb-[25px] w-[33%] mobileMax:w-full mt-2 mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5 mobileMax:mt-0"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0,
                          }}
                        >
                          <div className="border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white p-5 h-full flex items-center flex-col box-border w-full card-shadow">
                            <div className="h-[80%]">
                              <div className="mb-5 mx-auto h-[50px] w-[50px] rounded-[12px] overflow-hidden">
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/sites/default/files/2023-12/suff-icon.png`}
                                  alt="category img"
                                  height={50}
                                  width={50}
                                  className="h-full w-full"
                                />
                              </div>
                              <h4 className="text-numans text-center text-[22px] mb-4 text-landingBlue leading-7 mobileMax:text-medium mobileMax:leading-7 font-medium">
                                {materialCard?.title}
                              </h4>
                            </div>
                            {materialCard?.field_link ? (
                              <Link
                                href={materialCard?.field_link || "" || "#"}
                                target="_blank"
                                className="h-[20%] mobileMax:w-full flex items-center mt-5 rounded-[23px] justify-center text-small text-white blue-gradient get-involve-btn font-mediums --font-poppins !px-8 min-h-[35px]"
                              >
                                {materialCard?.field_button_text}
                              </Link>
                            ) : (
                              <div className="h-[20%] mobileMax:w-full flex items-center mt-5 rounded-[23px] justify-center text-small text-white blue-gradient get-involve-btn font-mediums --font-poppins !px-8 min-h-[35px]">
                                {materialCard?.field_button_text}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    }
                  )}
                </div>
              </div>
              {/* campaign resources */}
              <div className="mb-16 mobileMax:mb-0">
                <motion.h3
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="remove-animation-fluctuation text-[48px] text-numans mb-10 mobileMax:mb-5 leading-normal text-center history-title-gradient text-clip mobileMax:text-[28px]"
                >
                  {field_campaign_resources_title}
                </motion.h3>
                <div className="flex items-start flex-wrap mt-8 lieExactTab:mt-10 lieExactTab:flex-col">
                  {field_elevate_campaign_resources?.map(
                    (resourceCard: DrupalNode, index: number) => {
                      const isEven = index % 2 !== 0;

                      return (
                        <div
                          key={index}
                          className="flex items-start justify-between mb-24 last:mb-0 lieExactTab:mb-6 lieExactTab:flex-col"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0,
                            }}
                            className={`remove-animation-fluctuation ${
                              isEven && "order-2"
                            } w-full laptop:flex-1 h-full lieExactTab:order-1 rounded-[12px] overflow-hidden laptop:max-h-[700px] max-h-[900px]`}
                          >
                            <Image
                              src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${resourceCard?.field_image_icon?.uri?.url}`}
                              alt="campaign resources"
                              height={400}
                              width={400}
                              objectFit="cover"
                              className=" h-full w-full card-shadow transform transition-transform duration-500 hover:scale-105"
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 45 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0,
                            }}
                            className={`remove-animation-fluctuation ${
                              isEven
                                ? "order-1 mr-16 lieExactTab:mr-0 lieExactTab:mt-8"
                                : "ml-16 lieExactTab:ml-0 lieExactTab:mt-8 "
                            } laptop:flex-1 h-full lieExactTab:order-1 lieExactTab:pb-12`}
                          >
                            <h5 className="text-numans text-[#545d6f] text-[35px] mb-[30px] lieTablets:mb-5 lieTablets:text-[25px] leading-normal mobileMax:text-medium mobileMax:mb-3 uppercase">
                              {resourceCard?.title}
                            </h5>
                            <div
                              className="--font-poppins text-left text-cardText text-medium
										                         leading-normal --font-poppins mobileMax:text-small mb-8 mobileMax:mb-5 elevate-link"
                              dangerouslySetInnerHTML={{
                                __html: resourceCard.field_content.value,
                              }}
                            />
                            <Link
                              href={resourceCard?.field_link || "#"}
                              target={`_blank`}
                              // target={`${index === 0 ? "_blank" : "_self"}`}
                              className="h-[46px] rounded-md bg-buttonOverlay px-[30px] flex max-w-[160px] items-center justify-center mt-10 text-[#0077e4] font-mediums --font-poppins text-xsmall hover:bg-blueHover"
                            >
                              {resourceCard?.field_button_text}
                            </Link>
                          </motion.div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* The power of energy efficiency */}
          <div
            id="power-energy-efficiency"
            className="pb-14 relative bg-white top-gray-ellipsed-img !overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.5,
              }}
              className="absolute pointer-events-none z-[1] right-0 max-w-[50%] !top-[15%] mobileMax:max-w-[40%]"
            >
              <img
                src="/static/images/cta-section-bg.svg"
                alt="overlay-bg"
                className="opacity-40 lieExactTab:opacity-30 rotate-180"
              />
            </motion.div>

            <img
              src="/static/images/gray-curve.png"
              alt="curve"
              className="absolute z-[3] w-full top-[-14px] h-[18px]"
            />
            <div className="mini-container relative z-[2]">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation pt-[90px] desktop:text-[56px] text-numans mb-[30px] leading-normal text-center category-gradient text-clip text-[48px] mobileMax:text-[28px] mobileMax:px-0 mobileMax:mb-5"
              >
                {field_power_energy_title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation  --font-poppins text-center text-cardText text-medium leading-6 mobileMax:text-small mobileMax:leading-normal font-semibold mb-12 mobileMax:mb-8"
              >
                {field_power_energy_subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation flex items-center justify-between overflow-hidden mobileToDesk:flex-col"
              >
                <div className="w-[50%] mobileToDesk:w-full mobileToDesk:mb-6">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
                      field_power_energy_image?.uri?.url || ""
                    }`}
                    alt="grid-img"
                    height={350}
                    width={350}
                    objectFit="cover"
                    className="w-full h-full max-w-full object-cover max-h-[410px] rounded-[40px] overflow-hidden"
                  />
                </div>
                <motion.div
                  className="w-[50%] mobileToDesk:w-full mobileToDesk:ml-0 ml-12 mission-Pledge-Card elevate-power-list text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
                  dangerouslySetInnerHTML={{
                    __html: field_power_energy_content.value,
                  }}
                />
              </motion.div>
              <div className="mt-12 mobileMax:mt-8">
                <div className="flex-col desktop:flex-row desktop:flex items-start w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0,
                    }}
                    className="remove-animation-fluctuation desktop:w-[49%] desktop:min-h-[270px] w-full desktop:mr-5 mb-5 desktop:mb-0 flex items-center justify-between rounded-[30px] gradient-border-bg overflow-hidden"
                  >
                    <motion.div className="w-full py-3 px-5 flex flex-col justify-start">
                      <motion.h5 className="h-full mb-5 text-clip support-gradient tracking-tight text-[35px] leading-normal text-center text-numans mobileMax:text-[28px]">
                        {field_enery_objective_title}
                      </motion.h5>
                      <motion.div
                        className="elevate-list-view text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
                        dangerouslySetInnerHTML={{
                          __html: field_power_objective_content.value,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0,
                    }}
                    className="remove-animation-fluctuation desktop:w-[49%] desktop:min-h-[270px] w-full flex items-center justify-between rounded-[30px] gradient-border-bg overflow-hidden"
                  >
                    <motion.div className="w-full py-3 px-5 flex flex-col justify-start">
                      <motion.h5 className="h-full mb-5 text-clip support-gradient tracking-tight text-[35px] leading-normal text-center text-numans mobileMax:text-[28px]">
                        {field_energy_activity_title}
                      </motion.h5>
                      <motion.div
                        className="elevate-list-view text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
                        dangerouslySetInnerHTML={{
                          __html: field_power_activity_content.value,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          {/* Global Ambition Taskforce */}
          {/* <div
					id="global-ambition-taskforce"
					className="pt-5 py-20 relative bg-mapGray top-gray-ellipsed-img mobileMax:pt-0 pb-10 betweenMobileTab:py-12"
				>
					<img
						src="/static/images/gray-curve.png"
						alt="curve"
						className="absolute z-[3] w-full top-[-14px] h-[18px]"
					/>
					<div className="mini-container">
						<motion.h3
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								type: 'spring',
								duration: 2.5,
							}}
							className="pt-[82px] desktop:text-[56px] text-numans mb-[30px] leading-normal text-center category-gradient text-clip text-[48px] mobileMax:text-[28px] mobileMax:px-0 mobileMax:mb-5"
						>
							{field_global_taskforce_title}
						</motion.h3>
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								type: 'spring',
								duration: 2.5,
							}}
							className="mission-Pledge-Card elevate-power-list text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
							dangerouslySetInnerHTML={{
								__html: field_global_taskforce_content.value,
							}}
						/>
					</div>
				</div> */}
          {/* bottom raining cards AND training cards  */}
          {/* <div className="pt-[100px] pb-[90px] bg-white relative mobileMax:py-10 betweenMobileTab:py-12 overflow-hidden">
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{
							type: 'spring',
							duration: 3.5,
							delay: 0.1,
						}}
						className="absolute pointer-events-none top-[-55%] right-0 mobileMax:top-[-25%] betweenMobileTab:max-w-[67%] aboveLaptop:top-[-74%] lieTablets:top-[-36%] desktop:max-w-[46%]"
					>
						<img
							src="/static/images/training-bg.svg"
							alt="overlay-bg"
							className="w-full -h-full"
						/>
					</motion.div>
					<div className="mini-container relative z-[1] flex items-center justify-between mobileMax:flex-col">
						<div className="w-[50%] mobileMax:w-full mobileMax:order-2 mobileMax:mt-5">
							<motion.h4
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									type: 'spring',
									duration: 2.5,
								}}
								className="desktop:text-[55px] text-numans mb-6 tracking-tight leading-normal text-left multi-text text-clip text-[48px] mobileMax:text-[28px] mobileMax:mb-3"
							>
								{field_elevate_training_section?.title}
							</motion.h4>
							<motion.div
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									type: 'spring',
									duration: 2.5,
								}}
								dangerouslySetInnerHTML={{
									__html:
										field_elevate_training_section?.field_content?.processed,
								}}
								className="--font-poppins text-left text-medium text-cardText mb-4 leading-8 mobileMax:text-xsmall mobileMax:leading-normal"
							/>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									type: 'spring',
									duration: 2.5,
								}}
							>
								<Link
									href={'/trainings'}
									className="h-[46px] rounded-md bg-buttonOverlay px-[30px] flex max-w-[160px] items-center justify-center mt-10 text-[#0077e4] font-mediums --font-poppins text-xsmall hover:bg-blueHover"
								>
									{field_elevate_training_section?.field_button_text}
								</Link>
							</motion.div>
						</div>
						<div className="w-[50%] mobileMax:w-full mobileMax:order-1">
							<motion.div
								className="max-h-[480px] rounded-[25px] overflow-hidden no-bottom-space"
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									type: 'spring',
									duration: 1.8,
								}}
							>
								<img
									src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
										field_elevate_training_section?.field_image_icon?.uri
											?.url || ''
									}`}
									alt="boardImg"
									className="h-full w-full object-cover transform transition-transform duration-500 hover:scale-105"
								/>
							</motion.div>
						</div>
					</div>
				</div> */}
        </div>
        <CommonBottomFooter data={field_elevate_bottom_footer} />
        <LandingFooter data={footerData} />
        {/* <Toaster /> */}

        <PledgeSuccessModal
          open={openSuccessModal}
          elevatePage={true}
          setOpen={(value) => setOpenSuccessModal(value)}
        />
      </CaptchaProvider>
    </>
  );
};

export default ElevateScreen;
