"use client";
import Link from "next/link";
import React from "react";
import { useOrigin } from "@/hooks/useOrigin";
import DynamicImage from "../ResuableDynamicImage";
import FadeInWrapper from "../FadeInWrapper";

interface HomeGridProps {
  gridImages: string[];
  title: string;
  subTitle: string;
  buttonText: string;
  buttonLink: string;
  allImages?: string;
}

const HomeGridLayout: React.FC<HomeGridProps> = (props) => {
  const origin = useOrigin();

  const {
    title = "",
    gridImages = [],
    subTitle = "",
    buttonText = "",
    buttonLink = "",
  } = props;

  const motionSettings = [
    { duration: 2.8, y: 40 },
    { duration: 2, y: 40 },
    { duration: 2.8, y: 60 },
  ];

  return (
    <div className="relative z-[1] flex items-center justify-between mobileMax:block">
      <div className="w-[50%] mobileMax:w-full">
        <div className="flex flex-col mr-3">
          {gridImages[0] && (
            <FadeInWrapper
              className="overflow-hidden rounded-[25px] laptop:w-[80%] max-h-[266px] w-full"
              y={motionSettings[0].y}
              once={true}
              type="spring"
              duration={motionSettings[0].duration}
            >
              <DynamicImage
                width={490}
                height={365}
                src={gridImages[0]}
                alt="grid img1"
                className="w-full h-full transform transition-transform duration-500 hover:scale-105"
              />
            </FadeInWrapper>
          )}

          <div className="flex items-start w-full mt-5 overflow-hidden">
            {gridImages.slice(1, 3).map((img, index) => {
              return (
                <FadeInWrapper
                  key={index}
                  className={`overflow-hidden rounded-[25px] max-w-full ${index === 0 ? "max-w-[50%]" : "ml-5"
                    }`}
                  y={motionSettings[index + 1].y}
                  once={true}
                  type="spring"
                  duration={motionSettings[index + 1].duration}
                >
                  <img
                    src={img}
                    alt={`grid img${index + 1}`}
                    className="w-full h-full transform transition-transform duration-500 hover:scale-105"
                  />
                </FadeInWrapper>
              )
            })}
          </div>

        </div>
      </div>

      <FadeInWrapper
        y={40}
        duration={1.8}
        type="spring"
        once={true}
        className="w-[45%] mobileMax:w-full mobileMax:mt-8"
      >
        <h2 className="text-numans text-[#545d6f] text-[35px] mb-[30px] leading-[40px] mobileMax:text-medium mobileMax:mb-3 mobileMax:leading-[28px]">
          {title}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: subTitle }}
          className="text-numans text-black text-small mb-[35px] leading-6 mobileMax:mb-5 mobileMax:text-xsmall mobileMax:leading-normal"
        />
        <Link
          href={
            buttonLink?.startsWith("internal:")
              ? `${origin}${buttonLink.replace("internal:", "")}`
              : buttonLink || "#"
          }
          className="h-[46px] rounded-md --font-poppins bg-buttonOverlay px-[30px] flex max-w-[160px] items-center justify-center hover:bg-blueHover"
        >
          <span className="text-clip learnBtn --font-poppins text-xsmall font-medium">
            {buttonText}
          </span>
        </Link>
      </FadeInWrapper>
    </div>
  );
};

export default HomeGridLayout;
