"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Image from "next/image";

interface MissionWithCTAProps {
  missionData: DrupalNode;
  ctaData: DrupalNode;
}

const MissionWithCTA: React.FC<MissionWithCTAProps> = ({
  missionData,
  ctaData,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { scrollYProgress } = useScroll();

  const moveOverlayImage = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["-4%", "-1%"]
  );
  const mobileOverlayImage = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["-1.5%", "-0.5%"]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 767);
    }
  }, []);

  console.log(ctaData, "ctaData");

  return (
    <div className="pt-[92px] pb-[60px] bg-mapGray relative mobileMax:py-10">
      <motion.div
        style={{ top: isMobile ? mobileOverlayImage : moveOverlayImage }}
        className="absolute pointer-events-none z-[0]"
      >
        <img src="/static/images/about-us-home.svg" alt="overlay-bg" />
      </motion.div>

      <div className="mini-container relative z-[1]">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="remove-animation-fluctuation desktop:text-[66px] text-numans mb-4 tracking-tight desktop:leading-[85px] text-center history-title-gradient text-clip text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-1"
        >
          {missionData?.field_title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="remove-animation-fluctuation text-lightBlueText mb-20 text-[22px] text-center mobileMax:text-small mobileMax:mb-8"
          dangerouslySetInnerHTML={{
            __html: missionData?.field_description?.processed,
          }}
        />

        <div className="flex items-start justify-between flex-wrap box-border">
          {missionData?.field_add_card?.map(
            (card: DrupalNode, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
                className="remove-animation-fluctuation desktop:px-[15px] mb-[30px] w-[33%] betweenMobileTab:px-[10px] lieTablets:w-[50%] mobileMax:w-full mobileMax:px-0"
              >
                <div className="border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white px-4 py-[25px] min-h-[284px] flex items-center flex-col box-border w-full card-shadow">
                  {card?.field_icon?.uri?.url && (
                    <div className="mb-[23px] max-h-[120px] min-h-[120px] flex justify-center items-center overflow-hidden">
                      <Image
                        src={`${"https://dev-mission.keymouseit.com"}${
                          card?.field_icon?.uri?.url
                        }`}
                        alt="card icon"
                        width={120}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="h-full w-full">
                    <h4 className="--font-poppins text-center desktop:text-[27px] mb-2 text-landingBlue leading-normal capitalize text-medium">
                      {card?.field_title}
                    </h4>
                    <div
                      className="--font-poppins text-center text-small text-[#7b99c7] leading-6 mobileMax:leading-normal mobileMax:text-xsmall line-clamp-5"
                      dangerouslySetInnerHTML={{
                        __html: card?.field_description?.processed,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>

      {/* Approach Section */}
      <div
        id="approach"
        className="pt-[95px] pb-[160px] betweenMobileTab:py-14 mobileMax:py-10"
      >
        <div className="mini-container relative z-[1]">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation desktop:text-[66px] text-numans mb-0 desktop:leading-[85px] tracking-tight text-center history-title-gradient text-clip text-[48px] leading-normal mobileMax:text-[32px]"
          >
            {ctaData?.field_twi_title}
          </motion.h3>
          <div className="desktop:h-[140px] h-[50px]" />
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation"
          >
            {ctaData?.field_twi_image?.uri?.url && (
              <Image
                src={`${"https://dev-mission.keymouseit.com"}${
                  ctaData?.field_twi_image?.uri?.url
                }`}
                width={1000}
                height={1000}
                unoptimized
                alt="approach"
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MissionWithCTA;
