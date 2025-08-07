"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface CardSectionProps {
  data: DrupalNode;
}
const GetInvolvedCardWithoutTitle = ({ data }: CardSectionProps) => {
  const [isOpenJoinCardList, setIsOpenJoinCardList] = useState<number | null>(
    null
  );
  const listVariant = {
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut", staggerChildren: 0.1 },
    },
    hidden: { opacity: 0 },
  };

  const itemVariant = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    hidden: { opacity: 0, y: 50 },
  };

  return (
    <div>
      <div className="mini-container">
        <div className="pb-[350px] flex flex-wrap justify-start box-border mobileMax:mt-6">
          {data?.field_add_card?.length > 0 && (
            <div className="grid grid-cols-1 tab:grid-cols-2 laptop:grid-cols-3 gap-5 mt-10 w-full">
              {data.field_add_card.map((dropdownCard: any, index: number) => (
                <motion.div
                  key={dropdownCard.id || index}
                  className="remove-animation-fluctuation px-[15px] mb-[25px] w-full lieTablets:w-[50%] laptop:w-[100%] mt-2 mobileMax:px-0 mobileMax:mb-5 mobileMax:mt-0"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0 }}
                >
                  <div className="relative rounded-xl bg-white flex items-center border-2 border-[#ececec] flex-col box-border w-full card-shadow">
                    <h4 className="w-full flex items-center justify-center h-[100px] px-[15px] text-numans uppercase text-center text-[22px] text-lightBlue leading-normal mobileMax:text-medium font-semibold">
                      {dropdownCard?.field_title}
                    </h4>

                    <div
                      className={`absolute bottom-[-15px] ${
                        isOpenJoinCardList === index ? "z-[99]" : "z-[1]"
                      } left-1/2 -translate-x-1/2`}
                    >
                      <motion.div
                        animate={
                          isOpenJoinCardList === index
                            ? { x: 0, y: 0 }
                            : { x: 0, y: [-5, 5, -5] }
                        }
                        transition={
                          isOpenJoinCardList === index
                            ? {}
                            : {
                                duration: 2,
                                ease: "easeInOut",
                                repeat: Infinity,
                              }
                        }
                        className="cursor-pointer card-shadow visit-site-btn text-white w-[35px] h-[35px] rounded-full flex items-center justify-center"
                        onClick={() =>
                          setIsOpenJoinCardList(
                            isOpenJoinCardList === index ? null : index
                          )
                        }
                      >
                        {isOpenJoinCardList === index ? (
                          <FaAngleUp className="text-[30px]" />
                        ) : (
                          <FaAngleDown className="text-[30px]" />
                        )}
                      </motion.div>
                    </div>

                    {isOpenJoinCardList === index && (
                      <motion.div className="list p-5 w-full absolute z-[4] card-shadow left-0 top-[103%] border-2 border-[#ececec] bg-white rounded-xl">
                        <motion.ul
                          initial="hidden"
                          animate="visible"
                          variants={listVariant}
                          className="pl-3 blue-bullets"
                        >
                          <motion.li variants={itemVariant}>
                            <div
                              className="cursor-pointer underline text-left select-none block --font-poppins text-[18px] mb-3 leading-normal text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
                              dangerouslySetInnerHTML={{
                                __html:
                                  dropdownCard?.field_description?.processed ||
                                  "",
                              }}
                            />
                          </motion.li>
                        </motion.ul>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetInvolvedCardWithoutTitle;
