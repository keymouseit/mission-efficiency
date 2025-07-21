"use client";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import FinaceSupportCard from "@/components/LandingWebsiteComponents/FinanceSupportsCard";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import PartnerCard from "@/components/LandingWebsiteComponents/PartnersCard";
import { DrupalNode } from "next-drupal";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CommonBottomFooter from "@/components/LandingWebsiteComponents/CommonTopFooterSection";
interface InvestScreenProps {
  data: DrupalNode;
  headerData: DrupalNode;
  footerData: DrupalNode;
}

const InvestScreen: React.FC<InvestScreenProps> = ({
  data,
  headerData,
  footerData,
}) => {
  const {
    title = "",
    field_invest_sub_title = "",
    field_energy_financing_title = "",
    field_energy_market_title = "",
    field_energy_market_subtitle = "",
    field_investment_action_title = "",
    field_energy_financing_content = {},
    field_invest_bottom_footer = {},
    field_energy_financing_images = [],
    field_investment_action_cards = [],
    field_invest_marketplace_title = "",
    field_marketplace_upper_content = {},
    field_identity_info = "",
    field_de_risk_info = "",
    field_match_info = "",
    field_marketplace_lower_content = {},
  } = data;
  // const { scrollYProgress } = useScroll();
  // const moveValue = useTransform(() => scrollYProgress.get() * 4000);

  const marketPlaceSteps = [
    {
      title: field_identity_info,
    },
    {
      title: field_de_risk_info,
    },
    {
      title: field_match_info,
    },
  ];
  return (
    <>
      <Header data={headerData} />
      <div className="pt-20">
        <CommonBanner
          leftImg={"/static/images/left-home-hero.svg"}
          rightImg={"/static/images/elevate-right-img.svg"}
          title={title}
          subTitle={field_invest_sub_title}
        />
        {/* financing charette */}
        <div id="financing-charette">
          <div className="pt-5 pb-[136px] bg-white relative mobileMax:pb-12 mobileMax:pt-2">
            <Image
              src="/static/images/cta-section-bg.svg"
              alt="overlay-bg"
              height={300}
              width={300}
              className="absolute pointer-events-none left-0 top-[50%] tab:-translate-y-1/2 largeDesk:opacity-50 laptopMax:opacity-50 max-w-[47%] mobileMax:top-[24%] betweenMobileTab:max-w-[35%]"
            />
            <div className="mini-container relative z-[2]">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation pt-[82px] desktop:text-[60px] text-numans leading-normal text-center category-gradient text-clip text-[48px] mobileMax:text-[28px] px-5 mb-[50px] mobileMax:mb-3"
              >
                {field_energy_financing_title}
              </motion.h2>
              <div className="flex items-center justify-between mobileMax:block">
                <motion.div
                  className="remove-animation-fluctuation w-[50%] overflow-hidden rounded-[52px] w-[50%] h-[350px] mobileMax:w-full mobileMax:h-full"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${field_energy_financing_images[0]?.uri?.url}`}
                    alt="grid img1"
                    height={300}
                    width={300}
                    unoptimized={true}
                    className="w-full h-full rounded-[52px] object-cover transform transition-transform duration-700 hover:scale-105 mobileMax:mb-3"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: field_energy_financing_content.field_content?.value,
                  }}
                  className="remove-animation-fluctuation mobileMax:w-full --font-poppins text-medium mb-5 mt-3 leading-8 text-[#545d6f] mobileMax:mb-5 mobileMax:text-xsmall mobileMax:leading-normal w-[45%]"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Market Readiness */}
        {/* <div id="market-readiness" className="relative support-bottom-banner">
					<img
						src="/static/images/blue-curve.png"
						alt="curve"
						className="absolute z-[2] w-full top-[-14px] h-[15px] pointer-events-none"
					/>
					<div className="overflow-hidden relative min-h-[560px] pt-[80px] pb-[100px] box-border mobileMax:pt-2 mobileMax:pb-10">
						<div className="absolute miniLaptop:top-[-45%] left-0 z-[-2] pointer-events-none miniLaptop:max-w-full max-w-[60%] top-[-19%] mobileMax:top-[-7%]">
							<img src="/static/images/ewpartners-bg-1.svg" alt="left-bg" />
						</div>
						<div className="miniLaptop:top-[-14%] right-0 z-[-2] absolute pointer-events-none miniLaptop:max-w-full max-w-[50%] top-[-11%] mobileMax:top-[-4%] desktop:opacity-100 opacity-[0.6]">
							<img src="/static/images/ewpartners-bg-2.svg" alt="right-bg" />
						</div>
						<div className="mini-container h-full flex flex-col items-center justify-center relative z-[3]">
							<div className="mx-auto">
								<h2 className="pt-[82px] title-green-gradient text-clip desktop:text-[60px] tracking-tight mb-[40px] mt-0 leading-tight text-center text-numans text-[45px] mobileMax:text-[28px] mobileMax:mb-6">
									{field_energy_market_title}
								</h2>
								<p className="--font-poppins text-medium text-center text-white leading-7 mb-20 mobileMax:text-small mobileMax:mb-10">
									{field_energy_market_subtitle}
								</p>
								<div className="flex flex-wrap justify-center box-border mobileMax:block">
									{field_energy_market_cards?.map(
										(marketCard: DrupalNode, index: number) => {
											return (
												<motion.div
													key={index}
													className="px-[15px] mb-[30px] w-[50%] min-h-[350px] mobileMax:w-full mobileMax:px-0 mobileMax:min-h-full"
													initial={{ opacity: 0, scale: 0.8 }}
													whileInView={{ opacity: 1, scale: 1 }}
													transition={{
														type: 'spring',
														duration: 2.8,
													}}
												>
													<FinaceSupportCard
														title={marketCard.title}
														showImage={true}
														subTitle={marketCard.field_content.processed}
														imgSrc={`${
															process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
														}${marketCard?.field_image_icon?.uri?.url || ''}`}
													/>
												</motion.div>
											);
										},
									)}
								</div>
							</div>
						</div>
					</div>
				</div> */}
        {/* three steps */}
        <div
          id="market-place"
          className="pt-4 pb-[60px] bg-mapGray betweenMobileTab:pb-16 mobileMax:pb-6"
        >
          <div className="mini-container">
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation pt-[82px] desktop:text-[66px] text-numans desktop:mb-[25px] desktop:leading-[85px] text-center category-gradient text-clip text-[48px] leading-[60px] mb-[50px] mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-3"
            >
              {field_invest_marketplace_title}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation --font-poppins text-center text-medium mb-5 mt-3 leading-8 text-[#545d6f] mobileMax:mb-5 mobileMax:text-small mobileMax:leading-normal"
              dangerouslySetInnerHTML={{
                __html: field_marketplace_upper_content?.value,
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation flex items-center justify-center my-16 laptopMax:flex-col"
            >
              {marketPlaceSteps.map(
                (item: { title: string }, index, array: any) => {
                  const isLastIndex = index === array.length - 1;
                  return (
                    <motion.div
                      // initial={{ opacity: 0, y: 40 }}
                      // whileInView={{ opacity: 1, y: 0 }}
                      // viewport={{ once: true }}
                      // transition={{
                      //   duration: 0,
                      // }}
                      key={index}
                      className={`remove-animation-fluctuation bg-[#40BFE7] rounded-full w-[220px] h-[220px] p-2 relative commonBoxShadow ${
                        !isLastIndex && "three-step-modal"
                      }`}
                    >
                      <div className="h-full w-full flex flex-col items-center justify-center bg-white rounded-full">
                        <h5 className="mb-2 text-numans uppercase category-gradient text-clip leading-normal text-odd mobileMax:text-medium font-bold w-[55%] mobileMax:w-[80%] text-center webkit-box line-clamp-1">
                          {item.title}
                        </h5>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="my-8 remove-animation-fluctuation"
            >
              <div
                className="text-list --font-poppins text-left text-medium mt-2.5 leading-normal text-[#545d6f] mobileMax:mb-5 mobileMax:text-small mobileMax:leading-normal"
                dangerouslySetInnerHTML={{
                  __html: field_marketplace_lower_content?.value,
                }}
              />
            </motion.div>
          </div>
        </div>
        {/* Investment in action */}
        <div
          id="investment-in-action"
          className="py-14 bg-white betweenMobileTab:py-12 mobileMax:pt-10 mobileMax:pb-6"
        >
          <div className="mini-container">
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation desktop:text-[66px] text-numans desktop:mb-[100px] desktop:leading-[85px] text-center category-gradient text-clip text-[48px] leading-[60px] mb-[50px] mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-8"
            >
              {field_investment_action_title}
            </motion.h3>
            <div className="flex items-center flex-wrap pb-[25px] mobileMax:block transparent-cards-border invest-cards">
              {field_investment_action_cards?.map(
                (investmentActionCard: DrupalNode, index: number) => {
                  return (
                    <motion.div
                      key={index}
                      className="remove-animation-fluctuation px-[15px] w-[50%] finacial-card-alternate-border mobileMax:w-full"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                    >
                      <PartnerCard
                        isTransparentCard={true}
                        img={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${investmentActionCard.field_image_icon.uri.url}`}
                        title={investmentActionCard?.title}
                        buttonText={investmentActionCard?.field_button_text}
                        link={investmentActionCard?.field_link}
                      />
                      <div className="alternate-bottom-border" />
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
      <CommonBottomFooter data={field_invest_bottom_footer} />
      <LandingFooter data={footerData} />
    </>
  );
};

export default InvestScreen;
