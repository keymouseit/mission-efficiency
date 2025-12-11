"use client";

import React from "react";
import Link from "next/link";
import { config } from "@/lib/config";
import { DrupalNode } from "next-drupal";
import { IoMdImages } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { resolveLink } from "@/utils";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

interface GridItemProps {
  title: string;
  backgroundImage?: string;
  className?: string;
  videoUrl?: string;
  badge?: string[];
  isLandingPage?: boolean;
  cardId?: string;
}

interface CountryDetailProps {
  data: DrupalNode;
}

const GridItem: React.FC<GridItemProps> = ({
  title,
  backgroundImage,
  className = "",
  videoUrl,
  badge,
  isLandingPage,
  cardId,
}) => {
  const router = useRouter();
  const path = usePathname();
  const isVideo =
    videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be");

  const handleClick = (e: React.MouseEvent) => {
    if (isLandingPage) {
      e.preventDefault();
      router.push(`${path}/${cardId}`);
    }
  };

  return (
    <Link
      href={resolveLink(videoUrl) || "#"}
      target="_blank"
      className={`relative overflow-hidden group rounded-xl transition-all duration-700 ease-in-out hover:scale-[1.02] hover:shadow-lg block ${
        isVideo ? "cursor-pointer" : ""
      } ${className}`}
      onClick={handleClick}
    >
      {badge?.length && (
        <div className="absolute top-4 left-4 z-[1]">
          {badge.map(
            (item: string, index: number) =>
              item && (
                <span
                  key={index}
                  className="bg-[#dfdfdf] text-gray-800 px-3 py-1 text-sm inline-block font-semibold rounded mr-3 mb-2"
                >
                  {item}
                </span>
              )
          )}
        </div>
      )}
      {!isVideo &&
        (backgroundImage ? (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.3) 100%), url(${config.apiBase}${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-placeholder flex items-center justify-center">
            <IoMdImages className="text-white w-[60%] h-[40%]" />
          </div>
        ))}

      {isVideo && (
        <div className="absolute inset-0 w-full h-full">
          <ReactPlayer
            url={videoUrl || ""}
            id="react-video-player"
            width="100%"
            height="100%"
            light={isLandingPage}
          />
        </div>
      )}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 transition-opacity duration-700"></div>
      <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full z-10">
        <div className="max-w-[90%]">
          <h3
            className={`${
              backgroundImage || isVideo ? "text-white" : "text-black"
            } font-bold mobileMax:!font-semibold text-xmedium md:text-2xl lg:text-3xl xl:text-4xl leading-tight mb-3`}
          >
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

const GridCard: React.FC<CountryDetailProps> = ({ data }) => {
  const gridData = data?.field_add_card?.slice(0, 3);

  if (gridData?.length === 1) {
    return (
      <section className="z-50">
        <div
          className={`w-full h-[600px] ${
            gridData?.length === 1 && "mobileMax:!h-[310px]"
          }`}
        >
          <GridItem
            title={gridData[0]?.title}
            backgroundImage={gridData[0]?.field_image?.uri?.url}
            videoUrl={gridData[0]?.field_links[0]?.uri}
            badge={[gridData[0]?.field_card_chip_name]}
            isLandingPage={gridData[0]?.field_cs_landing_page === "yes"}
            cardId={gridData[0]?.id}
            className="w-full h-full"
          />
        </div>
      </section>
    );
  }

  if (gridData?.length === 4) {
    return (
      <section className="z-50">
        <div className="grid grid-cols-2 gap-4 h-[600px]">
          {gridData?.map((item: DrupalNode, index: number) => (
            <GridItem
              key={index}
              title={item?.title}
              backgroundImage={item?.field_image?.uri?.url}
              videoUrl={item?.field_links[0]?.uri}
              badge={[item?.field_card_chip_name]}
              isLandingPage={item?.field_cs_landing_page === "yes"}
              cardId={item?.id}
              className="w-full h-full"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white mobileMax:py-10 betweenMobileTab:py-16 py-[120px] relative">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 2.5,
        }}
        className="absolute pointer-events-none top-[80px] left-[-100px] z-[0] max-w-[15%] betweenMobileTab:max-w-[40%] mobileMax:max-w-[40%]"
      >
        <img
          src="/static/images/faq-left-clip.png"
          alt="overlay-bg"
          className="opacity-70 betweenMobileTab:opacity-30 mobileMax:opacity-30 w-full"
        />
      </motion.div>
      <div className="mini-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation relative flex justify-center items-center mb-[80px] betweenMobileTab:mb-10 mobileMax:mb-8"
        >
          <motion.h2
            className=" desktop:text-[52px] font-poppins font-semibold text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)]
								leading-normal text-center text-clip text-[48px] mobileMax:text-[28px] mobileMax:px-0"
          >
            {data?.field_title}
          </motion.h2>
          <Link
            href={
              resolveLink(data?.field_button_link?.uri) ||
              "/country-engagement/india/sectors?sector=energy-efficiency"
            }
            className="desktop:flex hidden absolute right-0 top-[30px] z-10 betweenMobileTab:top-[25px] mobileMax:top-[50px] text-clip items-center justify-center font-poppins font-[600] text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-xmedium rounded-[10px] !underline mobileMax:min-w-full mobileMax:text-small "
          >
            {data?.field_button_link?.title || "View All"}{" "}
            <img
              className="w-[9px] h-[15.17px] ml-[25px] mt-[2px]"
              src="/static/images/Vector.svg"
              alt=""
            />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation"
        >
          <section className="z-50">
            <div className="flex mobileMax:flex-col mobileMax:w-full lg:grid lg:grid-cols-12 gap-4 h-[600px] mobileMax:h-[800px]">
              {gridData[0] && (
                <GridItem
                  title={gridData[0]?.field_title}
                  backgroundImage={gridData[0]?.field_image?.uri?.url}
                  videoUrl={gridData[0]?.field_links[0]?.uri}
                  badge={[gridData[0]?.field_card_chip_name]}
                  isLandingPage={gridData[0]?.field_cs_landing_page === "yes"}
                  cardId={gridData[0]?.id}
                  className="w-[66%] h-full mobileMax:w-full lieTablets:w-[60%] mobileMax:!h-[256px] mobileMax:!max-h-[256px]"
                />
              )}

              <div className="w-[33%] lieTablets:w-[40%] mobileMax:w-full flex flex-col gap-4 h-full mobileMax:h-[530px]">
                {gridData[1] && (
                  <GridItem
                    title={gridData[1]?.field_title}
                    backgroundImage={gridData[1]?.field_image?.uri?.url}
                    videoUrl={gridData[1]?.field_links[0]?.uri}
                    badge={[gridData[1]?.field_card_chip_name]}
                    isLandingPage={gridData[1]?.field_cs_landing_page === "yes"}
                    cardId={gridData[1]?.id}
                    className="flex-1 min-h-0"
                  />
                )}
                {gridData[2] && (
                  <GridItem
                    title={gridData[2]?.field_title}
                    backgroundImage={gridData[2]?.field_image?.uri?.url}
                    videoUrl={gridData[2]?.field_links[0]?.uri}
                    badge={[gridData[2]?.field_card_chip_name]}
                    isLandingPage={gridData[2]?.field_cs_landing_page === "yes"}
                    cardId={gridData[2]?.id}
                    className="flex-1 min-h-0"
                  />
                )}
              </div>
            </div>
          </section>
        </motion.div>
        <Link
          href={
            resolveLink(data?.field_button_link?.uri) ||
            "/country-engagement/india/sectors?sector=energy-efficiency"
          }
          className="flex desktop:hidden betweenMobileTab:mt-10 mt-8 text-clip items-center justify-center font-poppins font-[600] text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-xmedium rounded-[10px] !underline mobileMax:min-w-full mobileMax:text-small "
        >
          {data?.field_button_link?.title || "View All"}{" "}
          <img
            className="w-[9px] h-[15.17px] ml-[25px] mt-[2px]"
            src="/static/images/Vector.svg"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default GridCard;
