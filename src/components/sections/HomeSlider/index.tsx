"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Banner from "../Banner";
import { config } from "@/lib/config";
import { resolveLink } from "@/utils";
import dynamic from "next/dynamic";
import type SliderType from "react-slick";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
}) as unknown as React.FC<SliderType["props"]>;

interface BannerProps {
  mediaItems?: any;
}

const HomeSlider: React.FC<BannerProps> = ({ mediaItems }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sliderRef = useRef<SliderType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    speed: 800,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    arrows: false,
    fade: false,
    cssEase: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
    beforeChange: (_current: number, next: number) => {
      setActiveSlide(next);
      const isVideo = !!mediaItems?.[next]?.field_card_video_file;

      if (isVideo) {
        if (sliderRef.current) {
          sliderRef.current.slickPause();
          setTimeout(() => {
            sliderRef.current?.slickPlay();
          }, 30000); // 30s
        }

        // Reset + play video from start
        setTimeout(() => {
          if (videoRefs.current[next]) {
            videoRefs.current[next]!.currentTime = 0;
            videoRefs.current[next]!.play();
          }
        }, 200);
      } else {
        if (sliderRef.current) {
          sliderRef.current.slickPlay();
        }
      }

      videoRefs.current.forEach((video, index) => {
        if (video && index !== next) {
          video.pause();
        }
      });
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
    customPaging: (_i: number) => <span className="custom-dot" />,
  };

  // Handle first slide if it's a video
  useEffect(() => {
    if (mediaItems && mediaItems[0]?.field_card_video_file) {
      setTimeout(() => {
        if (sliderRef.current && videoRefs.current[0]) {
          sliderRef.current.slickPause();
          videoRefs.current[0].currentTime = 0;
          videoRefs.current[0].play();
          setTimeout(() => {
            sliderRef.current?.slickPlay();
          }, 30000);
        }
      }, 500);
    }
  }, [mediaItems]);

  const handleSlideChange = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <div
      className="banner-wrap-styling h-[720px] mobileMax:h-[500px] relative overflow-hidden w-full box-border"
      style={{
        background:
          mediaItems && mediaItems.length > 0
            ? "white"
            : "radial-gradient(circle at 41% 94%, #1dc9ff, #2808a7 40%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 w-full h-full z-[1]"
      >
        <div
          className="absolute bottom-12 mobileMax:bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50"
          role="tablist"
          aria-label="Slide navigation"
        >
          {mediaItems?.map((_: any, index: number) => {
            const isActive = activeSlide === index;

            return (
              <button
                key={index}
                role="tab"
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={isActive}
                aria-current={isActive ? "true" : undefined}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleSlideChange(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSlideChange(index);
                  }
                }}
                className="focus:outline-none focus-visible:ring-2 ring-offset-2 ring-[#01DC59] rounded-full p-2"
              >
                {isActive ? (
                  <div className="h-4 w-8 rounded-full border bg-gradient-to-l from-[#01DC59] to-[#FFFFFF]" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-black bg-white" />
                )}
              </button>
            );
          })}
        </div>

        <Slider
          ref={sliderRef}
          {...sliderSettings}
          className="slider-theme-arrow w-full box-border"
        >
          {mediaItems?.map((media: any, index: number) => {
            const imageUrl = media?.field_image?.uri?.url
              ? `${config.apiBase}${media.field_image.uri.url}`
              : null;
            return (
              <div
                key={index}
                className="slide-item relative w-full h-full box-border"
              >
                <div className="box-border media-container absolute inset-0 w-full h-[720px] mobileMax:h-[500px] bg-white rounded-[40px] mobileMax:rounded-[10px] overflow-hidden">
                  {imageUrl && (
                    <div className="w-full h-full background-banners bg-white px-[40px] m-0 pt-[40px] mobileToDesk:px-[20px] mobileToDesk:pt-[20px] rounded-[40px] mobileMax:rounded-[10px] overflow-hidden">
                      <Banner
                        title={media?.field_title}
                        description={media?.field_description?.processed}
                        isRounded
                        backgroundImg={imageUrl}
                        buttonText={media?.field_button?.[0]?.title}
                        buttonLink={resolveLink(media?.field_button?.[0]?.uri)}
                        button2Text={media?.field_button?.[1]?.title}
                        button2Link={resolveLink(media?.field_button?.[1]?.uri)}
                        isHomePageSlider
                        className="home-page-banner"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </Slider>
      </motion.div>

      <style jsx global>{`
        .banner-wrap-styling .slick-slider,
        .banner-wrap-styling .slick-list,
        .banner-wrap-styling .slick-track {
          height: 100%;
          width: 100%;
          box-sizing: border-box;
        }
        .banner-wrap-styling .slide-item,
        .banner-wrap-styling .background-banners {
          height: 720px !important;
          border-radius: 40px;
          overflow: hidden;
        }

        /* position and style the dots */
        .banner-wrap-styling .slick-dots {
          bottom: 80px;
          z-index: 50;
          display: flex !important;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .banner-wrap-styling .slick-dots li {
          margin: 0 8px;
          display: inline-block;
        }

        /* keep the actual button visible & clickable but reset its default look */
        .banner-wrap-styling .slick-dots li button {
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          display: inline-block;
          width: 12px;
          height: 12px;
          line-height: 0;
          overflow: visible;
        }

        /* our visual dot inside the button */
        .banner-wrap-styling .slick-dots li button .custom-dot {
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transition: all 0.25s ease;
        }

        /* active state (slick adds .slick-active to the li) */
        .banner-wrap-styling .slick-dots li.slick-active button .custom-dot {
          background: #ffffff;
          transform: scale(1.25);
        }

        /* remove any extra default small/purple dot UI from theme */
        .banner-wrap-styling .slick-dots li button:before {
          display: none;
        }

        @media (max-width: 767px) {
          .banner-wrap-styling .slide-item,
          .banner-wrap-styling .background-banners {
            height: 500px !important;
            border-radius: 10px;
          }
          .banner-wrap-styling .slick-dots {
            bottom: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomeSlider;
