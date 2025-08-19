"use client";

import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { DEV_PUBLIC_URL } from "@/services/api";
import { useOrigin } from "@/hooks/useOrigin";
import DynamicImage from "../ResuableDynamicImage";
import JoinNow from "./JoinNow";

interface TitleDescriptionBlockProps {
  data?: DrupalNode;
  newBanner?: DrupalNode;
}

const TitleDescriptionBlock: React.FC<TitleDescriptionBlockProps> = ({
  data,
  newBanner,
}) => {
  const origin = useOrigin();

  const idMapping: Record<string, string> = {
    "Mission Efficiency Pledge": "Mission-Efficiency-Pledge",
    "UN Energy Compact": "UN-Energy-Compact",
    "Nationally Determined Contributions (NDCs)": "NDCs",
    "Energy Efficient Life": "Energy-Efficient-Life",
  };

  const sectionId = idMapping[data?.field_cta_title as string] || data?.id;

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

  const {
    backgroundClass,
    textColorClass,
    backgroundImageSrc,
    backgroundImageClass,
    isImageRight = false,
  } = variantConfig[backgroundColor as keyof typeof variantConfig] ??
  variantConfig.cta_white;

  const content =
    data?.field_cta_description?.processed ||
    data?.field_cta_description?.value;

  const bgImageUrl = data?.field_background_image?.uri?.url
    ? `${DEV_PUBLIC_URL}${data.field_background_image.uri.url}`
    : null;

  return (
    <>
      {newBanner ? (
        <JoinNow data={newBanner} />
      ) : (
        <section
          id={sectionId}
          className={`${
            bgImageUrl ? "bg-black" : backgroundClass
          } overflow-hidden relative pt-5 pb-[60px] mobileMax:pt-0 mobileMax:pb-[80px] betweenMobileTab:pb-12`}
        >
          {bgImageUrl ? (
            <DynamicImage
              fill
              height={467}
              src={bgImageUrl}
              alt="background"
              className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none opacity-40"
            />
          ) : backgroundImageSrc && !data?.field_cta_button ? (
            <motion.div
              className={`absolute pointer-events-none opacity-25 top-[50%] -translate-y-1/2 z-[1] ${
                isImageRight ? "right-0" : "left-0"
              } ${backgroundImageClass}`}
            >
              <DynamicImage
                width={301}
                height={603}
                src={backgroundImageSrc}
                alt="background"
                priority={true}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 90 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 2.8 }}
              className="absolute bottom-[2px] right-0 pointer-events-none max-w-[80%] aboveLaptop:max-w-[70%] desktop:opacity-100 z-[1]"
            >
              <DynamicImage
                width={618}
                height={897}
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
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0 }}
              className={`${
                data?.field_cta_button ? "text-center desktop:text-[60px]" : ""
              } ${
                bgImageUrl
                  ? "text-white"
                  : "text-numans category-gradient text-clip"
              } desktop:text-[54px] mb-14 mobileMax:mb-8 desktop:leading-[70px] leading-normal text-[48px] mobileMax:text-[28px]`}
            >
              {data?.field_cta_title}
            </motion.h2>

            {content && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
                className={`remove-animation-fluctuation text-medium ${
                  bgImageUrl ? "text-white text-center" : textColorClass
                } --font-poppins leading-8 mobileMax:text-xsmall mobileMax:leading-normal`}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}

            {data?.field_cta_button && (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={
                  data?.field_cta_button?.uri.startsWith("internal:")
                    ? `${origin}${data.field_cta_button.uri.replace(
                        "internal:",
                        ""
                      )}`
                    : data.field_cta_button.uri
                }
                className={`${bgImageUrl ? "mt-10" : ""}`}
              >
                <Button className="block mx-auto min-w-[220px] get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg">
                  {data?.field_cta_button?.title}
                </Button>
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default TitleDescriptionBlock;
