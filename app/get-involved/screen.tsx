"use client";
import CustomRadioButton from "@/components/LandingWebsiteComponents/CustomRadioButton";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import InvolvedContactForm from "@/components/LandingWebsiteComponents/InvolvedContactForm";
import { HiOutlineDownload } from "react-icons/hi";
import { DrupalNode } from "next-drupal";
import { saveGetInvolvedData } from "@/services/api";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import { motion } from "framer-motion";
import { FaAngleDown, FaAngleUp, FaMinus, FaPlus } from "react-icons/fa6";
import FinaceSupportCard from "@/components/LandingWebsiteComponents/FinanceSupportsCard";
import { Button } from "@/components/ui/button";
import TaskforceCardSlider from "@/components/LandingWebsiteComponents/TaskforceSlider";
import MemberCountrySlider from "@/components/LandingWebsiteComponents/MemberCountrySlider";
import PartnerCardSlider from "@/components/LandingWebsiteComponents/PartnerCardSlider";
import { MdChevronRight } from "react-icons/md";

type GetInvolvedScreenProps = {
  data: DrupalNode;
  joinMissionData: DrupalNode;
  countryCards: DrupalNode[];
  headerData: DrupalNode;
  footerData: DrupalNode;
};

const GetInvolvedScreen: React.FC<GetInvolvedScreenProps> = ({
  data,
  joinMissionData,
  countryCards,
  headerData,
  footerData,
}) => {
  const {
    title = "",
    field_involved_top_content = {},
    field_form_heading_text = {},
    field_get_involved_form = [],
    field_get_involved_right_section = {},
    field_download_government_link,
    field_download_organization_link,
    field__gi_send_email_to,
    field_gi_email_subject,
    field_gi_send_email_from,
    field_join_mission_eff_title = "",
    field_role_eff_title = "",
    field_join_mission_eff_content = "",
    field_taskforce_title = "",
    field_taskforce_sub_title = "",
    field_roles_mission_efficiency = [],
    field_get_involved_options = [],
    field_task = [],
    field_get_involve_energy = [],
    field_me_partners_cards=[],
    field_me_partners_title="",
    field_me_partners_subtitle= "",
    field_me_member_section_title="",
    field_me_member_subtitle="",
    field_me_member_cards=[],
  } = data;

  const itemVariant = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    hidden: { opacity: 0, y: 50 },
  };

  const listVariant = {
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut", staggerChildren: 0.1 },
    },
    hidden: { opacity: 0 },
  };

  const [formData, setFormData] = useState<any>({});

  const [isOpenJoinCardList, setIsOpenJoinCardList] = useState<number | null>(
    null
  );

  const buildformList = () => {
    const filteredRadioList = field_get_involved_form.filter(
      (listItem: DrupalNode) => listItem.field_form_field_type == "radio"
    );
    const filteredTextAreaList = field_get_involved_form.filter(
      (listItem: DrupalNode) => listItem.field_form_field_type == "textarea"
    );
    const filteredTextInputList = field_get_involved_form.filter(
      (listItem: DrupalNode) => listItem.field_form_field_type == "text"
    );
    const filteredSelectInputList = field_get_involved_form.filter(
      (listItem: DrupalNode) => listItem.field_form_field_type == "select"
    );
    return {
      filteredRadioList,
      filteredTextAreaList,
      filteredTextInputList,
      filteredSelectInputList,
    };
  };

  const {
    filteredRadioList,
    filteredTextAreaList,
    filteredTextInputList,
    filteredSelectInputList,
  } = buildformList();

  const handleFormSubmit = () => {
    saveGetInvolvedData({
      ...formData,
      mailTo: field__gi_send_email_to,
      mailFrom: field_gi_send_email_from,
      mailSubject: field_gi_email_subject,
    }).then(() => {
      setFormData({});
      (window || ({} as any))?.location?.reload();
    });
  };
  return (
    <>
      <Header data={headerData} />
      <div className="pt-20">
        <CommonBanner
          leftImg={"/static/images/left-home-hero.svg"}
          rightImg={"/static/images/elevate-right-img.svg"}
          title={"Get Involved"}
          subTitle={""}
          noHeight={true}
          lightBgClip={true}
        />
        <div className="pb-[350px] bg-mapGray mobileMax:py-8">
          <div className="py-12">
            <div className="mini-container">
              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation desktop:text-[55px] text-numans mb-5 desktop:leading-[85px] category-gradient text-clip text-[48px] leading-normal mobileMax:text-[35px] mobileMax:mb-3 text-center"
              >
                {field_join_mission_eff_title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation --font-poppins text-medium leading-8 text-[#545D6F] mobileMax:w-full mobileMax:text-small mobileMax:mb-6 mobileMax:leading-normal text-center"
              >
                {field_join_mission_eff_content}
              </motion.p>
            </div>
          </div>
          <div className="relative pt-16">
            <div className=" overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 2.5,
                }}
                className="overflow-hidden absolute max-w-[20%] left-0 z-[1] top-[20px] lieTablets:max-w-[35%] aboveLaptop:max-w-[27%] mobileMax:max-w-[45%] overflow-hidden mobileToDesk:top-[140px]"
              >
                <img
                  src="/static/images/cta-blue-bg.svg"
                  alt="left-bg"
                  className="opacity-40"
                />
              </motion.div>
            </div>
            <div className="mini-container relative z-[2]">
              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation desktop:text-[55px] text-numans mb-5 desktop:leading-[85px] text-center category-gradient text-clip text-[48px] leading-normal mobileMax:text-[35px] mobileMax:mb-3"
              >
                {field_role_eff_title}
              </motion.h3>
              <div className="flex flex-wrap justify-start box-border mt-12 mobileMax:mt-6">
                {field_roles_mission_efficiency?.map(
                  (joinCard: DrupalNode, index: number) => {
                    return (
                      <motion.div
                        key={index}
                        className="remove-animation-fluctuation  px-[6px] mb-[10px] w-[25%] mobileMax:mb-3 mobileMax:w-full mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0,
                        }}
                      >
                        <div className="border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white h-full flex items-center flex-col box-border w-full card-shadow py-5 px-4">
                          <div className="h-full w-full">
                            <h4 className="text-numans text-center text-[22px] mb-3 text-landingBlue leading-7 mobileMax:text-medium mobileMax:leading-7">
                              {joinCard?.title}
                            </h4>
                            <div
                              className="--font-poppins text-center text-small text-[#7b99c7] leading-6 mobileMax:text-xsmall mobileMax:leading-normal font-normal"
                              dangerouslySetInnerHTML={{
                                __html: joinCard?.field_content.value,
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </div>
              <div className="flex flex-wrap justify-start box-border mt-12 mobileMax:mt-6">
                {field_get_involved_options?.map(
                  (dropdownCard: DrupalNode, index: number) => {
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
                        <div className="relative rounded-xl bg-white flex items-center border-2 border-[#ececec] flex-col box-border w-full card-shadow">
                          <h4 className="w-full flex items-center justify-center h-[100px] px-[15px] text-numans uppercase text-center text-[22px] text-lightBlue leading-normal mobileMax:text-medium font-semibold">
                            {dropdownCard.title}
                          </h4>
                          <div
                            className={`absolute bottom-[-15px] ${
                              isOpenJoinCardList === index ? "z-[99]" : "z-[1]"
                            } left-1/2 -translate-x-1/2`}
                          >
                            <motion.div
                              animate={
                                isOpenJoinCardList === index
                                  ? { x: 0, y: 0 }
                                  : { x: 0, y: [-5, 5, -5] }
                              }
                              viewport={{ once: true }}
                              transition={
                                isOpenJoinCardList === index
                                  ? {}
                                  : {
                                      duration: 2,
                                      ease: "easeInOut",
                                      loop: Infinity,
                                      repeat: Infinity,
                                    }
                              }
                              className="cursor-pointer card-shadow visit-site-btn text-white w-[35px] h-[35px] rounded-full flex items-center justify-center"
                              onClick={() =>
                                setIsOpenJoinCardList(
                                  isOpenJoinCardList === index ? null : index
                                )
                              }
                            >
                              {isOpenJoinCardList === index ? (
                                <FaAngleUp className="text-[30px]" />
                              ) : (
                                <FaAngleDown className="text-[30px]" />
                              )}
                            </motion.div>
                          </div>
                          {isOpenJoinCardList === index && (
                            <motion.div className="list p-5 w-full absolute z-[4] card-shadow left-0 top-[103%] border-2 border-[#ececec] bg-white rounded-xl">
                              <motion.ul
                                initial="hidden"
                                animate="visible"
                                variants={listVariant}
                                className="pl-3 blue-bullets"
                              >
                                <motion.li variants={itemVariant}>
                                  <p
                                    className="cursor-pointer underline text-left select-none block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        dropdownCard?.field_content?.value,
                                    }}
                                  />
                                </motion.li>
                              </motion.ul>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="taskforces" className="pb-10 bg-graybg mobileMax:py-8">
          <div className="pt-5">
            <div className="mini-container">
              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation pt-[82px] desktop:text-[55px] text-numans mb-5 desktop:leading-[85px] category-gradient text-clip text-[48px] leading-normal mobileMax:text-[35px] mobileMax:mb-3 text-center"
              >
                {field_taskforce_title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation  --font-poppins mb-10 text-medium leading-8 text-lightBlueText mobileMax:w-full mobileMax:text-small mobileMax:mb-6 mobileMax:leading-normal text-center"
              >
                {field_taskforce_sub_title}
              </motion.div>
            </div>
            <div className="mini-container">
              <div className="mb-10 pb-10 mobileMax:py-6">
                {/* <TaskforceCardSlider sliderData={taskForceCards} /> */}
                {/* Taskforce accordion */}
                {field_task?.map(
                  (testimonialCard: DrupalNode, index: number) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0,
                        }}
                        key={index}
                        className="remove-animation-fluctuation bg-white p-5 rounded-lg card-shadow relative mb-3"
                      >
                        <div>
                          <motion.h3 className="text-[35px] text-center text-numans mb-5 leading-normal category-gradient text-clip leading-normal mobileMax:text-[28px] mobileMax:mb-3">
                            {testimonialCard.title}
                          </motion.h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                testimonialCard?.field_testi_content.value,
                            }}
                            className="mt-5 --font-poppins text-medium text-cardText mobileMax:text-xsmall leading-normal text-center"
                          />
                        </div>
                        <motion.div className="mt-5">
                          <motion.div className="py-3 px-5 flex flex-col justify-start mobileMax:px-0">
                            <motion.h5 className="h-full mb-5 text-clip support-gradient tracking-tight text-[35px] leading-normal text-center text-numans mobileMax:text-[28px]">
                              {testimonialCard?.field_testi_sub_ttitle}
                            </motion.h5>
                            {testimonialCard?.field_testi_description && (
                              <motion.div
                                className="elevate-list-view text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    testimonialCard.field_testi_description
                                      .processed,
                                }}
                              />
                            )}
                            <div>
                              <div
                                className={`flex flex-row justify-between mobileMax:flex-col ${
                                  testimonialCard?.field_first_link_text &&
                                  "my-10 mobileMax:my-2"
                                }`}
                              >
                                {testimonialCard?.field_first_link_text && (
                                  <Link
                                    href={
                                      testimonialCard?.field_first_link_url ||
                                      "#"
                                    }
                                    className="--font-poppins mobileMax:mt-2 text-medium text-defaultLink leading-6 flex items-center cursor-pointer  mobileMax:text-xsmall"
                                  >
                                    {testimonialCard?.field_first_link_text}
                                    <MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5" />
                                  </Link>
                                )}
                                {testimonialCard?.field_second_link_text && (
                                  <Link
                                    href={
                                      testimonialCard?.field_second_link_url ||
                                      "#"
                                    }
                                    className="--font-poppins mobileMax:mt-5 text-medium text-defaultLink leading-6 flex items-center cursor-pointer  mobileMax:text-xsmall"
                                  >
                                    {testimonialCard?.field_second_link_text}
                                    <MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5" />
                                  </Link>
                                )}
                              </div>
                              {/* quotes */}
                              <div className="w-full flex items-center justify-between mx-auto pt-10 mobileMax:flex-col">
                                {testimonialCard?.field_testimonial_image && (
                                  <div className="max-w-[220px] min-w-[220px] mobileMax:min-w-[150px] mobileMax:max-w-[150px] mr-5 mobileMax:mr-0">
                                    <Image
                                      src={`${
                                        process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
                                      }${
                                        testimonialCard?.field_testimonial_image
                                          ?.uri?.url || "#"
                                      }`}
                                      alt="country flag"
                                      width={100}
                                      unoptimized={true}
                                      height={100}
                                      className="h-full w-full h-full min-h-[200px] min-h-[200px] max-h-[200px] max-w-[200px] max-h-[200px] mobileMax:min-h-[150px] mobileMax:max-h-[150px] mobileMax:min-w-[150px] mobileMax:max-w-[150px] rounded-full overflow-hidden object-cover object-center border-2 border-blueBorder mx-auto"
                                    />
                                  </div>
                                )}
                                {testimonialCard?.field_testimonial_content
                                  ?.value && (
                                  <div className="w-[80%]">
                                    <p
                                      className="--font-poppins font-medium text-xmedium leading-snug italic text-center text-cardText leading-8 my-8 resources-links mobileMax:text-xsmall mobileMax:leading-normal relative quotes-imgBox z-[2] w-[95%] tab:ml-auto"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          testimonialCard
                                            ?.field_testimonial_content?.value,
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                              {testimonialCard?.field_testimonial_name && (
                                <h6 className="text-numans text-right font-semibold text-[22px] uppercase italic history-title-gradient text-clip mobileMax:text-xsmall leading-normal pr-2 m-0">
                                  - {testimonialCard?.field_testimonial_name}
                                </h6>
                              )}
                              {testimonialCard?.field_testimonial_designation && (
                                <p className="text-right pr-2 --font-poppins font-medium text-small text-cardText italic">
                                  (
                                  {
                                    testimonialCard?.field_testimonial_designation
                                  }
                                  )
                                </p>
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    );
                  }
                )}

                {/* <div className="mx-auto">
								<div className="flex flex-wrap justify-center box-border mobileMax:block mt-20">
									{taskForceCards?.map(
										(marketCard: DrupalNode, index: number) => {
											return (
												<motion.div
													key={index}
													className="px-[15px] mb-[30px] w-[50%] min-h-[350px] mobileMax:w-full mobileMax:px-0 mobileMax:min-h-full"
													initial={{ opacity: 0, scale: 0.8 }}
													whileInView={{ opacity: 1, scale: 1 }}
													transition={{
														type: 'spring',
														duration: 2.5,
													}}
												>
													<FinaceSupportCard
														title={marketCard.title}
														showImage={true}
														subTitle={marketCard.field_content.processed}
														imgSrc={`${
															process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
														}${marketCard?.field_image_icon?.uri?.url || ''}`}
														buttonText={marketCard.field_button_text}
														buttonLink={marketCard.field_link}
													/>
												</motion.div>
											);
										},
									)}
								</div>
							</div> */}
              </div>
            </div>
            {/* join section */}
            {field_get_involve_energy?.map(
              (bannerCard: DrupalNode, index: number) => {
                return (
                  <div
                    key={index}
                    id="energy-efficient-life"
                    className="py-[82px] involved-efficient-life-banner relative"
                    style={{
                      backgroundImage: `url(${
                        process.env.NEXT_PUBLIC_DRUPAL_BASE_URL +
                        bannerCard?.field_image_icon?.uri?.url
                      })`,
                    }}
                  >
                    <div className="absolute top-0 left-0 bg-blackDarkOpacity h-full w-full" />
                    <div className="mini-container relative z-[2]">
                      <motion.h3
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0,
                        }}
                        className="remove-animation-fluctuation font-bold desktop:text-[55px] text-numans min-h-[125px] desktop:leading-[85px] text-white text-[48px] leading-normal mobileMax:text-[35px] mobileMax:mb-12 text-center"
                      >
                        {bannerCard?.title}
                      </motion.h3>
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0,
                        }}
                        className="remove-animation-fluctuation --font-poppins mb-12 text-xmedium leading-8 text-white mobileMax:w-full mobileMax:text-xsmall mobileMax:mb-6 mobileMax:leading-normal text-center"
                        dangerouslySetInnerHTML={{
                          __html: bannerCard?.field_content.value,
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0,
                        }}
                        className="flex justify-center remove-animation-fluctuation"
                      >
                        <Link
                          href={bannerCard?.field_link || "#"}
                          className="flex justify-center items-center get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg min-w-[180px]"
                        >
                          {bannerCard?.field_button_text}
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                );
              }
            )}
            {/* partners cards */}
            <div
              id="mission-efficiency-partners"
              className="overflow-hidden pt-[10px] pb-10 bg-mapGray mobileMax:pb-8 relative"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  duration: 2.5,
                }}
                className="absolute bottom-0 max-w-[15%] left-0 z-[1] betweenMobileTab:max-w-[40%] lieTablets:top-[600px] aboveLaptop:top-[480px] mobileMax:top-[7%] mobileMax:max-w-[45%]"
              >
                <img
                  src="/static/images/cta-section-bg.svg"
                  alt="left-bg"
                  className="w-full h-full"
                />
              </motion.div>
              <div className=" relative z-[2]">
                <motion.h3
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="pt-[82px] remove-animation-fluctuation desktop:text-[55px] text-numans mb-5 desktop:leading-[85px] text-center category-gradient text-clip text-[48px] leading-normal mobileMax:text-[35px] mobileMax:mb-3"
                >
                  {field_me_partners_title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="remove-animation-fluctuation text-cardHeading text-lightBlueText mb-[60px] text-[24px] text-center mobileMax:mb-8 mobileMax:text-small leading-normal"
                >
                  {field_me_partners_subtitle}
                </motion.p>
                <motion.div
                //   initial={{ opacity: 0, y: 50 }}
                //   whileInView={{ opacity: 1, y: 0 }}
                //   viewport={{ once: true }}
                //   transition={{
                //     type: "spring",
                //     duration: 2.8,
                //   }}
                  className="mb-10 pb-10 mobileMax:py-6"
                >
                  <PartnerCardSlider
                    sliderData={field_me_partners_cards?.sort((a: any, b: any) =>
                      a.title.localeCompare(b.title)
                    )}
                  />
                </motion.div>
                {/* cards */}
                {/* <div className="flex items-start justify-start mx-auto flex-wrap">
									{partnerCards
										?.sort((a: any, b: any) => a.title.localeCompare(b.title))
										.map((partnerCard: DrupalNode, index: number) => {
											return (
												<motion.div
													key={index}
													className="px-[15px] mb-[30px] w-[16%] mobileMax:w-[50%] betweenMobileTab:w-[25%] mobileMax:mb-5 mobileMax:px-[10px]"
													initial={{ opacity: 0, scale: 0.8 }}
													whileInView={{ opacity: 1, scale: 1 }}
													viewport={{ once: true }}
													transition={{
														type: 'spring',
														duration: 1.8,
													}}
												>
													<Link
														href={partnerCard.field_mission_card_link}
														target="_blank"
														className="block rounded-[25px] flex justify-center items-center bg-white px-[15px] py-[10px] box-border w-full card-shadow"
													>
														<div className="max-w-[160px] w-full h-[110px] max-h-[110px] min-w-[120px] min-h-[100px] overflow-hidden">
															<Image
																src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${partnerCard?.field_mission_card_image?.uri?.url}`}
																alt="sponser img"
																width={160}
																height={100}
																className="w-full h-full max-w-full object-scale-down min-w-[120px] min-h-[100px]"
															/>
														</div>
													</Link>
												</motion.div>
											);
										})}
								</div> */}
              </div>
            </div>
            {/* countries cards */}
            <div
              id="countries"
              className="pt-[60px] pb-10 bg-mapGray mobileMax:py-8"
            >
              <div className="">
                <motion.h3
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="remove-animation-fluctuation desktop:text-[55px] text-numans mb-5 desktop:leading-[85px] text-center category-gradient text-clip text-[48px] leading-normal mobileMax:text-[35px] mobileMax:mb-3"
                >
                  {field_me_member_section_title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="remove-animation-fluctuation text-cardHeading text-lightBlueText mb-[60px] text-[24px] text-center mobileMax:mb-8 mobileMax:text-small leading-normal"
                >
                  {field_me_member_subtitle}
                </motion.p>
                <motion.div
                //   initial={{ opacity: 0, y: 50 }}
                //   whileInView={{ opacity: 1, y: 0 }}
                //   viewport={{ once: true }}
                //   transition={{
                //     type: "spring",
                //     duration: 2.8,
                //   }}
                  className="mb-10 pb-10 mobileMax:py-6"
                >
                  <MemberCountrySlider
                    sliderData={countryCards?.sort((a: any, b: any) =>
                      a.title.localeCompare(b.title)
                    )}
                  />
                </motion.div>
                {/* cards */}
                {/* <div className="flex items-start justify-start mx-auto flex-wrap">
									{countryCards
										?.sort((a: any, b: any) => a.title.localeCompare(b.title))
										.map((memberCard: DrupalNode, index: number) => {
											return (
												<motion.div
													key={index}
													className="px-[15px] mb-[30px] w-[16%] mobileMax:w-[50%] betweenMobileTab:w-[25%] mobileMax:mb-5 laptopMax:px-[10px]"
													initial={{ opacity: 0, scale: 0.8 }}
													whileInView={{ opacity: 1, scale: 1 }}
													viewport={{ once: true }}
													transition={{
														type: 'spring',
														duration: 1.8,
													}}
												>
													<div className="block rounded-[25px] flex flex-col justify-center items-center bg-white px-[15px] py-[20px] box-border w-full card-shadow">
														<div
															className={`max-w-[120px] h-[100px] max-h-[100px] mb-4 overflow-hidden ${
																memberCard?.title === 'Denmark' &&
																'max-w-[95px]'
															}`}
														>
															<Image
																src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${memberCard?.field_mission_card_image?.uri?.url}`}
																alt="sponser img"
																width={120}
																height={100}
																className="w-full h-full object-contain"
															/>
														</div>
														<p className="text-cardHeading text-medium m-0 text-center line-climp-1 mobileMax:text-small">
															{memberCard?.title}
														</p>
													</div>
												</motion.div>
											);
										})}
								</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute mt-[-60px] z-[2] w-full">
        <LandingFooter data={footerData} />
      </div>
    </>
  );
};

export default GetInvolvedScreen;
