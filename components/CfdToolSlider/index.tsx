"use client";
import React, { useState } from "react";
import Slider, { LazyLoadTypes } from "react-slick";
import { DrupalNode } from "next-drupal";
import { IoMdImages } from "react-icons/io";
import DynamicImage from "../ResuableDynamicImage";

interface cfdToolSliderPropsProps {
  sliderData: DrupalNode[];
}

const CfdToolSlider: React.FC<cfdToolSliderPropsProps> = ({ sliderData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    lazyLoad: "ondemand" as LazyLoadTypes,
  };

  return (
    <>
      <Slider {...settings} className="slider-theme-arrow">
        {sliderData?.map((data: DrupalNode, index: number) => {
          return (
            <div key={index} className="desktop:px-[15px] pb-2 w-full mx-auto laptopMax:py-3 laptopMax:border-t-[1px] laptopMax:border-[#8A8C8E]">
              <div className="flex items-start box-border exactLaptop:bg-white remove-news-shadow card-shadow w-full laptop:h-[280px] h-[245px] aboveMinMobile:h-[160px] minMobile:h-[140px] exactLaptop:rounded-[4px] overflow-hidden">
                <div className="tab:w-[40%] tab:max-w-[50%] flex justify-center items-center w-full overflow-hidden relative mobileMax:mb-0 h-full minMobile:w-[90%] mobileMax:mr-2 lieTablets:mr-3">
                  {data?.field_image_icon?.uri?.url ? (
                    <DynamicImage
                      width={463}
                      height={280}
                      src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${data?.field_image_icon?.uri?.url || ""
                        }`}
                      alt="category img"
                      className="h-full w-full bg-placeholder"
                    />
                  ) : (
                    <div className="w-full h-full bg-placeholder flex items-center justify-center">
                      <IoMdImages className="text-white w-[60%] h-[60%]" />
                    </div>
                  )}
                </div>
                <div className="exactLaptop:w-[60%] exactLaptop:p-4 flex flex-col h-full w-full laptopMax:py-0.5">
                  <div className="w-full h-full flex flex-col justify-between pr-1 mobileMax:pr-0">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.field_content?.processed,
                      }}
                      className="text-numans mb-3 block text-left text-[18px] mobileMax:text-small text-cardHeading line-clamp-3 aboveMinMobile:line-clamp-3 webkit-box font-semibold leading-normal mobileMax:h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default CfdToolSlider;