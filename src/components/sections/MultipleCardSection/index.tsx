"use client";

import React, { useState, useEffect, useRef } from "react";
import { Easing, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { IoMdImages } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import { DrupalNode } from "next-drupal";
import { useRouter } from "next/navigation";
import { config } from "@/lib/config";
import { resolveLink } from "@/utils";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface MultipleCardSectionProps {
  data: DrupalNode;
}

// Custom hook for scroll direction detection
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";

      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
};

// Type helper for safe transitions
const easeOutTransition = "easeOut" as unknown as Easing;

// Animation variants for sequential step reveal
const createScrollVariants = (
  direction: "up" | "down" | null,
  isMobile: boolean = false
) => {
  return {
    container: {
      hidden: {
        opacity: 0,
        transition: { duration: 0.3 },
      },
      visible: {
        opacity: 1,
        transition: {
          duration: isMobile ? 0.2 : 0.8,
          ease: easeOutTransition,
          staggerChildren: isMobile ? 0.1 : 0.8,
        },
      },
    },
    // Step 1: Button appears first
    stepButton: {
      hidden: {
        opacity: 0,
        scale: 0.8,
        y: 20,
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: isMobile ? 0.15 : 0.6,
          delay: isMobile ? 0.05 : 0.2,
          ease: easeOutTransition,
        },
      },
    },
    // Step 2: X-axis line appears second
    xAxisLine: {
      hidden: {
        opacity: 0,
        scaleX: 0,
      },
      visible: {
        opacity: 0.8,
        scaleX: 1,
        transition: {
          duration: isMobile ? 0.2 : 0.8,
          delay: isMobile ? 0.1 : 0.8,
          ease: easeOutTransition,
        },
      },
    },
    // Step 3: Y-axis line appears third
    yAxisLine: {
      hidden: {
        opacity: 0,
        scaleY: 0,
      },
      visible: {
        opacity: 0.8,
        scaleY: 1,
        transition: {
          duration: isMobile ? 0.2 : 0.8,
          delay: isMobile ? 0.15 : 1.4,
          ease: easeOutTransition,
        },
      },
    },
    // Step 4: Data/Image content appears fourth
    stepIcons: {
      hidden: {
        opacity: 0,
        x: -30,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: isMobile ? 0.2 : 0.7,
          delay: isMobile ? 0.2 : 2.0,
          ease: easeOutTransition,
        },
      },
    },
    stepContent: {
      hidden: {
        opacity: 0,
        x: -30,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: isMobile ? 0.2 : 0.7,
          delay: isMobile ? 0.25 : 2.2,
          ease: easeOutTransition,
        },
      },
    },
    stepImage: {
      hidden: {
        opacity: 0,
        x: 30,
        scale: 0.9,
        rotate: 5,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        rotate: 0,
        transition: {
          duration: isMobile ? 0.4 : 0.8,
          delay: isMobile ? 0.6 : 2.4,
          ease: easeOutTransition,
        },
      },
    },
    // Step 5: Parallel Y-axis line for news cards appears fifth
    parallelYAxisLine: {
      hidden: {
        opacity: 0,
        scaleY: 0,
      },
      visible: {
        opacity: 0.8,
        scaleY: 1,
        transition: {
          duration: isMobile ? 0.2 : 1,
          delay: isMobile ? 0.25 : 2.8,
          ease: easeOutTransition,
        },
      },
    },
    // Step 6: Resource cards appear last
    resourceCards: {
      hidden: {
        opacity: 0,
        y: 30,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: isMobile ? 0.2 : 0.6,
          delay: isMobile ? 0.3 : 3.2,
          staggerChildren: isMobile ? 0.05 : 0.2,
        },
      },
    },
  };
};

