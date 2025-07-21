"use client";
import { DrupalNode } from "next-drupal";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Slider, { LazyLoadTypes } from "react-slick";

const images = [
  "/sites/default/files/2024-03/Africa-school-girls.jpg",
  "/sites/default/files/2024-03/Africa-school-girls.jpg",
  "/sites/default/files/2024-03/Africa-school-girls.jpg",
  "/sites/default/files/2024-03/Africa-school-girls.jpg",
];
interface sliderDataProps {
    sliderData: DrupalNode;
}

const ImageSlider:React.FC<sliderDataProps> = ({sliderData}) => {

  const settings = {
    dots: sliderData?.field_slider_controls,
    infinite: true,
    slidesToShow: sliderData?.field_display_number_of_images,
    slidesToScroll: 1,
    arrows: sliderData?.field_slider_controls,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    prevArrow: <FaAngleLeft />,
    nextArrow: <FaAngleRight />,
    cssEase: "linear",
    lazyLoad: "ondemand" as LazyLoadTypes,
  };
  
  return (
      <Slider {...settings} className="image-slider">
        {sliderData?.field_slider_images?.map((src: DrupalNode, index: number) => {
          return (
            <div
              key={index}
              className={`${sliderData?.field_display_number_of_images > 1 && "px-2"} relative h-[500px] lieExactTab:h-[300px]`}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${src?.uri?.url}`}
                alt="Slide"
                className="w-full h-full object-cover object-center"
              />
            </div>
          );
        })}
      </Slider>
  );
};

export default ImageSlider;
