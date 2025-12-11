"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./VerticalSlider.module.css";
import { DrupalNode } from "next-drupal";
import {
  BarsChart,
  HorizontalBarChart,
  LinesChart,
  PiChart,
} from "@/components/ui/Charts";
import { config } from "@/lib/config";

interface VerticalSliderProps {
  data: DrupalNode[];
}

const VerticalSlider = ({ data }: VerticalSliderProps) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start autoplay
  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % data.length);
    }, 5000);
  };

  // Stop autoplay
  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Initialize autoplay on mount
  useEffect(() => {
    if (!data || data.length === 0) return;
    startAutoplay();
    return () => stopAutoplay();
  }, [data]);

  const handleSlideChange = (slideIndex: number) => {
    setActiveSlide(slideIndex);
  };

  const isDesktop = () =>
    typeof window !== "undefined" && window.innerWidth >= 1024;

  // Hover handlers for content/image
  const handleMouseEnter = () => isDesktop() && stopAutoplay();
  const handleMouseLeave = () => isDesktop() && startAutoplay();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${styles.sliderContainer} ${styles.fadeIn}`}
    >
      {/* Navigation Buttons */}
      <div className={styles.navigationButtons}>
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            {activeSlide === index ? (
              <div className="w-4 h-8 rounded-full bg-gradient-to-t from-[#48DBB2] to-[#003350]" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-[#003350]" />
            )}
          </button>
        ))}
      </div>

      <div className={styles.sliderWrapper}>
        {data.map((section: DrupalNode, index: number) => {
          const isActive = index === activeSlide;

          return (
            <div
              key={section.id}
              className={`${styles.slideItem} ${
                isActive ? styles.slideActive : styles.slideInactive
              }`}
            >
              <div className={styles.contentGrid}>
                {/* Content Card */}
                <div
                  className={`${styles.contentCard} ${
                    (index + 1) % 2 !== 0
                      ? styles.orderFirst
                      : styles.orderSecond
                  } flex items-center`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <p
                    className="text-white px-6 text-[18px] font-medium mobileMax:text-xsmall mobileMax:leading-normal leading-[1.4]"
                    dangerouslySetInnerHTML={{
                      __html: section?.field_description?.processed,
                    }}
                  />
                </div>

                {/* Image / Chart */}
                <div
                  className={`${styles.imageContainer} ${
                    (index + 1) % 2 !== 0
                      ? styles.orderSecond
                      : styles.orderFirst
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex justify-center items-center h-full">
                    {index === 0 && <LinesChart isActive={isActive} />}
                    {index === 1 && <BarsChart isActive={isActive} />}
                    {index === 2 && <PiChart isActive={isActive} />}
                    {index === 3 && <HorizontalBarChart isActive={isActive} />}
                    {index === 4 && (
                      <div className="w-full h-full bg-[#f9f9f9] flex items-center justify-center pl-10 mobileToDesk:pl-5">
                        <img
                          alt="image"
                          src="/static/images/lifestyle.svg"
                          className="h-full w-full"
                        />
                      </div>
                    )}
                    {index > 4 && (
                      <div className="w-full h-full bg-[#f9f9f9] flex items-center justify-center px-10 mobileToDesk:py-5">
                        <img
                          alt="image"
                          src={`${config.apiBase}${
                            section?.field_image_icon?.uri?.url || ""
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default VerticalSlider;
