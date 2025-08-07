"use client";
import React from "react";
import Slider from "react-slick";
import { DrupalNode } from "next-drupal";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { DEV_PUBLIC_URL } from "@/services/api";

interface PartnerCardSliderProps {
  sliderData: DrupalNode;
}

const PartnerCardSlider: React.FC<PartnerCardSliderProps> = ({
  sliderData,
}) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 100,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settings2 = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 100,
    cssEase: "linear",
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="partners" className="mb-72">
      <motion.h3
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0,
        }}
        className="pt-[82px] remove-animation-fluctuation desktop:text-[55px] text-numans mb-5 desktop:leading-[85px] text-center category-gradient text-clip text-[48px] leading-normal mobileMax:text-[35px] mobileMax:mb-3"
      >
        {sliderData?.field_title}
      </motion.h3>

      <Slider {...settings}>
        {sliderData?.field_add_section
          ?.slice(0, 8)
          .map((partnerCard: DrupalNode, index: number) => {
            return (
              <div
                key={index}
                className="px-[15px] mb-[30px] mt-10 w-[16%] mobileMax:w-[50%] betweenMobileTab:w-[25%] mobileMax:mb-5 mobileMax:px-[10px]"
              >
                <Link
                  href={partnerCard?.field_link?.uri}
                  target="_blank"
                  className="border-2 border-transparent hover:border-blueBorder transition block rounded-[25px] flex justify-center items-center bg-white px-[15px] py-[10px] box-border w-full card-shadow"
                >
                  <div className="max-w-[160px] w-full h-[110px] max-h-[110px] min-w-[120px] min-h-[100px] overflow-hidden">
                    <Image
                      src={`${DEV_PUBLIC_URL}${partnerCard?.field_icon?.uri?.url}`}
                      alt="img"
                      width={160}
                      height={100}
                      className="w-full h-full max-w-full object-scale-down min-w-[120px] min-h-[100px]"
                    />
                  </div>
                </Link>
              </div>
            );
          })}
      </Slider>

      <Slider {...settings2}>
        {sliderData?.field_add_section
          ?.slice(9, sliderData?.length)
          .map((partnerCard: DrupalNode, index: number) => {
            return (
              <div
                key={index}
                className="px-[15px] mb-[30px] w-[16%] mobileMax:w-[50%] betweenMobileTab:w-[25%] mobileMax:mb-5 mobileMax:px-[10px]"
              >
                <Link
                  href={partnerCard?.field_link?.uri}
                  target="_blank"
                  className="border-2 border-transparent hover:border-blueBorder transition block rounded-[25px] flex justify-center items-center bg-white px-[15px] py-[10px] box-border w-full card-shadow"
                >
                  <div className="max-w-[160px] w-full h-[110px] max-h-[110px] min-w-[120px] min-h-[100px] overflow-hidden">
                    <Image
                      src={`${DEV_PUBLIC_URL}${partnerCard?.field_icon?.uri?.url}`}
                      alt="img"
                      width={160}
                      height={100}
                      className="w-full h-full max-w-full object-scale-down min-w-[120px] min-h-[100px]"
                    />
                  </div>
                </Link>
              </div>
            );
          })}
      </Slider>
    </section>
  );
};

export default PartnerCardSlider;
