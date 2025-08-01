"use client";
import { DrupalNode } from "next-drupal";
import React, { useEffect, useState } from "react";
import InvestGridLayout from "./InvestGrid";
import MissionGridLayout from "./MissionGrid";
import { motion, useScroll, useTransform } from "framer-motion";

interface CommonGridProps {
  isInvestPage?: boolean;
  headerTitle?: boolean;
  heading?: string;
  pageData: DrupalNode;
  missionCard?: boolean;
}

const CommonGridLayout: React.FC<CommonGridProps> = (props) => {
  const {
    heading,
    isInvestPage = false,
    headerTitle = false,
    pageData = {} as DrupalNode,
    missionCard = false,
  } = props;

  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const [width, setWidth] = useState<number>(0);

  const { scrollYProgress } = useScroll();
  const moveOverlayImage = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["-49% ", "-35%"]
  );
  const mobileOverlayImage = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["-15% ", "-2%"]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth) {
        setWidth(window.innerWidth);
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth < 767) {
        setIsMobile(true);
      }
    }
  }, []);
  // useEffect(() => {
  //   const handleResize = () => setWidth(window.innerWidth);
  //   const initialWidth = window.innerWidth;

  //   if (initialWidth <= 767) {
  //     setIsMobile(true);
  //   }
  //   if (initialWidth >= 768) {
  //     setIsMobile(false);
  //   }
  //   window?.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [width]);

  return (
    <div
      className={`pt-[140px] pb-[136px] bg-white relative overFlow-hidden  ${
        isInvestPage ? "mobileMax:py-12" : "mobileMax:py-14"
      }`}
    >
      {headerTitle && (
        <>
          <h2 className="desktop:text-[60px] text-numans leading-normal text-center category-gradient text-clip text-[48px] mobileMax:text-[28px] px-5">
            {heading}
          </h2>
          <div className="desktop:h-[120px] h-[50px]" />
        </>
      )}
      {missionCard ? (
        <motion.div
          style={{
            top: isMobile ? mobileOverlayImage : moveOverlayImage,
          }}
          className="absolute pointer-events-none w-full betweenMobileTab:w-[70%] laptopMax:opacity-60 laptopMax:w-[80%]"
        >
          <img src="/static/images/about-us-home.svg" alt="overlay-bg" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            duration: 2,
          }}
          className={`absolute pointer-events-none left-0 ${
            isInvestPage
              ? "top-[-18%] mobileMax:top-[-8%]"
              : "top-[-28%] mobileMax:top-[-20%] betweenMobileTab:top-[-40%]"
          }`}
        >
          <img src="/static/images/about-us-home.svg" alt="overlay-bg" />
        </motion.div>
      )}
      <div className="mini-container">
        {isInvestPage ? (
          <InvestGridLayout
            gridImg1={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${pageData.images[0]?.uri?.url}`}
            gridImg2={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${pageData.images[1]?.uri?.url}`}
            title={pageData?.title}
            subTitle={pageData?.field_content?.processed}
            buttonText={pageData?.field_button_text}
            buttonLink={pageData?.field_link}
          />
        ) : (
          <MissionGridLayout
            gridImg1={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${pageData.images[0]?.uri?.url}`}
            gridImg2={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${pageData.images[1]?.uri?.url}`}
            gridImg3={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${pageData.images[2]?.uri?.url}`}
            title={pageData?.title}
            subTitle={pageData?.field_content?.processed}
            buttonText={pageData?.field_button_text}
            buttonLink={pageData?.field_link}
          />
        )}
      </div>
    </div>
  );
};

export default CommonGridLayout;
