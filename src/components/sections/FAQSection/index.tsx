"use client";

import { CommonFaqAccordion } from "@/components/ui/Accordion";
import { resolveLink } from "@/utils";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import { BsDownload } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";

interface FAQProps {
  data: DrupalNode;
}

export default function FAQSection({ data }: FAQProps) {
  return (
    <div
      className={`${
        data?.field_background_color === "gray"
          ? "bg-[#ecedf6]"
          : "bg-[#003350]"
      } relative py-[120px] betweenMobileTab:py-16 mobileMax:py-10 overflow-hidden`}
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          duration: 2.5,
        }}
        className="absolute pointer-events-none bottom-[-50px] left-[-40px] z-[0] max-w-[30%] betweenMobileTab:max-w-[60%] mobileMax:max-w-[80%]"
      >
        <img
          src="/static/images/demand-flexiblity-bg-3.svg"
          alt="overlay-bg"
          className="opacity-70 betweenMobileTab:opacity-50 mobileMax:opacity-50 w-full"
        />
      </motion.div>
      <div className="mini-container z-[2] relative faq-section w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation"
        >
          <h3
            className={`${
              data?.field_background_color === "gray"
                ? "bg-gradient-to-r from-[#48DBB2] to-[#003350] bg-clip-text text-transparent text-clip"
                : "!text-[#48DBB2]"
            } text-[42px] font-poppins text-center font-semibold leading-normal mobileMax:text-[28px] mb-[50px] mobileMax:mb-[30px]`}
          >
            {data?.field_title}
          </h3>

          {data?.field_description && (
            <p
              className={`text-[16px] font-poppins mobileMax:text-center mb-[40px] mobileMax:mb-6 leading-normal mobileMax:text-xsmall !text-[#828282]`}
              dangerouslySetInnerHTML={{
                __html: data?.field_description?.processed,
              }}
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation w-full mb-[60px] mobileMax:mb-[25px]"
        >
          <div>
            {data?.field_add_question?.map((faq: any, index: number) => (
              <Link
                key={index}
                className="Faq-text cursor-pointer banner-greadient flex justify-between items-center gap-5 px-[47px] py-[23px] rounded-[20px] mb-[25px] mobileMax:px-[20px] mobileMax:py-[15px] mobileMax:mb-5 text-[21px] font-semibold text-[#003350] font-poppins leading-normal hover:no-underline text-left mobileMax:text-xsmall"
                href={`${resolveLink(faq?.uri)}#${faq?.title
                  ?.toLowerCase()
                  ?.replace(/\s+/g, "-")}`}
              >
                {faq?.title}
                <FaChevronRight className="ml-2 text-medium text-[#003350]" />
              </Link>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="remove-animation-fluctuation flex flex-col w-full items-center justify-center gap-[22px] p-0 mobileMax:flex-col mobileMax:w-full mobileMax:gap-[15px]"
        >
          {data?.field_add_section?.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="remove-animation-fluctuation flex flex-col w-full gap-[22px] p-0 mobileMax:flex-col mobileMax:w-full mobileMax:gap-[15px]"
            >
              {section?.field_title && (
                <h3
                  className={`${
                    data?.field_background_color === "gray"
                      ? "bg-gradient-to-r from-[#48DBB2] to-[#003350] bg-clip-text text-transparent text-clip"
                      : "!text-[#48DBB2]"
                  } text-[42px] font-poppins text-left mobileMax:text-center font-semibold leading-normal mobileMax:text-[28px] mb-[30px] mobileMax:mb-[30px]`}
                >
                  {section?.field_title}
                </h3>
              )}

              {data?.field_question_type === "with_link_only" ? (
                section?.field_add_question?.map((btn, index) => (
                  <Link
                    key={index}
                    href={resolveLink(btn?.field_question_link)}
                    target="_self"
                    className="flex items-center justify-between py-[23px] font-poppins font-[600] !text-[#003350] text-xmedium min-h-[63px] rounded-[20px] hover:!underline mobileMax:min-w-full mobileMax:w-full mobileMax:text-small bg-gradient-to-r from-[#48DBB2] to-[#A0DDFF] px-[47px]"
                  >
                    {btn?.field_question}
                    {btn?.field_question.toLowerCase().includes("download") ? (
                      <BsDownload className="ml-2 text-odd" />
                    ) : (
                      <FaChevronRight className="ml-2 text-xmedium" />
                    )}
                  </Link>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0,
                  }}
                  className="remove-animation-fluctuation w-full"
                >
                  <CommonFaqAccordion faqs={section?.field_add_question} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {data?.field_links?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="remove-animation-fluctuation flex items-center justify-center gap-[22px] p-0 mobileMax:flex-col mobileMax:w-full mobileMax:gap-[15px] mt-[60px] mobileMax:mt-[25px]"
        >
          {data?.field_links?.map((link: any, idx: number) => (
            <Link
              key={idx}
              href={resolveLink(link?.uri)}
              target="_blank"
              className="flex items-center justify-center min-w-[310px] font-poppins font-[600] !text-[#11055F] text-xmedium min-h-[63px] rounded-lg hover:!underline mobileMax:min-w-full mobileMax:w-full mobileMax:text-small bg-gradient-to-r from-[#48DBB2] to-[#A0DDFF]"
            >
              {link?.title}
              {link?.title?.toLowerCase().includes("download") ? (
                <BsDownload className="ml-2 text-odd" />
              ) : (
                <MdChevronRight className="ml-2 text-[30px]" />
              )}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
