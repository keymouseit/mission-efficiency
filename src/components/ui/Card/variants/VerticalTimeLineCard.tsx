import { DrupalNode } from "next-drupal";
import Image from "next/image";
import React from "react";
import { config } from "@/lib/config";

interface CardProps {
  data: DrupalNode;
}

const VerticalTimeLineCard = ({ data }: CardProps) => {
  const isBlue = data.field_background_color === "blue";
  const isWhite = data.field_background_color === "white";
  const isGray = data.field_background_color === "gray";
  const isDarkDray = data.field_background_color === "dark_gray";

  return (
    <div>
      <div
        className={`${isBlue ? "bg-[#003350]" : ""}
      ${isWhite ? "bg-white" : ""}
      ${isGray ? "bg-[#f9f9f9]" : ""} ${isDarkDray ? "bg-mapGray" : ""
          } mobileMax:py-12 betweenMobileTab:py-24 desktop:py-[120px]`}
      >
        <h3 className="max-w-[880px] mx-auto mobileMax:text-center text-center text-[42px] font-poppins mb-2 mobileMax:mb-8 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip mobileMax:text-[28px]">
          {data?.field_title}
        </h3>
        <div
          className="max-w-[880px] mx-auto mobileMax:order-3 mobileMax:mb-5 text-center text-small !text-[#828282] font-poppins font-normal mobileMax:text-xsmall leading-normal"
          dangerouslySetInnerHTML={{
            __html: data?.field_description?.processed,
          }}
        />
        <div className="max-w-4xl mx-auto px-4 desktop:px-8">
          <div className="relative">
            <div className="absolute left-1/2 mobileMax:top-[4rem] mobileMax:bottom-[5.2rem] betweenMobileTab:top-[3.9rem] betweenMobileTab:bottom-[4.3rem] top-[7.5rem] bottom-[7.5rem] w-1 bg-[#828282] transform -translate-x-1/2" />

              <div className="space-y-10 desktop:space-y-16 mt-[90px]">
              {data?.field_add_card.map((item: DrupalNode, index: number) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 desktop:gap-[40px] ${index % 2 != 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                >
                  <div
                    className={`flex-1 ${index % 2 != 0 ? "text-right " : "text-left"
                      }`}
                  >
                    <h3
                      className="text-[22px] desktop:text-[32px] font-semibold mb-2 inline-block bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right,#48DBB2 0%,#003350 100%)",
                        backgroundSize: "100% 100%",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                      }}
                    >
                      {item.field_title}
                    </h3>

                    <div
                      className=" text-[16px] desktop:text-base"
                      dangerouslySetInnerHTML={{
                        __html: data?.field_description?.processed,
                      }}
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-[#48DBB2] shadow-lg z-10 relative flex-shrink-0" />
                    {index < data?.field_add_card.length - 1 && (
                      <div className="desktop:hidden flex-1 w-1 h-12 bg-[#48DBB2] mt-2" />
                    )}
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <Image
                      src={`${config.apiBase}${item.field_image.uri.url}`}
                      alt={item.title || item.field_title || "Card icon"}
                      width={288}
                      height={256}
                      className="mx-auto block mobileMax:w-[120px] betweenMobileTab:w-[180px] mobileMax:object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTimeLineCard;
