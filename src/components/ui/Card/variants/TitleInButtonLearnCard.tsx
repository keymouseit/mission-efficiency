"use client";

import { DrupalNode } from "next-drupal";
import Image from "next/image";
import { motion } from "framer-motion";
import { config } from "@/lib/config";
import Link from "next/link";
import { resolveLink } from "@/utils";

interface CardProps {
  data: DrupalNode;
}

export default function TitleInButtonLearnCard({ data }: CardProps) {
  return (
    <div className="relative">
      <div className="bg-white py-[120px] betweenMobileTab:py-16 mobileMax:py-10 overflow-hidden mini-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation"
        >
          <h3 className="bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip text-[32px] font-semibold text-center mb-[15px] mobileMax:text-[24px] leading-tight">
            {data?.field_title}
          </h3>

          <p
            dangerouslySetInnerHTML={{
              __html: data?.field_description?.processed,
            }}
            className="text-[16px] text-[#828282] font-poppins mb-[40px] mobileMax:mb-6 leading-8 mobileMax:text-[14px] mobileMax:leading-normal text-center"
          />
        </motion.div>

        <motion.div
          className="remove-animation-fluctuation minMobile:flex minMobile:flex-col minMobile:items-center flex items-start justify-center betweenMobileTab:gap-[55px] gap-[70px] flex-wrap mt-[59px] mobileMax:gap-[30px] mobileMax:mt-[40px] mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.8,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {data?.field_add_card?.map((feature: any, idx: number) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center w-[19%] tablet:w-[30%] mobileToDesk:w-[45%] mobileMax:w-full mb-6"
              variants={{
                hidden: { opacity: 0, y: idx % 2 === 0 ? -40 : 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                    mass: 0.7,
                  },
                },
              }}
            >
              {idx % 2 === 0 ? (
                <>
                  <div className="flex items-center flex-col w-full">
                    <Image
                      src={`${config.apiBase}${feature?.field_icon?.uri?.url}`}
                      alt="grid-img"
                      width={90}
                      height={150}
                      className="mx-auto"
                    />
                  </div>

                  <button
                    className="mt-[10px] w-[256px] font-poppins bg-[linear-gradient(to_left,#5DE29B,#003350)] flex items-center justify-center cursor-default
                !text-white text-[16px] font-bold min-h-[53px]
                rounded-[123px] !no-underline mobileMax:text-[14px] mobileMax:w-[220px] text-center"
                  >
                    {feature.field_title}
                  </button>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: feature.field_description?.processed || "",
                    }}
                    className="text-[16px] text-[#828282] font-poppins font-medium mt-[23px] w-[290px] mobileMax:w-full mobileMax:text-[14px]"
                  />
                </>
              ) : (
                <>
                  <button
                    className="mt-[26px] w-[256px] font-poppins bg-[linear-gradient(to_left,#5DE29B,#003350)] flex items-center justify-center cursor-default
                !text-white text-[16px] font-bold min-h-[53px]
                rounded-[123px] !no-underline mobileMax:text-[14px] mobileMax:w-[220px] text-center"
                  >
                    {feature.field_title}
                  </button>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: feature.field_description?.processed || "",
                    }}
                    className="text-[16px] text-[#828282] font-poppins font-medium mt-[23px] w-[290px] mobileMax:w-full mobileMax:text-[14px]"
                  />

                  <div className="flex items-center flex-col w-full mt-[10px]">
                    <Image
                      src={`${config.apiBase}${feature?.field_icon?.uri?.url}`}
                      alt="grid-img"
                      width={90}
                      height={150}
                      className="mx-auto"
                    />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
          }}
          className="flex items-center justify-center mt-[100px] mobileMax:mt-[50px]"
        >
          <Link
            href={resolveLink(data?.field_button_link?.uri) || "#"}
            className="flex justify-center items-center bg-[linear-gradient(to_right,#48DBB2,#003350)] text-[16px] text-white w-[211px] h-[50px] rounded-[10px] mobileMax:w-[180px] mobileMax:text-[14px]"
          >
            {data?.field_button_link?.title}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
