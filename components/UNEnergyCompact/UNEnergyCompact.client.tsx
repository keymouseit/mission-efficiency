"use client";

import { motion } from "framer-motion";

interface UNEnergyCompactProps {
  data?: {
    value?: string;
  };
}

function UNEnergyCompactClient({ data }: UNEnergyCompactProps) {
  return (
    <section
      id="UN-energy-compact"
      className="pb-20 pt-5 mobileMax:pt-0 relative mobileMax:pb-[80px] bg-white overflow-hidden"
    >
      {/* Background Decoration */}
      <motion.div className="absolute pointer-events-none opacity-40 max-w-[15%] top-[50%] left-0 !-translate-y-1/2 betweenMobileTab:max-w-[40%] mobileMax:max-w-[40%]">
        <img
          src="/static/images/cta-section-bg.svg"
          alt="UN energy section background"
          className="w-full h-full"
        />
      </motion.div>

      {/* Content */}
      <div className="mini-container relative z-[1]">
        {data?.value && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation pt-[82px] text-medium text-[#545D6F] --font-poppins leading-8 global-ambition-text mobileMax:text-xsmall mobileMax:leading-normal"
            dangerouslySetInnerHTML={{ __html: data.value }}
          />
        )}
      </div>
    </section>
  );
}

export default UNEnergyCompactClient;
