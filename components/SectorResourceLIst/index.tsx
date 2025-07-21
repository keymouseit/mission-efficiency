import { DrupalNode } from "next-drupal";
import React from "react";
import PartnerCard from "../LandingWebsiteComponents/PartnersCard";
import { motion } from "framer-motion";

interface SectorResourceListProps {
  list: DrupalNode[];
}

const SectorResourceList: React.FC<SectorResourceListProps> = ({ list }) => {
  return (
    <>
      <div className="desktop:w-[70%] flex items-start flex-wrap w-full">
        {list?.map((listItem, index) => {
          const {} = listItem;
          return (
            <motion.div
              key={index}
              className="remove-animation-fluctuation px-[15px] mb-[30px] w-[50%] min-h-[255px] h-full mobileMax:px-0 mobileMax:w-full mobileMax:mb-5 box-border"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
            >
              <PartnerCard
                img={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${listItem?.field_image_icon?.uri?.url}`}
                title={listItem?.title}
                buttonText={listItem?.field_button_text}
                link={listItem?.field_link}
                isSupport={true}
              />
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default SectorResourceList;
