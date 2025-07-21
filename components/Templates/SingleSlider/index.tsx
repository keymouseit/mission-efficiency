"use client";
import React, { useState } from "react";
import Link from "next/link";
import Slider, { LazyLoadTypes } from "react-slick";
import { DrupalNode } from "next-drupal";
import { buildMediaTypeAndSrc } from "@/lib/utils";
import { motion } from "framer-motion";
import { MdChevronRight } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import Image from "next/image";

interface singleSliderProps {
  singleSliderData: DrupalNode;
}
const SingleSlider: React.FC<singleSliderProps> = ({ singleSliderData }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    lazyLoad: "ondemand" as LazyLoadTypes,
  };

  return (
    <div className="py-16 bg-mapGray mobileMax:py-10">
      <div className="mini-container">
        <motion.h3
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation desktop:text-[66px] desktop:leading-[85px] text-numans desktop:mb-[70px] text-center  text-clip text-[48px] leading-[60px] mb-[50px] mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-8"
          style={{
            backgroundImage:
              "linear-gradient(282deg, #716ef8, #716ef8, #40abe7,#40abe7, #40c9e7)",
          }}
        >
          {singleSliderData?.title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation mb-16 b-10 mobileMax:py-6"
        >
          <Slider {...settings} className="slider-theme-arrow">
            {singleSliderData?.field_add_timeline_slides?.map(
              (slides: DrupalNode, index: number) => {
                return (
                  <div
                    key={index}
                    className="desktop:px-[15px] w-full mx-auto laptopMax:py-3 laptopMax:border-t-[1px] laptopMax:border-[#8A8C8E]"
                  >
                    <div className="flex items-start box-border exactLaptop:bg-white remove-news-shadow card-shadow w-full laptop:h-[320px] h-[245px] aboveMinMobile:h-[160px] minMobile:h-[140px] exactLaptop:rounded-[4px] overflow-hidden">
                      <div className="tab:w-[40%] tab:max-w-[50%] flex justify-center items-center w-full overflow-hidden relative mobileMax:mb-0 h-full minMobile:w-[90%] mobileMax:mr-2 lieTablets:mr-3">
                        {slides?.field_tl_images.uri.url ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${slides?.field_tl_images.uri.url}`}
                            alt="category img"
                            className="w-full h-full object-cover"
                            width="400"
                            height="400"
                          />
                        ) : (
                          <div className="w-full h-full bg-placeholder flex items-center justify-center">
                            <IoMdImages className="text-white w-[60%] h-[60%]" />
                          </div>
                        )}
                      </div>
                      <div className="exactLaptop:w-[60%] exactLaptop:p-4 flex flex-col h-full w-full laptopMax:py-0.5">
                        <div className="w-full h-full flex flex-col justify-between pr-1 mobileMax:pr-0">
                          <div className="">
                            {slides?.field_tl_sub_title && (
                              <h4 className="text-numans mb-3 block text-left text-[18px] mobileMax:text-small text-cardHeading line-clamp-2 aboveMinMobile:line-clamp-3 webkit-box font-semibold leading-normal mobileMax:h-auto">
                                {slides?.field_tl_sub_title}
                              </h4>
                            )}
                            {slides?.field_tl_description && (
                              <div
                                className="mobileMax:!hidden mb-2 flex items-start lieExactTab:line-clamp-3 line-clamp-6 text-left webkit-box text-small text-cardText leading-6 mobileMax:text-xsmall mobileMax:leading-normal"
                                dangerouslySetInnerHTML={{
                                  __html: slides?.field_tl_description,
                                }}
                              />
                            )}
                            {/* {slides?.field_link_text && (
                            <Link
                              href={slides?.field_link || "#"}
                              target="_blank"
                              className="--font-poppins laptop:mt-10 mt-6 text-small text-defaultLink leading-6 flex items-center cursor-pointer  mobileMax:text-xsmall"
                            >
                              {slides?.field_link_text}
                              <MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5" />
                            </Link>
                          )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </Slider>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleSlider;
