"use client";

import React from "react";
import { motion } from "framer-motion";

interface CommonBannerProps {
  title?: string;
  subTitle?: string;
  leftImg?: string;
  rightImg?: string;
  lightBgClip?: boolean;
  isCallToAction?: boolean;
  noHeight?: boolean;
  isCfdpage?: boolean;
}

const CommonBanner: React.FC<CommonBannerProps> = (props) => {
  const {
    title,
    subTitle,
    lightBgClip = false,
    leftImg,
    rightImg,
    isCallToAction = false,
    noHeight = false,
    isCfdpage = false,
  } = props;

  return (
    <div
      className={`overflow-hidden banner-wrap-styling relative flex items-center justify-center laptopMax:overflow-hidden box-border pt-[40px] pb-14 ${
        lightBgClip && "common-banner-wrap"
      } ${
        noHeight
          ? "min-h-[350px] mobileMax:min-h-[300px]"
          : "min-h-[560px] mobileMax:min-h-[300px]"
      }`}
    >
      <div className="absolute top-[-84px] left-0 z-[-2] pointer-events-none laptopMax:max-w-[55%] mobileMax:top-[-33px] mobileMax:max-w-1/2">
        <img
          src={leftImg}
          alt="left-bg"
          className={` ${noHeight && "tab:w-[62%]"}`}
        />
      </div>
      <div className="top-[-84px] right-0 z-[-2] absolute pointer-events-none laptopMax:max-w-[55%] mobileMax:top-[-33px] mobileMax:max-w-1/2">
        <img
          src={rightImg}
          alt="right-bg"
          className={` ${noHeight && "tab:w-[70%] tab:ml-auto"}`}
        />
      </div>
      {/* title section */}
      <div className="mini-container h-full flex flex-col items-center justify-center">
        <div className="w-[75%] mx-auto mobileMax:w-full betweenMobileTab:w-[80%]">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className={`${
              isCallToAction ||
              (isCfdpage && "belowTab:mx-auto !text-[50px] mobileMax:!text-xlg")
            } remove-animation-fluctuation title-green-gradient text-clip text-xlarge mb-3.5 mt-0 leading-tight text-center text-numans mobileMax:text-[42px]`}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className={`${
              isCallToAction && "!text-odd mobileMax:!text-medium"
            } remove-animation-fluctuation !text-odd mobileMax:!text-medium leading-normal text-white text-center --font-poppins mobileMax:leading-[25px]`}
          >
            {subTitle}
          </motion.p>
        </div>
      </div>
      {lightBgClip ? (
        <img
          src="/static/images/gray-curve.png"
          alt="curve"
          className="absolute z-[3] w-full bottom-[-2px] h-[18px] "
        />
      ) : (
        <img
          src="/static/images/white-curve.png"
          alt="curve"
          className="absolute z-[3] w-full bottom-[-2px] h-[18px] "
        />
      )}
    </div>
  );
};

export default CommonBanner;
