"use client";
import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

const marqueeSlides = [
  {
    title: "International Institute for Energy Conservation",
    field_mission_card_link: "https://www.iiec.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/iiec-logo.png",
      },
    },
  },
  {
    title: "International Institute for Energy Conservation",
    field_mission_card_link: "https://www.iiec.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/iiec-logo.png",
      },
    },
  },
  {
    title: "Negawatt",
    field_mission_card_link: "https://negawatt.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/siteon0.png",
      },
    },
  },
  {
    title: "International Institute for Energy Conservation",
    field_mission_card_link: "https://www.iiec.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/iiec-logo.png",
      },
    },
  },
  {
    title: "International Institute for Energy Conservation",
    field_mission_card_link: "https://www.iiec.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/iiec-logo.png",
      },
    },
  },
  {
    title: "International Institute for Energy Conservation",
    field_mission_card_link: "https://www.iiec.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/iiec-logo.png",
      },
    },
  },
  {
    title: "Negawatt",
    field_mission_card_link: "https://negawatt.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/siteon0.png",
      },
    },
  },
  {
    title: "Negawatt",
    field_mission_card_link: "https://negawatt.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/siteon0.png",
      },
    },
  },
  {
    title: "International Institute for Energy Conservation",
    field_mission_card_link: "https://www.iiec.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/iiec-logo.png",
      },
    },
  },
  {
    title: "International Institute for Energy Conservation",
    field_mission_card_link: "https://www.iiec.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/iiec-logo.png",
      },
    },
  },
  {
    title: "Negawatt",
    field_mission_card_link: "https://negawatt.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/siteon0.png",
      },
    },
  },

  {
    title: "International Institute for Energy Conservation",
    field_mission_card_link: "https://www.iiec.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/iiec-logo.png",
      },
    },
  },
  {
    title: "International Institute for Energy Conservation",
    field_mission_card_link: "https://www.iiec.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/iiec-logo.png",
      },
    },
  },
  {
    title: "Negawatt",
    field_mission_card_link: "https://negawatt.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/siteon0.png",
      },
    },
  },
  {
    title: "Negawatt",
    field_mission_card_link: "https://negawatt.org/",
    field_mission_card_image: {
      uri: {
        url: "/sites/default/files/2024-01/siteon0.png",
      },
    },
  },
];

const MarqueeSlider = () => {
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
    <div
      id="mission-efficiency-partners"
      className="overflow-hidden pt-[10px] pb-10 bg-mapGray mobileMax:pb-8 relative"
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 2.5,
        }}
        className="absolute bottom-0 max-w-[15%] left-0 z-[1] betweenMobileTab:max-w-[40%] lieTablets:top-[600px] aboveLaptop:top-[480px] mobileMax:top-[7%] mobileMax:max-w-[45%]"
      >
        <img
          src="/static/images/cta-section-bg.svg"
          alt="left-bg"
          className="w-full h-full"
        />
      </motion.div>
      <div className=" relative z-[2]">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="pt-[82px] remove-animation-fluctuation desktop:text-[55px] text-numans mb-12 desktop:leading-[85px] text-center category-gradient text-clip text-[48px] leading-normal mobileMax:text-[35px] mobileMax:mb-5"
        >
          Marquee Slider
        </motion.h3>
        <div className="pb-10 mobileMax:py-6">
          <Slider {...settings}>
            {marqueeSlides
              ?.slice(0, 8)
              .map((partnerCard: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    className="px-[15px] mb-[30px] w-[16%] mobileMax:w-[50%] betweenMobileTab:w-[25%] mobileMax:mb-5 mobileMax:px-[10px]"
                  >
                    <Link
                      href={partnerCard.field_mission_card_link}
                      target="_blank"
                      className="border-2 border-transparent hover:border-blueBorder transition block rounded-[25px] flex justify-center items-center bg-white px-[15px] py-[10px] box-border w-full card-shadow"
                    >
                      <div className="max-w-[160px] w-full h-[110px] max-h-[110px] min-w-[120px] min-h-[100px] overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${partnerCard?.field_mission_card_image?.uri?.url}`}
                          alt="sponser img"
                          width={160}
                          height={100}
                          className="w-full h-full max-w-full object-scale-down min-w-[120px] min-h-[100px]"
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
          </Slider>
          <Slider {...settings2}>
            {marqueeSlides
              ?.slice(9, marqueeSlides?.length)
              .map((partnerCard: any, index: number) => {
                return (
                  <motion.div
                    key={index}
                    className="px-[15px] mb-[30px] w-[16%] mobileMax:w-[50%] betweenMobileTab:w-[25%] mobileMax:mb-5 mobileMax:px-[10px]"
                  >
                    <Link
                      href={partnerCard.field_mission_card_link}
                      target="_blank"
                      className="border-2 border-transparent hover:border-blueBorder transition block rounded-[25px] flex justify-center items-center bg-white px-[15px] py-[10px] box-border w-full card-shadow"
                    >
                      <div className="max-w-[160px] w-full h-[110px] max-h-[110px] min-w-[120px] min-h-[100px] overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${partnerCard?.field_mission_card_image?.uri?.url}`}
                          alt="sponser img"
                          width={160}
                          height={100}
                          className="w-full h-full max-w-full object-scale-down min-w-[120px] min-h-[100px]"
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MarqueeSlider;
