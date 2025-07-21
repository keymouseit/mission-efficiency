"use client";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";

import HistoryCardSlider from "@/components/LandingWebsiteComponents/HistoryCardSlider";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { DrupalNode } from "next-drupal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import CommonBottomFooter from "@/components/LandingWebsiteComponents/CommonTopFooterSection";

interface TheMissionScreenProps {
  data: DrupalNode;
  headerData: DrupalNode;
  footerData: DrupalNode;
}

const TheMissionScreen: React.FC<TheMissionScreenProps> = ({
  data,
  headerData,
  footerData,
}) => {
  const {
    title = "",
    field_the_mission_subtitle = "",
    field_mission_energy_title = "",
    field_mission_energy_subtitle = "",
    field_mission_approach_title = "",
    field_mission_approach_image = {},
    field_mission_history_title = "",
    field_mission_history_left_text = "",
    field_mission_history_right_text = "",
    field_mission_partners_title = "",
    field_mission_partners_subtitle = "",
    field_mission_member_title = "",
    field_mission_member_subtitle = "",
    field_mission_bottom_footer = {},
    field_mission_energy_cards = [],
    field_mission_timeline_cards = [],
    field_mission_timeline_title = "",
    field_mission_partners_cards = [],
    field_mission_member_cards = [],
    field_join_mission_title = "",
    field_join_mission_content = {},
  } = data;

  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const [width, setWidth] = useState<number>(0);

  const { scrollYProgress } = useScroll();
  const moveOverlayImage = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["-4% ", "-1%"]
  );
  const mobileOverlayImage = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["-1.5% ", "-0.5%"]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth) {
        setWidth(window.innerWidth);
      }
      if (window?.innerWidth < 767) {
        setIsMobile(true);
      }
    }
  }, []);
  const listVariant = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const itemVariant = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  };

  return (
    <>
      <Header data={headerData} />
      <div className="pt-20">
        <CommonBanner
          leftImg={"/static/images/the-mission-hero-1.svg"}
          rightImg={"/static/images/home-hero-3.svg"}
          lightBgClip={true}
          title={title}
          subTitle={field_the_mission_subtitle}
        />
        <div className="pt-[92px] pb-[60px] bg-mapGray relative mobileMax:py-10">
          <motion.div
            style={{
              top: isMobile ? mobileOverlayImage : moveOverlayImage,
            }}
            className="absolute pointer-events-none z-[0]"
          >
            <img src="/static/images/about-us-home.svg" alt="overlay-bg" />
          </motion.div>
          <div className="mini-container relative z-[1]">
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation desktop:text-[66px] text-numans mb-4 tracking-tight desktop:leading-[85px] text-center history-title-gradient text-clip text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-1"
            >
              {field_mission_energy_title}
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
              {field_mission_energy_subtitle}
            </motion.p>
            {/* middle banner cards */}
            <div className="flex items-start justify-between flex-wrap box-border">
              {field_mission_energy_cards?.map(
                (missionCards: DrupalNode, index: number) => {
                  return (
                    <motion.div
                      key={index}
                      className="remove-animation-fluctuation desktop:px-[15px] mb-[30px] w-[33%] mobileMax:w-full mobileMax:px-0 betweenMobileTab:px-[10px] lieTablets:w-[50%] mobileMax:w-full"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                    >
                      <div className="border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white px-4 py-[25px] min-h-[284px] flex items-center flex-col box-border w-full card-shadow">
                        <div className="mb-[23px] max-h-[120px] min-h-[120px] flex justify-center items-center overflow-hidden">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${missionCards?.field_image_icon?.uri?.url}`}
                            alt="category img"
                            width={120}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="h-full w-full">
                          <h4 className="--font-poppins text-center desktop:text-[27px] mb-2 text-landingBlue leading-normal capitalize --font-poppins text-medium">
                            {missionCards?.title}
                          </h4>
                          <div
                            className="--font-poppins text-center text-small text-[#7b99c7] leading-6 --font-poppins line-clamb-6 mobileMax:leading-normal mobileMax:text-xsmall  line-clamp-5"
                            dangerouslySetInnerHTML={{
                              __html: missionCards?.field_content?.processed,
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
          {/* approach section */}
          <div
            id="approach"
            className="pt-[95px] pb-[160px] betweenMobileTab:py-14 mobileMax:py-10"
          >
            <div className="mini-container relative z-[1]">
              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation desktop:text-[66px] text-numans mb-0 desktop:leading-[85px] tracking-tight text-center history-title-gradient text-clip text-[48px] leading-normal mobileMax:text-[32px]"
              >
                {field_mission_approach_title}
              </motion.h3>
              <div className="desktop:h-[140px] h-[50px]" />
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${field_mission_approach_image?.uri?.url}`}
                  width={1000}
                  height={1000}
                  unoptimized={true}
                  alt="approach"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
          {/* history section */}
          <div
            id="history"
            className="overflow-hidden pt-[100px] pb-10 bg-white betweenMobileTab:py-14 mobileMax:py-10"
          >
            <div className="mini-container">
              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation desktop:text-[66px] tracking-tight text-numans desktop:mb-[100px] desktop:leading-[85px] text-center history-title-gradient text-clip text-[48px] leading-normal mobileMax:text-[28px] mb-[50px] mobileMax:mb-5"
              >
                {field_mission_history_title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation flex items-start justify-between mobileMax:flex-col"
              >
                <motion.p
                  //   initial={{ opacity: 0, x: -100 }}
                  //   whileInView={{ opacity: 1, x: 0 }}
                  //   viewport={{ once: true }}
                  //   transition={{
                  //     type: "spring",
                  //     duration: 3,
                  //   }}
                  className="w-[45%] text-clip tracking-tight support-gradient text-[35px] leading-[45px] mr-5 text-numans mobileMax:w-full mobileMax:text-medium mobileMax:leading-[28px] mobileMax:mr-0 mobileMax:mb-2"
                >
                  {field_mission_history_left_text}
                </motion.p>
                <motion.div
                  //   initial={{ opacity: 0, x: 100 }}
                  //   whileInView={{ opacity: 1, x: 0 }}
                  //   viewport={{ once: true }}
                  //   transition={{
                  //     type: "spring",
                  //     duration: 3,
                  //   }}
                  className="w-[45%] --font-poppins text-medium mb-4 leading-8 text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
                  dangerouslySetInnerHTML={{
                    __html: field_mission_history_right_text,
                  }}
                />
              </motion.div>
              {/* history card */}
              <div className="pt-20 pb-10 history-card-wrapper mobileMax:py-6">
                <div className="pb-[50px]">
                  <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0,
                    }}
                    className="remove-animation-fluctuation text-xsmall text-[#a09a9a] tracking-[3.64px] pb-3 uppercase --font-poppins border-b border-[#6ea8ed]"
                  >
                    {field_mission_timeline_title}
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="remove-animation-fluctuation"
                >
                  <HistoryCardSlider
                    sliderData={field_mission_timeline_cards}
                  />
                </motion.div>
              </div>
            </div>
          </div>
          {/* Mission Efficiency Partners */}
          {/* <div
						id="mission-efficiency-partners"
						className="overflow-hidden pt-[60px] pb-10 bg-mapGray mobileMax:py-8 relative"
					>
						<motion.div
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
								src="/static/images/cta-section-bg.svg"
								alt="left-bg"
								className="w-full h-full"
							/>
						</motion.div>

						<div className="mini-container relative z-[2]">
							<motion.h3
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									type: 'spring',
									duration: 3,
								}}
								className="desktop:text-[66px] text-numans mb-5 desktop:leading-[85px] text-center category-gradient text-clip text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-0"
							>
								{field_mission_partners_title}
							</motion.h3>
							<motion.p
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									type: 'spring',
									duration: 3,
								}}
								className="text-cardHeading mb-[60px] text-[24px] text-center mobileMax:mb-10 mobileMax:text-small leading-normal"
							>
								{field_mission_partners_subtitle}
							</motion.p>
							<div className="flex items-start justify-start mx-auto flex-wrap">
								{field_mission_partners_cards
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
							</div>
						</div>
					</div> */}
          {/* member city */}
          {/* <div
						id="countries"
						className="pt-[60px] pb-10 bg-mapGray mobileMax:py-8"
					>
						<div className="mini-container">
							<motion.h3
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									type: 'spring',
									duration: 3,
								}}
								className="desktop:text-[55px] text-numans mb-5 desktop:leading-[85px] text-center category-gradient text-clip text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-3"
							>
								{field_mission_member_title}
							</motion.h3>
							<motion.p
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									type: 'spring',
									duration: 3,
								}}
								className="text-cardHeading mb-[60px] text-[24px] text-center mobileMax:mb-8 mobileMax:text-small leading-normal"
							>
								{field_mission_member_subtitle}
							</motion.p>
							<div className="flex items-start justify-start mx-auto flex-wrap">
								{field_mission_member_cards
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
															memberCard?.title === 'Denmark' && 'max-w-[95px]'
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
							</div>
						</div>
					</div> */}
          {/* joining Mission efficiency */}
          {/* <div className="pt-[60px] pb-10 bg-mapGray mobileMax:py-8"> 
						<div className="bg-footerbg py-12">
							<div className="mini-container">
								<motion.h3
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{once: true}}
									transition={{
										type: 'spring',
										duration: 3,
									}}
									className="desktop:text-[55px] text-numans mb-5 desktop:leading-[85px] category-gradient text-clip text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-3 text-center"
								>
									{field_join_mission_title}
								</motion.h3>
								<motion.div
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{once: true}}
									transition={{
										type: 'spring',
										duration: 3,
									}}
									className="--font-poppins text-medium leading-8 text-white mobileMax:w-full mobileMax:text-small mobileMax:mb-6 mobileMax:leading-normal text-center"
									dangerouslySetInnerHTML={{
										__html: field_join_mission_content?.value,
									}}
								/>
							</div>
						</div>
						<div className="relative pt-16">
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 0.25, x: 0 }}
								viewport={{once: true}}
								transition={{
									type: 'spring',
									duration: 3.5,
									delay: 0.5,
								}}
								className="absolute max-w-[20%] left-0 z-[1] top-[80px] betweenMobileTab:max-w-[35%] mobileMax:max-w-[45%] overflow-hidden"
							>
								<img
									src="/static/images/cta-blue-bg.svg"
									alt="left-bg"
									className=""
								/>
							</motion.div>
							<div className="mini-container relative z-[2]">
								<motion.h3
									initial={{ opacity: 0, y: 40 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{once: true}}
									transition={{
										type: 'spring',
										duration: 3,
									}}
									className="desktop:text-[55px] text-numans mb-5 desktop:leading-[85px] text-center category-gradient text-clip text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-3"
								>
									Your role at Mission Efficiency
								</motion.h3>
								<div className="flex flex-wrap justify-start box-border mt-12 mobileMax:mt-6">
									<motion.div
										className="px-[6px] mb-[10px] w-[25%] mobileMax:mb-3 mobileMax:w-full mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0"
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{once: true}}
										transition={{
											type: 'spring',
											duration: 3,
										}}
									>
										<div className="rounded-xl bg-white h-full flex items-center flex-col box-border w-full card-shadow py-5 px-4">
											<div className="h-full w-full">
												<h4 className="text-numans text-center text-[22px] mb-3 text-landingBlue leading-7 mobileMax:text-medium mobileMax:leading-7">
													Be a Mission Efficiency Ambassador
												</h4>
												<p className="--font-poppins text-center text-small text-[#7b99c7] leading-6 mobileMax:text-xsmall mobileMax:leading-normal font-normal">
													Advocate for more than doubling energy efficiency
													improvements this decade, enhanced collaboration, and
													partnerships.
												</p>
											</div>
										</div>
									</motion.div>
									<motion.div
										className="px-[6px] mb-[10px] w-[25%] mobileMax:mb-3 mobileMax:w-full mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0"
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{once: true}}
										transition={{
											type: 'spring',
											duration: 3,
										}}
									>
										<div className="rounded-xl bg-white h-full flex items-center flex-col box-border w-full card-shadow py-5 px-4">
											<div className="h-full w-full">
												<h4 className="text-numans text-center text-[22px] mb-3 text-landingBlue leading-7 mobileMax:text-medium mobileMax:leading-7">
													Inspire others
												</h4>
												<p className="--font-poppins text-center text-small text-[#7b99c7] leading-6 mobileMax:text-xsmall mobileMax:leading-normal font-normal">
													to engage with and support progress in energy
													efficiency through your example, commitment and
													enthusiasm towards energy efficiency. 
												</p>
											</div>
										</div>
									</motion.div>
									<motion.div
										className="px-[6px] mb-[10px] w-[25%] mobileMax:mb-3 mobileMax:w-full mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0"
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{once: true}}
										transition={{
											type: 'spring',
											duration: 3,
										}}
									>
										<div className="rounded-xl bg-white h-full flex items-center flex-col box-border w-full card-shadow py-5 px-4">
											<div className="h-full w-full">
												<h4 className="text-numans text-center text-[22px] mb-3 text-landingBlue leading-7 mobileMax:text-medium mobileMax:leading-7">
													Foster collaboration
												</h4>
												<p className="--font-poppins text-center text-small text-[#7b99c7] leading-6 mobileMax:text-xsmall mobileMax:leading-normal font-normal">
													Foster collaboration to advance progress and leverage
													collective resources. Invite other partners to join
													Mission Efficiency.
												</p>
											</div>
										</div>
									</motion.div>
									<motion.div
										className="px-[6px] mb-[10px] w-[25%] mobileMax:mb-3 mobileMax:w-full mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0"
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{once: true}}
										transition={{
											type: 'spring',
											duration: 3,
										}}
									>
										<div className="rounded-xl overflow-hidden bg-white h-full flex items-center flex-col box-border w-full card-shadow py-5 px-4">
											<div className="h-full w-full">
												<h4 className="text-numans text-center text-[22px] mb-3 text-landingBlue leading-7 mobileMax:text-medium mobileMax:leading-7">
													Promote exchange of knowledge
												</h4>
												<p className="--font-poppins text-center text-small text-[#7b99c7] leading-6 mobileMax:text-xsmall mobileMax:leading-normal font-normal">
													and lessons learned through the Taskforces or other
													activities.  
												</p>
											</div>
										</div>
									</motion.div>
								</div>
								<div className="flex flex-wrap justify-start box-border mt-12 mobileMax:mt-6">
									<motion.div
										className="px-[15px] mb-[25px] w-[33%] mobileMax:w-full mt-2 mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5 mobileMax:mt-0"
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{once: true}}
										transition={{
											type: 'spring',
											duration: 2.2,
										}}
									>
										<div className="relative rounded-xl bg-white flex items-center border-2 border-[#ececec] flex-col box-border w-full card-shadow">
											<h4 className="w-full flex items-center justify-center h-[100px] px-[15px] text-numans uppercase text-center text-[22px] text-lightBlue leading-normal mobileMax:text-medium font-semibold">
												countries
											</h4>
											<div
												className={`absolute bottom-[-15px] ${
													isOpenJoinCardList1 ? 'z-[99]' : 'z-[1]'
												} left-1/2 -translate-x-1/2`}
											>
												<motion.div
													animate={
														!isOpenJoinCardList1
															? { x: 0, y: [-5, 5, -5] }
															: { x: 0, y: 0 }
													}
													viewport={{once: true}}
													transition={
														!isOpenJoinCardList1
															? {
																	duration: 2,
																	ease: 'easeInOut',
																	loop: Infinity,
																	repeat: Infinity,
															  }
															: {}
													}
													className="cursor-pointer card-shadow visit-site-btn text-white w-[35px] h-[35px] rounded-full flex items-center justify-center"
													onClick={() =>
														setIsOpenJoinCardList1(!isOpenJoinCardList1)
													}
												>
													{!isOpenJoinCardList1 ? (
														<FaAngleDown className="text-[30px]" />
													) : (
														<FaAngleUp className="text-[30px]" />
													)}
												</motion.div>
											</div>
											{isOpenJoinCardList1 && (
												<motion.div className="list p-5 w-full absolute z-[4] card-shadow left-0 top-[103%] border-2 border-[#ececec] bg-white rounded-xl">
													<motion.ul
														initial="hidden"
														animate="visible"
														variants={listVariant}
														className=" pl-3 blue-bullets"
													>
														<motion.li variants={itemVariant}>
															<a
																href="call-to-action/#mission-call-to-action"
																className="cursor-pointer underline text-left  block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
															>
																Support the Mission Efficiency Call to Action
															</a>
														</motion.li>
														<motion.li variants={itemVariant}>
															<a
																href="elevate/#joining-card"
																className="cursor-pointer underline text-left  block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
															>
																Join a Mission Efficiency Taskforce
															</a>
														</motion.li>
														<motion.li variants={itemVariant}>
															<a
																href="mission-efficiency-pledge#pledge-submit"
																className="cursor-pointer underline text-left  block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
															>
																Submit a Mission Efficiency Pledge
															</a>
														</motion.li>
														<motion.li variants={itemVariant}>
															<a
																href="call-to-action/#UN-energy-compact"
																className="cursor-pointer underline text-left  block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
															>
																Submit an UN-Energy Compact
															</a>
														</motion.li>
														<motion.li variants={itemVariant}>
															<a
																href="call-to-action/#cta-ndc"
																className="cursor-pointer underline text-left  block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
															>
																Update or enhance your Nationally Determined
																Contributions
															</a>
														</motion.li>
													</motion.ul>
												</motion.div>
											)}
										</div>
									</motion.div>
									<motion.div
										className="px-[15px] mb-[25px] w-[33%] mobileMax:w-full mt-2 mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5 mobileMax:mt-0"
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{once: true}}
										transition={{
											type: 'spring',
											duration: 2.2,
										}}
									>
										<div className="relative rounded-xl bg-white flex items-center border-2 border-[#ececec] flex-col box-border w-full card-shadow">
											<h4 className="w-full flex items-center justify-center h-[100px] px-[15px] text-numans uppercase text-center text-[22px] text-lightBlue leading-normal mobileMax:text-medium font-semibold">
												Organizations
											</h4>
											<div
												className={`absolute bottom-[-15px] ${
													isOpenJoinCardList2 ? 'z-[99]' : 'z-[1]'
												} left-1/2 -translate-x-1/2`}
											>
												<motion.div
													animate={
														!isOpenJoinCardList2
															? { x: 0, y: [-5, 5, -5] }
															: { x: 0, y: 0 }
													}
													transition={
														!isOpenJoinCardList2
															? {
																	duration: 1.2,
																	ease: 'easeInOut',
																	loop: Infinity,
																	repeat: Infinity,
															  }
															: {}
													}
													className="cursor-pointer card-shadow visit-site-btn text-white w-[35px] h-[35px] rounded-full flex items-center justify-center"
													onClick={() =>
														setIsOpenJoinCardList2(!isOpenJoinCardList2)
													}
												>
													{!isOpenJoinCardList2 ? (
														<FaAngleDown className="text-[30px]" />
													) : (
														<FaAngleUp className="text-[30px]" />
													)}
												</motion.div>
											</div>
											{isOpenJoinCardList2 && (
												<div className="list p-5 w-full absolute z-[4] card-shadow left-0 top-[103%] border-2 border-[#ececec] bg-white rounded-xl">
													<motion.ul
														initial="hidden"
														animate="visible"
														variants={listVariant}
														className=" pl-3 blue-bullets"
													>
														<motion.li variants={itemVariant}>
															<a
																href="call-to-action/#mission-call-to-action"
																className="cursor-pointer underline text-left  block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
															>
																Support the Mission Efficiency Call to Action
															</a>
														</motion.li>
														<motion.li variants={itemVariant}>
															<a
																href="elevate/#joining-card"
																className="cursor-pointer underline text-left  block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
															>
																Join a Mission Efficiency Taskforce
															</a>
														</motion.li>
														<motion.li variants={itemVariant}>
															<a
																href="mission-efficiency-pledge#pledge-submit"
																className="cursor-pointer underline text-left  block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
															>
																Submit a Mission Efficiency Pledge
															</a>
														</motion.li>
														<motion.li variants={itemVariant}>
															<a
																href="call-to-action/#UN-energy-compact"
																className="cursor-pointer underline text-left  block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
															>
																Submit an UN-Energy Compact
															</a>
														</motion.li>
													</motion.ul>
												</div>
											)}
										</div>
									</motion.div>
									<motion.div
										className="px-[15px] mb-[25px] w-[33%] mobileMax:w-full mt-2 mobileMax:px-0 lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5 mobileMax:mt-0"
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{once: true}}
										transition={{
											type: 'spring',
											duration: 2.2,
										}}
									>
										<div className="relative rounded-xl bg-white flex items-center border-2 border-[#ececec] flex-col box-border w-full card-shadow">
											<h4 className="w-full flex items-center justify-center h-[100px] px-[15px] text-numans uppercase text-center text-[22px] text-lightBlue leading-normal mobileMax:text-medium font-semibold">
												individuals
											</h4>
											<div
												className={`absolute bottom-[-15px] ${
													isOpenJoinCardList3 ? 'z-[99]' : 'z-[1]'
												} left-1/2 -translate-x-1/2`}
											>
												<motion.div
													animate={
														!isOpenJoinCardList3
															? { x: 0, y: [-5, 5, -5] }
															: { x: 0, y: 0 }
													}
													transition={
														!isOpenJoinCardList3
															? {
																	duration: 2,
																	ease: 'easeInOut',
																	loop: Infinity,
																	repeat: Infinity,
															  }
															: {}
													}
													className="cursor-pointer card-shadow visit-site-btn text-white w-[35px] h-[35px] rounded-full flex items-center justify-center"
													onClick={() =>
														setIsOpenJoinCardList3(!isOpenJoinCardList3)
													}
												>
													{!isOpenJoinCardList3 ? (
														<FaAngleDown className="text-[30px]" />
													) : (
														<FaAngleUp className="text-[30px]" />
													)}
												</motion.div>
											</div>
											{isOpenJoinCardList3 && (
												<div className="list p-5 w-full absolute z-[4] card-shadow left-0 top-[103%] border-2 border-[#ececec] bg-white rounded-xl">
													<motion.ul
														initial="hidden"
														animate="visible"
														variants={listVariant}
														className="pl-3 blue-bullets"
													>
														<motion.li variants={itemVariant}>
															<a
																href="elevate/#joining-life-campaign"
																className="cursor-pointer underline text-left  block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
															>
																Join the Energy Efficiency Life campaign
															</a>
														</motion.li>
													</motion.ul>
												</div>
											)}
										</div>
									</motion.div>
								</div>
							</div>
						</div>
					</div>  */}
        </div>
      </div>
      <CommonBottomFooter data={field_mission_bottom_footer} />
      <LandingFooter data={footerData} />
    </>
  );
};

export default TheMissionScreen;
