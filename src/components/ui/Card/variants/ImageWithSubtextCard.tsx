"use client";

import { DrupalNode } from "next-drupal";
import { motion } from "framer-motion";
import { config } from "@/lib/config";
import Link from "next/link";

interface CardProps {
  data: DrupalNode;
}

export default function ImageWithSubtextCard({ data }: CardProps) {
  return (
    <div
      id="history"
      className="py-[120px] betweenMobileTab:py-16 mobileMax:py-10 bg-[#F2F5F6] relative"
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 2.8,
        }}
        className="absolute top-[350px] right-0  pointer-events-none 
               max-w-[15%] betweenMobileTab:max-w-[45%] mobileMax:max-w-[50%] 
               flex items-center justify-center"
      >
        <img
          src="/static/images/double-bg.svg"
          alt="get-inv-home"
          className=" mobileMax:opacity-50 -z-1"
        />
      </motion.div>
      <div className="mini-container">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation"
          >
            <h3 className="bg-clip-text bg-[linear-gradient(to_left,#003350_32%,#48DBB2_61%)] text-clip text-[32px] font-semibold text-center mb-[15px] mobileMax:text-[24px] leading-tight">
              {data?.field_title}
            </h3>

            <p
              dangerouslySetInnerHTML={{
                __html: data?.field_description?.processed || "",
              }}
              className="text-[18px] text-[#828282] font-poppins mb-[40px] mobileMax:mb-6 leading-8 mobileMax:text-[14px] mobileMax:leading-normal text-center"
            />
          </motion.div>
        </div>

        <div className="relative">
          <div className="flex flex-col items-end justify-center w-full px-4 absolute right-0 top-0">
            <h2 className="bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip text-[56px] betweenMobileTab:text-[30px] mobileMax:text-[28px] font-semibold">
              {data?.field_subtext[0]}
            </h2>

            <div
              className="h-[100px] mobileMax:h-[120px] border-t-4 border-l-4 border-transparent w-full max-w-[1158px] mobileMax:max-w-[87%] betweenMobileTab:max-w-[93%] betweenMdDesk:max-w-[95%]"
              style={{
                borderImage:
                  "linear-gradient(to right bottom, #48DBB2, #003350) 1",
                borderImageSlice: 1,
              }}
            ></div>
          </div>
        </div>

        <div
          className="
		grid 
		grid-cols-1 
		mobileMax:grid-cols-1 
		betweenMobileTab:grid-cols-1
		desktop:grid-cols-4 
		gap-[40px] 
		w-full mt-[240px] mobileMax:mt-[200px] betweenMobileTab:mt-[210px]"
        >
          {data?.field_add_card?.map((card: any, index: number) => {
            const lastIndex = data.field_add_card.length - 1;
            return (
                <Link href={card?.field_links?.[0]?.uri ? card?.field_links[0]?.uri : "#" } key={index} className="relative">
                  <div className={`flex gap-5 items-center ${index !== 0 ? 'mobileMax:mt-[120px] betweenMobileTab:mt-[120px]' : ''
                    }`}>
                    <h2 className="bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip text-[55px] betweenMobileTab:text-[65px] desktop:text-[65px] font-semibold">
                      {card?.field_card_chip_name}
                    </h2>
                    {index !== lastIndex && (
                      <div className="mobileMax:hidden betweenMobileTab:hidden block h-[5px] w-full bg-[linear-gradient(to_right,#48DBB2,#003350)]" />
                    )}
                  </div>

                  <div
                    className="w-full h-[339px] betweenMobileTab:h-[450px] overflow-hidden bg-cover bg-center shadow-lg relative hover:scale-105 transition-all ease-in-out duration-700"
                    style={{
                      backgroundImage: `url(${config.apiBase}${card.field_image?.uri?.url})`,
                    }}
                  >
                    <div className="absolute bottom-0 left-0 w-full h-[85%] bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                      <h3 className="text-[16px] betweenMobileTab:text-[18px] text-white font-semibold mb-2">
                        {card?.field_title}
                      </h3>
                      <p
                        className="text-sm text-white font-medium"
                        dangerouslySetInnerHTML={{
                          __html: card?.field_description?.processed || "",
                        }}
                      />
                    </div>
                  </div>

                  {index !== lastIndex && <div className=" desktop:hidden block h-[120px] w-[5px] bg-[linear-gradient(to_top,#48DBB2,#003350)] absolute -bottom-[150px] left-16 z-10" />}
                </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
