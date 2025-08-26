"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import DynamicImage from "../ResuableDynamicImage";
import FadeInWrapper from "../FadeInWrapper";

const AnimatedBus = () => {
  const { scrollYProgress } = useScroll();
  const moveValue = useTransform(() => scrollYProgress.get() * 4000);

  return (
    <FadeInWrapper style={{ left: moveValue as any }} className="relative">
      <DynamicImage
        width={110}
        height={52}
        src="/static/images/banner-bus.svg"
        alt="bus-bg"
      />
    </FadeInWrapper>
  );
};

export default AnimatedBus;
