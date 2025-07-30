"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Image from "next/image";

type MissionSectionProps = {
  data: DrupalNode;
};

const MissionSection: React.FC<MissionSectionProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const [hasMounted, setHasMounted] = useState(false);

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
    setHasMounted(true);

    if (typeof window !== "undefined") {
      if (window.innerWidth < 767) {
        setIsMobile(true);
      }
    }
  }, []);

  return (
    <div className="pt-[92px] pb-[60px] bg-mapGray relative mobileMax:py-10">
      {hasMounted && (
        <motion.div
          style={{
            top: isMobile ? mobileOverlayImage : moveOverlayImage,
          }}
          className="absolute pointer-events-none z-[0]"
        >
          <img src="/static/images/about-us-home.svg" alt="overlay-bg" />
        </motion.div>
      )}

      <div className="mini-container relative z-[1]">
        {data?.field_title && (
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation desktop:text-[66px] text-numans mb-4 tracking-tight desktop:leading-[85px] text-center history-title-gradient text-clip text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-1"
          >
            {data.field_title}
          </motion.h3>
        )}

        {data?.field_description && (
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation text-lightBlueText mb-20 text-[22px] text-center mobileMax:text-small mobileMax:mb-8"
            dangerouslySetInnerHTML={{
              __html: data?.field_description.processed,
            }}
          />
        )}

        <div className="flex items-start justify-between flex-wrap box-border">
          {data?.field_add_card?.map(
            (missionCard: DrupalNode, index: number) => (
              <motion.div
                key={index}
                className="remove-animation-fluctuation desktop:px-[15px] mb-[30px] w-[33%] mobileMax:w-full mobileMax:px-0 betweenMobileTab:px-[10px] lieTablets:w-[50%]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
              >
                <div className="border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white px-4 py-[25px] min-h-[284px] flex items-center flex-col box-border w-full card-shadow">
                  <div className="mb-[23px] max-h-[120px] min-h-[120px] flex justify-center items-center overflow-hidden">
                    {missionCard?.field_icon?.uri?.url && (
                      <Image
                        src={`${"https://dev-mission.keymouseit.com"}${
                          missionCard.field_icon.uri.url
                        }`}
                        alt="category img"
                        width={120}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="h-full w-full">
                    {missionCard?.field_title && (
                      <h4 className="--font-poppins text-center desktop:text-[27px] mb-2 text-landingBlue leading-normal capitalize text-medium">
                        {missionCard.field_title}
                      </h4>
                    )}
                    {missionCard?.field_description?.processed && (
                      <div
                        className="--font-poppins text-center text-small text-[#7b99c7] leading-6 line-clamb-6 mobileMax:leading-normal mobileMax:text-xsmall line-clamp-5"
                        dangerouslySetInnerHTML={{
                          __html: missionCard.field_description.processed,
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
