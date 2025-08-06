"use client";
import { DrupalNode } from "next-drupal";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HomeGridLayout from "../HomeGridLayout";
import { DEV_PUBLIC_URL } from "@/services/api";

interface GridLayoutProps {
  data: DrupalNode;
}

const GridLayout: React.FC<GridLayoutProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState<Boolean>(false);

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
      if (window?.innerWidth < 767) {
        setIsMobile(true);
      }
    }
  }, []);

  return (
    <div
      className={`pt-[140px] pb-[136px] bg-white relative overFlow-hidden mobileMax:py-14`}
    >
      <motion.div
        style={{
          top: isMobile ? mobileOverlayImage : moveOverlayImage,
        }}
        className="absolute pointer-events-none w-full betweenMobileTab:w-[70%] laptopMax:opacity-60 laptopMax:w-[80%]"
      >
        <img src="/static/images/about-us-home.svg" alt="overlay-bg" />
      </motion.div>

      <div className="mini-container">
        <HomeGridLayout
          gridImages={[
            `${DEV_PUBLIC_URL}${data?.field_images[0]?.uri?.url}`,
            `${DEV_PUBLIC_URL}${data?.field_images[1]?.uri?.url}`,
            `${DEV_PUBLIC_URL}${data?.field_images[2]?.uri?.url}`,
          ]}
          title={data?.field_title}
          subTitle={data?.field_description?.processed}
          buttonText={data?.field_button[0]?.title}
          buttonLink={data?.field_button[0]?.url}
        />
      </div>
    </div>
  );
};

export default GridLayout;
