"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import { DEV_PUBLIC_URL } from "@/services/api";
import { useOrigin } from "@/hooks/useOrigin";
import DynamicImage from "../ResuableDynamicImage";

type PrimaryCTASectionProps = {
  data: DrupalNode;
};

function UnifiedCTAClient({ data }: PrimaryCTASectionProps) {
  const origin = useOrigin();
  const isLeftPosition = data?.field_twi_image_position === "twi_left";
  const imageUrl = data?.field_twi_image?.uri?.url;
  const imageDescription = data?.field_twi_image_description?.processed;
  const customHeight = data?.field_image_height;
  const customFontSize = data?.field_title_font_size;
  const grayBackground = data?.field_twi_title == "Energy Efficient Life";
  const isPowerTitle = "The Power of Energy Efficiency";
  const backgroundColor = data?.field_layout_background_color;

  const renderImageBlock = () => (
    <div
      className={`
        ${
          data?.field_twi_image_position === "center" || !imageDescription
            ? "w-full flex items-center justify-center"
            : "w-[50%]"
        }
        ${imageDescription ? (isLeftPosition ? "mr-12" : "ml-12") : "mr-0"}
        mobileToDesk:mr-0 mobileToDesk:ml-0 mobileToDesk:w-full
        rounded-[40px] overflow-hidden
      `}
      style={customHeight ? { height: `${customHeight}px` } : undefined}
    >
      <div
        className={`w-full h-full rounded-[40px] overflow-hidden ${
          imageDescription ? "" : "max-w-[600px]"
        }`}
      >
        <DynamicImage
          src={`${DEV_PUBLIC_URL}${imageUrl}`}
          alt="cta-img"
          height={520}
          width={520}
          className={`w-full h-full max-w-full card-shadow rounded-[12px] object-cover ${
            data?.field_twi_image_position === "center" || !imageDescription
              ? ""
              : "transform transition-transform duration-500 hover:scale-105"
          }`}
        />
      </div>
    </div>
  );

  return (
    <section
      id={
        grayBackground
          ? "Energy-Efficient-Life"
          : isPowerTitle
          ? "The-Power-of-Energy-Efficiency"
          : ""
      }
      className={`relative overflow-hidden ${
        isLeftPosition
          ? "pt-[92px] mobileMax:pt-10 betweenMobileTab:pt-16 pb-8 CTA-wrap"
          : ""
      } ${
        backgroundColor === "gray"
          ? "bg-mapGray"
          : backgroundColor === "dark_gray"
          ? "bg-[#ebf0f7]"
          : "bg-white"
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
          <DynamicImage
            src="/static/images/about-us-home.svg"
            alt="overlay-bg"
            className="mobileMax:opacity-40"
            width={657}
            height={955}
          />
        </motion.div>
      )}

      <div
        className={`mini-container relative ${
          isLeftPosition ? "z-[1]" : ""
        } overflow-hidden ${
          !isLeftPosition ? "pt-5 pb-[60px] mobileMax:pb-10" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className={`remove-animation-fluctuation ${
            isLeftPosition
              ? data?.field_twi_image_position === "center" || !imageDescription
                ? "mobileMax:pb-5"
                : "py-12 mobileMax:pb-5"
              : "py-6 mobileMax:pb-5"
          }`}
        >
          {/* Title */}
          <div className={isLeftPosition ? "" : "overflow-hidden"}>
            <motion.h2
              style={
                customFontSize
                  ? {
                      fontSize: `${customFontSize}px`,
                      lineHeight: 1.5,
                    }
                  : undefined
              }
              className="desktop:text-[60px] text-numans mb-10 mobileMax:mb-8 desktop:leading-[70px] leading-normal text-center category-gradient text-clip px-5 text-[48px] mobileMax:text-[28px]"
            >
              {data?.field_twi_title}
            </motion.h2>
          </div>

          {/* Description content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className={`remove-animation-fluctuation ${
              isLeftPosition
                ? data?.field_twi_image_position === "center" ||
                  !imageDescription
                  ? "flex items-center mobileToDesk:flex-col overflow-hidden"
                  : "flex items-center mb-20 mobileToDesk:flex-col overflow-hidden"
                : `w-[100%] text-list relative mobileToDesk:w-full mobileToDesk:order-2`
            }`}
          >
            <div
              className={`${
                isLeftPosition
                  ? data?.field_twi_image_position === "center" ||
                    !imageDescription
                    ? ""
                    : "w-full text-list relative mobileToDesk:order-2 mobileToDesk:w-full mobileToDesk:mt-6"
                  : ""
              }`}
            >
              {data?.field_twi_description?.processed && (
                <div
                  className={`--font-poppins leading-8 ${
                    isLeftPosition
                      ? "text-medium text-[#545D6F] mb-12 text-center mobileMax:text-xsmall mobileMax:leading-normal"
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
                  className={`flex items-center justify-around p-0 mobileMax:flex-col ${
                    !isLeftPosition
                      ? "remove-animation-fluctuation mb-20 mobileMax:mb-8"
                      : ""
                  }`}
                >
                  {data?.field_twi_button?.map(
                    (link: { uri: string; title: string }) => (
                      <Link
                        key={link.uri}
                        href={
                          link?.uri?.startsWith("internal:")
                            ? `${origin}${link.uri.replace("internal:", "")}`
                            : link?.uri || "#"
                        }
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
            className={`remove-animation-fluctuation flex ${
              isLeftPosition ? "items-start" : "items-center"
            } mobileToDesk:flex-col overflow-hidden`}
          >
            {/* Image */}
            {imageUrl && isLeftPosition && renderImageBlock()}

            {/* Text Content */}
            {imageDescription &&
              data?.field_twi_image_position !== "center" && (
                <div
                  className={`${
                    data?.field_twi_image?.uri?.url ? "w-[50%]" : "w-[100%]"
                  } text-list relative mobileToDesk:w-full ${
                    isLeftPosition ? "" : "mobileToDesk:order-2"
                  }`}
                >
                  {data?.field_twi_image_description?.processed && (
                    <div
                      className={`text-medium text-[#545D6F] --font-poppins leading-8 mobileMax:text-xsmall mobileMax:leading-normal ${
                        isLeftPosition
                          ? "leading-normal mobileMax:text-small"
                          : ""
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: data?.field_twi_image_description.processed,
                      }}
                    />
                  )}
                </div>
              )}

            {imageUrl && !isLeftPosition && renderImageBlock()}
          </motion.div>

          {imageDescription && data?.field_twi_image_position === "center" && (
            <div className="mt-6">
              {data?.field_twi_image_description?.processed && (
                <div
                  className={`text-medium text-[#545D6F] --font-poppins leading-8 mobileMax:text-xsmall mobileMax:leading-normal`}
                  dangerouslySetInnerHTML={{
                    __html: data?.field_twi_image_description?.processed,
                  }}
                />
              )}
            </div>
          )}
        </motion.div>

        <div className="flex justify-between">
          {data?.field_add_objective
            ? data.field_add_objective.map(
                (obj: DrupalNode, index: number, arr: DrupalNode) =>
                  (obj.field_title || obj.field_description?.value) && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0,
                      }}
                      className={`mobileMax:mt-8 remove-animation-fluctuation ${
                        arr.length > 1 ? "w-[47%]" : ""
                      } ${
                        data?.field_twi_image_position === "center" ||
                        !imageDescription
                          ? ""
                          : "mt-12"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-between rounded-[30px] overflow-hidden ${
                          !imageDescription ? "" : "gradient-border-bg"
                        }`}
                      >
                        {/*object images cards */}
                        <div className="w-full py-3 px-5 flex flex-col justify-start">
                          {obj?.field_title && (
                            <motion.h3 className="h-full mb-5 text-clip support-gradient tracking-tight text-[35px] leading-normal text-center text-numans mobileMax:text-[28px]">
                              {obj.field_title}
                            </motion.h3>
                          )}
                          <motion.div
                            className="elevate-list-view text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
                            dangerouslySetInnerHTML={{
                              __html: obj?.field_description?.value || "",
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
              )
            : ""}
        </div>
        {/* Border - only for left position */}
        {isLeftPosition &&
          data?.field_twi_title == "Mission Efficiency Call to Action" && (
            <div className="border-b border-[#ccc]" />
          )}
      </div>
    </section>
  );
}

export default UnifiedCTAClient;
