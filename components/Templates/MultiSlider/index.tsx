"use client";
import React from "react";
import { PiArrowCircleLeftThin, PiArrowCircleRightThin } from "react-icons/pi";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Link from "next/link";
import { IoMdImages } from "react-icons/io";
import { DrupalNode } from "next-drupal";
import Image from "next/image";

interface multiSlideProps {
  timelineSliderData: DrupalNode;
}
const MultiSlider: React.FC<multiSlideProps> = ({ timelineSliderData }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite:true,
    speed: 1500,
    slidesToShow: timelineSliderData?.field_tl_slider_type ? 2: 1,
    slidesToScroll: 1,
    prevArrow: <PiArrowCircleLeftThin />,
    nextArrow: <PiArrowCircleRightThin />,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="py-20 history-card-wrapper mobileMax:py-12 bg-white">
      <div className="mini-container">
        <div className="pb-[50px]">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation text-xsmall text-[#a09a9a] tracking-[3.64px] pb-3 uppercase --font-poppins border-b border-[#6ea8ed]"
          >
            {timelineSliderData?.title}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation"
        >
          <Slider {...settings}>
            {timelineSliderData?.field_add_timeline_slides?.map((slides: DrupalNode, index: number) => {
              return (
                <Link
                  key={index}
                  href={slides?.field_link || ""}
                  target="_blank"
                >
                  <motion.div className="px-[15px] mb-[30px] w-full mobileMax:w-full mobileMax:px-0 0 betweenMobileTab:px-[10px]">
                    <div className="history-cards relative z-[1]">
                      <h2 className="desktop:text-[66px] text-numans mb-6 text-left multi-text text-clip text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-3">
                        {slides?.title}
                      </h2>
                      <div className="flex items-start flex-col box-border w-full">
                        <div className="mb-[35px] flex justify-center items-center h-[215px] overflow-hidden w-full mobileMax:mb-5">
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
                        <div className="h-full w-full">
                          {slides?.field_tl_sub_title && (
                            <h4 className="text-numans tracking-tight text-left text-[27px] mb-5 text-[#313132] leading-9 line-clamp-3 mobileMax:text-medium mobileMax:leading-7 mobileMax:mb-3">
                                 {slides?.field_tl_sub_title}
                            </h4>
                          )}
                          {slides?.field_tl_description && (
                            <div
                              className="--font-poppins text-left text-small text-cardText leading-6 line-clamp-5 mobileMax;text-xsmall"
                              dangerouslySetInnerHTML={{
                                __html: slides?.field_tl_description,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </Slider>
        </motion.div>
      </div>
    </div>
  );
};

export default MultiSlider;
