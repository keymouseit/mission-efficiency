"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FiPlusCircle } from "react-icons/fi";

const field_flip_flop_cards = [
  {
    id: "7ffd6483-896e-44ba-89c8-6502a64b08f7",
    title: "Access to Energy",
    field_content:
      "<p>Energy efficiency can increase the services delivered by each kilowatt of electricity and improve energy access</p>",
    field_link:
      "https://www.iea.org/reports/multiple-benefits-of-energy-efficiency/energy-access",
    field_button_text: "Visit website",
  },
  {
    id: "example-id-1234-5678-9012-abcdef",
    title: "Clean Cooking Solutions",
    field_content:
      "<p>Improving cookstove technology can reduce household air pollution and improve health outcomes.</p>",
    field_link: "https://www.iea.org/reports/clean-cooking",
    field_button_text: "Learn more",
  },
];
const FlipFlopCards = () => {
  return (
    <div
      id="multiple-benefit"
      className="pt-20 pb-20 relative bg-white mobileMax:pt-10 mobileMax:pb-5"
    >
      <div className="mini-container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation category-gradient text-clip text-xlarge mb-[40px] mt-0 leading-tight text-center text-numans mobileMax:text-[28px] mobileMax:mb-5 betweenMobileTab:text-[42px]"
        >
          This the title of flipflop cards
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation --font-poppins text-medium text-center text-cardText leading-7 mb-20 mobileMax:text-xsmall mobileMax:leading-normal mobileMax:mb-10"
        >
          This the sub-title of flipflop cards
        </motion.p>
        <div className="flex items-center flex-wrap">
          {field_flip_flop_cards?.map((flipCard: any, index: number) => {
            return (
              <motion.div
                key={index}
                className="remove-animation-fluctuation px-[15px] mb-[30px] w-[25%] betweenMobileTab:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
              >
                <div className="flip-card relative">
                  <div className="px-2.5 py-10 relative min-h-[220px] cursor-pointer flip-flop-card-box">
                    <div className="card-front-flop rounded-[15px] px-2.5 py-10 h-full w-full absolute top-0 left-0 blueBg-gradient">
                      <p className="--font-poppins text-[27px] leading-normal text-[#9af9ff] text-center">
                        {flipCard?.title}
                      </p>
                      <FiPlusCircle className="absolute bottom-2 right-2.5 text-white text-[35px]" />
                    </div>
                    <div className="card-back-flop rounded-[15px] px-6 py-8 h-full w-full absolute top-0 left-0 blueBg-gradient flex flex-col">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: flipCard?.field_content,
                        }}
                        className="--font-poppins text-xsmall leading-normal text-white text-center mb-5 line-climp-6 h-full"
                      />
                      <Link
                        href={flipCard?.field_link}
                        className="--font-poppins text-center text-xsmall text-[#9af9ff] leading-6 flex items-center justify-center h-full"
                      >
                        <ExternalLink className="w-[16px] h-[16px] max-w-[16px] mr-2" />
                        {flipCard?.field_button_text}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlipFlopCards;
