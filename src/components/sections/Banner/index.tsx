"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsDownload } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";

interface BannerProps {
  title?: string;
  subTitle?: string;
  backgroundImg?: string;
  description?: string;
  isRounded?: boolean;
  buttonText?: string;
  buttonLink?: string;
  button2Text?: string;
  button2Link?: string;
  isHomePageSlider?: boolean;
  title2?: string;
  className?: string;
  buttonTextClass?: string;
  imgPositionClass?: string;
  isNotFirst?: boolean;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subTitle,
  backgroundImg,
  description,
  isRounded = false,
  buttonText,
  buttonLink,
  button2Text,
  button2Link,
  isHomePageSlider,
  title2,
  className,
  buttonTextClass,
  imgPositionClass,
  isNotFirst,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`box-border relative px-[15px] flex flex-col items-center justify-center bg-gradient-to-b from-[#48DBB2] to-[#003350] ${
        isNotFirst ? "mb-10 bg-mapGray" : "!bg-white"
      } ${className} ${
        isRounded
          ? "mt-10 mx-[40px] mobileToDesk:mx-[20px] mobileToDesk:mt-[20px] rounded-[40px] mobileMax:rounded-[10px] overflow-hidden"
          : ""
      } ${
        isHomePageSlider
          ? "h-full w-full rounded-[40px] mobileMax:rounded-[10px] overflow-hidden mx-0 !m-0 mobileToDesk:mx-0 mobileToDesk:mt-0 pt-0"
          : "india-bg-position min-h-[692px] lieTablets:min-h-[400px] mobileMax:min-h-[300px]"
      } `}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute inset-0">
          <Image
            alt="Background banner"
            src={backgroundImg || ""}
            fill
            priority
            quality={60}
            onLoadingComplete={() => setLoaded(true)}
            sizes="
        (max-width: 480px) 100vw,
        (max-width: 768px) 100vw,
        (max-width: 1200px) 100vw,
        1500px
      "
            className={`${imgPositionClass} object-cover object-center w-full h-full`}
          />
        </div>
      </div>
      <div className="relative z-10 w-full tab:px-8 md:px-16 text-center flex flex-col justify-center items-center ">
        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`${"text-white"} text-[62px] font-poppins font-bold tracking-tight leading-tight betweenMobileTab:text-[48px] mobileMax:text-[28px] betweenMobileTab:mb-[22px] mobileMax:px-0 mobileMax:mb-2`}
          >
            {title}
          </motion.h1>
        )}
        {title2 && (
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`text-white text-[62px] font-poppins font-bold tracking-tight leading-tight betweenMobileTab:text-[48px] mobileMax:text-[28px] betweenMobileTab:mb-[22px] mobileMax:px-0 mobileMax:mb-2`}
          >
            {title2}
          </motion.h2>
        )}

        {subTitle && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            dangerouslySetInnerHTML={{ __html: subTitle || "" }}
            className={`text-white text-[62px] font-poppins font-bold tracking-tight leading-tight betweenMobileTab:text-[48px] mobileMax:text-[28px] betweenMobileTab:mb-[22px] mobileMax:px-0 mobileMax:mb-2`}
          />
        )}

        {description && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            dangerouslySetInnerHTML={{ __html: description || "" }}
            className="max-w-[800px] mx-auto text-[20px] font- text-white font-poppins leading-7 mobileMax:text-xsmall mobileMax:leading-normal text-center mt-5"
          />
        )}

        {(buttonText || button2Text) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="remove-animation-fluctuation tab:min-w-[680px] flex items-center justify-center gap-[22px] p-0 mobileMax:flex-col mt-[30px] mobileMax:w-full mobileMax:gap-[15px]"
          >
            {buttonText && (
              <Link
                href={buttonLink || "#"}
                target="_blank"
                aria-hidden="true"
                className={`${buttonTextClass}  mobileMax:min-w-full mobileMax:px-6 mobileMax:w-full mobileMax:text-small bg-gradient-to-r block w-[48%] from-[#48DBB2] to-[#A0DDFF] rounded-[10px] text-[#11055F] text-[18px] font-medium px-8 py-3.5`}
              >
                {buttonText}
                {buttonText?.toLowerCase().includes("download") ? (
                  <BsDownload className="ml-2 text-odd inline-block" />
                ) : (
                  <FaChevronRight className="ml-2 text-xmedium inline-block" />
                )}
              </Link>
            )}
            {button2Text && (
              <Link
                href={button2Link || "#"}
                target="_blank"
                aria-hidden="true"
                className={`${
                  button2Link ? "mobileMax:min-w-full" : ""
                } ${buttonTextClass} bg-gradient-to-r block w-[48%] from-[#48DBB2] to-[#A0DDFF] rounded-[10px] text-[#11055F] text-[18px] font-medium px-8 py-3.5`}
              >
                {button2Text}
                {button2Text?.toLowerCase().includes("download") ? (
                  <BsDownload className="ml-2 text-odd inline-block" />
                ) : (
                  <FaChevronRight className="ml-2 text-xmedium inline-block" />
                )}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Banner;
