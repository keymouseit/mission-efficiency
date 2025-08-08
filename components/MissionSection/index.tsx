"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Image from "next/image";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import { DEV_PUBLIC_URL } from "@/services/api";
import { useOrigin } from "@/hooks/useOrigin";

type MissionSectionProps = {
  data: DrupalNode;
};

const MissionSection: React.FC<MissionSectionProps> = ({ data }) => {
  const origin = useOrigin();
  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const [hasMounted, setHasMounted] = useState(false);
  const title = data.field_title === "Resources and Tools";
  const title101 = data.field_title === "Energy Efficiency 101";
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
    <div
      id={title101 ? "Energy-Efficiency-101" : ""}
      className="pt-[92px] pb-[60px] bg-mapGray relative mobileMax:py-10"
    >
      {hasMounted && !title && (
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

        <div
          className={`flex flex-wrap box-border ${
            title
              ? "items-center justify-center"
              : "items-start"
          }`}
        >
          {data?.field_add_card?.map(
            (missionCard: DrupalNode, index: number) => (
              <motion.div
                key={index}
                className={`remove-animation-fluctuation w-[33%] mobileMax:w-full lieTablets:w-[50%] mobileMax:px-0 ${
                  missionCard?.field_icon?.uri?.url
                    ? "desktop:px-[15px] mb-[30px] betweenMobileTab:px-[10px]"
                    : "px-[15px] mb-[25px] mt-2 mobileMax:mb-5 mobileMax:mt-0"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
              >
                <div
                  className={`border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white flex items-center flex-col box-border w-full card-shadow ${
                    missionCard?.field_icon?.uri?.url
                      ? "px-4 py-[25px] min-h-[284px]"
                      : "px-5 pb-5 h-full"
                  }`}
                >
                  <div
                    className={`${
                      missionCard?.field_icon?.uri?.url ? "mb-[23px]" : ""
                    } max-h-[120px] min-h-[120px] flex justify-center items-center overflow-hidden`}
                  >
                    {missionCard?.field_icon?.uri?.url ? (
                      <Image
                        src={`${DEV_PUBLIC_URL}${missionCard.field_icon.uri.url}`}
                        alt="category img"
                        width={120}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="min-h-[80px] min-w-[80px] category-gradient rounded-full overflow-hidden flex items-center justify-center mobileMax:min-h-[55px] mobileMax:min-w-[55px]">
                        <div className="flex items-center justify-center text-numans text-center text-[35px] rounded-full overflow-hidden min-h-[70px] min-w-[70px] mobileMax:min-h-[45px] mobileMax:min-w-[45px] bg-white font-bold leading-10 --font-poppins mobileMax:text-medium mobileMax:leading-7">
                          <p className="category-gradient text-clip">
                            {index + 1}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="h-full w-full">
                    {missionCard?.field_title && (
                      <h4
                        className={`${
                          missionCard?.field_icon?.uri?.url
                            ? "desktop:text-[27px]"
                            : "text-[22px]"
                        } --font-poppins text-center mb-2 text-landingBlue leading-normal capitalize text-medium`}
                      >
                        {missionCard.field_title}
                      </h4>
                    )}
                    {missionCard?.field_description?.processed && (
                      <div
                        className={`--font-poppins text-center text-small text-[#7b99c7] leading-6 mobileMax:leading-normal mobileMax:text-xsmall ${
                          missionCard?.field_icon?.uri?.url
                            ? "line-clamp-5"
                            : "mb-5 elevate-card-ellipse font-normal"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: missionCard.field_description.processed,
                        }}
                      />
                    )}

                    {missionCard?.field_button.length ? (
                      <Link
                        href={
                          missionCard.field_button[0]?.uri?.startsWith(
                            "internal:"
                          )
                            ? `${origin}${missionCard.field_button[0].uri.replace(
                                "internal:",
                                ""
                              )}`
                            : missionCard.field_button[0]?.uri || "#"
                        }
                        target="_blank"
                        className="--font-poppins text-small text-defaultLink leading-6 flex items-center justify-center cursor-pointer  mobileMax:text-xsmall"
                      >
                        {missionCard.field_button[0]?.title}
                        <MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5" />
                      </Link>
                    ) : (
                      ""
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
