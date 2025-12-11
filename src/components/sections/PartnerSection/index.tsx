"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PartnerSlider from "./PartnerSlider";
import PartnerList from "./PartnerList";

interface ClientProps {
  data: any;
}

function PartnerSection({ data }: ClientProps) {
  return (
    <div className="relative overflow-hidden bg-[#eeeff8] py-[120px] betweenMobileTab:py-16 mobileMax:py-10">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 2.8,
        }}
        className="absolute right-0 top-[200px] top:0 pointer-events-none max-w-[15%] betweenMobileTab:max-w-[25%] mobileMax:max-w-[30%]"
      >
        <Image
          src="/static/images/partner-clip.png"
          alt="get-inv-home"
          className="opacity-70 mobileToDesk:opacity-40 w-full h-auto"
          width={300}
          height={300}
          priority
        />
      </motion.div>
      <div className="relative overflow-x-hidden">
        <div className={`relative z-[2]`}>
          <div className="mini-container relative z-[2]">
            <motion.h3
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-poppins text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] font-semibold desktop:text-[48px]
								leading-normal text-center text-[48px] mobileMax:text-[28px] mobileMax:px-0 mb-2"
            >
              {data?.field_title || "Our Partners"}
            </motion.h3>

            <div
              className="text-[16px] list-disc text-normalText text-center font-poppins mb-[40px] mobileMax:mb-6 leading-8 mobileMax:text-xsmall mobileMax:leading-normal"
              dangerouslySetInnerHTML={{
                __html: data?.field_description?.processed || "",
              }}
            />
          </div>

          {data?.field_partners_type === "rows" ? (
            <PartnerList data={data?.field_add_partner || []} />
          ) : (
            <PartnerSlider
              isHomePage
              sliderData={
                (data?.field_add_partner
                  ? data?.field_add_partner
                  : data?.sort((a: any, b: any) =>
                      a.title.localeCompare(b.title)
                    )) || []
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PartnerSection;
