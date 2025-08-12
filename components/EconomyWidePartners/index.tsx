"use client";

import { DEV_PUBLIC_URL } from "@/services/api";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import DynamicImage from "../ResuableDynamicImage";

interface EconomyWidePartnersProps {
  data: DrupalNode;
}

const EconomyWidePartners: React.FC<EconomyWidePartnersProps> = ({ data }) => {
  return (
    <section
      id="Resources-and-Tools-support"
      className="relative support-bottom-banner"
    >
      <DynamicImage
        width={1880}
        height={15}
        src="/static/images/blue-curve.png"
        alt="curve"
        className="absolute z-[3] w-full top-[-14px] h-[15px] pointer-events-none"
      />

      {/* Top Section */}
      <div className="overflow-hidden relative min-h-[560px] pt-[140px] pb-[100px] box-border mobileMax:py-10">
        <div className="absolute desktop:top-[-13%] top-[120px] left-0 z-[-2] pointer-events-none max-w-full max-w-[38%]">
          <DynamicImage
            src="/static/images/ewpartners-bg-1.svg"
            alt="left-bg"
            width={851}
            height={1703}
          />
        </div>
        <div className="desktop:top-[-13%] right-0 z-[-2] absolute pointer-events-none max-w-[40%] top-[120px] desktop:opacity-100 opacity-[0.6]">
          <DynamicImage
            src="/static/images/ewpartners-bg-2.svg"
            alt="right-bg"
            width={652}
            height={1120}
          />
        </div>

        {/* Title + Cards */}
        <div className="mini-container h-full flex flex-col items-center justify-center mobileMax:block">
          <div className="mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0 }}
              className="remove-animation-fluctuation mobileMax:pt-[60px] title-green-gradient text-clip tracking-tight desktop:text-xlarge desktop:mb-[70px] mt-0 leading-tight text-center text-numans text-[45px] mobileMax:text-[32px] mb-10"
            >
              {data?.field_title}
            </motion.h2>

            <div className="flex flex-wrap justify-center box-border">
              {data?.field_add_card?.map(
                (listItem: DrupalNode, index: number) => (
                  <motion.div
                    key={index}
                    className="remove-animation-fluctuation px-[15px] mb-[30px] w-[33%] min-h-[280px] mobileMax:w-full mobileMax:px-0"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0 }}
                  >
                    <div
                      className={`flex items-center justify-center flex-col box-border w-full h-full card-shadow bg-white rounded-[30px] px-4 py-[25px] laptopMax:py-5 min-h-[320px] mobileMax:min-h-full`}
                    >
                      <div
                        className={`flex justify-center items-center w-full laptopMax:max-w-[180px] object-contain h-full max-w-[220px] mb-5 max-h-[130px]
                          `}
                      >
                        <DynamicImage
                          width={220}
                          height={130}
                          src={`${DEV_PUBLIC_URL}${listItem?.field_icon?.uri?.url}`}
                          alt="support img"
                          className={`max-h-full w-full object-contain h-[130px]`}
                        />
                      </div>
                      <div className="h-full mobileMax:flex mobileMax:flex-col mobileMax:justify-end mobileMax:items-center">
                        <p
                          className={`--font-poppins text-center text-[20px] text-cardHeading leading-7 laptopMax:mb-2 mobileMax:text-medium`}
                        >
                          {listItem?.field_title}
                        </p>
                        <Link
                          href={listItem?.field_button[0]?.uri}
                          target="_blank"
                          className="--font-poppins text-center text-xsmall text-[#004ee4] leading-6 flex items-center justify-center"
                        >
                          <ExternalLink className="w-[16px] h-[16px] max-w-[16px] mr-2" />
                          {listItem?.field_button[0]?.title}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EconomyWidePartners;
