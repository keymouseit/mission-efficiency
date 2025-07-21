"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CTAData {
  field_cta_going_from_title: string;
  field_cta_going_from_subtitle: string;
  field_cta_going_from_content?: {
    processed: string;
  };
  field_cta_going_from_image?: {
    uri?: {
      url?: string;
    };
  };
}

type CTAGoingFromSectionProps = {
  data: CTAData;
};

const CTAGoingFromClient = ({ data }: CTAGoingFromSectionProps) => {
  const {
    field_cta_going_from_title,
    field_cta_going_from_subtitle,
    field_cta_going_from_content,
    field_cta_going_from_image,
  } = data;

  return (
    <section className="bg-white">
      <div className="pt-5 pb-[60px] relative mobileMax:pb-10 overflow-hidden mini-container">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="remove-animation-fluctuation py-6 mobileMax:pb-5"
        >
          <div className="overflow-hidden">
            <motion.h3 className="desktop:text-[60px] text-numans mb-10 mobileMax:mb-8 desktop:leading-[70px] leading-normal text-center category-gradient text-clip px-5 text-[48px] mobileMax:text-[28px]">
              {field_cta_going_from_title}
            </motion.h3>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden">
            <motion.h3 className="text-lightBlueText mb-20 text-[22px] text-center mobileMax:text-small mobileMax:mb-8">
              {field_cta_going_from_subtitle}
            </motion.h3>
          </div>

          {/* Main content section: text + image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation flex items-center mobileToDesk:flex-col overflow-hidden"
          >
            {/* Text on the left */}
            <div
              className={`${
                field_cta_going_from_image?.uri?.url ? "w-[50%]" : "w-[100%]"
              } text-list relative mobileToDesk:w-full mobileToDesk:order-2`}
            >
              {field_cta_going_from_content?.processed && (
                <div
                  className="text-medium text-[#545D6F] --font-poppins leading-8 mobileMax:text-xsmall mobileMax:leading-normal"
                  dangerouslySetInnerHTML={{
                    __html: field_cta_going_from_content.processed,
                  }}
                />
              )}
            </div>

            {/* Image on the right */}
            {field_cta_going_from_image?.uri?.url && (
              <div className="w-[50%] h-[350px] ml-12 mobileToDesk:ml-0 mobileToDesk:order-1 mobileToDesk:mb-6 mobileToDesk:w-full">
                <div className="h-full w-full rounded-[40px] overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${field_cta_going_from_image?.uri?.url}`}
                    alt="cta-img"
                    height={520}
                    width={520}
                    objectFit="cover"
                    className="w-full h-full max-w-full card-shadow rounded-[12px] object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAGoingFromClient;
