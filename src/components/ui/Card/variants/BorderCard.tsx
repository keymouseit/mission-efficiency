"use client";
import { config } from "@/lib/config";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Image from "next/image";

interface CardProps {
  data: DrupalNode;
}

function BorderCard({ data }: CardProps) {
  return (
    <>
      {data?.field_title_position !== "left" ? (
        <motion.div className="bg-skyBg relative py-[120px] betweenMobileTab:py-16 mobileMax:py-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 2.8,
            }}
            className="absolute right-[-60px] top-[400px] pointer-events-none max-w-[15%] betweenMobileTab:max-w-[45%] mobileMax:max-w-[50%]"
          >
            <img
              src="/static/images/homepage-bg-1.png"
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
              className="remove-animation-fluctuation "
            >
              <h3 className="mx-auto mobileMax:text-center text-center text-[42px] font-poppins mb-2 mobileMax:mb-8 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip mobileMax:text-[28px]">
                {data?.field_title}
              </h3>
              <motion.div
                className="mt-[70px] mobileMax:mt-[40px] mx-auto remove-animation-fluctuation flex flex-wrap items-stretch gap-[20px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
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
                  const totalCards = data?.field_add_card?.length || 0;
                  const isLastOdd =
                    index === totalCards - 1 && totalCards % 2 !== 0;

                  return (
                    <motion.div
                      key={card.id || index}
                      className={`min-h-[300px] p-[20px] rounded-2xl flex justify-center items-stretch bg-[#003350] transition-transform duration-500 ease-in-out
					will-change-transform transform-gpu gro
					hover:scale-[1.03] group-hover:shadow-lg
				${isLastOdd ? "w-full" : "w-[calc(50%-15px)] mobileMax:w-full"}`}
                    >
                      {/* Inner wrapper — this scales smoothly */}
                      <div
                        className="group relative flex-1 rounded-2xl border-2 border-[#48DBB2] 
					bg-[linear-gradient(0deg,#1b7375_0%,#003350_40%)]
					overflow-hidden
					"
                        style={{ transformOrigin: "center center" }}
                      >
                        {/* Actual content — stays stable, not scaled directly */}
                        <div className="flex flex-col justify-start items-center p-5 h-full">
                          {/* Image section */}
                          {card.field_icon?.uri?.url && (
                            <div className="h-[80px] flex items-end justify-center mb-4 shrink-0">
                              <Image
                                src={`${config.apiBase}${card.field_icon.uri.url}`}
                                alt={
                                  card.title || card.field_title || "Card icon"
                                }
                                width={index === 0 ? 40 : 64}
                                height={index === 0 ? 48 : 64}
                                className={`mx-auto block mobileMax:object-contain ${
                                  index === 0
                                    ? "w-[40px] h-[48px]"
                                    : "w-[64px] h-[64px]"
                                }`}
                              />
                            </div>
                          )}

                          {card.img && (
                            <div className="h-[80px] flex items-end justify-center mb-4 shrink-0">
                              <Image
                                src={card.img}
                                alt={card.title}
                                width={64}
                                height={64}
                                className="mx-auto block mobileMax:w-[60px] mobileMax:object-contain"
                              />
                            </div>
                          )}

                          {/* Title */}
                          <h4 className="text-[22px] text-center font-poppins mb-3 font-bold leading-normal text-white mobileMax:text-[18px]">
                            {card.field_title || ""}
                          </h4>

                          {/* Description */}
                          <div
                            className="text-base text-center text-[#FFF6F6] bold-font-description leading-normal font-medium font-poppins mobileMax:text-sm"
                            dangerouslySetInnerHTML={{
                              __html: card.field_description?.processed || "",
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div className="bg-[#f9f9f9] relative py-[120px] betweenMobileTab:py-16 mobileMax:py-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              duration: 2.5,
            }}
            className="absolute pointer-events-none top-[120px] left-[0px] z-[0] max-w-[15%] betweenMobileTab:max-w-[40%] mobileMax:max-w-[40%]"
          >
            <Image
              src="/static/images/key-clip.png"
              alt="overlay-bg"
              width={600}
              height={600}
              className="opacity-70 betweenMobileTab:opacity-30 mobileMax:opacity-30 w-full"
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
              className="remove-animation-fluctuation "
            >
              <h3 className="mx-auto text-left text-[32px] font-poppins mb-[42px] mobileMax:mb-8 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#013451)] text-clip mobileMax:text-[28px]">
                {data?.field_title}
              </h3>
              <motion.div
                className="mx-auto remove-animation-fluctuation betweenMobileTab:grid-cols-2 grid grid-cols-3 mobileMax:grid-cols-1 items-stretch gap-[22px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.3,
                      delayChildren: 0.3,
                    },
                  },
                }}
              >
                {data?.field_add_card?.map((card) => (
                  <motion.div
                    key={card.id}
                    className="min-h-[300px] p-[20px] rounded-2xl flex justify-center items-stretch bg-[#003350] transition-transform duration-500 ease-in-out will-change-transform transform-gpu hover:scale-[1.03] group-hover:shadow-lg w-full"
                  >
                    <div className="group relative flex-1 border-2 border-[#48DBB2] bg-[linear-gradient(0deg,#1b7375_0%,#003350_40%)] overflow-hidden">
                      <div className="flex flex-col justify-start items-center p-8 py-[60px] h-full">
                        <div className="h-[80px] flex items-end justify-center mb-4 shrink-0">
                          <Image
                            src={`${config.apiBase}${card.field_icon.uri.url}`}
                            alt={card.title || card.field_title || "Card icon"}
                            width={87}
                            height={87}
                            className="mx-auto block mobileMax:w-[60px] mobileMax:object-contain"
                          />
                        </div>
                        <h4 className="text-[22px] desktop:max-w-[195px] text-center font-poppins mb-3 font-bold leading-normal text-white mobileMax:text-[18px]">
                          {card.field_title || ""}
                        </h4>
                        <p
                          className="text-small text-center text-[#FFF6F6] leading-normal font-medium font-poppins mobileMax:text-sm"
                          dangerouslySetInnerHTML={{
                            __html: card.field_description?.processed || "",
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default BorderCard;
