"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import Image from "next/image";
import { DrupalNode } from "next-drupal";
import { formatDateToUS } from "@/utils";
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
import { usePathname } from "next/navigation";
import { config } from "@/lib/config";
import { IoDocumentTextOutline } from "react-icons/io5";
import { renderIcon } from "@/lib/parsers/parsers";
import { IoMdImages } from "react-icons/io";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type MediaTypeAndSrc = {
  type: "image" | "video" | "pdf" | "unknown";
  src: string | null;
};

interface NewsBackgroundBannerProps {
  cardDetails: DrupalNode;
  mediaTypeAndSrc?: string | MediaTypeAndSrc | null;
}

const NewsBackgroundBanner: React.FC<NewsBackgroundBannerProps> = ({
  cardDetails,
  mediaTypeAndSrc,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const isEvent = cardDetails?.resource?.name === "Event";
  const isRegister = cardDetails?.register;
  const path = usePathname();
  const [isTablet, setIsTablet] = useState<boolean>(false);

  const getRegistrationLabel = () => {
    if (!cardDetails?.date) return "Registration";
    const eventDate = new Date(cardDetails.date);
    if (Number.isNaN(eventDate.getTime())) return "Registration";
    const today = new Date();
    eventDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return eventDate >= today ? "Open Registration" : "Registration";
  };

  const getDownloadHref = (downloadPath?: string | null) => {
    if (!downloadPath) return "#";
    if (/^https?:\/\//i.test(downloadPath)) {
      return `/api/download-file?url=${encodeURIComponent(downloadPath)}`;
    }

    const normalizedPath = downloadPath.replace(/^\/+/, "");
    return `/api/download-file?file=${encodeURIComponent(normalizedPath)}`;
  };

  const downloadHref = getDownloadHref(cardDetails?.download);
  const canDownload = downloadHref !== "#";

  const getPreferredFileName = () => {
    const downloadPath = cardDetails?.download;
    const fallback =
      typeof cardDetails?.title === "string" && cardDetails.title.trim().length
        ? `${cardDetails.title.trim().replace(/\s+/g, "_")}.pdf`
        : "download.pdf";
    if (!downloadPath) return fallback;
    const pathSegment = downloadPath.split("/").pop();
    if (!pathSegment) return fallback;
    return pathSegment.endsWith(".pdf") ? pathSegment : `${pathSegment}.pdf`;
  };

  const handleDownloadClick = async (
    event?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    event?.preventDefault();
    if (!canDownload || typeof window === "undefined") return;
    try {
      const response = await fetch(downloadHref);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = getPreferredFileName();
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed, opening in new tab instead.", error);
      const fallbackUrl =
        cardDetails?.download && cardDetails.download.length > 0
          ? cardDetails.download
          : downloadHref;
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    }
  };

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

  const isValidImage =
    typeof mediaTypeAndSrc === "object" && mediaTypeAndSrc !== null
      ? !mediaTypeAndSrc.src ||
        mediaTypeAndSrc.src.startsWith("data:image") ||
        mediaTypeAndSrc.src.includes("base64")
        ? "/__invalid__"
        : mediaTypeAndSrc.src
      : "/__invalid__";

  return (
    <>
      <div
        className={`box-border relative px-[15px] mobileMax:px-[10px] bg-white flex flex-col items-center justify-center mt-[40px] mx-[40px] mobileMax:mx-[10px] bg-[linear-gradient(to_top,#003350,#48DBB2)] mobileToDesk:mx-[20px] mobileToDesk:mt-[20px] mobileMax:mt-[15px] rounded-[40px] mobileMax:rounded-[10px] overflow-hidden`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <Image
            alt="Background banner"
            src="/static/images/event-bg.png"
            width={1500}
            height={700}
            priority
            quality={90}
            onLoadingComplete={() => setLoaded(true)}
            className={`object-cover w-full h-full object-center`}
          />
        </motion.div>
        <div
          className={`relative z-10 w-full desktopLg:px-[141px] desktop:px-[60px] betweenMobileTab:px-[30px] mobileMax:px-[15px] ${
            isEvent
              ? "desktopLg:py-[100px] betweenMobileTab:py-[40px] desktop:py-[50px] mobileMax:py-[30px]"
              : "desktopLg:pt-[120px] desktop:pt-[60px] desktop:pb-[55px] betweenMobileTab:pt-[50px] mobileMax:pt-[40px]"
          } desktopLg:pb-[100px] betweenMobileTab:pb-[60px] mobileMax:pb-[30px] md:px-16 flex flex-col items-center justify-between`}
        >
          <div
            className={`flex items-center gap-[30px] mobileMax:gap-[20px] mobileMax:flex-col`}
          >
            <div
              className={`betweenMobileTab:w-[350px] desktop:w-[480px] desktopLg:w-[600px] mobileMax:w-full`}
            >
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-white mobileMax:text-center desktopLg:text-[32px] desktop:text-[27px] betweenMobileTab:text-[22px] mobileMax:text-[16px]"
              >
                {cardDetails?.resource?.name}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`
                                    ${
                                      isEvent
                                        ? "text-white betweenMobileTab:text-[26px] desktop:text-[32px] desktopLg:text-[48px] font-extrabold"
                                        : "text-[#48DBB2] font-semibold text-[32px]"
                                    } mobileMax:text-center font-poppins tracking-tight leading-tight
                                    betweenMobileTab:text-[24px] mobileMax:text-[18px]
                                    betweenMobileTab:mb-[22px] mobileMax:px-0 mobileMax:mb-2
                                     mb-[4px]
                                  `}
              >
                {cardDetails?.title}
              </motion.h1>

              {!isEvent && (
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="text-white text-[32px] leading-none mobileMax:text-[16px] betweenMobileTab:text-[22px] mt-[7px] mobileMax:text-center"
                >
                  {formatDateToUS(cardDetails?.date)}
                </motion.p>
              )}

              <div
                className={`flex items-center gap-5 betweenMobileTab:gap:[10px] mobileMax:gap-[2px] mobileMax:flex-col mobileMax:w-full`}
              >
                {isEvent && isRegister && (
                  <Link
                    href={
                      isRegister
                        ? `${path}#register`
                        : "https://docs.google.com/forms/d/e/1FAIpQLSdac44DfVde5_J59u27M6nwgzkbExZrTuC9hBJmyXsVGVHWEA/viewform"
                    }
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="text-[#003350] font-semibold mobileMax:w-[221px] mobileMaxh-[55px] betweenMobileTab:w-[190px] betweenMobileTab:h-[45px] w-[221px] h-[55px] mobileMax:h-[45px] bg-[#A0DDFF] rounded-[10px] flex items-center justify-center mt-[35px] mobileMax:mt-[20px]"
                    >
                      <button className="mobileMax:text-[14px]">
                        {getRegistrationLabel()}
                      </button>
                    </motion.div>
                  </Link>
                )}
                {canDownload && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-[#003350] font-semibold betweenMobileTab:w-[150px] betweenMobileTab:h-[45px] w-[200px] mobileMax:w-[200px] mobileMax:h-[45px] h-[55px] bg-[#A0DDFF] rounded-[10px] flex items-center justify-center mt-[35px] mobileMax:mt-[20px]"
                  >
                    <a
                      onClick={handleDownloadClick}
                      href={downloadHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="mobileMax:text-[14px] w-full h-full flex items-center justify-center"
                      role="button"
                    >
                      Download
                    </a>
                  </motion.div>
                )}

                {cardDetails?.link && (
                  <Link
                    href={cardDetails?.link ? cardDetails.link : "#"}
                    target="_blank"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="text-[#003350] font-semibold betweenMobileTab:w-[150px] betweenMobileTab:h-[45px] w-[200px] mobileMax:w-[200px] mobileMax:h-[45px] h-[55px] bg-[#A0DDFF] rounded-[10px] flex items-center justify-center mt-[35px] mobileMax:mt-[20px]"
                    >
                      <button className="mobileMax:text-[14px]">
                        {cardDetails?.link.includes("docs.google.com/forms/")
                          ? "Open Registration"
                          : "Learn More"}
                      </button>
                    </motion.div>
                  </Link>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                {!isEvent && (
                  <div
                    className={`flex items-center mobileMax:justify-center mb-8 mobileMax:mb-4 flex-wrap gap-2 mobileMax:gap-1 mt-[25px] mobileMax:mt-[15px] `}
                  >
                    <EmailShareButton
                      url={
                        typeof window !== "undefined"
                          ? `${window?.origin}${path}` || "#"
                          : "#"
                      }
                      className="mr-2"
                    >
                      <EmailIcon
                        size={32}
                        className="rounded-full mobileMax:w-[24px] mobileMax:h-[24px]"
                      />
                    </EmailShareButton>
                    <FacebookShareButton
                      url={
                        typeof window !== "undefined"
                          ? `${window?.origin}${path}` || "#"
                          : "#"
                      }
                      className="mx-2 mobileMax:mx-1"
                    >
                      <FacebookIcon
                        size={32}
                        className="rounded-full mobileMax:w-[24px] mobileMax:h-[24px]"
                      />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={
                        typeof window !== "undefined"
                          ? `${window?.origin}${path}` || "#"
                          : "#"
                      }
                      className="mx-2 mobileMax:mx-1"
                    >
                      <TwitterIcon
                        size={32}
                        className="rounded-full mobileMax:w-[24px] mobileMax:h-[24px]"
                      />
                    </TwitterShareButton>
                    <FaInstagram
                      size={32}
                      className="insta-gradient-color text-white rounded-[7px] p-0.5 block mx-2 mobileMax:mx-1 mobileMax:w-[24px] mobileMax:h-[24px] cursor-pointer"
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
                      className="mx-2 mobileMax:mx-1"
                    >
                      <WhatsappIcon
                        size={32}
                        round
                        className="mobileMax:w-[24px] mobileMax:h-[24px]"
                      />
                    </WhatsappShareButton>
                  </div>
                )}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {typeof mediaTypeAndSrc === "object" &&
                mediaTypeAndSrc !== null && (
                  <div className="desktop:w-[650px] desktop:h-[350px] mobileMax:w-full mobileMax:h-[200px] desktopLg:h-[450px] desktopLg:w-[812px] betweenMobileTab:w-[320px] betweenMobileTab:h-[270px] rounded-[20px] mobileMax:rounded-[10px] overflow-hidden flex items-center justify-center bg-placeholder">
                    {mediaTypeAndSrc.type === "video" ? (
                      <div className="w-full h-full">
                        <ReactPlayer
                          url={mediaTypeAndSrc.src || ""}
                          width="100%"
                          height="100%"
                        />
                      </div>
                    ) : mediaTypeAndSrc.type === "pdf" ? (
                      <div className="w-full h-full bg-placeholder flex items-center justify-center">
                        {mediaTypeAndSrc.type === "pdf" ? (
                          <IoDocumentTextOutline className="text-white w-[65%] h-[65%]" />
                        ) : (
                          renderIcon(cardDetails?.resource?.name)
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-placeholder overflow-hidden">
                        {isError ? (
                          <IoMdImages className="text-white w-[65%] h-[65%]" />
                        ) : (
                          <Image
                            src={isValidImage}
                            alt="category img"
                            height={480}
                            width={812}
                            unoptimized
                            onError={() => setIsError(true)}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}

              {/* Event details */}
              {isRegister && (
                <div className=" desktopLg:flex items-center justify-center gap-[10px] desktop:gap-[20px] desktopLg:gap-[20px] betweenMobileTab:[10px] mobileMax:gap-[10px] mobileMax:flex-col mt-[17px] mobileMax:mt-[10px] text-white betweenMobileTab:text-[12px] text-[22px] mobileMax:text-[14px]">
                  <p className="text-center">
                    {cardDetails?.name}{" "}
                    <span className="ml-[12px]">
                      {formatDateToUS(cardDetails?.date)}
                    </span>
                  </p>
                  <p className="border h-[30px] hidden desktopLg:block" />
                  <p className="text-center">
                    {cardDetails?.location} {cardDetails?.time}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {isRegister && cardDetails?.speakers.length > 0 && (
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 2.8,
            }}
            className="absolute right-0 bottom-[0px] pointer-events-none max-w-[15%] betweenMobileTab:max-w-[45%] mobileMax:max-w-[50%]"
          >
            <img
              src="/static/images/double-bg.svg"
              alt="get-inv-home"
              className="mobileMax:opacity-50"
            />
          </motion.div>
          <div className="mini-container py-[120px]">
            <h3 className="bg-clip-text text-transparent bg-[linear-gradient(to_left,#003350,#48DBB2)] text-clip text-[32px] font-semibold text-center mobileMax:text-[24px] leading-tight">
              Speaker
            </h3>

            <div className="py-[60px] grid grid-cols-1 betweenMobileTab:grid-cols-2 desktop:grid-cols-4 gap-[40px] mobileMax:gap-[40px] justify-items-center mx-auto">
              {cardDetails?.speakers.map((speaker: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center w-[300px] z-[1]"
                >
                  <div className="w-[186px] h-[186px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
                    <Image
                      className="w-full h-full rounded-full object-cover object-center transition-all duration-700 ease-in-out hover:scale-110"
                      src={`${config.apiBase}${speaker?.field_speaker_image?.uri?.url}`}
                      alt="Speaker 1"
                      width={186}
                      height={186}
                    />
                  </div>

                  <p className="font-semibold text-[#003350] text-[18px] mb- truncate w-full">
                    {speaker?.field_name}
                  </p>
                  <p className="text-[#003350] text-[14px] leading-normal w-[250px]">
                    {speaker?.field_occupation}
                  </p>
                </div>
              ))}
            </div>

            <Link href={`${path}#register`} className="relative z-1">
              <div className="bg-[linear-gradient(to_left,#003350,#48DBB2)] rounded-[10px] h-[52px] w-[225px] text-white mx-auto font-semibold relative">
                <button className="w-full h-full">Register Now</button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsBackgroundBanner;
