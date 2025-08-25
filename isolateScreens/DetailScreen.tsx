"use client";
import React, { useEffect, useState, useRef } from "react";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import { FaChartPie, FaInstagram } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { buildMediaTypeAndSrc, formatDateToUS } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MdOutlineMessage } from "react-icons/md";
import { LiaLanguageSolid } from "react-icons/lia";
import { IoLocationSharp } from "react-icons/io5";
import { SiAwsorganizations } from "react-icons/si";
import { GrOrganization } from "react-icons/gr";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import DynamicImage from "@/components/ResuableDynamicImage";

interface DetailScreenProps {
  headerData: DrupalNode;
  footerData: DrupalNode;
  cardDetails: DrupalNode;
  displayType: "NEWS" | "TRAINING";
}

const DetailScreen: React.FC<DetailScreenProps> = ({
  headerData,
  footerData,
  cardDetails,
  displayType,
}) => {
  const path = usePathname();
  const [isTablet, setIsTablet] = useState<Boolean>(false);

  const openInstagramLoginPopover = () => {
    const width = 600;
    const height = 400;
    const left = window?.innerWidth / 2 - width / 2;
    const top = window?.innerHeight / 2 - height / 2;
    window.open(
      `https://www.instagram.com/accounts/login/?redirect_uri=${encodeURIComponent(
        window?.origin + path
      )}`,
      "",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTablet(window?.innerWidth < 1024);
    }
  }, []);

  const mediaTypeAndSrc = buildMediaTypeAndSrc(cardDetails?.media);

  return (
    <>
      <Header data={headerData} />
      <div className="pt-20 bg-mapGray">
        <CommonBanner
          leftImg={"/static/images/left-home-hero.svg"}
          rightImg={"/static/images/elevate-right-img.svg"}
          title={cardDetails?.title}
          noHeight={true}
          lightBgClip={true}
          isSmallImage={true}
          isNews={true}
        />
        <div className="py-16 mobileMax:py-12 relative min-h-[60vh]">
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.8,
              }}
              className="absolute pointer-events-none z-[1] max-w-[50%] top-[10%] mt-10 mobileMax:max-w-[40%]"
            >
              <DynamicImage
                width={316}
                height={576}
                src="/static/images/cta-section-bg.svg"
                alt="overlay-bg"
                className="opacity-60 mobileMax:opacity-40"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation mini-container items-start box-border w-full relative z-[2]"
          >
            {(mediaTypeAndSrc.type === "video" ||
              mediaTypeAndSrc.type === "image") && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
                className="remove-animation-fluctuation flex justify-center items-center w-full detail-page-banner-size overflow-hidden mt-4 mb-8 mobileMax:mb-3"
              >
                {mediaTypeAndSrc.type === "video" ? (
                  <div className="w-full h-full">
                    <ReactPlayer
                      url={mediaTypeAndSrc?.src || ""}
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : mediaTypeAndSrc.type === "image" ? (
                  <DynamicImage
                    src={`${mediaTypeAndSrc.src}`}
                    alt="category img"
                    height={450}
                    unoptimized={true}
                    width={300}
                    className="w-full h-full max-w-full object-scale-down card-shadow"
                  />
                ) : null}
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0 }}
              className="remove-animation-fluctuation pb-4 flex items-start justify-between mobileMax:flex-wrap w-full relative"
            >
              {displayType === "TRAINING" ? (
                <>
                  <div className="mobileMax:w-full mb-5 mobileMax:mb-3 desktop:w-[70%] w-[65%]">
                    {cardDetails?.date ? (
                      <p className="mb-5 --font-poppins text-left text-odd text-black font-medium leading-6 mobileMax:text-xmedium mobileMax:leading-normal">
                        {formatDateToUS(cardDetails?.date)}
                      </p>
                    ) : null}
                    {cardDetails?.modality?.name ? (
                      <div className="mb-3 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                        <MdOutlineMessage className="block text-odd mobileMax:text-medium max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                        <p className="--font-poppins font-normal capitalize">
                          {cardDetails?.modality?.name}
                        </p>
                      </div>
                    ) : null}
                    {cardDetails?.language?.name ? (
                      <div className="mb-3 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                        <LiaLanguageSolid className="block text-odd mobileMax:text-medium max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                        <p className="--font-poppins font-normal capitalize">
                          {cardDetails?.language?.name}
                        </p>
                      </div>
                    ) : null}
                    {cardDetails?.modality?.name ? (
                      <div className="mb-3 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                        <SiAwsorganizations className="block text-odd mobileMax:text-medium max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                        <p className="--font-poppins font-normal capitalize">
                          {cardDetails?.modality?.name}
                        </p>
                      </div>
                    ) : null}
                    {cardDetails?.resource?.name ? (
                      <div className="mb-3 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                        <FaUserCog className="block text-medium mobileMax:text-xmedium max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                        <p className="--font-poppins font-normal capitalize">
                          {cardDetails?.resource?.name}
                        </p>
                      </div>
                    ) : null}
                    {cardDetails?.sector?.name ? (
                      <div className="mb-3 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                        <FaChartPie className="block text-medium mobileMax:text-xmedium max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                        <p className="--font-poppins font-normal capitalize">
                          {cardDetails?.sector?.name}
                        </p>
                      </div>
                    ) : null}
                    {cardDetails?.region?.name ? (
                      <div className="mb-3 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                        <IoLocationSharp className="block text-medium mobileMax:text-xmedium max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                        <p className="--font-poppins font-normal capitalize">
                          {cardDetails?.region?.name}
                        </p>
                      </div>
                    ) : null}
                    {cardDetails?.organisation?.name ? (
                      <div className="mb-3 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                        <GrOrganization className="block text-medium mobileMax:text-xmedium max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                        <p className="--font-poppins font-normal capitalize">
                          {cardDetails?.organisation?.name}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <div className="training-detail-learnBox mobileMax:w-full w-[25%] laptop:ml-2">
                    <p className="--font-poppins font-normaltext-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                      For more details, please click on below button:
                    </p>
                    <Link
                      href={cardDetails?.link || "#"}
                      target="_blank"
                      className="w-[400px] mobileMax:w-full flex items-center mt-5 rounded-[23px] justify-center text-small text-white font-medium visit-site-btn --font-poppins"
                    >
                      Learn more
                    </Link>
                    {cardDetails?.document && (
                      <Link
                        href={mediaTypeAndSrc?.src || ""}
                        target="_blank"
                        className="mt-2 w-full flex items-center justify-center w-full text-small text-white font-medium rounded-[23px] visit-site-btn"
                      >
                        View PDF
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1 pr-8 mobileMax:pr-0 mobileMax:w-full mobileMax:mb-5">
                    {cardDetails?.date ? (
                      <p className="mb-5 --font-poppins text-left text-odd text-black font-medium leading-6 mobileMax:text-xmedium mobileMax:leading-normal">
                        {formatDateToUS(cardDetails?.date)}
                      </p>
                    ) : null}
                    {cardDetails?.resource?.name ? (
                      <div className="mb-3 flex items-start text-left text-small text-[#111111] leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                        <FaUserCog className="block text-odd mobileMax:text-medium max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                        <p className="--font-poppins font-normal">
                          {cardDetails?.resource?.name}
                        </p>
                      </div>
                    ) : null}
                    <div
                      className="--font-poppins news-article text-left text-[18px] text-cardText leading-7 mb-5 mobileMax:text-xsmall mobileMax:leading-normal"
                      dangerouslySetInnerHTML={{
                        __html: cardDetails?.description?.value || "",
                      }}
                    />
                  </div>

                  <div className="w-80 force-sticky mobileMax:w-full flex-shrink-0">
                    <div
                      className={`
                        transition-all duration-300 ease-in-out
                        mobileMax:static mobileMax:w-full
                        `}
                    >
                      <div className="bg-white shadow-md p-5 rounded-xl">
                        <h5 className="text-numans text-xmedium leading-normal mb-3 text-cardText font-bold mobileMax:text-xmedium">
                          Share:
                        </h5>
                        <div className="flex items-center mb-8 flex-wrap gap-2">
                          <EmailShareButton
                            url={
                              typeof window !== "undefined"
                                ? `${window?.origin}${path}` || "#"
                                : "#"
                            }
                            className="mr-2"
                          >
                            <EmailIcon size={32} round />
                          </EmailShareButton>
                          <FacebookShareButton
                            url={
                              typeof window !== "undefined"
                                ? `${window?.origin}${path}` || "#"
                                : "#"
                            }
                            className="mx-2"
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={
                              typeof window !== "undefined"
                                ? `${window?.origin}${path}` || "#"
                                : "#"
                            }
                            className="mx-2"
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          <FaInstagram
                            size={32}
                            className="insta-gradient-color text-white rounded-[7px] p-0.5 block mx-2 cursor-pointer"
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                isTablet
                                  ? window.open(
                                      `https://www.instagram.com/accounts/login/?redirect_uri=${encodeURIComponent(
                                        window?.origin + path
                                      )}`
                                    )
                                  : openInstagramLoginPopover();
                              }
                            }}
                          />
                          <WhatsappShareButton
                            url={
                              typeof window !== "undefined"
                                ? `${window?.origin}${path}` || "#"
                                : "#"
                            }
                            className="mx-2"
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                        </div>
                        <Link
                          href={cardDetails?.link || "#"}
                          target="_blank"
                          className="w-full flex-1 flex items-center rounded-[23px] justify-center text-small text-white font-medium visit-site-btn --font-poppins py-3 px-4 mb-2"
                        >
                          Learn more
                        </Link>
                        {mediaTypeAndSrc.type === "pdf" && (
                          <Link
                            href={mediaTypeAndSrc?.src || ""}
                            target="_blank"
                            className="w-full flex items-center justify-center text-small text-white font-medium rounded-[23px] visit-site-btn py-3 px-4"
                          >
                            View PDF
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <LandingFooter data={footerData} />
    </>
  );
};

export default DetailScreen;
