"use client";
import React from "react";
import { motion } from "framer-motion";

const testimonial = [
  {
    title: "dan dan",
    field_content: {
      value:
        "<p>As company and organizational partners, we urge national and sub-national governments to commit to energy efficiency by having an active energy efficiency action plan, by including high ambition for energy efficiency in the Nationally Determined Contributions and/or having UN Energy Compact with energy efficiency commitments.</p>",
      processed:
        "<p>As company and organizational partners, we urge national and sub-national governments to commit to energy efficiency by having an active energy efficiency action plan, by including high ambition for energy efficiency in the Nationally Determined Contributions and/or having UN Energy Compact with energy efficiency commitments.</p>",
    },
  },
];

const Testimonial = () => {
  return (
    <div className="pt-[60px] pb-[100px] bg-mapGray relative z-[2] mobileMax:pt-5  mobileMax:pb-14 betweenMobileTab:pb-24 betweenMobileTab:pt-[60px] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 2.8,
        }}
        className="absolute pointer-events-none left-0 z-[1] bottom-0"
      >
        <img
          src="/static/images/cta-section-bg.svg"
          alt="overlay-bg"
          className="mobileMax:opacity-40 w-[80%] mobileMax:w-[40%]"
        />
      </motion.div>
      <div className="mini-container relative z-[1]">
        {testimonial?.map((testimonialData: any, index: number) => {
          return (
            <>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation mt-24 mobileMax:mt-12 remove-animation-fluctuation"
              >
                <div
                  className="Cta-testomonial --font-poppins font-medium text-[24px] italic text-center text-[#545d6f] leading-8 mb-8 resources-links mobileMax:text-xsmall mobileMax:leading-normal relative"
                  dangerouslySetInnerHTML={{
                    __html: testimonialData?.field_content.processed,
                  }}
                />
                <h6 className="text-numans text-right font-semibold text-[32px] uppercase italic category-gradient text-clip mobileMax:text-xsmall leading-normal pr-2">
                  - {testimonialData.title}
                </h6>
              </motion.div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonial;
