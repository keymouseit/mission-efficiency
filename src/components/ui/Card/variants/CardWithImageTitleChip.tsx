"use client";
import { config } from "@/lib/config";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import { motion } from "framer-motion";
import HeadingAndDescription from "@/components/sections/HeadingAndDescription";
import { resolveLink } from "@/utils";
import Image from "next/image";
import dynamic from "next/dynamic";
import type SliderType from "react-slick";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
}) as unknown as React.FC<SliderType["props"]>;

interface CardWithImageTitleChipProps {
  data: DrupalNode;
}

const sliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  lazyLoad: "ondemand" as const,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

const buildFinalUrl = (uri: string) => {
  if (!uri) return "#";

  if (uri.startsWith("http")) return uri;

  if (uri.startsWith("internal:/")) {
    uri = uri?.replace("internal:/", "/");
  }

  if (!uri.startsWith("/")) {
    uri = "/" + uri;
  }

  return uri;
};

interface NewsCardProps {
  newsData: any;
  isSlider?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsData, isSlider = false }) => {
  return (
    <Link
      href={buildFinalUrl(newsData?.field_links[0]?.uri)}
      target={isSlider ? "_blank" : "_self"}
      rel={isSlider ? "noopener noreferrer" : undefined}
      className={`relative w-[97%] block h-[420px] rounded-2xl overflow-hidden shadow-md group duration-700 hover:scale-105 hover:shadow-md transition-all 
            ${
              isSlider
                ? "mx-2"
                : "minMobile:w-[96%] aboveMinMobile:w-[96%] mobileMax:w-[96%] betweenMobileTab:w-[48%] lieTablets:w-[48%] aboveLaptop:w-[48%] largeDesk:w-[30%] padPro:w-[30%] desktop:w-[30%]"
            }
        `}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={`${config.apiBase}${newsData?.field_image?.uri?.url}`}
          alt={newsData?.field_title || "news image"}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-black/80 to-transparent" />

      {/* Category badge */}
      {newsData?.field_card_chip_name && (
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-l from-[#A0DDFF] to-[#48DBB2] text-[#263AAD] shadow">
            {newsData?.field_card_chip_name || "News"}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="text-[18px] font-semibold leading-snug line-clamp-2">
          {newsData?.field_title}
        </h3>
        <div className="mt-2 inline-flex items-center text-sm text-white">
          {newsData.field_links?.[0]?.title || "Learn More"}
          <MdChevronRight className="w-[18px] h-[18px] ml-0.5" />
        </div>
      </div>
    </Link>
  );
};

const CardWithImageTitleChip: React.FC<CardWithImageTitleChipProps> = ({
  data,
}) => {
  const isSlider = data?.field_add_card?.length > 3;
  return (
    <div>
      {isSlider ? (
        <div
          className={`
          ${
            data?.field_background_color === "blue"
              ? "bg-[#003350]"
              : data?.field_background_color === "white"
              ? "bg-white"
              : "bg-[#f9f9f9]"
          }
          py-[120px] 
          betweenMobileTab:py-16 
          mobileMax:py-10 
          latest-new-slider
        `}
        >
          <div className="mini-container">
            <HeadingAndDescription
              link={data?.field_button_link}
              title={data?.field_title}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0 }}
              className="remove-animation-fluctuation mb-16 mobileMax:mb-10 mobileMax:py-6 mt-[40px]"
            >
              <Slider
                {...sliderSettings}
                className="slider-theme-arrow slider-spaces flex justify-center px-4"
              >
                {data?.field_add_card?.map((newsData: any, index: number) => (
                  <div key={index} className="px-2">
                    <NewsCard newsData={newsData} isSlider={true} />
                  </div>
                ))}
              </Slider>
            </motion.div>
          </div>
        </div>
      ) : (
        <div
          className={`${
            data?.field_background_color === "blue"
              ? "bg-[#003350]"
              : "bg-[#f9f9f9]"
          } py-[120px] betweenMobileTab:py-16 mobileMax:py-10`}
        >
          <div className="mini-container">
            <HeadingAndDescription
              link={data?.field_button_link}
              title={data?.field_title}
              bgColor={data?.field_background_color}
            />
            <div className="flex justify-center gap-4 flex-wrap mt-[80px]">
              {data?.field_add_card?.map((newsData: any, index: number) => (
                <NewsCard key={index} newsData={newsData} isSlider={false} />
              ))}
            </div>
          </div>

          {data?.field_button_link && (
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <Link
                href={resolveLink(data?.field_button_link?.uri)}
                className="betweenMobileTab:flex mobileMax:flex hidden mt-[40px] items-center text-transparent bg-clip-text 
                    bg-[linear-gradient(to_right,#48DBB2,#003350)] font-poppins font-[600] text-[#11055F] underline"
              >
                {data?.field_button_link?.title}
                <Image
                  className="w-[8px] h-[14.17px] ml-[13px] mt-[2px]"
                  src="/static/images/Vector.svg"
                  alt="Vector icon"
                  width={9}
                  height={15}
                />
              </Link>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardWithImageTitleChip;
