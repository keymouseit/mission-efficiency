"use client";

import { DrupalNode } from "next-drupal";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatDateToUS, resolveLink } from "@/utils";
import { MdChevronRight } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";

interface CardWithImageTitleChipProps {
  data: DrupalNode;
}

const NewsAndEventCard: React.FC<CardWithImageTitleChipProps> = ({ data }) => {
  return (
    <div className="pt-[60px] pb-[80px] betweenMobileTab:py-16 mobileMax:py-10 bg-white">
      <div className="mini-container">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="remove-animation-fluctuation relative text-center mb-[80px] mobileMax:mb-8"
        >
          <h2
            className="desktop:text-[52px] font-poppins font-semibold
              text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)]
              leading-normal text-center text-clip text-[48px]
              mobileMax:text-[28px] mb-10"
          >
            {data?.field_title}
          </h2>

          <Link
            href={resolveLink(data?.link?.uri)}
            className="desktop:flex hidden absolute z-10 right-0 top-[25px] 
              items-center justify-center font-poppins font-[600] 
              text-transparent bg-clip-text 
              bg-[linear-gradient(to_right,#48DBB2,#003350)] 
              text-xmedium rounded-[10px] underline"
          >
            {data?.link?.title}
            <Image
              className="w-[9px] h-[15px] ml-[25px] mt-[2px]"
              src="/static/images/Vector.svg"
              alt="Vector icon"
              width={9}
              height={15}
            />
          </Link>
        </motion.div>

        <div className="!flex justify-center gap-4 flex-wrap">
          {data?.data?.map((newsData: DrupalNode, index: number) => {
            const redirectLink = newsData.field_news_link
              ? newsData.field_news_link
              : "#";

            return (
              <Link
                href={
                  newsData?.field_mark_as_external_source
                    ? redirectLink
                    : newsData?.id
                    ? `/news/${newsData?.id}`
                    : "/news"
                }
                key={index}
                className="relative w-[96%] minMobile:w-[96%] aboveMinMobile:w-[96%] mobileMax:w-[96%] 
                betweenMobileTab:w-[48%] lieTablets:w-[48%] aboveLaptop:w-[48%] 
                largeDesk:w-[30%] padPro:w-[30%] desktop:w-[30%] 
                h-[420px] rounded-2xl overflow-hidden shadow-md group duration-700 
                hover:scale-105 hover:shadow-2xl transition-all"
                target={
                  newsData?.field_mark_as_external_source ? "_blank" : "_self"
                }
              >
                {/* Background Image */}
                {newsData?.field_news_media_url.includes(
                  "mission-efficiency.pantheonsite.io"
                ) ? (
                  <div className="absolute inset-0">
                    <Image
                      src={
                        newsData?.field_news_media_url ||
                        "/static/images/fallback.png"
                      }
                      alt="news image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                      priority={index < 2}
                    />
                  </div>
                ) : (
                  <img
                    src={`${newsData?.field_news_media_url}`}
                    alt="news image"
                    className="object-cover h-full w-full"
                  />
                )}

                {/* Overlay gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-black/80 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-l from-[#A0DDFF] to-[#48DBB2] text-[#263AAD] shadow">
                    {newsData?.field_n_resource?.name || "News"}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[14px] mb-1 opacity-80">
                    {newsData?.field_card_date &&
                      formatDateToUS(newsData?.field_card_date)}
                  </p>
                  <h3 className="text-[18px] font-semibold leading-snug line-clamp-2">
                    {newsData?.title}
                  </h3>

                  <div className="mt-2 inline-flex items-center text-sm text-white">
                    Learn More
                    <MdChevronRight className="w-[18px] h-[18px] ml-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation flex justify-center"
        >
          <Link
            href={resolveLink(data?.link?.uri)}
            className="flex desktop:hidden betweenMobileTab:mt-10 mt-[60px] about-gradient-title text-clip items-center justify-center font-poppins font-[600] !text-[#11055F] text-xmedium rounded-[10px] !underline mobileMax:min-w-full mobileMax:text-small "
          >
            {data?.link?.title}{" "}
            <FaChevronRight className="text-small ml-1 text-[#3560b3]" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsAndEventCard;
