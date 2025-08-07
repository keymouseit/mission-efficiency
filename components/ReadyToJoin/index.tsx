"use client";

import { DEV_PUBLIC_URL } from "@/services/api";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Image from "next/image";

interface ReadyToJoinProps {
  data: DrupalNode;
}

const ReadyToJoin: React.FC<ReadyToJoinProps> = ({ data }) => {
  const imageUrl = `${DEV_PUBLIC_URL}${data?.field_twi_image?.uri?.url || ""}`;

  return (
    <div className="w-full bg-[#ebf0f7] pt-5">
      <div className="mini-container z-[2] relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          id="joining-card"
          className="text-clip support-gradient tracking-tight text-[35px] leading-normal mb-8 text-center text-numans mobileMax:text-[28px] mobileMax:mb-5"
        >
          {data?.field_twi_title}
        </motion.div>

        {/* Ready to join cards */}
        <div className="flex flex-wrap justify-start box-border mt-12 pb-6 mobileMax:mt-6">
          <div className="flex items-center justify-between mb-14 mobileMax:mb-8 mobileToDesk:flex-col">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0 }}
              className="remove-animation-fluctuation w-[50%] mobileToDesk:w-full mobileToDesk:order-2 mobileToDesk:mr-0 mobileToDesk:mt-6 mr-12 elevate-list-view text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
              dangerouslySetInnerHTML={{
                __html: data?.field_twi_image_description.value || "",
              }}
            />

            {/* Image content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0 }}
              className="remove-animation-fluctuation w-[50%] mobileToDesk:w-full mobileToDesk:order-1"
            >
              <div className="h-full w-full rounded-[40px] mobileToDesk:rounded-[30px] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="Ready to move image"
                  height={350}
                  width={350}
                  unoptimized
                  objectFit="cover"
                  className="w-full h-full max-w-full max-h-[600px] mobileToDesk:max-h-full card-shadow rounded-[12px] object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyToJoin;
