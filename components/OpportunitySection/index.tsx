"use client";

import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import CategoryCard from "../LandingWebsiteComponents/CateogriesCard";

interface OpportunitySectionProps {
  data: DrupalNode;
}

export default function OpportunitySection({
  data,
}: OpportunitySectionProps): React.ReactElement {
  return (
    <div className="py-[60px] bg-mapGray mobileMax:py-10">
      <div className="mini-container">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="remove-animation-fluctuation px-5 mobileMax:px-0 desktop:text-[66px] desktop:leading-[85px] text-numans text-center category-gradient text-clip text-[48px] leading-[60px] mb-5 mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-5"
        >
          {data?.field_title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0 }}
          className="remove-animation-fluctuation text-lightBlueText mb-20 text-[22px] text-center mobileMax:text-small mobileMax:mb-8"
          dangerouslySetInnerHTML={{
            __html: data.field_description.processed || "",
          }}
        />

        <div className="flex flex-wrap justify-center box-border">
          {data?.field_add_card?.map((card: DrupalNode, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0 }}
              className="remove-animation-fluctuation px-[15px] mb-[30px] w-[33%] laptop:min-h-[255px] mobileMax:w-full mobileMax:px-0 home-category-card"
            >
              <CategoryCard
                img={`${"https://dev-mission.keymouseit.com"}${
                  card?.field_icon?.uri?.url || ""
                }`}
                title={card?.field_title}
                subTitle={card?.field_description?.value || ""}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
