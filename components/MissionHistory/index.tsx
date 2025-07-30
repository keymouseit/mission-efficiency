"use client";

import React from "react";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import HistoryCardSlider from "../LandingWebsiteComponents/HistoryCardSlider";
import HistorySlider from "../HistorySlider";

type MissionHistoryProps = {
  data: DrupalNode;
};

const MissionHistory: React.FC<MissionHistoryProps> = ({ data }) => {
  console.log(data, "datat");
  return (
    <div
      id="history"
      className="overflow-hidden pt-[100px] pb-10 bg-white betweenMobileTab:py-14 mobileMax:py-10"
    >
      <div className="mini-container">
        {data?.field_title && (
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation desktop:text-[66px] tracking-tight text-numans desktop:mb-[100px] desktop:leading-[85px] text-center history-title-gradient text-clip text-[48px] leading-normal mobileMax:text-[28px] mb-[50px] mobileMax:mb-5"
          >
            {data.field_title}
          </motion.h3>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="remove-animation-fluctuation flex items-start justify-between mobileMax:flex-col"
        >
          {data?.field_sub_title && (
            <motion.p className="w-[45%] text-clip tracking-tight support-gradient text-[35px] leading-[45px] mr-5 text-numans mobileMax:w-full mobileMax:text-medium mobileMax:leading-[28px] mobileMax:mr-0 mobileMax:mb-2">
              {data.field_sub_title}
            </motion.p>
          )}

          {data?.field_description.processed && (
            <motion.div
              className="w-[45%] --font-poppins text-medium mb-4 leading-8 text-[#545d6f] mobileMax:w-full mobileMax:text-xsmall mobileMax:leading-normal"
              dangerouslySetInnerHTML={{
                __html: data.field_description.processed,
              }}
            />
          )}
        </motion.div>

        <div className="pt-20 pb-10 history-card-wrapper mobileMax:py-6">
          <div className="pb-[50px]">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation text-xsmall text-[#a09a9a] tracking-[3.64px] pb-3 uppercase --font-poppins border-b border-[#6ea8ed]"
            >
              TIMELINE
            </motion.p>
          </div>

          {data?.field_slide && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0 }}
              className="remove-animation-fluctuation"
            >
              <HistorySlider sliderData={data.field_slide} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionHistory;
