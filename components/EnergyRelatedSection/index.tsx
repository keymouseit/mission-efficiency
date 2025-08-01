"use client";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Image from "next/image";

interface EnergyRelatedSectionProps {
  data: DrupalNode;
}

export default function EnergyRelatedSection({
  data,
}: EnergyRelatedSectionProps): React.ReactElement {
  const cards = data?.field_add_card || [];
  const hasOnlyOneCard = cards.length === 1;

  const cardsToRender = hasOnlyOneCard ? [] : cards.slice(0, -1);
  const bannerCard = hasOnlyOneCard ? cards[0] : cards[cards.length - 1];

  return (
    <div className="py-[100px] bg-graybg mobileMax:pt-12 pb-16 betweenMobileTab:py-10 overflow-hidden">
      <div className="mini-container">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="remove-animation-fluctuation text-clip support-gradient tracking-tight text-[35px] leading-normal mb-[50px] text-center text-numans mobileMax:text-[28px] mobileMax:mb-8"
        >
          {data?.field_title}
        </motion.h3>

        {/* Render all cards except last */}
        <div className="flex flex-wrap justify-center box-border !overflow-hidden">
          {cardsToRender.map((relatedCard: DrupalNode, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0 }}
              className="remove-animation-fluctuation px-[15px] mb-[30px] w-[25%] betweenMobileTab:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5"
            >
              <div className="rounded-xl h-full flex items-start flex-col box-border w-full">
                <div className="mb-5 mx-auto h-[34px]">
                  <Image
                    src={`https://dev-mission.keymouseit.com${
                      relatedCard?.field_icon?.uri?.url || ""
                    }`}
                    alt="category img"
                    height={34}
                    width={34}
                    className="h-full w-full"
                  />
                </div>
                <div className="h-full w-full">
                  <h4 className="--font-poppins text-center text-medium mb-4 text-landingBlue leading-8 capitalize">
                    {relatedCard?.field_title}
                  </h4>
                  <div
                    className="--font-poppins text-center text-xsmall text-[#788ba9] leading-6"
                    dangerouslySetInnerHTML={{
                      __html: relatedCard?.field_description?.processed || "",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spacer */}
        <div className="h-[100px] mobileMax:h-[50px] betweenMobileTab:h-[60px]" />

        {/* Blue Banner Section (with either the last card or only card) */}
        {bannerCard && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation rounded-xl h-full w-full blueBg-gradient px-5 py-[48px] mobileMax:py-10 flex items-center justify-center flex-col box-border laptop:min-w-[340px]"
          >
            <div className="flex items-center flex-col box-border desktop:w-[52%] w-[70%] mobileMax:w-full">
              <div className="mb-8 h-[34px]">
                <Image
                  src={`https://dev-mission.keymouseit.com${
                    bannerCard?.field_icon?.uri?.url || ""
                  }`}
                  alt="category img"
                  height={34}
                  width={34}
                  className="h-full w-full"
                />
              </div>
              <div className="h-full w-full">
                <h4 className="text-numans text-center text-[40px] mb-8 text-white tracking-tight leading-8 capitalize mobileMax:text-[28px] mobileMax:mb-6 mobileMax:leading-6">
                  {bannerCard?.field_title}
                </h4>
                <div
                  className="--font-poppins text-center text-small text-[#C9DEFF] mb-4 leading-[26px] mobileMax:text-xsmall mobilemax:leading-normal"
                  dangerouslySetInnerHTML={{
                    __html: bannerCard?.field_description?.processed || "",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
