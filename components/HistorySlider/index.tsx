"use client";
import React from "react";
import Slider from "react-slick";
import { DrupalNode } from "next-drupal";
import { PiArrowCircleRightThin, PiArrowCircleLeftThin } from "react-icons/pi";
import { motion } from "framer-motion";
import Link from "next/link";
import { DEV_PUBLIC_URL } from "@/services/api";

interface HistorySliderProps {
  sliderData: DrupalNode;
}

const HistorySlider: React.FC<HistorySliderProps> = ({ sliderData }) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PiArrowCircleLeftThin />,
    nextArrow: <PiArrowCircleRightThin />,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <>
      <Slider {...settings}>
        {sliderData?.map((timelineCard: DrupalNode, index: number) => {
          return (
            <Link
              key={index}
              href={timelineCard?.field_button[0]?.uri || ""}
              target="_blank"
            >
              <motion.div className="px-[15px] mb-[30px] w-full mobileMax:w-full mobileMax:px-0  betweenMobileTab:px-[10px]">
                <div className="history-cards relative z-[1]">
                  <h2 className="desktop:text-[66px] text-numans mb-6 text-left multi-text text-clip text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-3">
                    {timelineCard?.field_title}
                  </h2>
                  <div className="flex items-start flex-col box-border w-full">
                    <div className="mb-[35px] flex justify-center items-center h-[215px] overflow-hidden w-full mobileMax:mb-5">
                      <img
                        src={`${DEV_PUBLIC_URL}${timelineCard?.field_icon?.uri?.url}`}
                        alt="category img"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-full w-full">
                      <h4 className="text-numans tracking-tight text-left text-[27px] mb-5 text-[#313132] leading-9 line-clamp-3 mobileMax:text-medium mobileMax:leading-7 mobileMax:mb-3">
                        {timelineCard?.field_sub_title}
                      </h4>
                      <div
                        className="--font-poppins text-left text-small text-cardText leading-6 line-clamp-5 mobileMax;text-xsmall"
                        dangerouslySetInnerHTML={{
                          __html: timelineCard?.field_description?.processed,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </Slider>
    </>
  );
};

export default HistorySlider;
