"use client";

import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";

interface EnergyActivitiesProps {
  data: DrupalNode;
}

const EnergyActivities: React.FC<EnergyActivitiesProps> = ({ data }) => {
  return (
    <div className="w-full bg-[#ebf0f7]">
      <div className="mini-container z-[2] relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="remove-animation-fluctuation"
        >
          <motion.h3   className="text-clip support-gradient tracking-tight text-[35px] leading-normal mb-8 text-center text-numans mobileMax:text-[28px] mobileMax:mb-5">
            {data?.field_title}
          </motion.h3>

          <div className="flex flex-wrap justify-start box-border pb-14 mobileMax:mb-8">
            {data?.field_add_card?.map(
              (activityCard: DrupalNode, index: number) => (
                <motion.div
                  key={index}
                  className="remove-animation-fluctuation px-[15px] mb-[25px] w-[33%] lieTablets:w-[50%] mobileMax:w-full mt-2 mobileMax:px-0 mobileMax:mb-5 mobileMax:mt-0"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0 }}
                >
                  <div className="border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white p-5 h-full flex items-center flex-col box-border w-full card-shadow">
                    <h4 className="text-numans text-center text-[22px] mb-3 text-landingBlue leading-7 mobileMax:text-medium mobileMax:leading-7">
                      {activityCard?.field_title}
                    </h4>
                    <div
                      className="--font-poppins text-center text-small text-[#7b99c7] leading-6 mobileMax:text-xsmall mobileMax:leading-normal font-normal"
                      dangerouslySetInnerHTML={{
                        __html: activityCard.field_description.processed,
                      }}
                    />
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnergyActivities;
