"use client";

import { DrupalNode } from "next-drupal";
import { motion } from "framer-motion";
import { config } from "@/lib/config";
import Link from "next/link";
import { resolveLink } from "@/utils";

interface CardProps {
  data: DrupalNode;
}

export default function IconWithLinesCard({ data }: CardProps) {
  return (
    <div id="approach" className="bg-[linear-gradient(to_top,#003350_10%,#1B7275_49%,#32A693_75%,#48DBB2_100%)] py-[120px] betweenMobileTab:py-16 mobileMax:py-10 relative">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 2.8,
        }}
        className="absolute bottom-[400px] pointer-events-none max-w-[15%] betweenMobileTab:max-w-[45%] mobileMax:max-w-[50%]"
      >
        <img
          src="/static/images/approach-bg-img.svg"
          alt="get-inv-home"
          className="mobileMax:opacity-50  opacity-60"
        />
      </motion.div>
      <div className="mini-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="remove-animation-fluctuation"
        >
          <h3 className="text-[#003350] text-[32px] font-semibold text-center mb-[100px]  betweenMobileTab:mb-16 mobileMax:mb-10">
            {data?.field_title}
          </h3>
        </motion.div>

        {data?.field_add_card?.map((card: any, index: number) => (
          <div
            id={card?.field_links[0]?.title.toLowerCase()}
            key={index}
            className="scroll-mt-[150px] mb-[127px] relative"
          >
            <div className="flex justify-center gap-6 relative mobileMax:hidden mr-[20px]">
              {/* ===== Gradient Border Box ===== */}
              <div
                className="
      w-[700px] h-[120px]
      md:w-[800px] md:h-[140px] 
      betweenMobileTab:w-[550px] betweenMobileTab:h-[140px]
	  aboveLaptop:w-[800px] aboveLaptop:h-[120px]
      desktop:w-[840px] desktop:h-[152px]
      border-t-4 border-l-4 border-transparent
      absolute left-[40px] betweenMobileTab:left-[69px] aboveLaptop:left-[65px] desktop:left-[92px]
    "
                style={{
                  borderImage:
                    "linear-gradient(to left bottom, #48DBB2, #4FC0FF) 1",
                  borderImageSlice: 1,
                }}
              ></div>

              {/* ===== Button Section ===== */}
              <div
                className="
								relative
								tab:absolute
								betweenMobileTab:right-[-18px] betweenMobileTab:top-[-28px]
								aboveLaptop:right-[60px] aboveLaptop:top-[-28px]
								desktop:right-[-22px] desktop:top-[-31px]
							  "
              >
                <Link href={resolveLink(card?.field_links[0]?.uri) || "#"}>
                  <button
                    className="w-[200px] h-[55px] md:w-[250px] md:h-[60px] desktop:w-[277px] desktop:h-[62px]
        bg-gradient-to-r from-[#4FC0FF] to-[#5DE29B]
        text-[#003350] text-[18px] md:text-[20px] desktop:text-[22px]
        font-bold rounded-[171px]"
                  >
                    {card?.field_links[0]?.title}
                  </button>
                </Link>
              </div>
            </div>

            <div className="hidden mobileMax:flex justify-center ">
              <Link href={card?.field_links[0]?.uri || "#"}>
                <button
                  className="w-[200px] h-[55px] 
    bg-gradient-to-r from-[#4FC0FF] to-[#5DE29B]
    text-[#003350] text-[18px] font-bold rounded-[171px] mb-[30px]"
                >
                  {card?.field_links[0]?.title}
                </button>
              </Link>
            </div>

            <div className="flex flex-col betweenMobileTab:flex-row desktop:flex-row items-center gap-[30px] mt-[0px] betweenMobileTab:mt-[100px] aboveLaptop:mt-[100px] desktop:mt-[150px] z-[1]">
              <div>
                <img
                  className="hidden betweenMobileTab:block desktop:block w-[257px] h-[197px]"
                  src={`${config.apiBase}${card?.field_icon?.uri?.url}`}
                  alt=""
                />
              </div>

              <div>
                <img
                  className="hidden mobileMax:block"
                  src={`${config.apiBase}${card?.field_icon?.uri?.url}`}
                  alt=""
                />
              </div>

              <div className="max-w-[920px] w-full">
                <div
                  className="text-[18px] text-white mobileMax:mt-[10px] [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mt-2"
                  dangerouslySetInnerHTML={{
                    __html: card?.field_description?.processed,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
