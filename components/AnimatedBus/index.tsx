"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import DynamicImage from "../ResuableDynamicImage";

const AnimatedBus = () => {
  const { scrollYProgress } = useScroll();
  const moveValue = useTransform(() => scrollYProgress.get() * 4000);

  return (
    <motion.div style={{ left: moveValue }} className="relative">
      <DynamicImage
        width={110}
        height={52}
        src="/static/images/banner-bus.svg"
        alt="bus-bg"
      />
    </motion.div>
  );
};

export default AnimatedBus;
