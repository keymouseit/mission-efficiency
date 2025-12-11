"use client";
import { DrupalNode } from "next-drupal";
import React from "react";
import { motion } from "framer-motion";
import Banner from "@/components/sections/Banner";
import { CommonFaqAccordion } from "@/components/ui/Accordion";

interface faqProps {
  data: DrupalNode[];
}

const FaqScreen: React.FC<faqProps> = ({ data }) => {
  // Function to get FAQ cards for a specific section
  const getFaqCards = (sectionData: DrupalNode) => {
    if (
      sectionData.field_country_faq_cards &&
      Array.isArray(sectionData.field_country_faq_cards)
    ) {
      return sectionData.field_country_faq_cards.map((faqCard: any) => ({
        question: faqCard.title || "",
        answer:
          faqCard.field_cta_faq_description?.processed ||
          faqCard.field_cta_faq_description?.value ||
          "",
      }));
    }
    return [];
  };

  return (
    <div className="pt-20 bg-white box-border">
      {/* Banner */}
      <Banner
        title={"Understanding Demand Flexibility"}
        subTitle="Frequently Asked Questions on Demand Flexibility"
        isRounded
        backgroundImg="/static/images/faq-banner-bg.webp"
      />

      {/* Dynamic FAQ Sections */}
      {data.map((section, index) => {
        const isEven = index % 2 === 0;
        const faqCards = getFaqCards(section);

        // Skip if no FAQ cards
        if (faqCards.length === 0) return null;

        return (
          <div
            key={section.id}
            id={section?.title?.toLowerCase()?.replace(/\s+/g, "-")}
            className={`${isEven ? "bg-[#003350]" : "bg-[#ecedf6]"} relative ${
              index === 0 ? "mt-[60px] mobileMax:mt-[30px]" : ""
            }  py-[120px] mobileMax:py-10 betweenMobileTab:py-16 overflow-hidden`}
          >
            <motion.div
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                duration: 2.5,
              }}
              className={`absolute pointer-events-none ${
                isEven
                  ? "top-[100px] betweenMobileTab:top-[100px] left-0 z-[0] max-w-[15%] betweenMobileTab:max-w-[40%] mobileMax:max-w-[40%]"
                  : "top-[90px] betweenMobileTab:top-[200px] mobileMax:top-[130px] right-0 max-w-[13%] betweenMobileTab:max-w-[30%] mobileMax:!max-w-[40%]"
              }`}
            >
              <img
                src={
                  isEven
                    ? "/static/images/faq-left-clip.png"
                    : "/static/images/faq-right-clip.png"
                }
                alt="overlay-bg"
                className="opacity-70 w-full"
              />
            </motion.div>
            <div className="mini-container z-[2] relative faq-section">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation mb-[70px] mobileMax:mb-[30px]"
              >
                <h3
                  className={`text-[42px] font-poppins text-center font-semibold leading-normal text-clip mobileMax:text-[28px] mb-2 ${
                    isEven
                      ? "text-transparent bg-clip-text bg-[#48DBB2]"
                      : "text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)]"
                  }`}
                >
                  {section.title}
                </h3>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation w-full"
              >
                <CommonFaqAccordion faqs={faqCards} />
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqScreen;
