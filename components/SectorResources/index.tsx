"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { DrupalNode } from "next-drupal";
import { DEV_PUBLIC_URL } from "@/services/api";
import DynamicImage from "../ResuableDynamicImage";

interface SectorResourcesProps {
  data: DrupalNode;
}

const SectorResources: React.FC<SectorResourcesProps> = ({ data }) => {
  return (
    <section
      id="Sector-resources-and-partners"
      className="pt-10 pb-[140px] bg-graybg betweenMobileTab:pb-20 mobileMax:pb-10 mobileMax:pt-0"
    >
      <div className="mini-container">
        {/* Section Title */}
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="remove-animation-fluctuation pt-[82px] text-numans category-gradient tracking-tight desktop:text-[66px] desktop:leading-[85px] text-center text-clip text-[48px] leading-[60px] mb-14 desktop:mb-[100px] mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-8"
        >
          {data?.field_title}
        </motion.h3>

        {/* Sector Cards */}
        {data?.field_create_category.map(
          (sector: DrupalNode, index: number) => {
            return (
              <div
                key={index}
                className="flex items-start w-full justify-between desktop:flex-nowrap flex-wrap mb-[30px] border-b border-[#aec9f1] last:border-0"
              >
                {/* Sector Name */}
                <div className="desktop:w-[30%] w-full mb-5">
                  <motion.h3
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0 }}
                    className="remove-animation-fluctuation text-clip support-gradient text-[32px] tracking-tight leading-10 mr-5 text-numans mobileMax:text-[25px] desktop:px-0 px-5 mobileMax:px-5 mobileMax:leading-8 mobileMax:mr-0"
                  >
                    {sector?.field_category_name}:
                  </motion.h3>
                </div>

                {/* Sector List */}
                <div className="desktop:w-[70%] flex items-start flex-wrap w-full">
                  {sector?.field_add_card?.map(
                    (listItem: DrupalNode, index: number) => {
                      const { } = listItem;
                      return (
                        <motion.div
                          key={index}
                          className="remove-animation-fluctuation px-[15px] mb-[30px] w-[50%] min-h-[255px] h-full mobileMax:px-0 mobileMax:w-full mobileMax:mb-5 box-border"
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0,
                          }}
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
                      );
                    }
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default SectorResources;
