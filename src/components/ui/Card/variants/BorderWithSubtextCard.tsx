"use client";

import { config } from "@/lib/config";
import { splitValueText } from "@/utils";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Image from "next/image";

interface CardProps {
  data: DrupalNode;
}

export default function BorderWithSubtextCard({ data }: CardProps) {
  return (
    <div>
      <motion.div className="bg-[linear-gradient(to_bottom,#003350_4%,#248781_63%,#37B29A_86%,#48DBB2_100%)] relative py-[120px] betweenMobileTab:py-16 mobileMax:py-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            duration: 2.8,
          }}
          className="absolute right-[-20px] top-[400px] pointer-events-none max-w-[15%] betweenMobileTab:max-w-[45%] mobileMax:max-w-[50%]"
        >
          <img
            src="/static/images/double-bg.svg"
            alt="get-inv-home"
            className="mobileMax:opacity-50"
          />
        </motion.div>
        <div className="mini-container z-[2] relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation"
          >
            <h3 className="mx-auto mobileMax:text-center text-[32px] font-poppins mb-[22px] mobileMax:mb-8 font-semibold leading-normal text-[#48DBB2] mobileMax:text-[28px]">
              {data.field_title}
            </h3>

            <p
              className="text-[16px] text-white font-poppins"
              dangerouslySetInnerHTML={{
                __html: data?.field_description?.processed,
              }}
            />
          </motion.div>

          <motion.div
            className="mt-[40px] mobileMax:mt-[40px] mx-auto remove-animation-fluctuation flex flex-wrap items-stretch gap-[20px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            {data?.field_add_card?.map((card: any, index: number) => {
              const totalCards = data?.field_add_card?.length || 0;
              const isLastOdd =
                index === totalCards - 1 && totalCards % 2 !== 0;
              return (
                <motion.div
                  key={card.id || index}
                  className={`min-h-[300px] p-[20px] rounded-2xl flex justify-center items-stretch bg-[#003350] transition-transform duration-500 ease-in-out will-change-transform transform-gpu hover:scale-[1.03] group-hover:shadow-lg
				            ${isLastOdd ? "w-full" : "w-[calc(50%-15px)] mobileMax:w-full"}
                  `}
                >
                  {/* Inner wrapper — this scales smoothly */}
                  <div
                    className="group relative flex-1 border-2 border-[#48DBB2] bg-[linear-gradient(0deg,#1b7375_0%,#003350_40%)] overflow-hidden"
                    style={{ transformOrigin: "center center" }}
                  >
                    {/* Actual content — stays stable, not scaled directly */}
                    <div className="flex flex-col justify-start items-center py-[30px] px-[35px] h-full">
                      {/* Image section */}
                      {card?.field_icon && (
                        <div className="h-[80px] flex items-end justify-center mb-4 shrink-0">
                          <Image
                            src={`${config.apiBase}${card?.field_icon?.uri?.url}`}
                            alt={card.field_title}
                            width={index === 0 ? 40 : 64}
                            height={index === 0 ? 48 : 64}
                            className={`${
                              index === 0 ? "w-8 h-12" : "w-12 h-12"
                            } mx-auto block mobileMax:object-contain`}
                          />
                        </div>
                      )}

                      <h4 className="text-[22px] text-center font-poppins mb-3 font-bold leading-normal text-white mobileMax:text-[18px]">
                        {card.field_title}
                      </h4>

                      <div className="flex items-center">
                        {card?.field_subtext.map((item, index, arr) => {
                          const { mainValue, rest } = splitValueText(item);
                          const endsWithPercent = mainValue?.endsWith("%");
                          return (
                            <div key={index} className="flex items-center">
                              <div className="flex items-start gap-[20px]">
                                <div className="text-center">
                                  <div
                                    className={`${
                                      arr.length > 1 ? "text-left" : ""
                                    } text-[45px] betweenMobileTab:text-[28px] betweenMdDesk:text-[40px] font-bold bg-clip-text text-transparent bg-[linear-gradient(to_bottom,#5DE29B,#A0DDFF)] text-clip leading-[45px]`}
                                  >
                                    {mainValue}
                                  </div>
                                  {rest ? (
                                    <div
                                      className={`${
                                        arr.length === 1
                                          ? "text-[25px] text-center text-white mt-[10px]"
                                          : "text-[18px] text-white text-right leading-9 minMobile:leading-5 minMobile:text-[14px] betweenMobileTab:leading-6"
                                      }`}
                                    >
                                      {rest}
                                    </div>
                                  ) : (
                                    <div className="h-9" />
                                  )}
                                </div>
                              </div>
                              {arr.length > 1 && index < arr.length - 1 && (
                                <>
                                  {endsWithPercent ? (
                                    <div className="w-[1px] h-[80px] bg-[#48DBB2] mx-[20px]" />
                                  ) : (
                                    <img
                                      className="w-[33px] minMobile:mt-[16px] h-[29px] -mt-8 mx-[20px]"
                                      src="/static/images/double-right-arrow.svg"
                                      alt=""
                                    />
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div
                        className="bold-font-description text-[16px] text-center mt-[17px] text-white font-[400] tracking-wide leading-normal font-poppins mobileMax:text-sm"
                        dangerouslySetInnerHTML={{
                          __html: card?.field_description?.processed,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