const MultipleCardSection: React.FC<MultipleCardSectionProps> = ({ data }) => {
  const router = useRouter();

  // State management
  const [isElevateContainerActive, setIsElevateContainerActive] =
    useState(false);
  const [isSupportActive, setIsSupportActive] = useState(false);

  // Refs for containers
  const demandContainerRef = useRef<HTMLDivElement | null>(null);
  const supportContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll tracking refs for each step
  const elevateSectionRef = useRef<HTMLDivElement>(null);
  const supportSectionRef = useRef<HTMLDivElement>(null);
  const investSectionRef = useRef<HTMLDivElement>(null);

  // Mobile detection for animation timing
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get scroll direction for animations
  const scrollDirection = useScrollDirection();
  const animationVariants = createScrollVariants(scrollDirection, isMobile);

  // Outside click handler
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (
        demandContainerRef.current &&
        !demandContainerRef.current.contains(target)
      ) {
        setIsElevateContainerActive(false);
      }

      if (
        supportContainerRef.current &&
        !supportContainerRef.current.contains(target)
      ) {
        setIsSupportActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`py-[120px] betweenMobileTab:py-16 mobileMax:py-10 bg-[#003350] !bg-[linear-gradient(360deg,#2F8B76_0%,#003350_97.12%)] relative overflow-hidden india-work-section ${
        scrollDirection ? `scroll-${scrollDirection}` : ""
      }`}
    >
      <div className="mini-container relative z-[2]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
          transition={{
            duration: isMobile ? 0.2 : 0,
          }}
          className="remove-animation-fluctuation relative flex justify-center items-center "
        >
          <h2 className="text-center mb-5 text-[32px] mobileMax:text-[28px] font-semibold mobileMax:text-center text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#4FC0FF)]">
            {data?.field_title}
          </h2>

          <Link
            href={resolveLink(data?.field_button_link?.uri) || "#"}
            className="desktop:flex hidden absolute desktop:right-0 top-[12px] mobileMax:top-[20px] betweenMobileTab:top-[32px] text-clip items-center justify-center font-poppins font-[600] text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#4FC0FF)] text-xmedium rounded-[10px] hover:!underline mobileMax:min-w-full mobileMax:text-small "
          >
            {data?.field_button_link?.title}{" "}
            <FaChevronRight className="text-small ml-1 text-[#A0DDFF] mt-[1px]" />
          </Link>
        </motion.div>
        <div>
          {/* step 1 */}
          <motion.div
            ref={elevateSectionRef}
            className={`mt-[80px] betweenMobileTab:mt-10 mobileMax:mt-8 relative how-left-directions first-step  pb-[60px] step-1-lines`}
            variants={animationVariants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }}
            transition={{ duration: isMobile ? 0.4 : 0.8, ease: "easeOut" }}
          >
            {/* Step 2: X-axis line appears second */}
            <motion.div
              className="absolute left-[64px] top-[30px] mobileMax:hidden w-[400px] h-[6px] bg-gradient-to-r from-[#5de29b] to-[#5de29b] opacity-0 scale-x-0 origin-right pointer-events-none z-[1]"
              variants={animationVariants.xAxisLine}
            />
            {/* Step 3: Y-axis line appears third */}
            <motion.div
              className="absolute left-[64px] top-[30px] mobileMax:hidden w-[6px] h-[230px] bg-gradient-to-b from-[#5de29b] via-[#5de29b] to-[#8EBCE5] opacity-0 scale-y-0 origin-top pointer-events-none z-[1]"
              variants={animationVariants.yAxisLine}
            />
            <motion.div
              className="max-w-[325px] mobileMax:max-w-full flex items-center justify-center px-[20px] mobileMax:px-0 mx-auto relative z-10"
              variants={animationVariants.stepButton}
            >
              <Link
                href={resolveLink(
                  data?.field_add_card_section?.[0]?.field_button_link?.uri
                )}
                className="!px-2 font-poppins insight-gardientBtn !text-[#1D3E9C] text-[24px] font-bold w-full min-h-[55px] 
                              rounded-[65px] hover:!underline !no-underline mobileMax:text-xmedium flex items-center justify-center"
              >
                {data?.field_add_card_section?.[0]?.field_button_link?.title}
              </Link>
            </motion.div>
            <motion.div
              className="mt-[100px] mobileMax:mt-5"
              variants={animationVariants.stepContent}
            >
              <div className="flex items-center justify-start tab:min-h-[350px] mobileMax:flex-col">
                <motion.div
                  className="flex items-center mobileMax:flex-col mobileMax:w-full min-w-[200px] py-5 relative z-10"
                  variants={animationVariants.stepImage}
                >
                  <Image
                    src="/static/images/setting-arrow.png"
                    alt="grid-img"
                    width={255}
                    height={194}
                    className="h-full w-[140px] block mobileMax:mb-3"
                  />
                  <Image
                    src="/static/images/green-left-arrow.png"
                    alt="arrow"
                    height={30}
                    width={25}
                    className="block ml-2 mobileMax:ml-0 mobileMax:mt-[8px] mobileMax:mb-3 mobileMax:rotate-90 tablet:rotate-0"
                  />
                </motion.div>
                <motion.div
                  className="desktop:max-w-[600px] max-w-full mobileMax:mx-0 ml-[30px] mr-[20px] betweenMobileTab:mx-1"
                  variants={animationVariants.stepContent}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.field_add_card_section?.[0]?.field_description
                          ?.processed,
                    }}
                    className="list-disc step-list text-left  mobileMax:mb-3 text-medium text-white font-poppins leading-normal font-semibold mobileMax:text-xsmall mobileMax:leading-normal"
                  />
                </motion.div>
                <motion.div
                  className="relative esktop:w-[400px] z-30 w-[300px] min-w-[300px] overflow-hidden"
                  variants={animationVariants.stepImage}
                >
                  <div
                    ref={demandContainerRef}
                    className="group relative mobileToDesk:mx-auto mobileToDesk:my-5 aspect-[550/515] overflow-hidden"
                    onClick={() => setIsElevateContainerActive((prev) => !prev)}
                  >
                    <Image
                      alt="video-play-icon"
                      src="/static/images/video-play-icon.png"
                      width={100}
                      height={100}
                      className="object-cover z-30 pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                    />
                    {/* Background pattern */}
                    <Image
                      alt="Background pattern"
                      src="/static/images/description-bg-pattern.png"
                      fill
                      style={{ objectPosition: "center 50%" }}
                      className="object-cover z-10 pointer-events-none"
                    />

                    {/* Masked Image Layer */}
                    <div
                      className={`absolute inset-0 z-20 transition-transform duration-100 cursor-pointer
																								  ${isElevateContainerActive ? "rotate-0" : "rotate-0"} 
																								  desktop:group-hover:rotate-0`}
                      style={{
                        WebkitMaskImage: "url('/static/images/who-banner.png')",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskSize: "cover",
                        WebkitMaskPosition: "center",
                        maskImage: "url('/static/images/who-banner.png')",
                        maskRepeat: "no-repeat",
                        maskSize: "cover",
                        maskPosition: "center",
                        overflow: "hidden",
                      }}
                    >
                      {/* Extra safe area for rotation */}
                      <div className="absolute inset-[-8%] overflow-hidden">
                        <img
                          src="/static/images/global-city.png"
                          alt="Background"
                          className={`w-full h-full object-cover transform transition-all duration-100
																									  ${isElevateContainerActive ? "scale-150" : "scale-110"} 
																									  desktop:group-hover:scale-150 desktop:group-hover:-translate-y-10 desktop:group-hover:-translate-x-20`}
                          style={{ objectPosition: "center" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="w-[90%] mt-[60px] mobileMax:w-full betweenMobileTab:w-[95%] mx-auto how-news-cards relative"
                variants={animationVariants.resourceCards}
              >
                {/* Step 5: Parallel Y-axis line for news cards appears fifth */}
                <motion.div
                  className="absolute right-[120px] mobileMax:hidden betweenMobileTab:right-[4%] padPro:right-[6%] news-paralell-line top-[-20px] w-[6px] h-[416px] bg-gradient-to-b from-[#5de29b] via-[#5de29b] to-[#5de29b] opacity-0 scale-y-0 origin-top pointer-events-none z-[1]"
                  variants={animationVariants.parallelYAxisLine}
                />
                <div className="w-[80%] mobileMax:w-full betweenMobileTab:w-[84%] mobileMax:flex-col mobileMax:gap-[20px] betweenMobileTab:gap-[20px] tablet:gap-[25px] flex items-start justify-between gap-[25px]">
                  {data?.field_add_card_section?.[0]?.field_add_card
                    ?.slice(0, 3)
                    .map((elevateCard: DrupalNode, index: number) => {
                      const isVideo =
                        elevateCard?.field_links[0]?.uri.includes(
                          "youtube.com"
                        ) ||
                        elevateCard?.field_links[0]?.uri.includes("youtu.be");

                      const handleClick = (e: React.MouseEvent) => {
                        if (elevateCard?.field_cs_landing_page === "yes") {
                          e.preventDefault();
                          router.push(
                            `${"/country-engagement/india/sectors/"}${
                              elevateCard?.id
                            }`
                          );
                        }
                      };

                      return (
                        <Link
                          href={
                            resolveLink(elevateCard?.field_links[0]?.uri) || "#"
                          }
                          target="_blank"
                          onClick={handleClick}
                          key={index}
                          className="relative w-[31%] min-h-[300px] mobileMax:w-full tablet:w-[31%] border-2 border-[#5DE29B] group duration-700 hover:scale-105 hover:shadow-md transition-all"
                        >
                          {isVideo && (
                            <ReactPlayer
                              url={elevateCard?.field_links[0]?.uri}
                              id={`react-video-player-${index}`}
                              width="100%"
                              height="100%"
                              className="absolute top-0 left-0"
                            />
                          )}
                          {!isVideo &&
                            (elevateCard?.field_image?.uri?.url ? (
                              <div
                                className="absolute inset-0 w-full h-full"
                                style={{
                                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%), url(${config.apiBase}${elevateCard?.field_image?.uri?.url})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            ) : (
                              <div className="absolute inset-0 w-full h-full bg-placeholder flex items-center justify-center">
                                <IoMdImages className="text-white w-[60%] h-[40%]" />
                              </div>
                            ))}

                          <div className="absolute top-0 left-0 w-full h-full hover:scale-105 hover:shadow-md transition-all duration-700 z-10"></div>

                          <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full z-20">
                            <div className="max-w-[90%]">
                              <h3 className="text-white leading-snug line-clamp-2 font-bold mobileMax:!font-semibold text-xmedium md:text-2xl lg:text-3xl xl:text-4xl mb-0">
                                {elevateCard?.field_title}
                              </h3>
                              <div className="font-poppins flex items-center text-white text-xmedium md:text-2xl lg:text-3xl xl:text-4xl">
                                See More{" "}
                                <FaChevronRight className="text-xsmall ml-1 mt-[4.5px]" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* step 2 */}
          <motion.div
            ref={supportSectionRef}
            className={`relative how-left-directions pb-[60px] step-2-lines`}
            variants={animationVariants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }}
            transition={{ duration: isMobile ? 0.4 : 0.8, ease: "easeOut" }}
          >
            {/* Step 2: X-axis line appears second */}
            <motion.div
              className="absolute left-[64px] top-[30px] mobileMax:hidden w-[1000px] betweenMobileTab:w-[85%] h-[6px] bg-gradient-to-r from-[#5de29b] to-[#5de29b] opacity-0 scale-x-0 origin-right pointer-events-none z-[1]"
              variants={animationVariants.xAxisLine}
            />
            {/* Step 3: Y-axis line appears third */}
            <motion.div
              className="absolute left-[64px] top-[30px] mobileMax:hidden w-[6px] h-[200px] bg-gradient-to-b from-[#5de29b] via-[#5de29b] to-[#5de29b] opacity-0 scale-y-0 origin-top pointer-events-none z-[1]"
              variants={animationVariants.yAxisLine}
            />
            <motion.div
              className="max-w-[325px] mobileMax:max-w-full flex items-center justify-center px-[20px] mobileMax:px-0 mx-auto relative z-10"
              variants={animationVariants.stepButton}
            >
              <Link
                href={
                  resolveLink(
                    data?.field_add_card_section?.[1]?.field_button_link?.uri
                  ) || "#"
                }
                className="!px-2 font-poppins insight-gardientBtn 
          !text-[#1D3E9C] text-[24px] font-bold w-full min-h-[55px] 
          rounded-[65px] hover:!underline !no-underline mobileMax:text-xmedium flex items-center justify-center"
              >
                {data?.field_add_card_section?.[1]?.field_button_link?.title}
              </Link>
            </motion.div>
            <motion.div
              className="mt-[100px] mobileMax:mt-5"
              variants={animationVariants.stepContent}
            >
              <div className="flex items-center justify-start tab:min-h-[350px] mobileMax:flex-col">
                <motion.div
                  className="flex items-center mobileMax:flex-col mobileMax:w-full min-w-[200px] py-5 relative z-10"
                  variants={animationVariants.stepImage}
                >
                  <Image
                    src="/static/images/support-arrow.png"
                    alt="grid-img"
                    width={255}
                    height={194}
                    className="h-full w-[140px] mobileMax:mb-3"
                  />
                  <Image
                    src="/static/images/green-left-arrow.png"
                    alt="arrow"
                    height={30}
                    width={25}
                    className="block ml-2 mobileMax:ml-0 mobileMax:mt-[8px] mobileMax:mb-3 mobileMax:rotate-90 tablet:rotate-0"
                  />
                </motion.div>
                <motion.div
                  className="desktop:max-w-[600px] max-w-full mobileMax:mx-0 ml-[30px] mr-[20px] betweenMobileTab:mx-1"
                  variants={animationVariants.stepContent}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.field_add_card_section?.[1]?.field_description
                          ?.processed,
                    }}
                    className="list-disc step-list text-left  mobileMax:mb-3 text-medium text-white font-poppins leading-normal font-semibold mobileMax:text-xsmall mobileMax:leading-normal"
                  />
                </motion.div>
                <motion.div
                  className="relative desktop:w-[400px] z-20 w-[300px] min-w-[300px] overflow-hidden"
                  variants={animationVariants.stepImage}
                >
                  <div
                    ref={supportContainerRef}
                    className="relative group desktop:ml-auto mobileToDesk:mx-auto mobileToDesk:my-5 tablet:ml-auto w-[90%] max-w-[400px] aspect-[550/515]"
                    onClick={() => setIsSupportActive((prev) => !prev)}
                  >
                    <Image
                      alt="video-play-icon"
                      src="/static/images/video-play-icon.png"
                      width={100}
                      height={100}
                      className="object-cover z-30 pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                    />
                    {/* Background pattern */}
                    <Image
                      alt="Background pattern"
                      src="/static/images/support-pattern.png"
                      fill
                      style={{ objectPosition: "center 50%" }}
                      className="object-cover z-10 pointer-events-none"
                    />

                    {/* Masked Image Layer */}
                    <div
                      className={`absolute inset-0 z-20 transition-transform duration-100 cursor-pointer
										  ${isSupportActive ? "rotate-[14deg]" : "rotate-0"} 
										  desktop:group-hover:rotate-[14deg]`}
                      style={{
                        WebkitMaskImage:
                          "url('/static/images/transition-shape1.png')",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskSize: "cover",
                        WebkitMaskPosition: "center",
                        maskImage:
                          "url('/static/images/transition-shape1.png')",
                        maskRepeat: "no-repeat",
                        maskSize: "cover",
                        maskPosition: "center",
                        overflow: "hidden",
                      }}
                    >
                      {/* Extra safe area for rotation */}
                      <div className="absolute inset-[-8%]">
                        <img
                          src="/static/images/support-pattern-bg.png"
                          alt="Background"
                          className={`w-full h-full object-cover transform transition-all duration-100
											  ${
                          isSupportActive
                            ? "scale-110 -translate-y-5 translate-x-5 -rotate-[14deg]"
                            : "scale-100 translate-x-0 translate-y-0 rotate-0"
                        } 
											  desktop:group-hover:scale-110 desktop:group-hover:-translate-y-5 desktop:group-hover:translate-x-5 desktop:group-hover:-rotate-[14deg]`}
                          style={{ objectPosition: "center" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="w-[90%] mt-[60px] mobileMax:w-full betweenMobileTab:w-[95%] mx-auto how-news-cards relative"
                variants={animationVariants.resourceCards}
              >
                {/* Step 5: Parallel Y-axis line for news cards appears fifth */}
                <motion.div
                  className="absolute right-[120px] mobileMax:hidden betweenMobileTab:right-[4%] padPro:right-[6%] news-paralell-line top-[-20px] w-[6px] h-[413px] bg-gradient-to-b from-[#5de29b] via-[#5de29b] to-[#5de29b] opacity-0 scale-y-0 origin-top pointer-events-none z-[1]"
                  variants={animationVariants.parallelYAxisLine}
                />

                <div className="w-[80%] mobileMax:w-full betweenMobileTab:w-[84%] mobileMax:flex-col mobileMax:gap-[20px] betweenMobileTab:gap-[20px] tablet:gap-[25px] flex items-start justify-between gap-[25px]">
                  {data?.field_add_card_section?.[1]?.field_add_card
                    ?.slice(0, 3)
                    .map((supportCard: DrupalNode, index: number) => {
                      const isVideo =
                        supportCard?.field_links?.[0]?.uri?.includes(
                          "youtube.com"
                        ) ||
                        supportCard?.field_links?.[0]?.uri?.includes(
                          "youtu.be"
                        );

                      const handleClick = (e: React.MouseEvent) => {
                        if (supportCard?.field_cs_landing_page === "yes") {
                          e.preventDefault();
                          router.push(
                            `/country-engagement/india/sectors/${supportCard?.id}`
                          );
                        }
                      };

                      // ✅ Extract YouTube video ID for thumbnail
                      const getYouTubeId = (url: string) => {
                        try {
                          const regExp =
                            /(?:youtube\.com\/.*v=|youtu\.be\/)([^&#?]+)/;
                          const match = url.match(regExp);
                          return match && match[1] ? match[1] : null;
                        } catch {
                          return null;
                        }
                      };

                      const videoId = isVideo
                        ? getYouTubeId(supportCard?.field_links?.[0]?.uri)
                        : null;

                      return (
                        <Link
                          key={index}
                          href={
                            resolveLink(supportCard?.field_links?.[0]?.uri) ||
                            "#"
                          }
                          onClick={handleClick}
                          target="_blank"
                          className="relative w-[48%] mobileMax:w-full tablet:w-[48%] min-h-[300px] border-2
	border-[#5DE29B] group overflow-hidden 
	transform-gpu will-change-transform 
	transition-transform duration-700 ease-in-out 
	hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]"
                          style={{
                            boxSizing: "border-box",
                          }}
                        >
                          {/* ✅ Show YouTube Thumbnail if Video */}
                          {isVideo && videoId ? (
                            <div
                              className="absolute inset-0 w-full h-full  border-[#5DE29B] transition-transform duration-700 ease-in-out"
                              style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%), url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`,
                                backgroundSize: "770px 529px",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundOrigin: "content-box",
                              }}
                            />
                          ) : supportCard?.field_image?.uri?.url ? (
                            <div
                              className="absolute inset-0 w-full h-full border-[#5DE29B] transition-transform duration-700 ease-in-out"
                              style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%), url(${config.apiBase}${supportCard?.field_image?.uri?.url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            />
                          ) : (
                            <div className="absolute inset-0 w-full h-full bg-placeholder flex items-center justify-center">
                              <IoMdImages className="text-white w-[60%] h-[40%]" />
                            </div>
                          )}

                          {/* ✅ Optional play icon overlay for video */}
                          {isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                              <div className="flex items-center justify-center">
                                <img
                                  src="/static/images/youtube-logo.png"
                                  alt=""
                                  className=" w-16 h-[60px]"
                                />
                              </div>
                            </div>
                          )}

                          {/* ✅ Text overlay */}
                          <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full z-30">
                            <div className="max-w-[90%]">
                              <h3 className="text-white leading-snug line-clamp-2 font-bold mobileMax:!font-semibold text-xmedium md:text-2xl lg:text-3xl xl:text-4xl mb-0">
                                {supportCard?.field_title}
                              </h3>
                              <div className="font-poppins flex items-center text-white text-xmedium md:text-2xl lg:text-3xl xl:text-4xl">
                                See More{" "}
                                <FaChevronRight className="text-xsmall ml-1 mt-[4.5px]" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* step 3 */}
          <motion.div
            ref={investSectionRef}
            className={`relative how-left-directions last-line step-3-lines`}
            variants={animationVariants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }}
            transition={{ duration: isMobile ? 0.4 : 0.8, ease: "easeOut" }}
          >
            {/* Step 2: X-axis line appears second */}
            <motion.div
              className="absolute left-[64px] top-[27px] mobileMax:hidden w-[1000px] betweenMobileTab:w-[85%] h-[6px] bg-gradient-to-r from-[#5de29b] to-[#5de29b] opacity-0 scale-x-0 origin-right pointer-events-none z-[1]"
              variants={animationVariants.xAxisLine}
            />
            {/* Step 3: Y-axis line appears third */}
            <motion.div
              className="absolute left-[64px] top-[27px] mobileMax:hidden w-[6px] h-[200px] bg-gradient-to-b from-[#5de29b] via-[#5de29b] to-[#8EBCE5] opacity-0 scale-y-0 origin-top pointer-events-none z-[1]"
              variants={animationVariants.yAxisLine}
            />
            <motion.div
              className="max-w-[325px] mobileMax:max-w-full flex items-center justify-center px-[20px] mobileMax:px-0 mx-auto relative z-10"
              variants={animationVariants.stepButton}
            >
              <Link
                href={
                  resolveLink(
                    data?.field_add_card_section?.[2]?.field_button_link?.uri
                  ) || "#"
                }
                className="!px-2 font-poppins insight-gardientBtn 
          !text-[#1D3E9C] text-[24px] font-bold w-full min-h-[55px] 
          rounded-[65px] hover:!underline !no-underline mobileMax:text-xmedium flex items-center justify-center"
              >
                {data?.field_add_card_section?.[2]?.field_button_link?.title}
              </Link>
            </motion.div>
            <motion.div
              className="mt-[100px] mobileMax:mt-5"
              variants={animationVariants.stepContent}
            >
              <div className="flex items-center justify-start tab:min-h-[350px] mobileMax:flex-col">
                <motion.div
                  className="flex items-center mobileMax:flex-col mobileMax:w-full min-w-[200px] py-5 relative z-10"
                  variants={animationVariants.stepImage}
                >
                  <Image
                    src="/static/images/invest-icon.png"
                    alt="grid-img"
                    width={255}
                    height={194}
                    className="h-full w-[140px] mobileMax:mb-3"
                  />
                  <Image
                    src="/static/images/green-left-arrow.png"
                    alt="arrow"
                    height={30}
                    width={25}
                    className="block ml-2 mobileMax:ml-0 mobileMax:mt-[8px] mobileMax:mb-3 mobileMax:rotate-90 tablet:rotate-0"
                  />
                </motion.div>
                <motion.div
                  className="desktop:max-w-[600px] max-w-full mobileMax:mx-0 mx-[20px] tablet:mx-[20px]"
                  variants={animationVariants.stepContent}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.field_add_card_section?.[2]?.field_description
                          ?.processed,
                    }}
                    className="list-disc step-list text-left  mobileMax:mb-3 text-medium text-white font-poppins leading-normal font-semibold mobileMax:text-xsmall mobileMax:leading-normal"
                  />
                </motion.div>
              </div>
              <motion.div
                className="w-[90%] mx-auto mobileMax:w-full"
                variants={animationVariants.resourceCards}
              >
                <div className="w-[80%] mobileMax:w-full betweenMobileTab:w-[84%] mobileMax:flex-col mobileMax:gap-[20px] betweenMobileTab:gap-[20px] tablet:gap-[25px] flex items-start justify-between gap-[25px]">
                  {data?.field_add_card_section?.[2]?.field_add_card
                    ?.slice(0, 3)
                    .map((investCard: DrupalNode, index: number) => {
                      const isVideo =
                        investCard?.field_links?.[0]?.uri?.includes(
                          "youtube.com"
                        ) ||
                        investCard?.field_links?.[0]?.uri?.includes("youtu.be");

                      const handleClick = (e: React.MouseEvent) => {
                        if (investCard?.field_cs_landing_page === "yes") {
                          e.preventDefault();
                          router.push(
                            `${"/country-engagement/india/sectors/"}${
                              investCard?.id
                            }`
                          );
                        }
                      };

                      return (
                        <Link
                          href={
                            resolveLink(investCard?.field_links?.[0]?.uri) ||
                            "#"
                          }
                          target="_blank"
                          onClick={handleClick}
                          key={index}
                          className="relative w-[31%] mobileMax:w-full tablet:w-[31%] min-h-[300px] border-2 border-[#5DE29B] group duration-700 hover:scale-105 hover:shadow-md transition-all"
                        >
                          {isVideo && (
                            <ReactPlayer
                              url={investCard?.field_cs_content_link[0]?.uri}
                              id={`react-video-player-${index}`}
                              width="100%"
                              height="100%"
                              className="absolute top-0 left-0"
                            />
                          )}
                          {!isVideo &&
                            (investCard?.field_image?.uri?.url ? (
                              <div
                                className="absolute inset-0 w-full h-full"
                                style={{
                                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%), url(${config.apiBase}${investCard?.field_image?.uri?.url})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                }}
                              />
                            ) : (
                              <div className="absolute inset-0 w-full h-full bg-placeholder flex items-center justify-center">
                                <IoMdImages className="text-white w-[60%] h-[40%]" />
                              </div>
                            ))}

                          <div className="absolute top-0 left-0 w-full h-full hover:scale-105 hover:shadow-md transition-all duration-700 z-10"></div>

                          <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full z-20">
                            <div className="max-w-[90%]">
                              <h3 className="text-white leading-snug line-clamp-2 font-bold mobileMax:!font-semibold text-xmedium md:text-2xl lg:text-3xl xl:text-4xl mb-0">
                                {investCard?.field_title}
                              </h3>
                              <div className="font-poppins flex items-center text-white text-xmedium md:text-2xl lg:text-3xl xl:text-4xl">
                                See More{" "}
                                <FaChevronRight className="text-xsmall ml-1 mt-[4.5px]" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <Link
          href={resolveLink(data?.field_button_link?.uri) || "#"}
          className="flex desktop:hidden mt-10 text-clip items-center justify-center font-poppins font-[600] text-transparent bg-clip-text bg-[#48DBB2] text-xmedium rounded-[10px] hover:!underline mobileMax:min-w-full mobileMax:text-small "
        >
          {data?.field_button_link?.title}{" "}
          <FaChevronRight className="text-small ml-1 text-[#48DBB2] mt-[1px]" />
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 2.8,
        }}
        className="absolute right-0 bottom-[70px] pointer-events-none max-w-[15%] betweenMobileTab:max-w-[45%] mobileMax:max-w-[50%]"
      >
        <img
          src="/static/images/india-bg-1.svg"
          alt="get-inv-home"
          className="opacity-60 mobileMax:opacity-50"
        />
      </motion.div>
    </div>
  );
};

export default MultipleCardSection;
