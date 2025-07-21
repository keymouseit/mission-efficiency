"use client";
import React, { useRef, useState } from "react";
import Slider, { LazyLoadTypes } from "react-slick";
import { DrupalNode } from "next-drupal";
import { motion } from "framer-motion";
import slugify from "slugify";
import { buildMediaTypeAndSrc, formatDateToUS } from "@/lib/utils";
import Link from "next/link";
import ReactPlayer from "react-player";
import { IoDocumentTextOutline } from "react-icons/io5";
import { renderIcon } from "@/lib/parsers";
import { MdChevronRight } from "react-icons/md";
import { reverse } from "dns";
import { IoMdImages } from "react-icons/io";

interface CountrySliderProps {
  sliderData: DrupalNode[];
}

const CountrySlider: React.FC<CountrySliderProps> = ({ sliderData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    // autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    lazyLoad: "ondemand" as LazyLoadTypes,
  };

  return (
    <>
      <Slider {...settings} className="slider-theme-arrow">
        {sliderData?.map((newsData: DrupalNode, index: number) => {
          // const sluggedLink = `news/${slugify(
          // 	`${newsData.title} ${newsData.id}`,
          // )}`;

          const mediaTypeAndSrc = buildMediaTypeAndSrc(
            newsData.field_news_media_url
          );
          return (
            <div
              key={index}
              
              className="desktop:px-[15px] w-full mx-auto laptopMax:py-3 laptopMax:border-t-[1px] laptopMax:border-[#8A8C8E]"
            >
              <motion.div
                className="flex items-start box-border exactLaptop:bg-white remove-news-shadow card-shadow w-full laptop:h-[320px] h-[245px] aboveMinMobile:h-[160px] minMobile:h-[140px] exactLaptop:rounded-[4px] overflow-hidden"
                // viewport={{ once: true }}
                // transition={{
                // 	type: 'spring',
                // 	duration: 0.5,
                // }}
              >
                <div className="tab:w-[40%] tab:max-w-[50%] flex justify-center items-center w-full overflow-hidden relative mobileMax:mb-0 h-full minMobile:w-[90%] mobileMax:mr-2 lieTablets:mr-3">
                  {/* images */}
                  {/* {mediaTypeAndSrc.type === 'image' ? ( */}
                  {/* <img
											src={`${mediaTypeAndSrc.src}`}
											alt="category img"
											className="w-full h-full max-w-full object-scale-down card-shadow"
										/> */}
                  {/* ) : mediaTypeAndSrc.type === 'video' ? (
										<div className={`w-full h-full ${index === currentSlide ? 'show' : 'hide'}`}>
											<ReactPlayer
												id="react-video-player"
												url={mediaTypeAndSrc?.src || ''}
												width="100%"
												height="100%"
											/>
										</div>
									) : ( */}
                  {newsData?.field_card_image?.uri?.url?.length > 0 ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
                        newsData?.field_card_image?.uri?.url || ""
                      }`}
                      alt="category img"
                      className="w-full h-full max-w-full object-scale-down card-shadow"
                    />
                  ) : (
                    <div className="w-full h-full bg-placeholder flex items-center justify-center">
                      <IoMdImages className="text-white w-[60%] h-[60%]" />;
                    </div>
                  )}

                  {/* <img
											src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
                                                newsData?.field_card_image?.uri?.url || ""
                                              }`}
											alt="category img"
											className="w-full h-full max-w-full object-scale-down card-shadow"
										/>  */}
                  {/* <div className="w-full h-full bg-placeholder flex items-center justify-center">
											
                                        <IoMdImages className="text-white w-[60%] h-[60%]" />;
											
										</div> */}
                  {/* )} */}
                </div>
                <div className="exactLaptop:w-[60%] exactLaptop:p-4 flex flex-col h-full w-full laptopMax:py-0.5">
                  <div className="w-full h-full flex flex-col justify-between pr-1 mobileMax:pr-0">
                    <div className="">
                      <h4 className="text-numans mb-3 block text-left text-[18px] mobileMax:text-small text-cardHeading line-clamp-2 aboveMinMobile:line-clamp-3 webkit-box font-semibold hover:text-blue hover:underline leading-normal mobileMax:h-auto">
                        {/* {newsData?.title} */}
                      </h4>
                      <div
                        className="mb-2 flex items-start lieExactTab:line-clamp-3 line-clamp-6 text-left webkit-box text-small text-cardText leading-6 mobileMax:text-xsmall mobileMax:leading-normal country-detail-text"
                        dangerouslySetInnerHTML={{
                          __html: newsData?.field_card_description?.value,
                        }}
                      />
                      {/* <Link
												href={sluggedLink || '#'}
												target="_blank"
												className="--font-poppins laptop:mt-10 mt-6 text-small text-defaultLink leading-6 flex items-center cursor-pointer  mobileMax:text-xsmall"
											>
												Learn More
												<MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5" />
											</Link> */}
                    </div>
                    {/* date */}
                    {/* <div className="flex items-start flex-wrap">
											{newsData?.field_news_date ? (
												<p className="text-xsmall mobileMax:text-[13px] text-gray font-medium leading-6 --font-poppins pr-2 mobileMax:pr-1 mr-2 mobileMax:mr-2 border-r-[1px] border-gray flex items-center">
													{formatDateToUS(newsData?.field_news_date)}
												</p>
											) : null}
											<p className="text-xsmall mobileMax:text-[13px] text-gray font-medium leading-6 --font-poppins">
												{newsData?.field_n_resource?.name}
											</p>
										</div> */}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default CountrySlider;
