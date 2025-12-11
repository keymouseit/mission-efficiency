"use client";
import { config } from "@/lib/config";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdImages } from "react-icons/io";

interface AnimatedCardProps {
  data: DrupalNode;
}

interface AnimatedCounterProps {
  text: string;
  target: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ text, target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1000; // 1 second

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target]);

  const animatedText = text?.replace(/\d+/, count.toString());

  return <div>{animatedText}</div>;
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({ data }) => {
  const cardCount = data?.field_select_the_card_count_per;

  const widthClass =
    cardCount === 1
      ? "w-full"
      : cardCount === 2
      ? "w-1/2"
      : cardCount === 3
      ? "w-1/3"
      : cardCount === 4
      ? "w-1/4"
      : "w-full";
  return (
    <div>
      <div className="py-20 bg-[#003350] mobileMax:py-8 relative">
        <div
          className={`${
            cardCount === 4
              ? "px-[180px] betweenMobileTab:px-[10px] mobileMax:px-[6px]"
              : "mini-container"
          } relative z-[2]`}
        >
          <h3 className="mx-auto mobileMax:text-center text-center text-[42px] font-poppins mb-[90px] mobileMax:mb-8 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#4FC0FF)] text-clip mobileMax:text-[28px]">
            {data?.field_title}
          </h3>

          <div
            className="max-w-[880px] mx-auto mobileMax:order-3 mobileMax:mb-5 text-center text-small !text-[#828282] font-poppins font-normal mobileMax:text-xsmall leading-normal"
            dangerouslySetInnerHTML={{
              __html: data?.field_description?.processed || "",
            }}
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="flex flex-wrap justify-start box-border"
          >
            {data?.field_add_card?.map((card: DrupalNode, index: number) => {
              const numMatch = card?.field_title?.match(/\d+/);
              const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0;

              return (
                <motion.div
                  key={card?.id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className={`remove-animation-fluctuation px-[15px] ${widthClass} mobileMax:w-full mobileMax:px-0 mobileMax:py-[30px]`}
                >
                  <div className="px-5 mobileMax:p-0 flex items-center flex-col w-full box-border">
                    <div className="h-full w-full flex flex-col items-center">
                      {card?.field_image?.uri?.url ? (
                        <motion.div
                          animate={{ y: [0, -15, 0] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-[30%] h-[30%] flex justify-center items-center"
                        >
                          <Image
                            src={`${config.apiBase}${card?.field_image?.uri?.url}`}
                            alt={card.title || "Card image"}
                            width={100}
                            height={100}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{ y: [0, -15, 0] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-[30%] h-[30%] flex justify-center items-start"
                        >
                          <IoMdImages className="w-[40px] h-[40px] text-white" />
                        </motion.div>
                      )}
                      <h5 className="font-bold text-[22px] text-transparent bg-clip-text bg-[#48DBB2] text-numans text-clip betweenMobileTab:text-[20px] mobileMax:text-medium text-center mt-3">
                        <AnimatedCounter
                          text={card?.field_title}
                          target={targetNum}
                        />
                      </h5>
                      <div
                        className="--font-poppins text-white text-center font-semibold text-[18px] mobileMax:text-xsmall leading-normal lieTablets:text-small line-clamp-5"
                        dangerouslySetInnerHTML={{
                          __html: card?.field_description?.processed || "",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;
