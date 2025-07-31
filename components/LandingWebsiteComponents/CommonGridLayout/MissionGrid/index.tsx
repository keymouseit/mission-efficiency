"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Image from "next/image";

interface MissionGridProps {
  gridImg1: string;
  gridImg2: string;
  gridImg3: string;
  title: string;
  subTitle: string;
  buttonText: string;
  buttonLink: string;
}

const MissionGridLayout: React.FC<MissionGridProps> = (props) => {
  const {
    title = "",
    gridImg1 = "",
    gridImg2 = "",
    gridImg3 = "",
    subTitle = "",
    buttonText = "",
    buttonLink = "",
  } = props;

  return (
    <div className="relative z-[1] flex items-center justify-between mobileMax:block">
      <div className="w-[50%] mobileMax:w-full">
        <div className="flex items-start flex-col mr-3">
          <motion.div
            className="overflow-hidden rounded-[25px] laptop:w-[80%] max-h-[266px] w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 2.8,
            }}
          >
            <img
              src={gridImg1}
              alt="grid img1"
              className="w-full h-full transform transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
          <div className="flex items-start w-full mt-5 overflow-hidden">
            <motion.div
              className="overflow-hidden rounded-[25px] max-w-[50%] max-h-[222px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2,
              }}
            >
              <img
                src={gridImg2}
                alt="grid img2"
                className="w-full h-full transform transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div
              className="overflow-hidden rounded-[25px] max-w-full max-h-[165px] ml-5"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.8,
              }}
            >
              <img
                src={gridImg3}
                alt="grid img3"
                className="w-full h-full transform transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 1.8,
        }}
        className="w-[45%] mobileMax:w-full mobileMax:mt-8"
      >
        <h2 className="text-numans text-[#545d6f] text-[35px] mb-[30px] lieTablets:mb-5 leading-[40px] lieTablets:text-[25px] lieTablets:leading-normal mobileMax:text-medium mobileMax:mb-3 mobileMax:leading-[28px]">
          {title}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: subTitle }}
          className="text-numans text-black text-small mb-[35px] leading-6 mobileMax:mb-5 mobileMax:text-xsmall mobileMax:leading-normal"
        />
        <Link
          href={buttonLink}
          className="h-[46px] rounded-md --font-poppins bg-buttonOverlay px-[30px] flex max-w-[160px] items-center justify-center hover:bg-blueHover"
        >
          <span className="text-clip learnBtn --font-poppins text-xsmall font-medium">
            {buttonText}
          </span>
        </Link>
      </motion.div>
    </div>
  );
};

export default MissionGridLayout;
