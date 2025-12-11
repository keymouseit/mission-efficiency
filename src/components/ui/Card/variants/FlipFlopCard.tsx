"use client";
import { ExternalLink } from "lucide-react";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { motion } from "framer-motion";

interface FlipFlopCardProps {
  data: DrupalNode;
}

const FlipFlopCard: React.FC<FlipFlopCardProps> = ({ data }) => {
  const isBlue = data.field_background_color === "blue";
  const isWhite = data.field_background_color === "white";
  const isGray = data.field_background_color === "gray";
  return (
    <>
      <div
        id="multiple-benefit"
        className={`pt-20 pb-20 ${isBlue ? "bg-[#003350]" : ""}
      ${isWhite ? "bg-white" : ""}
      ${isGray ? "bg-[#f9f9f9]" : ""} relative  mobileMax:pt-10 mobileMax:pb-5`}
      >
        <div className="mini-container">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="mx-auto mobileMax:text-center text-center text-[42px] font-poppins mb-[20px] mobileMax:mb-8 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip mobileMax:text-[28px]"
          >
            {data?.field_title}
          </motion.h2>
          <div
            className="max-w-[880px] mx-auto mobileMax:order-3 mobileMax:mb-5 text-center text-small !text-[#828282] font-poppins font-normal mobileMax:text-xsmall leading-normal mb-[58px]"
            dangerouslySetInnerHTML={{
              __html: data?.field_description?.processed || "",
            }}
          />
          <div className="flex items-center flex-wrap">
            {data?.field_add_card?.map(
              (benefitsCard: DrupalNode, index: number) => {
                return (
                  <motion.div
                    key={index}
                    className="remove-animation-fluctuation px-[15px] mb-[30px] w-[25%] betweenMobileTab:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0,
                    }}
                  >
                    <div className="flip-card relative">
                      <div className="px-2.5 py-10 relative min-h-[220px] cursor-pointer flip-flop-card-box">
                        <div className="card-front-flop rounded-[15px] px-2.5 py-10 h-full w-full absolute top-0 left-0 bg-[linear-gradient(to_top,#003350,#48DBB2)]">
                          <p className="--font-poppins text-[27px] leading-normal text-white text-center">
                            {benefitsCard?.field_title}
                          </p>
                          <FiPlusCircle className="absolute bottom-2 right-2.5 text-white text-[35px]" />
                        </div>
                        <div className="card-back-flop rounded-[15px] px-6 py-8 h-full w-full absolute top-0 left-0 bg-[linear-gradient(to_top,#003350,#48DBB2)] flex flex-col">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                benefitsCard?.field_description?.processed,
                            }}
                            className="--font-poppins text-xsmall leading-normal text-white text-center mb-5 h-full"
                          />
                          {benefitsCard?.field_links?.length > 0 && (
                            <Link
                              href={benefitsCard?.field_links[0]?.uri}
                              className="--font-poppins text-center text-xsmall text-white leading-6 flex items-center justify-center h-full"
                            >
                              <ExternalLink className="w-[16px] h-[16px] max-w-[16px] mr-2" />
                              {benefitsCard?.field_links[0]?.title}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlipFlopCard;
