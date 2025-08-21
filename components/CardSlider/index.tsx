"use client";
import React from "react";
import Slider, { LazyLoadTypes } from "react-slick";
import { DrupalNode } from "next-drupal";
import slugify from "slugify";
import { buildMediaTypeAndSrc, formatDateToUS } from "@/lib/utils";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import ReactPlayer from "react-player";
import { IoDocumentTextOutline } from "react-icons/io5";
import { renderIcon } from "@/lib/parsers";

interface NewsCardSliderProps {
  sliderData: DrupalNode[];
  sliderConfig: DrupalNode;
  latestSliderData?: DrupalNode[];
}

const CardSlider: React.FC<NewsCardSliderProps> = ({
  sliderConfig,
  latestSliderData,
}) => {
  const settings = {
    dots: sliderConfig?.field_show_dots ?? true,
    infinite: sliderConfig?.field_infinite ?? false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: sliderConfig?.field_show_arrows ?? true,
    autoplay: sliderConfig?.field_autoplay ?? false,
    autoplaySpeed: sliderConfig?.field_autoplay_speed ?? 5000,
    speed: sliderConfig?.field_transition_speed ?? 2000,
    pauseOnHover: sliderConfig?.field_pause_on_hover ?? true,
    cssEase: "linear",
    lazyLoad: "ondemand" as LazyLoadTypes,
  };

  return (
    <Slider {...settings} className="slider-theme-arrow">
      {latestSliderData?.map((newsData: DrupalNode, index: number) => {
        const sluggedLink = `news/${slugify(
          `${newsData.title} ${newsData.id}`
        )}`;

        const mediaTypeAndSrc = buildMediaTypeAndSrc(
          newsData.field_news_media_url
        );

        return (
          <div
            key={index}
            className="desktop:px-[15px] w-full mx-auto laptopMax:py-3 laptopMax:border-t-[1px] laptopMax:border-[#8A8C8E]"
          >
            <div className="flex items-start box-border exactLaptop:bg-white remove-news-shadow card-shadow w-full laptop:h-[320px] h-[245px] aboveMinMobile:h-[160px] minMobile:h-[140px] exactLaptop:rounded-[4px] overflow-hidden">
              <div className="tab:w-[40%] tab:max-w-[50%] flex justify-center items-center w-full overflow-hidden relative mobileMax:mb-0 h-full minMobile:w-[90%] mobileMax:mr-2 lieTablets:mr-3">
                {mediaTypeAndSrc.type === "image" ? (
                  <img
                    src={`${mediaTypeAndSrc.src}`}
                    alt="category img"
                    className="w-full h-full max-w-full object-scale-down card-shadow"
                  />
                ) : mediaTypeAndSrc.type === "video" ? (
                  <div className={`w-full h-full `}>
                    <ReactPlayer
                      id="react-video-player"
                      url={mediaTypeAndSrc?.src || ""}
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-placeholder flex items-center justify-center">
                    {mediaTypeAndSrc.type === "pdf" ? (
                      <IoDocumentTextOutline className="text-white w-[65%] h-[65%]" />
                    ) : (
                      <>{renderIcon(newsData?.field_n_resource?.name)}</>
                    )}
                  </div>
                )}
              </div>
              <div className="exactLaptop:w-[60%] exactLaptop:p-4 flex flex-col h-full w-full laptopMax:py-0.5">
                <div className="w-full h-full flex flex-col justify-between pr-1 mobileMax:pr-0">
                  <div className="">
                    <h4 className="text-numans mb-3 block text-left text-[18px] mobileMax:text-small text-cardHeading line-clamp-2 aboveMinMobile:line-clamp-3 webkit-box font-semibold hover:text-blue hover:underline leading-normal mobileMax:h-auto">
                      {newsData?.title}
                    </h4>
                    <div
                      className="mobileMax:!hidden mb-2 flex items-start lieExactTab:line-clamp-3 line-clamp-6 text-left webkit-box text-small text-cardText leading-6 mobileMax:text-xsmall mobileMax:leading-normal"
                      dangerouslySetInnerHTML={{
                        __html: newsData?.field_news_blurb?.value,
                      }}
                    />
                    <Link
                      href={sluggedLink || "#"}
                      target="_blank"
                      className="--font-poppins laptop:mt-10 mt-6 text-small text-defaultLink leading-6 flex items-center cursor-pointer  mobileMax:text-xsmall"
                    >
                      Learn more
                      <MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5 mt-0." />
                    </Link>
                  </div>
                  <div className="flex items-start flex-wrap">
                    {newsData?.field_news_date && (
                      <p className="text-xsmall mobileMax:text-[13px] text-gray font-medium leading-6 --font-poppins pr-2 mobileMax:pr-1 mr-2 mobileMax:mr-2 border-r-[1px] border-gray flex items-center">
                        {formatDateToUS(newsData?.field_news_date)}
                      </p>
                    )}
                    <p className="text-xsmall mobileMax:text-[13px] text-gray font-medium leading-6 --font-poppins">
                      {newsData?.field_n_resource?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default CardSlider;
