"use client";

import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface TitleDescriptionBlockProps {
  data?: DrupalNode;
}

const TitleDescriptionBlock: React.FC<TitleDescriptionBlockProps> = ({
  data,
}) => {
  const backgroundColor = data?.field_cta_background_color;

  const variantConfig: Record<
    string,
    {
      backgroundClass: string;
      textColorClass: string;
      backgroundImageSrc: string;
      backgroundImageClass: string;
      isImageRight?: boolean;
    }
  > = {
    cta_white: {
      backgroundClass: "bg-white pb-20 mobileMax:pb-[80px]",
      textColorClass: "text-[#545D6F] global-ambition-text",
      backgroundImageSrc: "/static/images/cta-section-bg.svg",
      backgroundImageClass:
        "max-w-[15%] betweenMobileTab:max-w-[40%] mobileMax:max-w-[40%]",
    },
    cta_blue: {
      backgroundClass: "bg-footerbg z-[1] cta-single-card",
      textColorClass: "text-white call-to-action-text",
      backgroundImageSrc: "/static/images/cta-blue-bg.svg",
      backgroundImageClass:
        "max-w-[14%] betweenMobileTab:max-w-[28%] mobileMax:max-w-[45%]",
    },
    cta_gray: {
      backgroundClass: "bg-mapGray z-[1]",
      textColorClass: "text-[#545D6F] global-ambition-text",
      backgroundImageSrc: "/static/images/cta-blue-bg.svg",
      backgroundImageClass:
        "max-w-[16%] betweenMobileTab:max-w-[38%] mobileMax:max-w-[38%] rotate-180",
      isImageRight: true,
    },
  };

  const defaultVariant = variantConfig["cta_white"];

  const {
    backgroundClass,
    textColorClass,
    backgroundImageSrc,
    backgroundImageClass,
    isImageRight = false,
  } = variantConfig[backgroundColor] ?? defaultVariant;

  const content =
    data?.field_cta_description?.processed ||
    data?.field_cta_description?.value;

  return (
    <section
      id={data?.id}
      className={`${backgroundClass} overflow-hidden relative pt-5 pb-[60px] mobileMax:pt-0 mobileMax:pb-[80px] betweenMobileTab:pb-12`}
    >
      {backgroundImageSrc && !data?.field_cta_button ? (
        <motion.div
          className={`absolute pointer-events-none opacity-25 top-[50%] -translate-y-1/2 z-[1] ${
            isImageRight ? "right-0" : "left-0"
          } ${backgroundImageClass}`}
        >
          <img src={backgroundImageSrc} alt="background" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 90 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            duration: 2.8,
          }}
          className="absolute bottom-[2px] right-0 pointer-events-none max-w-[80%] aboveLaptop:max-w-[70%] desktop:opacity-100"
        >
          <img
            src="/static/images/get-inv-home.svg"
            alt="get-inv-home"
            className="desktopLg:opacity-100 opacity-50"
          />
        </motion.div>
      )}

      <div
        className={`mini-container h-full flex flex-col items-center justify-center relative z-[3] ${
          !data?.field_cta_button ? "pt-[82px]" : "pt-[120px] pb-16"
        }`}
      >
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className={`${
            data?.field_cta_button && "text-center desktop:text-[60px]"
          } desktop:text-[54px] text-numans mb-14 mobileMax:mb-8 desktop:leading-[70px] leading-normal category-gradient text-clip text-[48px] mobileMax:text-[28px]`}
        >
          {data?.field_cta_title}
        </motion.h3>

        {content && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className={`remove-animation-fluctuation text-medium ${textColorClass} --font-poppins leading-8 mobileMax:text-xsmall mobileMax:leading-normal`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {data?.field_cta_button && (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={data?.field_cta_button?.uri}
          >
            <Button className="block mx-auto min-w-[220px] get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg">
              {data?.field_cta_button?.title}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default TitleDescriptionBlock;
