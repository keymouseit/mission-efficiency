"use client";

import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import PartnerCard from "../LandingWebsiteComponents/PartnersCard";
import { DEV_PUBLIC_URL } from "@/services/api";

interface SupportPartnersSectionProps {
  data: DrupalNode;
}

function Resources({ data }: SupportPartnersSectionProps) {
  return (
    <section
      id="pledge-align-and-support"
      className="pt-[120px] pb-[90px] relative bg-white mobileMax:py-12 betweenMobileTab:py-16 overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", duration: 2.5 }}
        className="remove-animation-fluctuation absolute top-[-20px] left-0 z-[0] pointer-events-none desktop:max-w-[30%] max-w-[70%] mobileMax:max-w-[95%] opacity-50 desktop:opacity-100 rotate-180"
      >
        <img
          src="/static/images/ewpartners-bg-2.svg"
          alt="left-bg"
          className="desktop:opacity-70 opacity-[0.6] rotate-180"
        />
      </motion.div>

      {/* Content container */}
      <div className="mini-container relative z-[1]">
        {/* Title */}
        {data?.field_resources_title && (
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0 }}
            className="remove-animation-fluctuation category-gradient text-clip desktop:text-[55px] desktop:mb-10 mt-0 leading-tight text-center text-numans text-[48px] mobileMax:text-[28px] betweenMobileTab:mb-8 mb-5"
          >
            {data?.field_resources_title}
          </motion.h3>
        )}

        {/* Partner Cards */}
        <div className="flex items-center flex-wrap pb-[25px] mobileMax:block transparent-cards-border invest-cards">
          {data?.field_resources_cards.map((card: any, index: any) => {
            const imageUrl =
              card?.field_image[0]?.uri?.url &&
              `${DEV_PUBLIC_URL}${card?.field_image[0]?.uri?.url}`;

            return (
              <motion.div
                key={`partner-${index}`}
                className="remove-animation-fluctuation px-[15px] w-[50%] finacial-card-alternate-border mobileMax:w-full pt-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
              >
                <PartnerCard
                  isTransparentCard={true}
                  img={imageUrl}
                  title={card?.field_resource_title ?? ""}
                  link={card?.field_link?.uri}
                  buttonText={card?.field_link?.title}
                />
                <div className="alternate-bottom-border" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Resources;
