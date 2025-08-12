"use client";

import { DEV_PUBLIC_URL } from "@/services/api";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import DynamicImage from "../ResuableDynamicImage";

interface CampaignSectionProps {
  materialsData?: DrupalNode;
  resourcesData?: DrupalNode;
}

const CampaignSection: React.FC<CampaignSectionProps> = ({
  materialsData,
  resourcesData,
}) => {
  const drupalBaseUrl = DEV_PUBLIC_URL;
  return (
    <div className="relative bg-mapGray overflow-hidden">
      <div className="mini-container relative z-[2]">
        {/* Campaign Materials */}
        {materialsData && (
          <section className="my-16 mobileMax:my-8">
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0 }}
              className="remove-animation-fluctuation text-[48px] text-numans mb-8 mobileMax:mb-5 leading-normal text-center history-title-gradient text-clip mobileMax:text-[28px]"
            >
              {materialsData?.field_title}
            </motion.h3>

            <div className="flex flex-wrap justify-start box-border mt-8 mobileMax:mt-6">
              {materialsData?.field_add_card.map(
                (materialCard: DrupalNode, index: number) => (
                  <motion.div
                    key={index}
                    className="remove-animation-fluctuation px-[15px] mb-[25px] w-[33%] mobileMax:w-full mt-2 mobileMax:px-0 lieTablets:w-[50%] mobileMax:mb-5 mobileMax:mt-0"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0 }}
                  >
                    <div className="border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white p-5 h-full flex items-center flex-col box-border w-full card-shadow">
                      <div className="h-[80%]">
                        <div className="mb-5 mx-auto h-[50px] w-[50px] rounded-[12px] overflow-hidden">
                          <DynamicImage
                            src={`${drupalBaseUrl}${materialCard?.field_icon?.uri?.url}`}
                            alt="category img"
                            height={50}
                            width={50}
                            className="h-full w-full"
                          />
                        </div>
                        <h4 className="text-numans text-center text-[22px] mb-4 text-landingBlue leading-7 mobileMax:text-medium mobileMax:leading-7 font-medium">
                          {materialCard?.field_title}
                        </h4>
                      </div>

                      {/* Button */}
                      {materialCard?.field_button[0]?.uri ? (
                        <Link
                          href={materialCard?.field_button[0]?.uri || "#"}
                          target="_blank"
                          className="h-[20%] mobileMax:w-full flex items-center mt-5 rounded-[23px] justify-center text-small text-white blue-gradient get-involve-btn font-mediums --font-poppins !px-8 min-h-[35px]"
                        >
                          {materialCard?.field_button[0]?.title}
                        </Link>
                      ) : (
                        <div className="h-[20%] mobileMax:w-full flex items-center mt-5 rounded-[23px] justify-center text-small text-white blue-gradient get-involve-btn font-mediums --font-poppins !px-8 min-h-[35px]">
                          {materialCard?.field_button[0]?.title}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </section>
        )}

        {/* Campaign Resources */}
        {resourcesData && (
          <section className="mb-16 mobileMax:mb-0">
            {resourcesData?.field_twi_image_position === "twi_left" && (
              <motion.h3
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
                className="remove-animation-fluctuation text-[48px] text-numans mb-10 mobileMax:mb-5 leading-normal text-center history-title-gradient text-clip mobileMax:text-[28px]"
              >
                Campaign Resources
              </motion.h3>
            )}
            <div className="flex items-start flex-wrap mt-8 lieExactTab:mt-10 lieExactTab:flex-col">
              <div className="flex items-start justify-between mb-24 last:mb-0 lieExactTab:mb-6 lieExactTab:flex-col">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0 }}
                  className={`remove-animation-fluctuation ${
                    resourcesData?.field_twi_image_position === "twi_right"
                      ? "order-2"
                      : ""
                  } w-full laptop:flex-1 h-full lieExactTab:order-1 rounded-[12px] overflow-hidden laptop:max-h-[700px] max-h-[900px]`}
                >
                  {resourcesData?.field_twi_image?.uri?.url && (
                    <DynamicImage
                      src={`${drupalBaseUrl}${resourcesData?.field_twi_image.uri.url}`}
                      alt="campaign resources"
                      height={400}
                      width={400}
                      objectFit="cover"
                      className="h-full w-full card-shadow transform transition-transform duration-500 hover:scale-105"
                    />
                  )}
                </motion.div>

                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0 }}
                  className={`remove-animation-fluctuation ${
                    resourcesData?.field_twi_image_position === "twi_right"
                      ? "order-1 mr-16 lieExactTab:mr-0 lieExactTab:mt-8"
                      : "ml-16 lieExactTab:ml-0 lieExactTab:mt-8"
                  } laptop:flex-1 h-full lieExactTab:order-1 lieExactTab:pb-12`}
                >
                  <h5 className="text-numans text-[#545d6f] text-[35px] mb-[30px] lieTablets:mb-5 lieTablets:text-[25px] leading-normal mobileMax:text-medium mobileMax:mb-3 uppercase">
                    {resourcesData?.field_twi_title}
                  </h5>
                  <div
                    className="--font-poppins text-left text-cardText text-medium leading-normal mobileMax:text-small mb-8 mobileMax:mb-5 elevate-link"
                    dangerouslySetInnerHTML={{
                      __html: resourcesData?.field_twi_image_description.value,
                    }}
                  />
                  <Link
                    href={resourcesData?.field_twi_button[0]?.uri || "#"}
                    target="_blank"
                    className="h-[46px] rounded-md bg-buttonOverlay px-[30px] flex max-w-[160px] items-center justify-center mt-10 text-[#0077e4] font-mediums --font-poppins text-xsmall hover:bg-blueHover"
                  >
                    {resourcesData?.field_twi_button[0]?.title}
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CampaignSection;
