"use client";

import { motion } from "framer-motion";

interface NDCsSectionProps {
  data?: {
    processed?: string;
  };
}

function NDCsSectionClient({ data }: NDCsSectionProps) {
  return (
    <section
      id="cta-ndc"
      className="bg-mapGray overflow-hidden z-[1] global-ambition-text pt-5 pb-[60px] relative mobileMax:pt-0 mobileMax:pb-[80px] betweenMobileTab:pb-12"
    >
      {/* Background Decoration */}
      <motion.div className="absolute top-[50%] opacity-20 !-translate-y-1/2 right-0 pointer-events-none max-w-[16%] betweenMobileTab:max-w-[38%] mobileMax:max-w-[38%]">
        <img
          src="/static/images/cta-blue-bg.svg"
          alt="background"
          className="rotate-180"
        />
      </motion.div>

      {/* Main Content */}
      <div className="mini-container h-full flex flex-col items-center justify-center relative z-[3]">
        {data?.processed && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation pt-[82px] text-medium text-[#545D6F] --font-poppins leading-8 mobileMax:text-xsmall mobileMax:leading-normal"
            dangerouslySetInnerHTML={{ __html: data.processed }}
          />
        )}
      </div>
    </section>
  );
}

export default NDCsSectionClient;
