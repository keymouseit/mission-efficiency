"use client";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import React from "react";
import Banner from "@/components/LandingWebsiteComponents/BannerSection";
import Link from "next/link";
import CommonGridLayout from "@/components/LandingWebsiteComponents/CommonGridLayout";
import { DrupalNode } from "next-drupal";
import { motion } from "framer-motion";
import CommonBottomFooter from "@/components/LandingWebsiteComponents/CommonTopFooterSection";
import NewsCardSlider from "@/components/LandingWebsiteComponents/NewsCardSlider";

interface LandingPageProps {
  data: DrupalNode;
  newsCarouselCards: DrupalNode[];
  trainingsCarouselCards: DrupalNode[];
  headerData: DrupalNode;
  footerData: DrupalNode;
  env?: {};
  templates: DrupalNode[];
}

const LandingPage: React.FC<LandingPageProps> = ({
  data,
  newsCarouselCards,
  headerData,
  footerData,
}) => {
  const {
    title = "",
    field_home_main_subtitle = "",
    field_about_section_content = "",
    field_about_section_images = [],
    field_news_section_title = "",
    field_home_bottom_footer_section = {},
    field_home_page_banner = [],
  } = data;
  return (
    <>
      <Header data={headerData} />
      <div className="pt-20">
        <Banner title={title} subtitle={field_home_main_subtitle} />
        <CommonGridLayout
          pageData={{
            ...field_about_section_content,
            images: field_about_section_images,
          }}
          missionCard={true}
        />
      </div>
      {/* <div className="pt-[92px] pb-[60px] bg-mapGray mobileMax:py-10">
				<div className="mini-container">
					<h3 className="px-5 mobileMax:px-0 desktop:text-[66px] desktop:leading-[85px] text-numans text-center category-gradient text-clip text-[48px] leading-[60px] mb-5 mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-5">
						{field_opportunity_section_title}
					</h3>
					<p className="text-lightBlueText mb-20 text-[22px] text-center mobileMax:text-small mobileMax:mb-8">
						{field_opportunity_section_subtit}
					</p>
					<div className="flex flex-wrap justify-center box-border">
						{field_opportunity_cards &&
							field_opportunity_cards?.map(
								(opportunityCard: DrupalNode, index: number) => {
									return (
										<div
											key={index}
											className="px-[15px] mb-[30px] w-[33%] laptop:min-h-[255px] mobileMax:w-full mobileMax:px-0 home-category-card"
										>
											<CategoryCard
												img={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${opportunityCard?.field_image_icon?.uri?.url}`}
												title={opportunityCard.title}
												subTitle={opportunityCard.field_content.value}
											/>
										</div>
									);
								},
							)}
					</div>
				</div>
			</div> */}
      {/* news & events */}
      {data?.field_news_section_display ? (
        <div className="py-16 bg-mapGray mobileMax:py-10">
          <div className="mini-container">
            <motion.h3
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation desktop:text-[66px] desktop:leading-[85px] text-numans desktop:mb-[70px] text-center  text-clip text-[48px] leading-[60px] mb-[50px] mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-8"
              style={{
                backgroundImage:
                  "linear-gradient(282deg, #716ef8, #716ef8, #40abe7,#40abe7, #40c9e7)",
              }}
            >
              {field_news_section_title}
            </motion.h3>
            {/* carousel card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation mb-16 b-10 mobileMax:py-6"
            >
              <NewsCardSlider sliderData={newsCarouselCards} />
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
              <Link
                href={"/news"}
                className="flex justify-center items-center get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg min-w-[200px] px-5"
              >
                {"View All News & Events"}
              </Link>
            </motion.div>
          </div>
        </div>
      ) : null}
      {/* trainings */}
      {/* <div className="py-16 bg-graybg mobileMax:py-10">
				<div className="mini-container">
					<h3
						className="desktop:text-[66px] desktop:leading-[85px] text-numans desktop:mb-[70px] text-center  text-clip text-[48px] leading-[60px] mb-[50px] mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-8"
						style={{
							backgroundImage:
								'linear-gradient(282deg, #716ef8, #716ef8, #40abe7,#40abe7, #40c9e7)',
						}}
					>
						Trainings
					</h3>
					<div className="mb-8 pb-10 mobileMax:py-6">
						<TrainingCardSlider sliderData={trainingsCarouselCards} />
					</div>
					<Link href="/trainings">
						<Button className="block mx-auto get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg min-w-[180px]">
							{'View All Trainings'}
						</Button>
					</Link>
				</div>
			</div> */}
      {field_home_page_banner?.map((bannerItem: DrupalNode, index: number) => {
        return (
          <div
            key={index}
            id="energy-efficient-life"
            className="py-[82px] home-efficient-life-banner relative"
            style={{
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_DRUPAL_BASE_URL +
                bannerItem?.field_image_icon?.uri?.url
              })`,
            }}
          >
            <div className="absolute top-0 left-0 bg-blackDarkOpacity h-full w-full" />
            <div className="mini-container relative z-[2]">
              <motion.h3
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation font-bold desktop:text-[55px] text-numans tab:min-h-[125px] desktop:leading-[85px] text-white text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-10 text-center"
              >
                {bannerItem?.title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation --font-poppins mb-12 text-xmedium leading-8 text-white mobileMax:w-full mobileMax:text-small mobileMax:mb-8 mobileMax:leading-normal text-center"
                dangerouslySetInnerHTML={{
                  __html: bannerItem?.field_content?.processed,
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
                  href={bannerItem?.field_link || ""}
                  className="flex justify-center items-center get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg min-w-[180px]"
                >
                  {bannerItem?.field_button_text}
                </Link>
              </motion.div>
            </div>
          </div>
        );
      })}
      <CommonBottomFooter data={field_home_bottom_footer_section} />
      <LandingFooter data={footerData} />
    </>
  );
};

export default LandingPage;
