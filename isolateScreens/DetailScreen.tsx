"use client";
import React, { useEffect, useState } from "react";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { DrupalNode } from "next-drupal";
import Image from "next/image";
import Link from "next/link";
import { FaChartPie, FaInstagram, FaUserGraduate } from "react-icons/fa6";
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
import { MdEventAvailable, MdOutlineMessage } from "react-icons/md";
import { LiaLanguageSolid } from "react-icons/lia";
import { IoDocumentTextOutline, IoLocationSharp } from "react-icons/io5";
import { SiAwsorganizations } from "react-icons/si";
import { GrNotes, GrOrganization } from "react-icons/gr";
import { IoMdImages } from "react-icons/io";
import { GiBlackBook, GiNotebook } from "react-icons/gi";
import { LucideStickyNote } from "lucide-react";
import { CiVideoOn } from "react-icons/ci";
import ReactPlayer from "react-player";
import { getTrainingPaginatedData } from "@/services/api";
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

  const renderIcon = (resourceName: string) => {
    switch (resourceName) {
      case "Magazine":
        return (
          <>
            <GiBlackBook className="text-white w-[60%] h-[60%]" />
          </>
        );
      case "Report":
        return (
          <>
            <GrNotes className="text-white w-[60%] h-[60%]" />
          </>
        );
      case "Event":
        return (
          <>
            <MdEventAvailable className="text-white w-[60%] h-[60%]" />
          </>
        );
      case "Whitepaper":
        return (
          <>
            <LucideStickyNote className="text-white w-[60%] h-[60%]" />
          </>
        );
      case "Webinar":
        return (
          <>
            <CiVideoOn className="text-white w-[60%] h-[60%]" />
          </>
        );
      case "Training":
        return (
          <>
            <GiNotebook className="text-white w-[60%] h-[60%]" />
          </>
        );
      case "Course":
        return (
          <>
            <FaUserGraduate className="text-white w-[50%] h-[50%]" />
          </>
        );
      case "Guide":
        return (
          <>
            <GiBlackBook className="text-white w-[60%] h-[60%]" />
          </>
        );

      default:
        return <IoMdImages className="text-white w-[60%] h-[60%]" />;
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth < 1024) {
        setIsTablet(true);
      }
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
          isCallToAction={true}
          isSmallImage={true}
        />
        <div className="py-16 mobileMax:py-12 relative min-h-[60vh]">
          <div className=" overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.8,
              }}
              className="absolute pointer-events-none z-[1] max-w-[50%] top-[10%]  mt-10 mobileMax:max-w-[40%]"
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
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation mini-container items-start box-border w-full relative z-[2]"
          >
            <p className="--font-poppins text-left text-[30px] history-title-gradient text-clip font-medium leading-normal mobileMax:text-medium mobileMax:leading-normal mb-8">
              {cardDetails?.title}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
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
              ) : (
                <div className="w-full h-full placeholderImage-color flex items-center justify-center">
                  {mediaTypeAndSrc.type === "pdf" ? (
                    <IoDocumentTextOutline className="text-white w-[60%] h-[60%]" />
                  ) : (
                    <>{renderIcon(cardDetails?.resource?.name)}</>
                  )}
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation pb-4 flex items-start justify-between mobileMax:flex-wrap w-full"
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
                  <div className="max-w-[60%] mobileMax:w-full mobileMax:max-w-full mb-5 mobileMax:mb-3">
                    {cardDetails?.date ? (
                      <p className="mb-5 --font-poppins text-left text-odd text-black font-medium leading-6 mobileMax:text-xmedium mobileMax:leading-normal">
                        {formatDateToUS(cardDetails?.date)}
                      </p>
                    ) : null}
                    {cardDetails?.resource?.name ? (
                      <div className="mb-3 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                        <FaUserCog className="block text-odd mobileMax:text-medium max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                        <p className="--font-poppins font-normal">
                          {cardDetails?.resource?.name}
                        </p>
                      </div>
                    ) : null}
                    <div
                      className="--font-poppins text-left text-small text-cardText leading-6 mb-5 mobileMax:text-xsmall mobileMax:leading-normal"
                      dangerouslySetInnerHTML={{
                        __html: cardDetails?.description?.value || "",
                      }}
                    />
                  </div>
                  <div className="mobileMax:w-full">
                    <h5 className="text-numans text-xmedium leading-normal mb-3 text-cardText font-bold mobileMax:text-xmedium">
                      Share:
                    </h5>
                    <div className="flex items-center mb-8">
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
                      className="w-full flex-1 flex items-center rounded-[23px] justify-center text-small text-white font-medium visit-site-btn --font-poppins"
                    >
                      Learn more
                    </Link>
                    {mediaTypeAndSrc.type === "pdf" && (
                      <Link
                        href={mediaTypeAndSrc?.src || ""}
                        target="_blank"
                        className="w-full mt-2 flex items-center justify-center w-full text-small text-white font-medium rounded-[23px] visit-site-btn"
                      >
                        View PDF
                      </Link>
                    )}
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
