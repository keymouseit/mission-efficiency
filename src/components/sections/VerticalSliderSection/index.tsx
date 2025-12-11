"use client";
import VerticalSlider from "@/components/ui/VerticalSlider";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";

interface SliderProps {
  data: DrupalNode;
}

function VerticalSliderSection({ data }: SliderProps) {
  return (
    <div className="py-[100px] betweenMobileTab:pt-16 betweenMobileTab:pb-24 bg-[#fff] relative">
      <div className="mini-container relative z-[2]">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[32px] mobileMax:text-[28px] font-semibold mobileMax:text-center text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)]"
        >
          {data?.field_title}
        </motion.h2>
        <VerticalSlider data={data?.field_add_card} />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 2.8,
        }}
        className="absolute -left-[90px] top-[40px] pointer-events-none max-w-[16%] betweenMobileTab:max-w-[40%] mobileMax:max-w-[40%]"
      >
        <img
          src="/static/images/india-mask-bg.png"
          alt="get-inv-home"
          className="opacity-60 mobileMax:opacity-50"
        />
      </motion.div>
    </div>
  );
}

export default VerticalSliderSection;
