"use client";
import { config } from "@/lib/config";
import { motion, useAnimation, type Variants } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Image from "next/image";
import { useEffect } from "react";

interface CardProps {
  data: DrupalNode;
}

export default function HorizontalCard({ data }: CardProps) {
  const controls = useAnimation();

  useEffect(() => {
    const runSequence = async () => {
      for (let i = 0; i < (data?.field_add_card?.length || 0); i++) {
        // circle animate
        await controls.start((id) =>
          id === `circle-${i}`
            ? { x: 0, opacity: 1, transition: { duration: 0.8 } }
            : {}
        );
        // description animate
        await controls.start((id) =>
          id === `desc-${i}`
            ? { x: 0, opacity: 1, transition: { duration: 0.8 } }
            : {}
        );
      }
    };

    runSequence();
  }, [controls, data?.field_add_card?.length]);

  return (
    <>
      {data?.field_background_color === "blue" ? (
        <div className="bg-[#003350] relative py-[120px] mobileMax:py-10 betweenMobileTab:py-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 2.5,
            }}
            className="absolute pointer-events-none bottom-[150px] mobileMax:bottom-[220px] left-0 z-[0] max-w-[15%] betweenMobileTab:max-w-[32%] mobileMax:max-w-[45%]"
          >
            <img
              src="/static/images/faq-left-clip.png"
              alt="overlay-bg"
              className="w-full mobileToDesk:opacity-80"
            />
          </motion.div>

          <div className="mini-container z-[2] relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation mb-[70px] mobileMax:mb-[30px]"
            >
              <h3 className="text-[42px] font-poppins text-center font-semibold leading-normal mobileMax:text-[28px] mb-[17px] mobileMax:text-center mobileMax:mb-[10px] text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#4FC0FF)] text-clip">
                {data?.field_title}
              </h3>
              <div
                className="bold-font-description mx-auto mobileMax:order-3 mobileMax:mb-5 text-center text-small text-[#fff] font-poppins font-normal mobileMax:text-xsmall leading-normal"
                dangerouslySetInnerHTML={{
                  __html: data?.field_description?.processed,
                }}
              />
            </motion.div>

            <div className="w-full mobileMax:w-full mx-auto">
              {!data?.field_add_card?.length && (
                <div className="text-center text-white/90 bg-white/10 border border-white/20 rounded-md p-4 mb-6">
                  No cards to display (field_add_card is empty).
                </div>
              )}
              <motion.div
                initial={
                  typeof window !== "undefined" && window.innerWidth > 768
                    ? "visible"
                    : { opacity: 0, y: 40 }
                }
                whileInView={
                  typeof window !== "undefined" && window.innerWidth > 768
                    ? "visible"
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="w-full mx-auto remove-animation-fluctuation"
              >
                <motion.div
                  initial={
                    typeof window !== "undefined" && window.innerWidth > 768
                      ? "hidden"
                      : "visible"
                  }
                  whileInView={
                    typeof window !== "undefined" && window.innerWidth > 768
                      ? "visible"
                      : "visible"
                  }
                  viewport={{
                    once: true,
                    amount:
                      typeof window !== "undefined" && window.innerWidth > 768
                        ? 0.2
                        : 0.05,
                  }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition:
                        typeof window !== "undefined" && window.innerWidth > 768
                          ? {
                              staggerChildren: 0.8,
                              delayChildren: 0.1,
                            }
                          : {},
                    },
                  }}
                >
                  {data?.field_add_card?.map((step: any, index: number) => {
                    const isOdd = (index + 1) % 2 !== 0;
                    const isLast =
                      index === (data?.field_add_card?.length || 0) - 1;

                    const circleVariants: Variants = {
                      hidden: { x: isOdd ? -150 : 150, opacity: 0 },
                      visible: {
                        x: 0,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 50,
                          damping: 15,
                          mass: 0.7,
                        },
                      },
                    };

                    const descVariants: Variants = {
                      hidden: { x: isOdd ? 150 : -150, opacity: 0 },
                      visible: {
                        x: 0,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 50,
                          damping: 15,
                          mass: 0.7,
                        },
                      },
                    };

                    return (
                      <div
                        key={step.id || index}
                        className={`w-full flex items-center justify-center gap-[20px] mobileMax:flex-col mobileMax:gap-[30px] ${
                          !isLast && "mb-[60px] mobileMax:mb-[30px]"
                        }`}
                      >
                        {isOdd ? (
                          <>
                            {/* Circle */}
                            <motion.div
                              variants={circleVariants}
                              className="flex items-center w-[25%] justify-start mobileMax:flex-col mobileMax:w-full"
                            >
                              <div className="h-[194px] min-w-[194px] w-[194px] mobileToDesk:w-[120px] mobileToDesk:h-[120px] mobileToDesk:min-w-[120px] rounded-full insight-gardientBtn p-2">
                                <div className="w-full bg-[#003350] h-full flex items-center justify-center rounded-full">
                                  <p className="text-clip font-poppins text-[82px] mobileToDesk:text-[50px] font-semibold m-0 bg-gradient-to-b from-[#5DE29B] to-[#A0DDFF]">
                                    {index + 1}
                                  </p>
                                </div>
                              </div>
                              <Image
                                src="/static/images/green-left-arrow.png"
                                alt="arrow"
                                height={37}
                                width={37}
                                className="block ml-5 mobileMax:ml-0 mobileMax:mt-[12px] mobileMax:rotate-90"
                              />
                            </motion.div>

                            {/* Description */}
                            <motion.div
                              variants={descVariants}
                              className="w-[75%] mobileMax:w-full"
                            >
                              <div className="flex items-center mobileMax:gap-5 mobileMax:flex-col mobileToDesk:mb-5">
                                <div className="">
                                  <h5 className="text-[22px] mobileMax:xmedium font-poppins mobileMax:text-center font-semibold leading-normal text-transparent bg-clip-text bg-[#48DBB2] text-clip mb-2 mobileMax:mb-1">
                                    {step?.field_title}
                                  </h5>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        step?.field_description?.processed ||
                                        "",
                                    }}
                                    className="white-link bold-font-list text-[18px] mobileMax:text-small text-left mobileMax:text-center bold-font-description text-white font-poppins font-semibold leading-normal [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mt-6 [&>li]:mt-3 [&>li]:text-left [&>li]:text-white [&>li]:font-normal [&>li]:marker:text-[#48DBB2] [&>p]:mb-3 [&>p]:text-white [&>p]:font-normal"
                                  />
                                </div>
                                {step?.field_image?.uri?.url && (
                                  <Image
                                    src={`${config.apiBase}${step.field_image.uri.url}`}
                                    alt="step image"
                                    height={384}
                                    width={237}
                                    className="block w-full max-w-[300px] min-w-[300px] mobileMax:w-full mobileMax:max-w-full betweenMobileTab:max-w-[200px] betweenMobileTab:min-w-[200px] mobileMax:ml-0 mobileMax:mt-[12px] ml-[50px]"
                                  />
                                )}
                              </div>
                            </motion.div>
                          </>
                        ) : (
                          <>
                            {/* Description */}
                            <motion.div
                              variants={descVariants}
                              className="w-[75%] mobileMax:w-full mobileMax:order-2"
                            >
                              <div className="flex items-center mobileMax:gap-5 mobileMax:flex-col mobileToDesk:mb-5">
                                {step?.field_image?.uri?.url && (
                                  <Image
                                    src={`${config.apiBase}${step.field_image.uri.url}`}
                                    alt="step image"
                                    height={384}
                                    width={237}
                                    className="block w-full mobileToDesk:order-2 max-w-[300px] min-w-[300px] mobileMax:w-full mobileMax:max-w-full betweenMobileTab:max-w-[200px] betweenMobileTab:min-w-[200px] mobileMax:ml-0 mobileMax:mt-[12px]"
                                  />
                                )}
                                <div className="desktop:ml-[50px]">
                                  <h5 className="text-[22px] mobileMax:xmedium font-poppins text-left mobileMax:text-center font-semibold leading-normal text-transparent bg-clip-text bg-[#48DBB2] text-clip mb-2 mobileMax:mb-1">
                                    {step?.field_title}
                                  </h5>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        step?.field_description?.processed ||
                                        "",
                                    }}
                                    className="white-link bold-font-list text-[18px] mobileMax:text-small text-left mobileMax:text-center bold-font-description text-white font-poppins font-semibold leading-normal [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mt-6 [&>li]:mt-3 [&>li]:text-left [&>li]:text-white [&>li]:font-normal [&>li]:marker:text-[#48DBB2] [&>p]:mb-3 [&>p]:text-white [&>p]:font-normal"
                                  />
                                </div>
                              </div>
                            </motion.div>

                            {/* Circle */}
                            <motion.div
                              variants={circleVariants}
                              className="flex items-center justify-center desktop:ml-[50px] mobileMax:order-1 mobileMax:flex-col"
                            >
                              <Image
                                src="/static/images/green-left-arrow.png"
                                alt="arrow"
                                height={37}
                                width={37}
                                className="block mr-5 rotate-180 mobileMax:mr-0 mobileMax:rotate-90 mobileMax:order-2 mobileMax:mt-[12px]"
                              />
                              <div className="mobileMax:order-1 h-[194px] min-w-[194px] w-[194px] mobileToDesk:w-[120px] mobileToDesk:h-[120px] mobileToDesk:min-w-[120px] rounded-full insight-gardientBtn p-2">
                                <div className="w-full bg-[#003350] h-full flex items-center justify-center rounded-full">
                                  <p className="text-clip font-poppins text-[82px] mobileToDesk:text-[50px] font-semibold m-0 bg-gradient-to-b from-[#5DE29B] to-[#A0DDFF]">
                                    {index + 1}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white relative mobileMax:mt-[30px] py-[120px] mobileMax:py-10 betweenMobileTab:py-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 2.5,
            }}
            className="absolute pointer-events-none bottom-[150px] mobileMax:bottom-[220px] left-0 z-[0] max-w-[15%] betweenMobileTab:max-w-[32%] mobileMax:max-w-[45%]"
          >
            <img
              src="/static/images/faq-left-clip.png"
              alt="overlay-bg"
              className="w-full mobileToDesk:opacity-80"
            />
          </motion.div>
          <div className="mini-container z-[2] relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation mb-[70px] mobileMax:mb-[30px]"
            >
              <h3 className="text-[42px] font-poppins text-center font-semibold leading-normal mobileMax:text-[28px] mb-2 mobileMax:text-center mobileMax:mb-[40px] text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip">
                {data?.field_title}
              </h3>
              <div
                className="bold-font-description mx-auto mobileMax:order-3 mobileMax:mb-5 text-center text-small text-[#003350] font-poppins font-normal mobileMax:text-xsmall leading-normal"
                dangerouslySetInnerHTML={{
                  __html: data?.field_description?.processed,
                }}
              />
            </motion.div>
            <div className="w-full tab:max-w-[1100px] mobileMax:w-full mx-auto">
              {!data?.field_add_card?.length && (
                <div className="text-center text-[#003350] bg-[#003350]/5 border border-[#003350]/20 rounded-md p-4 mb-6">
                  No cards to display (field_add_card is empty).
                </div>
              )}
              <motion.div
                initial={
                  typeof window !== "undefined" && window.innerWidth > 768
                    ? "visible"
                    : { opacity: 0, y: 40 }
                }
                whileInView={
                  typeof window !== "undefined" && window.innerWidth > 768
                    ? "visible"
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="w-full mx-auto remove-animation-fluctuation"
              >
                <motion.div
                  initial={
                    typeof window !== "undefined" && window.innerWidth > 768
                      ? "hidden"
                      : "visible"
                  }
                  whileInView={
                    typeof window !== "undefined" && window.innerWidth > 768
                      ? "visible"
                      : "visible"
                  }
                  viewport={{
                    once: true,
                    amount:
                      typeof window !== "undefined" && window.innerWidth > 768
                        ? 0.2
                        : 0.05,
                  }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition:
                        typeof window !== "undefined" && window.innerWidth > 768
                          ? {
                              staggerChildren: 0.8,
                              delayChildren: 0.3,
                            }
                          : {},
                    },
                  }}
                >
                  {data?.field_add_card?.map((step: any, index: number) => {
                    const isOdd = (index + 1) % 2 !== 0;
                    const isLast =
                      index === (data?.field_add_card?.length || 0) - 1;

                    const circleVariants: Variants = {
                      hidden: { x: isOdd ? -150 : 150, opacity: 0 },
                      visible: {
                        x: 0,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 50,
                          damping: 15,
                          mass: 0.7,
                        },
                      },
                    };

                    const descVariants: Variants = {
                      hidden: { x: isOdd ? 150 : -150, opacity: 0 },
                      visible: {
                        x: 0,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 50,
                          damping: 15,
                          mass: 0.7,
                        },
                      },
                    };

                    return (
                      <div
                        key={step.id || index}
                        className={`w-full flex items-center justify-center gap-[20px] mobileMax:flex-col mobileMax:gap-[30px] ${
                          !isLast && "mb-[60px] mobileMax:mb-[30px]"
                        }`}
                      >
                        {isOdd ? (
                          <>
                            {/* Circle */}
                            <motion.div
                              variants={circleVariants}
                              className="flex items-center w-[25%] justify-start mobileMax:flex-col mobileMax:w-full"
                            >
                              <div className="h-[194px] min-w-[194px] w-[194px] mobileToDesk:w-[120px] mobileToDesk:h-[120px] mobileToDesk:min-w-[120px] rounded-full bg-[linear-gradient(to_right,#48DBB2,#003350)] p-2">
                                <div className="w-full bg-white h-full flex items-center justify-center rounded-full">
                                  <p className="t font-poppins text-[82px] mobileToDesk:text-[50px] font-semibold m-0  text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip">
                                    {index + 1}
                                  </p>
                                </div>
                              </div>
                              <Image
                                src="/static/images/green-right-arrow.svg"
                                alt="arrow"
                                height={37}
                                width={37}
                                className="block ml-5 mobileMax:ml-0 mobileMax:mt-[12px] mobileMax:rotate-90"
                              />
                            </motion.div>

                            {/* Description */}
                            <motion.div
                              variants={descVariants}
                              className="w-[75%] mobileMax:w-full"
                            >
                              <div className="flex items-center gap-[30px] mobileMax:gap-5 mobileMax:flex-col mobileToDesk:mb-5">
                                <div className="">
                                  <h5 className="text-[22px] mobileMax:xmedium font-poppins text-right mobileMax:text-center font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip mb-2 mobileMax:mb-1">
                                    {step?.field_title}
                                  </h5>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        step?.field_description?.processed ||
                                        "",
                                    }}
                                    className="white-link text-[18px] mobileMax:text-small text-right capitalize mobileMax:text-center font-medium text-[#828282] font-poppins leading-normal"
                                  />
                                </div>
                                <Image
                                  src={`${config.apiBase}${step?.field_image?.uri?.url}`}
                                  alt="step image"
                                  height={384}
                                  width={237}
                                  className="block w-full max-w-[300px] min-w-[300px] mobileMax:w-full mobileMax:max-w-full betweenMobileTab:max-w-[200px] betweenMobileTab:min-w-[200px] mobileMax:ml-0 mobileMax:mt-[12px]"
                                />
                              </div>
                            </motion.div>
                          </>
                        ) : (
                          <>
                            {/* Description */}
                            <motion.div
                              variants={descVariants}
                              className="w-[75%] mobileMax:w-full mobileMax:order-2"
                            >
                              <div className="flex items-center gap-[30px] mobileMax:gap-5 mobileMax:flex-col mobileToDesk:mb-5">
                                <Image
                                  src={`${config.apiBase}${step?.field_image?.uri?.url}`}
                                  alt="step image"
                                  height={384}
                                  width={237}
                                  className="block w-full mobileToDesk:order-2 max-w-[300px] min-w-[300px] mobileMax:w-full mobileMax:max-w-full betweenMobileTab:max-w-[200px] betweenMobileTab:min-w-[200px] mobileMax:ml-0 mobileMax:mt-[12px]"
                                />
                                <div className="ml-[59px] mobileMax:ml-[30px]">
                                  <h5 className="text-[22px] mobileMax:xmedium font-poppins text-left mobileMax:text-center font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip mb-[18px]mobileMax:mb-1">
                                    {step?.field_title}
                                  </h5>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        step?.field_description?.processed ||
                                        "",
                                    }}
                                    className="white-link text-[18px] mobileMax:text-small font-medium text-[#828282] text-left mobileMax:text-center font-poppins  leading-normal"
                                  />
                                </div>
                              </div>
                            </motion.div>

                            {/* Circle */}
                            <motion.div
                              variants={circleVariants}
                              className="flex items-center w-[25%] justify-end mobileMax:order-1 mobileMax:flex-col"
                            >
                              <Image
                                src="/static/images/green-right-arrow.svg"
                                alt="arrow"
                                height={37}
                                width={37}
                                className="block mr-5 rotate-180 mobileMax:mr-0 mobileMax:rotate-90 mobileMax:order-2 mobileMax:mt-[12px]"
                              />
                              <div className="mobileMax:order-1 h-[194px] min-w-[194px] w-[194px] mobileToDesk:w-[120px] mobileToDesk:h-[120px] mobileToDesk:min-w-[120px] rounded-full bg-[linear-gradient(to_right,#48DBB2,#003350)] p-2">
                                <div className="w-full bg-white h-full flex items-center justify-center rounded-full">
                                  <p className="font-poppins text-[82px] mobileToDesk:text-[50px] font-semibold m-0 text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip">
                                    {index + 1}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
