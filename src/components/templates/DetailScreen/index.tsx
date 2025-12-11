"use client";
import React, { useEffect, useState } from "react";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import { FaChartPie } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { MdOutlineMessage } from "react-icons/md";
import { LiaLanguageSolid } from "react-icons/lia";
import { IoLocationSharp } from "react-icons/io5";
import { SiAwsorganizations } from "react-icons/si";
import { GrOrganization } from "react-icons/gr";
import { motion } from "framer-motion";
import Image from "next/image";
import NewsBackgroundBanner from "@/components/sections/NewsBackgroundBanner";
import { buildMediaTypeAndSrc, formatDateToUS } from "@/utils";
import RegisterForm from "@/components/sections/RegisterFrom";
import RegisterSuccessModal from "@/components/sections/RegisterSuccessModal";
import NewsAndTrainingBanner from "@/components/sections/News&TrainingBanner";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

interface DetailScreenProps {
  cardDetails: DrupalNode;
  displayType: "NEWS" | "TRAINING";
}

const DetailScreen: React.FC<DetailScreenProps> = ({
  cardDetails,
  displayType,
}) => {
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const isRegister = cardDetails?.register;

  const mediaTypeAndSrc = buildMediaTypeAndSrc(cardDetails?.media);
  const isEvent = cardDetails?.resource?.name === "Event";

  return (
    <>
      <div className="pt-20 bg-mapGray">
        {displayType === "NEWS" ? (
          <NewsBackgroundBanner
            cardDetails={cardDetails}
            mediaTypeAndSrc={mediaTypeAndSrc}
          />
        ) : (
          <NewsAndTrainingBanner
            leftImg={"/static/images/footer-leftimg.svg"}
            rightImg={"/static/images/banner-bg-img.svg"}
            title={cardDetails?.title}
            noHeight={true}
            lightBgClip={true}
            isSmallImage={true}
            isNews={true}
          />
        )}

        {displayType === "TRAINING" && (
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
                <img
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
              {mediaTypeAndSrc.type === "video" && (
                <div className="mb-8 flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0 }}
                    className="remove-animation-fluctuation flex justify-center items-center w-full detail-page-banner-size overflow-hidden mt-4 mobileMax:mb-3"
                  >
                    {mediaTypeAndSrc.type === "video" ? (
                      <div className="w-full h-full">
                        <ReactPlayer
                          url={mediaTypeAndSrc?.src || ""}
                          width="100%"
                          height="100%"
                        />
                      </div>
                    ) : null}
                  </motion.div>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
                className="remove-animation-fluctuation pb-4 flex items-start justify-between mobileMax:flex-wrap w-full relative"
              >
                {displayType === "TRAINING" && (
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
                )}
              </motion.div>
            </motion.div>
          </div>
        )}

        {isEvent && cardDetails?.summary?.processed && (
          <div className="bg-[linear-gradient(to_top,#003350_16%,#248781_65%,#37B29A_82%,#48DBB2_100%)] py-24 mobileMax:py-12 betweenMobileTab:py-12 relative min-h-[700px] mobileMax:min-h-[400px] betweenMobileTab:min-h-[480px] flex items-center justify-center">
            <Image
              src={"/static/images/about-bg.png"}
              alt={"Card image"}
              width={1100}
              height={1100}
              className="w-[57%] h-full absolute mobileMax:hidden left-0 top-0 mobileMax:w-[65%] opacity-40 desktop:opacity-100"
            />
            <div className="desktop:w-[70%]" />

            <div className="w-full px-[20px] py-10 desktop:w-[40%] desktop:mt-[39px] desktop:mr-[120px] z-[1]">
              <p
                className="text-white about text-[16px] font-poppins font-medium mt-[18px]"
                dangerouslySetInnerHTML={{
                  __html: cardDetails?.summary?.processed || "",
                }}
              />
            </div>
          </div>
        )}

        {cardDetails?.description?.value && (
          <div className="mini-container py-[120px]">
            <div
              className="--font-poppins news-article text-left text-[16px] text-[#828282] leading-7 mb-5 mobileMax:text-xsmall mobileMax:leading-normal"
              dangerouslySetInnerHTML={{
                __html: cardDetails?.description?.value || "",
              }}
            />
          </div>
        )}

        {isRegister && (
          <div className="bg-[linear-gradient(to_top,#003350_10%,#1B7275_49%,#32A693_75%,#48DBB2_100%)] py-[120px] betweenMobileTab:py-16 mobileMax:py-10 relative ">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.8,
              }}
              className="absolute left-0 top-[150px] pointer-events-none max-w-[15%] betweenMobileTab:max-w-[45%] mobileMax:max-w-[50%] -z-10"
            >
              <img
                src="/static/images/register.png"
                alt="get-inv-home"
                className="mobileMax:opacity-50"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.8,
              }}
              className="absolute right-0 bottom-0 pointer-events-none max-w-[15%] betweenMobileTab:max-w-[45%] mobileMax:max-w-[50%]"
            >
              <img
                src="/static/images/register-1.png"
                alt="get-inv-home"
                className="mobileMax:opacity-50"
              />
            </motion.div>

            <div
              id="register"
              className="mini-container flex flex-col items-center justify-center"
            >
              <div className="bg-white mobileMax:p-6 py-14 px-14 rounded-[20px] z-[1]">
                <p className="text-[32px] bg-clip-text bg-[linear-gradient(to_right,#5DE29B,#263DA8)] text-clip font-semibold text-center">
                  Register here
                </p>
                <RegisterForm />
              </div>
            </div>
          </div>
        )}
      </div>
      <RegisterSuccessModal
        open={showSuccessModal}
        setOpen={setShowSuccessModal}
      />
    </>
  );
};

export default DetailScreen;
