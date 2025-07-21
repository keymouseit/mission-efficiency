"use client";
import { Button } from "@/components/ui/button";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface CommonBottomFooterProps {
  data: DrupalNode;
}

const CommonBottomFooter: React.FC<CommonBottomFooterProps> = ({
  data = {} as DrupalNode,
}) => {
  const { title = "", field_button_text = "", field_link = "" } = data;
  return (
    <motion.div className="pt-[125px] pb-[100px] bg-mapGray relative mobileMax:py-14 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0,
        }}
        className="remove-animation-fluctuation overflow-hidden mini-container relative z-[1]"
      >
        <motion.h2
          // initial={{ opacity: 0, y: 40 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // viewport={{once: true}}
          // transition={{
          // 	type: 'spring',
          // 	duration3,
          // }}
          className="category-gradient mb-[50px] text-numans font-normal text-xlarge tracking-tighter text-clip text-center betweenMobileTab:text-[52px] mobileMax:text-[28px]"
        >
          {title}
        </motion.h2>
        <motion.div
        // initial={{ opacity: 0, y: 40 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // viewport={{once: true}}
        // transition={{
        // 	type: 'spring',
        // 	duration3,
        // }}
        >
          <Link href={field_link}>
            <Button className="block mx-auto min-w-[220px] get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg">
              {field_button_text}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 90 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 2.8,
        }}
        className="absolute bottom-[2px] right-0 pointer-events-none max-w-[80%] aboveLaptop:max-w-[70%] desktop:opacity-100"
      >
        <img
          src="/static/images/get-inv-home.svg"
          alt="get-inv-home"
          className="desktopLg:opacity-100 opacity-50"
        />
      </motion.div>
    </motion.div>
  );
};

export default CommonBottomFooter;
