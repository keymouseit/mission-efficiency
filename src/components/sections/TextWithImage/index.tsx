"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import { DrupalNode } from "next-drupal";
import { resolveLink } from "@/utils";
import { config } from "@/lib/config";
import FormSection from "../FormSection";
import dynamic from "next/dynamic";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

interface TextImageSectionProps {
  data: DrupalNode;
  env?: string;
}

const TextImageSection: React.FC<TextImageSectionProps> = ({ data }) => {
  const isBlue = data.field_background_color === "blue";
  const isWhite = data.field_background_color === "white";
  const isGray = data.field_background_color === "gray";
  const [isContainerActive, setIsContainerActive] = useState(false);
  const demandContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
  };

  const imagePosition = data?.field_image_position || "left";
  const hasButton = !!data?.field_button_link?.title;
  const hasDescription = !!data?.field_description?.processed;
  const hasImage = !!data?.field_image?.uri;
  const hasVideo = !!data?.field_video_link;
  const isFullWidth = data?.field_full_width_section === true;
  const hasIcon = !!data?.field_icon?.uri;

  if (data?.field_select_variant === "create_with_form" || data?.field_background_image) {
    return <FormSection data={data} />;
  }


  if (hasImage && isFullWidth) {
    // ✅ FULL WIDTH SECTION (when image exists and field_full_width_section=true)
    return (
      <>
        {data?.field_large_image_width ? (
          <div className="bg-[linear-gradient(to_top,#003350_16%,#248781_65%,#37B29A_82%,#48DBB2_100%)] py-24 mobileMax:py-2 betweenMobileTab:py-12 relative min-h-[700px] mobileMax:min-h-[400px] betweenMobileTab:min-h-[480px] flex items-center justify-center">
            <Image
              src={`${config.apiBase}${data.field_image?.uri?.url}`}
              alt={"Card image"}
              width={1500}
              height={1500}
              className="w-[57%] h-full betweenMobileTab:hidden absolute left-0 top-0 mobileMax:w-[65%] mobileMax:hidden"
            />
            <div className="desktop:w-[70%]" />

            <div className="w-full px-[20px] py-10 desktop:w-[45%] desktop:mr-[80px] z-[1]">
              <h3 className="text-white text-[32px] font-poppins font-semibold leading-10 mobileMax:leading-9 mobileMax:text-[26px]">
                {data?.field_title}
              </h3>
              <div
                className="text-white text-[16px] font-poppins font-medium mt-[18px] bold-font-list description"
                dangerouslySetInnerHTML={{
                  __html: data?.field_description?.processed,
                }}
              />
            </div>
            <div className="absolute -bottom-32 right-0">
              <img
                src="/static/images/energy.png"
                alt=""
                className="mobileToDesk:opacity-60"
              />
            </div>
          </div>
        ) : (
          <div
            className={`${
              imagePosition === "left"
                ? "bg-[linear-gradient(to_top,#003350,#248781,#37B29A,#48DBB2)]"
                : data?.field_background_color === "gray"
                ? "bg-[#f9f9f9]"
                : "bg-white"
            } relative overflow-hidden`}
          >
            <Image
              src={`${config.apiBase}${data.field_image?.uri?.url}`}
              alt={"Card image"}
              width={800}
              height={600}
              className={`w-[50%] h-full absolute top-0 ${
                data?.field_image_position === "left" ? "left-0" : "right-0"
              } mobileMax:w-[65%] mobileMax:hidden betweenMobileTab:hidden`}
            />

            {/* CONTENT */}
            <div className="mini-container relative z-[1] py-[200px] mobileMax:py-10 betweenMobileTab:py-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
                className={`remove-animation-fluctuation flex items-center justify-between mobileMax:flex-col betweenMobileTab:flex-col gap-[20px] ${
                  data?.field_image_position === "left"
                    ? "flex-row-reverse"
                    : "flex-row"
                }`}
              >
                {/* TEXT SECTION */}
                <div className="w-[47%] relative mobileToDesk:w-full mobileToDesk:items-center text-section">
                  {data?.field_title && (
                    <h3
                      className={`text-[42px] font-poppins mb-[40px] mobileMax:mb-8 font-semibold leading-normal mobileMax:leading-9 ${
                        imagePosition === "left"
                          ? "text-white"
                          : "bg-gradient-to-r from-[#48DBB2] to-[#003350] bg-clip-text text-transparent text-clip"
                      } mobileMax:text-[28px] mobileToDesk:mb-5`}
                    >
                      {data?.field_title}
                    </h3>
                  )}

                  {hasDescription && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data?.field_description?.processed,
                      }}
                      className={`text-[16px] font-poppins mb-[40px] mobileMax:mb-6 leading-normal mobileMax:text-xsmall bold-font-list bold-font-description description ${
                        imagePosition === "right"
                          ? "text-[#828282]"
                          : "text-white"
                      }`}
                    />
                  )}

                  {hasButton && (
                    <div className="flex items-center">
                      <Link
                        href={resolveLink(data?.field_button_link?.uri) || "#"}
                        target="_blank"
                        className={`!px-[40px] !inline-flex items-center font-poppins !text-white text-small font-semibold min-h-[50px] rounded-lg hover:!underline !no-underline mobileMax:max-w-full mobileMax:text-xsmall ${
                          imagePosition === "left"
                            ? "bg-[linear-gradient(to_right,#48DBB2,#4FC0FF)]"
                            : "bg-[linear-gradient(to_right,#48DBB2,#003350)]"
                        }`}
                      >
                        {data?.field_button_link?.title}
                        {imagePosition === "left" && (
                          <MdChevronRight className="text-[30px] ml-0.5 inline-block" />
                        )}
                      </Link>
                    </div>
                  )}
                </div>

                {/* EMPTY DIV for layout symmetry */}
                <div className="w-[48%]"></div>
              </motion.div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (data?.field_large_image_width && !isFullWidth) {
    return (
      <div
        id="secretariat"
        className="bg-[#003350] py-[120px] betweenMobileTab:py-16 mobileMax:py-10 relative "
      >
        <div
          className="
			flex flex-col items-center justify-between gap-[50px] mini-container betweenMobileTab:py-16 mobileMax:py-10
			  mobileMax:gap-[40px] desktop:flex-row"
        >
          {/* Text Section */}
          <div className="flex-1">
            <h3
              className="
					bg-clip-text text-transparent bg-[linear-gradient(to_right,#48DBB2_7%,#4FC0FF_50%)]
					text-[32px] font-semibold mb-[35px]
					mobileMax:text-[24px] betweenMobileTab:text-[28px]
				"
            >
              {data?.field_title}
            </h3>

            <div
              className="
                    text-[16px] text-white leading-relaxed 
                    [&_strong]:text-[#48DBB2] [&_strong]:font-semibold
                    mobileMax:text-[14px] betweenMobileTab:text-[15px]
                "
              dangerouslySetInnerHTML={{
                __html: data?.field_description?.processed,
              }}
            />
          </div>

          {/* Image Section */}
          <div className="desktop:w-[510px] desktop:h-[590px]">
            <img
              src={`${config.apiBase}${data.field_image?.uri?.url}`}
              alt="Secretariat"
              className="w-full h-full rounded-2xl
                    betweenMobileTab:w-[520px] betweenMobileTab:h-[610px]
                    mobileMax:w-[320px] mobileMax:h-[364px]"
            />
          </div>
        </div>
      </div>
    );
  }

  // ✅ DEFAULT SECTION (video or normal image)
  return (
    <div
      className={`py-[120px] ${isBlue ? "bg-[#003350]" : ""}
      ${isWhite ? "bg-white" : ""}
      ${
        isGray ? "bg-[#f9f9f9]" : ""
      } relative mobileMax:py-12 betweenMobileTab:py-16 overflow-hidden`}
    >
      {/* Background Decorations */}

      {/* Main Container */}
      <div className="mini-container relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className={`
            remove-animation-fluctuation
            ${
              hasImage || hasVideo || hasIcon
                ? imagePosition === "top"
                  ? "flex flex-col-reverse items-center text-center gap-[30px] w-full"
                  : imagePosition === "center"
                  ? "flex flex-col items-center text-center gap-[30px] w-full"
                  : `flex
                        ${
                          imagePosition === "left"
                            ? "flex-row-reverse gap-[100px] mobileMax:gap-[10px] betweenMobileTab:gap-[40px]"
                            : "flex-row gap-[100px] mobileMax:gap-[10px] betweenMobileTab:gap-[60px]"
                        }
                        items-center justify-between mobileToDesk:flex-col`
                : "flex flex-col justify-center items-center text-center"
            }            
          `}
        >
          {/* Left/Center Text Section */}
          <motion.div
            className={`${
              imagePosition === "center" || imagePosition === "top"
                ? "relative mobileToDesk:w-full"
                : `${
                    hasImage ? "w-[50%]" : "w-full"
                  } relative mobileToDesk:w-full`
            }`}
          >
            {/* Title */}
            {data?.field_title && (
              <h2
                className={`mobileMax:text-center betweenMobileTab:text-center text-[32px] font-poppins mb-[37px] mobileMax:mb-8 font-semibold leading-10 text-transparent bg-clip-text ${
                  !isBlue
                    ? "bg-[linear-gradient(to_right,#48DBB2,#003350)]"
                    : "bg-[linear-gradient(to_right,#48DBB2,#4FC0FF)]"
                } mobileMax:text-[28px] mobileToDesk:mb-5`}
              >
                {data?.field_title}
              </h2>
            )}
            {/* Description */}
            {hasDescription && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.field_description?.processed,
                }}
                className={`text-[16px] mobileMax:text-center betweenMobileTab:text-center font-poppins mb-[40px] 
                  mobileMax:mb-5 leading-normal mobileMax:text-xsmall 
                  [&_ul]:list-disc
                  [&_ul]:ml-6
                  [&_li]:mb-[10px]
                  ${
                    isBlue
                      ? "[&_li::marker]:text-white"
                      : isWhite || isGray
                      ? "[&_li::marker]:text-[#828282]"
                      : "[&_li::marker]:text-[#48DBB2]"
                  }
                  [&_a]:text-[#48DBB2]  
                  [&_a]:font-semibold
                  [&_a]:underline 
                  ${
                    isBlue
                      ? "text-white"
                      : hasImage || hasVideo
                      ? imagePosition === "right" || imagePosition === "left"
                        ? "text-[#828282]"
                        : ""
                      : "text-black"
                  }`}
              />
            )}
            {/* Button */}
            <div
              className={`flex items-center gap-[40px] betweenMobileTab:justify-center mobileMax:flex-col mobileMax:gap-2.5 ${
                (!hasImage && !hasVideo && !hasIcon) ||
                ((hasImage || hasVideo || hasIcon) &&
                  (imagePosition === "center" || imagePosition === "top"))
                  ? "justify-center"
                  : ""
              }`}
            >
              {hasButton && (
                <div
                  className={`${
                    hasImage
                      ? "flex justify-center"
                      : "flex justify-center items-center"
                  } mobileToDesk:justify-center`}
                >
                  <Link
                    href={resolveLink(data?.field_button_link?.uri) || "#"}
                    className={`mobileMax:text-center mobileMax:w-full ${
                      hasImage || hasVideo
                        ? "w-auto"
                        : "px-[20px] mobileMax:max-w-full"
                    } px-[50px] py-[15px] font-poppins inline-block ${
                      !isBlue ? "text-white" : "text-[#003350]"
                    } text-medium font-semibold tab:min-h-[60px] rounded-lg hover:!underline !no-underline betweenMobileTab:mx-auto  mobileMax:text-small mobileMax:mb-3
                    ${
                      !isBlue
                        ? "bg-[linear-gradient(to_right,#48DBB2,#003350)]"
                        : "bg-[linear-gradient(to_right,#48DBB2,#4FC0FF)]"
                    }
                  `}
                  >
                    {data?.field_button_link?.title}
                    <MdChevronRight className="text-[30px] ml-0.5 inline-block" />
                  </Link>
                </div>
              )}

              {data?.field_button_link_2 && (
                <div
                  className={`${
                    hasImage ? "flex" : "flex justify-center items-center"
                  } mobileToDesk:justify-center`}
                >
                  <Link
                    href={resolveLink(data?.field_button_link_2?.uri) || "#"}
                    className={`mobileMax:text-center mobileMax:w-full ${
                      hasImage || hasVideo
                        ? "w-auto"
                        : "px-[20px] mobileMax:max-w-full"
                    } px-[50px] py-[15px] font-poppins inline-block ${
                      !isBlue ? "text-white" : "text-[#003350]"
                    } text-medium font-semibold tab:min-h-[60px] rounded-lg hover:!underline !no-underline betweenMobileTab:mx-auto mobileMax:text-small mobileMax:mb-3
                  ${
                    !isBlue
                      ? "bg-[linear-gradient(to_right,#48DBB2,#003350)]"
                      : "bg-[linear-gradient(to_right,#48DBB2,#4FC0FF)]"
                  }
                `}
                  >
                    {data?.field_button_link_2?.title}
                    <MdChevronRight className="text-[30px] ml-0.5 inline-block" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right or Center Media (Video or Image) */}
          {hasVideo && (
            <div
              ref={demandContainerRef}
              className={`relative mobileToDesk:ml-0 mobileMax:mb-6 mobileToDesk:w-full
      ${
        imagePosition === "center"
          ? "mobileToDesk:ml-0 mobileMax:mb-6 mobileToDesk:w-full w-[90%]"
          : ""
      }`}
              onClick={() => setIsContainerActive((prev) => !prev)}
            >
              <div className="relative w-full aspect-video overflow-hidden rounded-[50px] mobileToDesk:rounded-[15px] mobileMax:aspect-[4/3]">
                <button
                  onClick={handleMuteToggle}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="absolute bottom-12 right-6 z-30 bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition"
                >
                  {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>

                {showIcon && (
                  <div className="absolute z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/75 text-white w-20 h-20 flex items-center justify-center rounded-full shadow-lg transition-opacity duration-300 animate-fadeOut">
                    {isPlaying ? <Pause size={40} /> : <Play size={40} />}
                  </div>
                )}

                <ReactPlayer
                  id="react-video-player"
                  url="https://www.youtube.com/watch?v=QbOH_i6HxnE"
                  playing={isPlaying}
                  muted={isMuted}
                  loop
                  controls={false}
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        showinfo: 0,
                        rel: 0,
                        controls: 0,
                        autoplay: 1,
                        fs: 0,
                        iv_load_policy: 3,
                        disablekb: 1,
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}

          {imagePosition === "center" && hasImage ? (
            <div className="mt-[30px]">
              <img
                src={`${config.apiBase}${data?.field_image?.uri?.url}`}
                alt=""
              />
            </div>
          ) : imagePosition === "center" && hasIcon ? (
            <Image
              src={`${config.apiBase}${data?.field_icon?.uri?.url}`}
              alt=""
              width={112}
              height={113}
              className="w-[112px] h-[113px] mt-[30px]"
            />
          ) : null}

          {imagePosition === "top" && hasIcon && (
            <Image
              src={`${config.apiBase}${data.field_icon?.uri?.url}`}
              alt=""
              width={112}
              height={113}
              className="w-[112px] h-[113px]"
            />
          )}

          {imagePosition === "top" && hasImage && (
            <Image
              src={`${config.apiBase}${data?.field_image?.uri?.url}`}
              alt=""
              width={550}
              height={449}
              className="w-[550px] h-[449px]"
            />
          )}

          {/* Right Media Section */}
          {hasImage
            ? (imagePosition === "left" || imagePosition === "right") && (
                <div
                  className={`relative desktop:ml-auto mobileToDesk:mx-auto mobileToDesk:my-5 w-[90%] max-w-[555px] ${
                    data?.field_image_with_animation
                      ? "aspect-[550/515]"
                      : "aspect-[550/449]"
                  } mobileMax:w-full mobileMax:max-w-[320px]`}
                >
                  {hasImage &&
                    !isFullWidth &&
                    (data?.field_image_with_animation ? (
                      data?.field_image_animation_type === "zoom_in" ? (
                        <div
                          className="group"
                          ref={demandContainerRef}
                          onClick={() => setIsContainerActive((prev) => !prev)}
                        >
                          {/* Background pattern */}
                          <Image
                            alt="Background pattern"
                            src="/static/images/india-mask-bg.png"
                            fill
                            style={{ objectPosition: "center 50%" }}
                            className="object-cover z-10 pointer-events-none"
                          />
                          {/* Masked Image Layer */}
                          <div
                            className={`absolute inset-0 z-20 transition-transform duration-500 cursor-pointer group-hover:rotate-[14deg]
                        ${isContainerActive ? "rotate-[14deg]" : "rotate-0"}`}
                            style={{
                              WebkitMaskImage:
                                "url('/static/images/transition-shape1.png')",
                              WebkitMaskRepeat: "no-repeat",
                              WebkitMaskSize: "cover",
                              WebkitMaskPosition: "center",
                              maskImage:
                                "url('/static/images/transition-shape1.png')",
                              maskRepeat: "no-repeat",
                              maskSize: "cover",
                              maskPosition: "center",
                              overflow: "hidden",
                            }}
                          >
                            {/* Extra safe area for rotation */}
                            <div className="absolute inset-[-8%]">
                              <img
                                src={
                                  data?.field_image?.uri?.url
                                    ? `${config.apiBase}${data.field_image.uri.url}`
                                    : `${config.apiBase}${data.field_icon.uri.url}`
                                }
                                alt="Background"
                                className={`w-full h-full object-cover transform transition-all duration-500
                            scale-[0.85] desktop:group-hover:scale-[1.15] desktop:group-hover:-translate-y-5 desktop:group-hover:translate-x-5 desktop:group-hover:-rotate-[14deg]
                            ${
                              isContainerActive
                                ? "scale-[1.15] -translate-y-5 translate-x-5 -rotate-[14deg]"
                                : "scale-[0.85] translate-x-0 translate-y-0 rotate-0"
                            }`}
                                style={{ objectPosition: "center" }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="group">
                          <Image
                            alt="Background pattern"
                            src="/static/images/india-mask-bg.png"
                            fill
                            style={{ objectPosition: "center 50%" }}
                            className="object-cover z-10 pointer-events-none"
                          />

                          <div
                            className={`absolute inset-0 z-20 transition-transform duration-300 cursor-pointer desktop:group-hover:rotate-[14deg]
                        ${
                          isContainerActive
                            ? "rotate-[14deg] mobileMax:rotate-[8deg]"
                            : "rotate-0"
                        }`}
                            style={{
                              WebkitMaskImage:
                                "url('/static/images/transition-shape1.png')",
                              WebkitMaskRepeat: "no-repeat",
                              WebkitMaskSize: "cover",
                              WebkitMaskPosition: "center",
                              maskImage:
                                "url('/static/images/transition-shape1.png')",
                              maskRepeat: "no-repeat",
                              maskSize: "cover",
                              maskPosition: "center",
                              overflow: "hidden",
                            }}
                          >
                            <div className="absolute inset-[-8%]">
                              <img
                                src={
                                  data?.field_image?.uri?.url
                                    ? `${config.apiBase}${data.field_image.uri.url}`
                                    : `${config.apiBase}${data.field_icon.uri.url}`
                                }
                                alt="Background"
                                className={`w-full h-full object-cover transform transition-all duration-300
                            group-hover:scale-110 group-hover:-translate-y-5 group-hover:translate-x-5 group-hover:-rotate-[14deg]
                            ${
                              isContainerActive
                                ? "scale-110 desktop:translate-y-40 translate-x-28 -rotate-[14deg] mobileMax:-translate-y-5 mobileMax:translate-x-16 mobileMax:-rotate-[8deg]"
                                : "scale-105 -translate-x-28 desktop:translate-y-0 mobileMax:-translate-y-5 rotate-0 pb-8 mobileMax:-translate-x-14 mobileMax:pb-4"
                            }`}
                                style={{ objectPosition: "center" }}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="max-w-[550px] h-full relative mobileToDesk:w-full">
                        <Image
                          alt="Background banner"
                          src={
                            data?.field_image?.uri?.url
                              ? `${config.apiBase}${data.field_image?.uri?.url}`
                              : `${config.apiBase}${data.field_icon?.uri?.url}`
                          }
                          width={550}
                          height={430}
                          priority
                          quality={90}
                          className={`mobileMax:min-h-[300px] min-h-[430px] object-cover w-full h-full object-center rounded-[20px]`}
                        />
                      </div>
                    ))}
                </div>
              )
            : hasIcon &&
              (imagePosition === "left" || imagePosition === "right") && (
                <div className="relative desktop:ml-auto mobileToDesk:mx-auto mobileToDesk:my-5 mobileMax:w-full mobileMax:max-w-[320px]">
                  <Image
                    src={`${config.apiBase}${data.field_icon?.uri?.url}`}
                    alt=""
                    width={112}
                    height={113}
                    className="w-[112px] h-[113px]"
                  />
                </div>
              )}
        </motion.div>
      </div>
    </div>
  );
};

export default TextImageSection;
