"use client";
import { DrupalNode } from "next-drupal";
import React from "react";
import { IoMdImages } from "react-icons/io";
import { motion } from "framer-motion";
import Link from "next/link";
import { config } from "@/lib/config";
import Image from "next/image";
import HeadingAndDescription from "@/components/sections/HeadingAndDescription";

interface CardWithImageAndIconProps {
  data: DrupalNode;
}

const CardWithImageAndIcon: React.FC<CardWithImageAndIconProps> = ({
  data,
}) => {
  return (
    <div className="bg-mapGray betweenMobileTab:py-16 mobileMax:py-10 relative py-[120px]">
      <div className="mini-container relative z-[2]">
        <HeadingAndDescription
          link={data?.field_button_link}
          title={data?.field_title}
        />
        <div className="flex flex-wrap justify-center box-border lieTablets:justify-start mt-[20px]">
          {data?.field_add_card?.map((card: DrupalNode) => {
            const slug =
              card?.field_title?.toLowerCase()?.replace(/\s+/g, "-") || "";
            return (
              <Link
                key={card?.id}
                href={`/country-engagement/india/${slug}`}
                className="cursor-pointer px-[15px] mobileMax:px-0 mt-[30px] w-[33%] lieTablets:w-[50%] mobileMax:w-full tab:hover:scale-105 transition-all duration-700 flex-shrink-0"
              >
                <motion.div
                  className="bg-white flex flex-col h-full rounded-lg shadow-md hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                    border: {
                      duration: 1.8,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {card?.field_image?.uri?.url ? (
                    <Image
                      src={`${config.apiBase}${card?.field_image?.uri?.url}`}
                      alt={card?.resourceIdObjMeta?.alt || "Card image"}
                      width={600}
                      height={300}
                      className="w-full h-56 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-56 bg-placeholder flex items-center justify-center">
                      <IoMdImages className="text-white w-[60%] h-[80px]" />
                    </div>
                  )}

                  <div className="px-5 py-10 mobileMax:py-5 text-center">
                    <div className="mb-5 flex justify-center items-center h-16">
                      <img
                        src={`${config.apiBase}${
                          card?.field_icon?.uri?.url || ""
                        }`}
                        alt={card?.resourceIdObjMeta?.alt || "Card image"}
                        className="h-full"
                      />
                    </div>

                    <p className="--font-poppins font-bold text-[20px] mobileMax:text-xsmall text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)]">
                      {card?.field_title}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardWithImageAndIcon;
