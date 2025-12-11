"use client";
import React from "react";
import { DrupalNode } from "next-drupal";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import { config } from "@/lib/config";

interface SliderProps {
  sliderData: DrupalNode[];
  isHomePage?: boolean;
}

const PartnerSlider: React.FC<SliderProps> = ({
  sliderData,
  isHomePage = false,
}) => {
  const total = sliderData?.length || 0;
  const firstHalfCount = Math.ceil(total / 2);
  const firstHalf = sliderData.slice(0, firstHalfCount);
  const secondHalf = sliderData.slice(firstHalfCount, total);

  const renderCard = (partnerCard: DrupalNode, index: number) => (
    <motion.div
      key={index}
      className="flex-shrink-0 px-[15px] py-5 mobileMax:px-2"
    >
      <Link
        href={
          partnerCard?.field_mission_card_link ||
          partnerCard?.field_button_link?.uri ||
          "#"
        }
        target="_blank"
        className="group relative w-full p-3 mobileMax:px-2 bg-white rounded-[20px] overflow-hidden 
        shadow-[0_2px_5px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]
        mobileMax:p-1 min-w-[280px] mobileMax:min-w-[180px] min-h-[150px] mobileMax:min-h-[120px] mobileMax:h-[120px] 
        flex items-center justify-center duration-300"
      >
        <Image
          src={`${config.apiBase}${
            partnerCard?.field_mission_card_image?.uri?.url ||
            partnerCard?.field_icon?.uri?.url
          }`}
          alt={partnerCard?.field_mission_card_image?.filename || "icon"}
          width={200}
          height={200}
          className={`mobileMax:max-w-[130px] max-h-[110px] mobileMax:max-h-[80px] ${
            isHomePage && "object-contain"
          }`}
        />

        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="w-full h-[30px] bg-gradient-to-r from-[#003350] to-[#48dbb2] flex flex-col items-center text-white font-medium text-sm">
            <div className="w-full rounded-b-[15px] h-[15px] bg-white" />
            <p className="inline-flex mt-[2px] mb-[2px]">
              {partnerCard?.field_button_link?.title || "Learn More"}
              <MdChevronRight className="w-[18px] h-[18px] ml-0.5 mt-[2px]" />
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  const InfiniteSlider = ({
    items,
    reverse = false,
  }: {
    items: DrupalNode[];
    reverse?: boolean;
  }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [width, setWidth] = React.useState(0);
    const [shouldScroll, setShouldScroll] = React.useState(true);

    React.useEffect(() => {
      if (!containerRef.current || !wrapperRef.current) return;

      const totalWidth = containerRef.current.scrollWidth;
      const visibleWidth = wrapperRef.current.offsetWidth;

      // Not overflowing → disable scrolling + no duplicate items
      if (totalWidth <= visibleWidth) {
        setShouldScroll(false);
        return;
      }

      // Overflowing → enable scrolling
      setShouldScroll(true);
      setWidth(totalWidth / 2);
    }, [items]);

    // Items to render: single or double
    const renderItems = shouldScroll ? [...items, ...items] : items;

    return (
      <div ref={wrapperRef} className="overflow-hidden relative w-full">
        <div
          ref={containerRef}
          className="flex shrink-0 items-center justify-center"
          style={{
            width: shouldScroll && width ? width * 2 : "auto",
            animation:
              shouldScroll && width
                ? `${reverse ? "marqueeReverse" : "marquee"} ${
                    width / 60
                  }s linear infinite`
                : "none",
          }}
          onMouseEnter={(e) =>
            shouldScroll
              ? (e.currentTarget.style.animationPlayState = "paused")
              : null
          }
          onMouseLeave={(e) =>
            shouldScroll
              ? (e.currentTarget.style.animationPlayState = "running")
              : null
          }
        >
          {renderItems.map((item, i) => renderCard(item, i))}
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes marqueeReverse {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="space-y-4 mobileMax:space-y-2">
      {total < 15 ? (
        <InfiniteSlider items={sliderData} />
      ) : (
        <>
          <InfiniteSlider items={firstHalf} />
          <InfiniteSlider items={secondHalf} reverse />
        </>
      )}
    </div>
  );
};

export default PartnerSlider;
