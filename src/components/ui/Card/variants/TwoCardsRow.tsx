"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MdChevronRight } from "react-icons/md";
import { DrupalNode } from "next-drupal";
import { config } from "@/lib/config";
import { resolveLink } from "@/utils";

interface CardProps {
  data: DrupalNode;
}

export default function TwoCardsRow({ data }: CardProps) {
  return (
    <div className="py-[120px] betweenMobileTab:py-16 bg-white mobileMax:py-10 latest-new-slider">
      <div className="mini-container">
        <motion.h3
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="relative font-poppins font-semibold text-[32px] mb-10 text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)]
								leading-normal text-center text-clip mobileMax:text-[28px] mobileMax:px-0 betweenMobileTab:mb-5 mobileMax:mb-2"
        >
          {data?.field_title}
          <Link
            href={resolveLink(data?.field_button_link?.uri)}
            className="desktop:flex hidden z-10 absolute right-0 top-[12px] mobileMax:top-[20px] betweenMobileTab:top-[32px] text-clip items-center justify-center font-poppins font-[600] text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-xmedium rounded-[10px] !underline mobileMax:min-w-full mobileMax:text-small "
          >
            {data?.field_button_link?.title}{" "}
            <img
              className="w-[9px] h-[15.17px] ml-2 mt-[2px]"
              src="/static/images/Vector.svg"
              alt=""
            />
          </Link>
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation mb-16 mobileMax:mb-10 mobileMax:py-6"
        >
          <div className="grid grid-cols-2 betweenMobileTab:grid-cols-2 mobileMax:grid-cols-1 gap-6">
            {data?.field_add_card.map((card, index) => (
              <Link
                href={resolveLink(card?.field_links[0]?.uri)}
                key={index}
                className="relative w-full h-[380px] mobileMax:h-[245px] rounded-[50px] overflow-hidden shadow-md group duration-700 hover:scale-105 hover:shadow-md transition-all"
              >
                <Image
                  src={`${config.apiBase}${card?.field_image?.uri?.url || ""}`}
                  alt="bg img"
                  fill
                  className="object-fill"
                />
                <div className="absolute bottom-0 left-0 w-full h-[75%] bg-gradient-to-t from-black/90 via-black/40 to-transparent block mobileMax:hidden" />
                <div className="absolute bottom-0 left-0 w-full h-[90%] bg-gradient-to-t from-black/90 via-black/40 to-transparent mobileMax:block hidden" />

                <div className="absolute top-6 right-8">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-l from-[#A0DDFF] to-[#48DBB2] text-[#263AAD] shadow">
                    {card?.field_card_chip_name}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[14px] font-medium mb-1 opacity-80">
                    {card?.field_subtext[0]}
                  </p>
                  <h3 className="text-[18px] font-semibold leading-snug line-clamp-2">
                    {card.field_title}
                  </h3>
                  <span className="mt-2 inline-flex items-center text-sm text-white">
                    {card?.field_links[0] ?.title}
                    <MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-[4.5px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
        <div className="flex justify-center">
          <Link
            href={resolveLink(data?.field_button_link?.uri)}
            className="flex desktop:hidden betweenMobileTab:mt-10 mt-3 items-center justify-center font-poppins font-[600] text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-xmedium rounded-[10px] !underline"
          >
            {data?.field_button_link?.title}{" "}
            <img
              className="w-[9px] h-[15.17px] ml-2 mt-[2px]"
              src="/static/images/Vector.svg"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
