"use client";

import { DrupalNode } from "next-drupal";
import Image from "next/image";
import { motion } from "framer-motion";
import { config } from "@/lib/config";

interface CardProps {
  data: DrupalNode;
}

export default function TitleInButtonCard({ data }: CardProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const isBlue = data.field_background_color === "blue";
  const isWhite = data.field_background_color === "white";
  const isGray = data.field_background_color === "gray";

  return (
    <>
      <div
        className={`${isBlue ? "bg-[#003350]" : ""}
      ${isWhite ? "bg-white" : ""}
      ${
        isGray ? "bg-[#f9f9f9]" : ""
      } py-[99px] betweenMobileTab:py-16 relative mobileMax:py-10 overflow-hidden`}
      >
        <div
          className={`${
            data?.field_select_the_card_count_per === 5
              ? "mini-container  z-[2] relative"
              : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation"
          >
            <h3
              className={`bg-clip-text ${
                isBlue
                  ? "bg-[linear-gradient(to_right,#48DBB2,#64C4F9)]"
                  : "bg-[linear-gradient(to_right,#48DBB2,#003350)]"
              } text-clip text-[42px] font-semibold text-center`}
            >
              {data?.field_title}
            </h3>

            {data?.field_description && (
              <p
                className="mobileMax:text-center remove-animation-fluctuation text-medium text-white font-poppins leading-8 font-normal mobileMax:text-xsmall mobileMax:leading-normal mb-[76px] mobileMax:mb-[30px] text-center"
                dangerouslySetInnerHTML={{
                  __html: data?.field_description?.processed,
                }}
              />
            )}
          </motion.div>

          <motion.div
            className={`remove-animation-fluctuation flex items-start justify-center ${
              data?.field_select_the_card_count_per === 5
                ? "gap-[15px]"
                : "gap-[60px]"
            } mobileToDesk:gap-[20px] flex-wrap mt-[118px]`}
            initial={isMobile ? { opacity: 0, y: 40 } : "hidden"}
            whileInView={isMobile ? { opacity: 1, y: 0 } : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.8,
                  delayChildren: 0.5,
                },
              },
            }}
          >
            {data?.field_add_card?.map((feature: DrupalNode, idx: number) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center text-center w-[19%] mobileToDesk:w-[48%] mb-3 mobileMax:!w-full mobileMax:px-3"
                variants={{
                  hidden: { opacity: 0, y: idx % 2 === 0 ? -40 : 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 50,
                      damping: 15,
                      mass: 0.7,
                    },
                  },
                }}
              >
                {idx % 2 === 0 ? (
                  <>
                    <div className="flex items-center flex-col mobileMax:w-full">
                      <Image
                        src={`${config.apiBase}${feature?.field_icon?.uri?.url}`}
                        alt="grid-img"
                        height={140}
                        width={168}
                        className="h-full w-[140px] block mx-auto"
                      />
                    </div>

                    <button
                      className={`mt-[20px] w-[278.76px] font-poppins ${
                        isBlue
                          ? "bg-[linear-gradient(to_left,#4FC0FF,#5DE29B)]"
                          : "bg-[linear-gradient(to_left,#5DE29B,#003350)]"
                      } flex items-center justify-center cursor-default
                    ${
                      isBlue ? "text-[#003350]" : "text-white"
                    } text-[20px] font-bold py-[8px]
								  rounded-[123px] !no-underline mobileMax:text-xmedium`}
                    >
                      {feature?.field_title}
                    </button>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: feature?.field_description?.processed,
                      }}
                      className={`mt-[32px] text-center text-[18px] ${
                        isBlue ? "text-white" : "text-[#003350]"
                      } font-poppins font-semibold
												mobileMax:text-xsmall leading-normal mobileMax:order-3`}
                    />
                  </>
                ) : (
                  <>
                    <button
                      className={`w-[278.76px] font-poppins ${
                        isBlue
                          ? "bg-[linear-gradient(to_left,#4FC0FF,#5DE29B)]"
                          : "bg-[linear-gradient(to_left,#5DE29B,#003350)]"
                      } flex items-center justify-center cursor-default
                    ${
                      isBlue ? "text-[#003350]" : "text-white"
                    } text-[20px] font-bold py-[8px]
								  rounded-[123px] !no-underline mobileMax:text-xmedium mobileMax:order-2`}
                    >
                      {feature?.field_title}
                    </button>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: feature?.field_description?.processed,
                      }}
                      className={`mt-[32px] text-center text-[18px] ${
                        isBlue ? "text-white" : "text-[#003350]"
                      } font-poppins font-semibold
												mobileMax:text-xsmall leading-normal mobileMax:order-3`}
                    />
                    <div className="flex items-center flex-col mobileMax:w-full mobileMax:order-1 mobileMax:mb-[17px] mt-[15px]">
                      <Image
                        src={`${config.apiBase}${feature?.field_icon?.uri?.url}`}
                        alt="grid-img"
                        height={140}
                        width={168}
                        className="h-full w-[140px] block mx-auto"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
