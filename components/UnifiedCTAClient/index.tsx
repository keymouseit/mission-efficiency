"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { DrupalNode } from "next-drupal";
import ObjectiveListComponent from "../ObjectiveFieldComponent";

type PrimaryCTASectionProps = {
  data: DrupalNode;
};

function UnifiedCTAClient({ data }: PrimaryCTASectionProps) {
  const isLeftPosition = data?.field_twi_image_position === "twi_left";
  const hasDescription = data?.field_twi_image_description?.processed &&
    data?.field_twi_image_description?.processed.trim() !== '';
  console.log(data)

  return (
    <section
      id={isLeftPosition ? "mission-call-to-action" : undefined}
      className={`bg-white relative overflow-hidden ${isLeftPosition
        ? "pt-[92px] mobileMax:pt-10 betweenMobileTab:pt-16 pb-8 CTA-wrap"
        : ""
        }`}
    >
      {/* Background shape - only for left position */}
      {isLeftPosition && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 2.5 }}
          className="absolute pointer-events-none top-[-10%] left-0 z-[0] betweenMobileTab:top-[12%] betweenMobileTab:opacity-50 mobileMax:top-[21%]"
        >
          <img
            src="/static/images/about-us-home.svg"
            alt="overlay-bg"
            className="mobileMax:opacity-40"
          />
        </motion.div>
      )}

      <div
        className={`mini-container relative ${isLeftPosition ? "z-[1]" : ""
          } overflow-hidden ${!isLeftPosition ? "pt-5 pb-[60px] mobileMax:pb-10" : ""
          }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className={`remove-animation-fluctuation ${isLeftPosition ? "py-12 mobileMax:pb-5" : "py-6 mobileMax:pb-5"
            }`}
        >
          {/* Title */}
          <div className={isLeftPosition ? "" : "overflow-hidden"}>
            <motion.h3 className="desktop:text-[60px] text-numans mb-10 mobileMax:mb-8 desktop:leading-[70px] leading-normal text-center category-gradient text-clip px-5 text-[48px] mobileMax:text-[28px]">
              {data?.field_twi_title}
            </motion.h3>
          </div>

          {/* Description content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className={`remove-animation-fluctuation ${isLeftPosition
              ? "flex items-center mb-20 mobileToDesk:flex-col overflow-hidden"
              : `w-[100%] text-list relative mobileToDesk:w-full mobileToDesk:order-2`
              }`}
          >
            <div
              className={`${isLeftPosition
                ? "w-full text-list relative mobileToDesk:order-2 mobileToDesk:w-full mobileToDesk:mt-6"
                : ""
                }`}
            >
              {data?.field_twi_description?.processed && (
                <div
                  className={`--font-poppins leading-8 ${isLeftPosition
                    ? "text-medium text-[#545D6F] mb-12 !text-left mobileMax:text-xsmall mobileMax:leading-normal"
                    : "text-lightBlueText text-[22px] mb-16 text-center mobileMax:text-xsmall mobileMax:leading-normal"
                    }`}
                  dangerouslySetInnerHTML={{
                    __html: data?.field_twi_description.processed,
                  }}
                />
              )}

              {/* CTA Buttons */}
              {data?.field_twi_button?.length ? (
                <div
                  className={`flex items-center justify-around p-0 mobileMax:flex-col ${!isLeftPosition
                    ? "remove-animation-fluctuation mb-20 mobileMax:mb-8"
                    : ""
                    }`}
                >
                  {data?.field_twi_button?.map(
                    (link: { uri: string; title: string }) => (
                      <Link
                        key={link.uri}
                        href={link?.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center min-w-[220px] --font-poppins learnBtn !text-white text-medium min-h-[55px] rounded-lg hover:!text-[#1468a0] hover:!underline !no-underline mobileMax:min-w-full mobileMax:text-medium mobileMax:mb-3"
                      >
                        {link?.title}
                      </Link>
                    )
                  )}
                </div>
              ) : null}
            </div>
          </motion.div>

          {/* Image + Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className={`remove-animation-fluctuation ${
              // If not left position and no description, center everything
              !isLeftPosition && !hasDescription
                ? "flex justify-center items-center w-full"
                : `flex ${isLeftPosition ? "items-start" : "items-center"} mobileToDesk:flex-col overflow-hidden`
              }`}
          >
            {/* Image for Left Position */}
            {data?.field_twi_image?.uri?.url && isLeftPosition && (
              <div
                className={`${!hasDescription
                  ? "w-full flex justify-center items-center" // Center when no description
                  : "w-[50%] h-[650px] mobileToDesk:h-full mr-12 rounded-[40px] overflow-hidden mobileToDesk:w-full mobileToDesk:mb-6 mobileToDesk:mr-0"
                  }`}
                style={{
                  height: data?.field_image_height
                    ? `${data.field_image_height}px`
                    : !hasDescription
                      ? "auto"
                      : "100%",
                }}
              >
                <div
                  className={`${!hasDescription
                    ? "w-full max-w-[600px]" // Centered container with max width
                    : "w-full h-full"
                    }`}
                >
                  <Image
                    src={`${"https://dev-mission.keymouseit.com"}${data?.field_twi_image?.uri?.url}`}
                    alt="cta-img"
                    height={520}
                    width={520}
                    objectFit="cover"
                    className={`w-full h-full max-w-full card-shadow rounded-[12px] object-cover transform transition-transform duration-500 hover:scale-105 ${!hasDescription ? "mx-auto" : ""
                      }`}
                  />
                </div>
              </div>
            )}

            {/* Text Content - Only show if description exists */}
            {hasDescription && (
              <div
                className={`${data?.field_twi_image?.uri?.url ? "w-[50%]" : "w-[100%]"
                  } text-list relative mobileToDesk:w-full ${isLeftPosition ? "" : "mobileToDesk:order-2"
                  }`}
              >
                <div
                  className={`text-medium text-[#545D6F] --font-poppins leading-8 mobileMax:text-xsmall mobileMax:leading-normal ${isLeftPosition ? "leading-normal mobileMax:text-small" : ""
                    }`}
                  dangerouslySetInnerHTML={{
                    __html: data?.field_twi_image_description.processed,
                  }}
                />
              </div>
            )}

            {/* Image for Right Position */}
            {data?.field_twi_image?.uri?.url && !isLeftPosition && (
              <div
                className={`${!hasDescription
                  ? "w-full mx-auto flex justify-center"
                  : "w-[50%] ml-12 mobileToDesk:ml-0 mobileToDesk:order-1 mobileToDesk:mb-6 mobileToDesk:w-full"
                  }`}
                style={{
                  height: data?.field_image_height ? `${data.field_image_height}px` : !hasDescription ? "100%" : "100%",
                }}
              >
                <div
                  className={`${!hasDescription
                    ? "w-full"
                    : "h-full w-full rounded-[40px] overflow-hidden"
                    }`}
                >
                  <Image
                    src={`${"https://dev-mission.keymouseit.com"}${data?.field_twi_image?.uri?.url}`}
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
        <ObjectiveListComponent data={data} />

        {/* Border - only for left position */}
        {isLeftPosition && <div className="border-b border-[#ccc]" />}
      </div>
    </section>
  );
}

export default UnifiedCTAClient;


