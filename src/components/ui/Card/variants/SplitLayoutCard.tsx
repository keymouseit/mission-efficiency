"use client";
import { config } from "@/lib/config";
import { resolveLink } from "@/utils";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import { useState } from "react";

interface CardProps {
  data: DrupalNode;
}

export default function SplitLayoutCard({ data }: CardProps) {
  const [whySelectedIndex, setWhySelectedIndex] = useState<number>(0);

  const cards = (data?.field_add_card as any[]) || [];
  const leftCard = cards[whySelectedIndex];
  const rightCards = cards.filter((_card, idx) => idx !== whySelectedIndex);

  return (
    <div className="py-[120px] mini-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0 }}
        className="remove-animation-fluctuation"
      >
        <h3 className="bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip text-[32px] font-semibold text-center mb-[25px]">
          {data.field_title}
        </h3>
        <p
          className="text-[16px] text-[#828282] font-poppins mobileMax:mb-6 leading-8 mobileMax:text-xsmall mobileMax:leading-normal text-center"
          dangerouslySetInnerHTML={{
            __html: data?.field_description?.processed,
          }}
        />
      </motion.div>

      <div className="flex flex-col desktop:flex-row mt-[50px] gap-[15px] items-center justify-center">
        {/* Left Section */}
        {leftCard && (
          <div className="relative overflow-hidden w-full group desktop:w-[806px] h-[733px] flex-shrink-0">
            <img
              src={`${config.apiBase}${leftCard?.field_image?.uri?.url || ""}`}
              alt="Left"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full bg-[#003350] p-[20px] desktop:py-[36px] desktop:px-[59px]">
              <p className="text-[22px] text-[#48DBB2] font-semibold">
                {leftCard?.field_title}
              </p>
                <div
                  className="text-[16px] text-white mt-[15px] leading-7 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mt-1"
                  dangerouslySetInnerHTML={{
                    __html: leftCard?.field_description?.processed,
                  }}
                />
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex flex-col gap-[17px] w-full betweenMobileTab:mt-[20px]">
          {rightCards.map((card: any) => {
            const originalIndex = cards.findIndex((c) => c === card);
            return (
              <div
                key={card?.id || originalIndex}
                className="relative overflow-hidden group h-[170px] cursor-pointer"
                onClick={() => setWhySelectedIndex(originalIndex)}
              >
                <img
                  src={`${config.apiBase}${card?.field_image?.uri?.url || ""}`}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end justify-center ">
                  <p className="text-white text-[18px] font-semibold text-center px-4 mb-[15px]">
                    {card?.field_title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Link href={resolveLink(data?.field_button_link?.uri)} className="">
        <div className="bg-[linear-gradient(to_left,#003350,#48DBB2)] rounded-[10px] h-[52px] w-[225px] text-white mx-auto font-semibold mt-[40px]">
          <button className="w-full h-full">{data?.field_button_link?.title}</button>
        </div>
      </Link>
    </div>
  );
}
