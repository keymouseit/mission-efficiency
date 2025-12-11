"use client";

import { DrupalNode } from "next-drupal";
import Image from "next/image";
import { motion } from "framer-motion";
import { config } from "@/lib/config";
import { MdChevronRight } from "react-icons/md";
import Link from "next/link";
import { resolveLink } from "@/utils";

interface CardProps {
  data: DrupalNode;
}

export default function BasicCard({ data }: CardProps) {
  const isStepperCard = data?.field_card_ui_types === "step_title_description";

  return (
    <motion.div className="bg-mapGray relative py-[120px] betweenMobileTab:py-16 mobileMax:py-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 2.8,
        }}
        className="absolute right-[0px] top-[400px] pointer-events-none max-w-[15%] betweenMobileTab:max-w-[45%] mobileMax:max-w-[50%]"
      >
        <img
          src="/static/images/demand-flexiblity-bg-2.svg"
          alt="get-inv-home"
          className="opacity-60 mobileMax:opacity-50"
        />
      </motion.div>
      <div className="mini-container z-[2] relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation"
        >
          <h3 className="max-w-[880px] mx-auto mobileMax:text-center text-center text-[42px] font-poppins mb-2 mobileMax:mb-8 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip mobileMax:text-[28px]">
            {data?.field_title}
          </h3>
          <div
            className="max-w-[880px] mx-auto mobileMax:order-3 mobileMax:mb-5 text-center text-small !text-[#828282] font-poppins font-normal mobileMax:text-xsmall leading-normal"
            dangerouslySetInnerHTML={{
              __html: data?.field_description?.processed || "",
            }}
          />
          <motion.div
            className={`mt-[80px] mobileMax:mt-[40px] mx-auto remove-animation-fluctuation gap-[30px]  
              ${
                isStepperCard
                  ? "grid grid-cols-3 betweenMobileTab:grid-cols-2 mobileMax:grid-cols-1"
                  : "flex items-stretch flex-wrap"
              } desktop:max-w-[1000px]"
              } `}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            {data?.field_add_card?.map((card: any, index: number) => {
              const isLastOdd =
                index === (data?.field_add_card).length - 1 &&
                (data?.field_add_card).length % 2 !== 0;

              const cardVariants = {
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.3 * index},
                },
              };

              return (
                <motion.div
                  key={card.id || index}
                  whileHover={{ scale: 1.05 }}
                  variants={cardVariants}
                  className={`min-h-[300px] bg-[linear-gradient(to_top,#003350,#48DBB2)] cursor-pointer  hover:shadow-2xl transition-transform duration-700 p-[40px]
                    ${
                      isLastOdd
                        ? "w-full"
                        : isStepperCard
                        ? "w-[calc(33%-20px)] mobileMax:w-full mini-container !px-[25px] py-[20px] desktop:!py-[43px]"
                        : "w-[calc(50%-15px)] mobileMax:w-full "
                    } ${
                    isStepperCard ? "rounded-[20px]" : "rounded-[47px]"
                  } flex`}
                >
                  <div
                    className={`flex flex-col flex-1 ${
                      isStepperCard ? "justify-between" : "justify-start"
                    }`}
                  >
                    {card.field_icon?.uri?.url && (
                      <div className="h-[80px] flex items-end justify-center mb-4">
                        <Image
                          src={`${config.apiBase}${card.field_icon.uri.url}`}
                          alt={card.title || card.field_title || "Card icon"}
                          width={64}
                          height={64}
                          className="mx-auto block mobileMax:w-[60px] mobileMax:object-contain"
                        />
                      </div>
                    )}

                    {isStepperCard && (
                      <div className="min-h-[85px] min-w-[85px] rounded-full overflow-hidden flex items-center justify-center mb-3 mobileMax:min-h-[55px] mobileMax:min-w-[55px]">
                        <div
                          className="flex items-center justify-center border-[4px] border-white text-numans text-center text-[35px] rounded-full overflow-hidden min-h-[70px] min-w-[70px] mobileMax:min-h-[45px]
                                                      mobileMax:min-w-[45px] font-bold  leading-10 --font-poppins mobileMax:text-medium mobileMax:leading-7"
                        >
                          <p className="text-white text-[40] font-semibold">
                            {index + 1}
                          </p>
                        </div>
                      </div>
                    )}

                    <h4
                      className={`${
                        isStepperCard ? "text-[22px]" : "text-[32px]"
                      } text-center font-poppins mb-3 font-bold leading-9 text-white mobileMax:text-[18px]`}
                    >
                      {card.field_title}
                    </h4>
                    <div
                      className={`${
                        isStepperCard ? "text-[16px]" : "text-[18px]"
                      } text-center text-[#FFF6F6] leading-normal font-medium font-poppins mobileMax:text-sm ${
                        isStepperCard ? "line-clamp-4" : ""
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: card.field_description?.processed || "",
                      }}
                    />

                    {isStepperCard && card?.field_links?.length > 0 && (
                      <Link
                        href={resolveLink(card.field_links[0]?.uri) || "#"}
                        target="_blank"
                        className="--font-poppins text-small text-white mt-[20px] leading-6 flex items-center justify-center cursor-pointer mobileMax:text-xsmall"
                      >
                        {card.field_links[0]?.title}
                        <MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
