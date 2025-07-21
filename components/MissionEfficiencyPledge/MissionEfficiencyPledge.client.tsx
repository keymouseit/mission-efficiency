"use client";

import { motion } from "framer-motion";

interface MissionEfficiencyPledgeProps {
  data?: {
    processed?: string;
  };
}

function MissionEfficiencyPledgeClient({ data }: MissionEfficiencyPledgeProps) {
  return (
    <section
      id="mission-efficiency-pledge"
      className="bg-footerbg overflow-hidden z-[1] cta-single-card pt-5 pb-[60px] relative mobileMax:pt-0 mobileMax:pb-[80px] betweenMobileTab:pb-12"
    >
      {/* Decorative Background */}
      <div className="absolute top-[52%] -translate-y-1/2 max-w-[14%] opacity-25 left-0 z-[-2] betweenMobileTab:max-w-[28%] mobileMax:max-w-[45%]">
        <img src="/static/images/cta-blue-bg.svg" alt="left-bg" />
      </div>

      {/* Content */}
      <div className="mini-container h-full flex flex-col items-center justify-center relative z-[3]">
        {data?.processed && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation pt-[82px] text-medium text-white --font-poppins leading-8 call-to-action-text mobileMax:text-xsmall mobileMax:leading-normal"
            dangerouslySetInnerHTML={{ __html: data.processed }}
          />
        )}
      </div>
    </section>
  );
}

export default MissionEfficiencyPledgeClient;
