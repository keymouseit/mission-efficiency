import React from "react";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";

const CaseStudies = ({ data }: { data: DrupalNode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="bg-white">
      {/* Main Heading */}
      <div className="pt-20 pb-12 betweenMobileTab:pt-16 betweenMobileTab:pb-10 mobileMax:pt-10 mobileMax:pb-8">
        <div className="mini-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-[48px] font-bold font-poppins text-transparent bg-clip-text bg-[linear-gradient(to_right,#5DE29B,#263DA8)] text-clip betweenMobileTab:text-[36px] mobileMax:text-[28px]">
              {data?.field_title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Sections */}
      <div className="pb-16 betweenMobileTab:pb-12 mobileMax:pb-8">
        {data?.field_add_section?.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`${
              sectionIndex === 0
                ? "pb-16 betweenMobileTab:pb-12 mobileMax:pb-8"
                : "py-16 betweenMobileTab:py-12 mobileMax:py-8"
            }  ${
              sectionIndex % 2 === 0
                ? "bg-white"
                : "bg-gradient-to-br from-[#F8FFFE] to-[#E2F8F1]/30"
            }`}
          >
            <div className="mini-container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-10 mobileMax:mb-6 text-center"
              >
                <h2 className="text-[32px] font-semibold font-poppins text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] betweenMobileTab:text-[28px] mobileMax:text-[24px]">
                  {section?.field_title}
                </h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid gap-6 grid-cols-1 betweenMobileTab:grid-cols-2 desktop:grid-cols-4"
              >
                {section?.field_card_text?.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group relative rounded-[28px] border border-[#E2F8F1] bg-white shadow-[0px_10px_40px_rgba(0,51,80,0.08)] hover:shadow-[0px_14px_45px_rgba(0,51,80,0.12)] transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1"
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(135deg,rgba(72,219,178,0.12)_0%,rgba(0,51,80,0.12)_100%)]" />

                    {/* Content */}
                    <div className="relative z-[1] flex flex-col h-full p-6 mobileMax:p-5">
                      {/* Animated Line */}
                      <span className="inline-block w-[46px] h-[3px] rounded-full bg-[linear-gradient(to_right,#48DBB2,#003350)] mb-4 group-hover:w-[60px] transition-all duration-300" />

                      {/* Title */}
                      <h3 className="text-[18px] font-semibold font-poppins text-[#013451] leading-snug group-hover:text-[#003350] transition-colors duration-300 flex-grow">
                        {item}
                      </h3>
                    </div>

                    {/* Bottom Gradient Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[linear-gradient(to_right,#48DBB2,#003350)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
