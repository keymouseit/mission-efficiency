"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import CardSlider from "../CardSlider";

type NewsAndEventsSectionProps = {
  data?: DrupalNode;
  newsAndEventSlider?:DrupalNode[];
};

const  NewsAndEventsSection: React.FC<NewsAndEventsSectionProps> = ({
  data,
  newsAndEventSlider,
}) => {
  return (
    <>
      {newsAndEventSlider && newsAndEventSlider?.length > 0 && <div className="py-16 bg-mapGray mobileMax:py-10">
        <div className="mini-container">
          <motion.h3
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation desktop:text-[66px] desktop:leading-[85px] text-numans desktop:mb-[70px] text-center text-clip text-[48px] leading-[60px] mb-[50px] mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-8"
            style={{
              backgroundImage:
                "linear-gradient(282deg, #716ef8, #716ef8, #40abe7, #40abe7, #40c9e7)",
            }}
          >
            News & Events
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation mb-16 b-10 mobileMax:py-6"
          >
            <CardSlider
              latestSliderData={newsAndEventSlider}
              sliderData={data?.field_add_slide}
              sliderConfig={data?.field_slider_configuration}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation flex justify-center"
          >
            <Link
              href="/news"
              className="flex justify-center items-center get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg min-w-[200px] px-5"
            >
              View All News & Events
            </Link>
          </motion.div>
        </div>
      </div>}
    </>
  );
};

export default NewsAndEventsSection;
