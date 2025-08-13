"use client";
import { DrupalNode } from "next-drupal";
import React from "react";
import { motion } from "framer-motion";

interface CardSectionProps {
  data: DrupalNode;
}

const GetInvolvedCard = ({ data }: CardSectionProps) => {
  return (
    <div className="mini-container relative z-[2]">
      <motion.h3
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0,
        }}
        className="remove-animation-fluctuation desktop:text-[55px] text-numans mb-5 desktop:leading-[85px] text-center category-gradient text-clip text-[48px] leading-normal mobileMax:text-[35px] mobileMax:mb-3"
      >
        {data?.field_title}
      </motion.h3>
      <div className="flex flex-wrap justify-start box-border mt-12 mobileMax:mt-6">
        {data?.field_add_card?.map((card: DrupalNode, index: number) => {
          const bgColor = card?.field_background_color;
          const bgClass =
            bgColor === "blue"
              ? "blueBg-gradient text-[#9af9ff]"
              : bgColor === "gray"
              ? "bg-[#ebf0f7]"
              : "bg-white";

          const descriptionColor =
            bgColor === "blue"
              ? "text-[#fff]"
              : bgColor === "gray"
              ? "text-cardText"
              : "text-[#7b99c7]";

          return (
            <motion.div
              key={index}
              className="remove-animation-fluctuation px-[6px] mb-[10px] w-[25%] mobileMax:mb-3 mobileMax:w-full mobileMax:px-0 lieTablets:w-[50%]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
            >
              <div
                className={`border-2 border-transparent hover:border-blueBorder transition rounded-xl h-full flex items-center flex-col box-border w-full card-shadow py-5 px-4 ${bgClass}`}
              >
                <div className="h-full w-full">
                  <h4
                    className={`text-numans text-center text-[22px] mb-3 leading-7 mobileMax:text-medium mobileMax:leading-7 ${
                      bgColor === "blue" ? "text-[#9af9ff]" : "text-landingBlue"
                    }`}
                  >
                    {card?.field_title}
                  </h4>
                  <div
                    className={`--font-poppins text-center text-small leading-6 mobileMax:text-xsmall mobileMax:leading-normal font-normal ${descriptionColor}`}
                    dangerouslySetInnerHTML={{
                      __html: card?.field_description?.processed,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GetInvolvedCard;
