"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion"

interface InvestGridProps {
  gridImg1?: string;
  gridImg2?: string;
  title?: string;
  subTitle: string;
  buttonText: string;
  buttonLink: string;
}

const InvestGridLayout: React.FC<InvestGridProps> = (props) => {
  const {
    title = "",
    gridImg1 = "",
    gridImg2 = "",
    subTitle = "",
    buttonText = "",
    buttonLink = "",
  } = props;

  return (
    <div className="relative z-[1] flex items-start justify-between mobileMax:block">
      <div className="w-[50%] mobileMax:w-full">
        <div className="flex items-end flex-col mr-16 betweenMobileTab:mr-8 mobileMax:mr-0">
          <motion.div
            className="overflow-hidden rounded-[25px] w-full h-[285px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 1.8,
            }}
          >
            <img
              src={gridImg1}
              alt="grid img1"
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
          <motion.div className="overflow-hidden rounded-[25px] laptop:max-w-[50%] laptop:h-[222px] h-[180px] mt-10 max-w-[250px] w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            duration: 3,
          }}>
            <img
              src={gridImg2}
              alt="grid img2"
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
      <div className="w-[46%] mobileMax:w-full mobileMax:mt-8">
        <h2 className="text-numans text-[#545d6f] text-[35px] mb-[30px] leading-[40px] lieTablets:mb-5 lieTablets:text-[25px] lieTablets:leading-normal mobileMax:text-medium mobileMax:mb-3 mobileMax:leading-[28px]">
          {title}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: subTitle }}
          className="--font-poppins text-medium mb-5 mt-3 invest-list leading-8 text-[#545d6f] mobileMax:mb-5 mobileMax:text-xsmall mobileMax:leading-normal"
        />
        {/* <p className="--font-poppins text-medium mb-5 mt-3 leading-8 text-[#545d6f]">
          {subTitle}
        </p> */}
        <Link
          href={buttonLink}
          className="h-[46px] rounded-md bg-buttonOverlay px-[30px] flex max-w-[160px] items-center justify-center mt-10 hover:bg-blueHover"
        >
          <span className="text-clip learnBtn --font-poppins text-xsmall font-medium">
            {buttonText}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default InvestGridLayout;
