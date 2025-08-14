"use client";
import { useOrigin } from "@/hooks/useOrigin";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import DynamicImage from "../ResuableDynamicImage";
import { DEV_PUBLIC_URL } from "@/services/api";

interface TrainingSectionProps {
  data: DrupalNode;
}

const TrainingSection: React.FC<TrainingSectionProps> = ({ data }) => {
  const origin = useOrigin();

  return (
    <div className="pt-[100px] pb-[90px] bg-white relative mobileMax:py-10 betweenMobileTab:py-12 overflow-hidden">
      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", duration: 3 }}
        className="absolute pointer-events-none top-[-55%] right-0 mobileMax:top-[-20%] betweenMobileTab:max-w-[67%] aboveLaptop:top-[-52%] lieTablets:top-[-36%] desktop:max-w-[46%]"
      >
        <DynamicImage
          width={769}
          height={1195}
          src="/static/images/training-bg.svg"
          alt="overlay-bg"
          className="w-full -h-full"
        />
      </motion.div>

      {/* Content */}
      <div className="mini-container relative z-[1] flex items-center justify-between mobileMax:flex-col">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 2.5 }}
          className="w-[50%] mobileMax:w-full mobileMax:order-2 mobileMax:mt-5"
        >
          <motion.h4 className="desktop:text-[55px] text-numans mb-6 tracking-tight leading-normal text-left multi-text text-clip text-[48px] mobileMax:text-[28px] mobileMax:mb-3">
            {data?.field_twi_title}
          </motion.h4>

          <motion.div
            dangerouslySetInnerHTML={{
              __html: data?.field_twi_description?.value,
            }}
            className="--font-poppins text-left text-medium text-cardText mb-4 leading-8 mobileMax:text-xsmall mobileMax:leading-normal"
          />

          <motion.div>
            <Link
              href={
                data?.field_twi_button[0]?.uri?.startsWith("internal:")
                  ? `${origin}${data.field_twi_button[0].uri.replace(
                      "internal:",
                      ""
                    )}`
                  : data?.field_twi_button[0]?.uri || "#"
              }
              className="h-[46px] rounded-md bg-buttonOverlay px-[30px] flex max-w-[160px] items-center justify-center text-[#0077e4] font-mediums --font-poppins text-xsmall hover:bg-blueHover"
            >
              {data?.field_twi_button[0]?.title}
            </Link>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 2.5 }}
          className="w-[50%] mobileMax:w-full mobileMax:order-1"
        >
          <motion.div
            className="max-h-[480px] rounded-[25px] overflow-hidden no-bottom-space"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 1.8 }}
          >
            <DynamicImage
              src={`${DEV_PUBLIC_URL}${data?.field_twi_image?.uri?.url}`}
              alt={`grid`}
              width={500}
              height={300}
              className="w-full h-full transform transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrainingSection;
