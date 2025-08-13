"use client";
import DynamicImage from "@/components/ResuableDynamicImage";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

interface BannerProps {
  title: string;
  subtitle: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle }) => {
  const { scrollYProgress } = useScroll();
  const moveValue = useTransform(() => scrollYProgress.get() * 4000);

  return (
    <div className="banner-wrap-styling relative min-h-[80vh] mobileMax:min-h-[70vh] overflow-hidden">
      <div className="top-[-20%] left-0 z-[-3] absolute pointer-events-none mobileMax:top-[-60%]">
        <DynamicImage
          width={632}
          height={665}
          src="/static/images/left-home-hero.svg"
          alt="left-bg"
        />
      </div>
      <div className="top-[-20%] right-0 z-[-2] absolute pointer-events-none mobileMax:top-[-60%]">
        <DynamicImage
          src="/static/images/right-home-hero.svg"
          alt="right-bg"
          width={526}
          height={645}
        />
      </div>
      {/* title section */}
      <div className="mini-container">
        <div className="pt-20">
          <h1 className="mobileMax:px-1 title-green-gradient text-clip text-xlarge mb-3 mt-0 leading-tight text-center text-numans desktop:max-w-[680px] mx-auto mobileMax:max-w-full mobileMax:text-[42px]">
            {title}
          </h1>
          <p className="text-[27px] text-white text-center --font-poppins mobileMax:text-small">
            {subtitle}
          </p>
        </div>
      </div>
      {/* banner-building image */}
      <img
        src="/static/images/banner-building.svg"
        className="absolute z-[-1] bottom-0 w-full mobileMax:w-[700px] mobileMax:max-w-[700px] mobileMax:left-1/2 mobileMax:-translate-x-1/2 pointer-events-none"
        alt="building"
      />
      {/* banner bus */}
      <div className="h-[55px] absolute bottom-3 left-[29%] pointer-events-none mobileMax:left-[25%]">
        <motion.div
          className="relative"
          style={{
            left: moveValue,
          }}
        >
          <DynamicImage
            width={110}
            height={52}
            src="/static/images/banner-bus.svg"
            alt="bus-bg"
          />
        </motion.div>
      </div>
      <DynamicImage
        width={1880}
        height={18}
        src="/static/images/white-curve.png"
        alt="curve"
        className="absolute z-[3] w-full bottom-[-2px] h-[18px] "
      />
    </div>
  );
};

export default Banner;
