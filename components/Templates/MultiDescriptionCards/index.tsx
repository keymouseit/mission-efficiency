"use client";
import React from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';

interface templateCards {
    multiCards: any;
  }

const MultiDescriptionCards:React.FC<templateCards> = ({multiCards}) => {
  return (
    <div className="flex justify-start flex-wrap box-border">
    {multiCards?.map(
      (cards: any, index: number) => {
        return (
          <motion.div
            key={index}
            className="remove-animation-fluctuation desktop:px-[15px] mb-[30px] w-[33%] mobileMax:px-0 betweenMobileTab:px-[10px] lieTablets:w-[50%] mobileMax:w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
          >
            <div className="h-full border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white px-4 py-[25px] flex items-center flex-col box-border w-full card-shadow">
              {cards?.imageUrl && <div className="mb-[23px] max-h-[120px] min-h-[120px] flex justify-center items-center overflow-hidden mobileMax:max-h-[60px] mobileMax:min-h-[60px] mobileMax:mb-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${cards?.imageUrl}`}
                  alt="category img"
                  width={120}
                  height={100}
                  className="w-full object-cover"
                />
              </div>}
              <div className="h-full w-full">
                <h4 className="--font-poppins text-center desktop:text-[27px] mb-2 text-landingBlue leading-normal capitalize --font-poppins text-medium">
                  {cards?.title}
                </h4>
                {cards?.field_content?.processed && <div
                  className="--font-poppins text-center text-small text-[#7b99c7] leading-6 --font-poppins line-clamb-6 mobileMax:leading-normal mobileMax:text-xsmall  line-clamp-5"
                  dangerouslySetInnerHTML={{
                    __html: cards?.field_content?.processed,
                  }}
                />}
              </div>
            </div>
          </motion.div>
        );
      }
    )}
  </div>
  )
}

export default MultiDescriptionCards