"use client";
import { DrupalNode } from "next-drupal";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import Image from "next/image";
import { DEV_PUBLIC_URL } from "@/services/api";
import { useOrigin } from "@/hooks/useOrigin";

type TaskforceProps = {
  data: DrupalNode;
};

const Taskforce = ({ data }: TaskforceProps) => {
  const origin = useOrigin();

  return (
    <section id="TaskForces" className="pb-24 bg-[#ebf0f7]">
      <div className="mini-container">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation pt-[82px] desktop:text-[55px] text-numans mb-5 desktop:leading-[85px] category-gradient text-clip text-[48px] leading-normal mobileMax:text-[35px] mobileMax:mb-3 text-center"
        >
          {data?.field_title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation  --font-poppins mb-10 text-medium leading-8 text-lightBlueText mobileMax:w-full mobileMax:text-small mobileMax:mb-6 mobileMax:leading-normal text-center"
          dangerouslySetInnerHTML={{
            __html: data?.field_description?.processed || "",
          }}
        />
      </div>

      <div className="mini-container">
        {data.field_add_tasks.length > 0 &&
          data.field_add_tasks.map((data: DrupalNode, index: number) => (
            <div className=" mobileMax:py-6 mt-10">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0 }}
                className="remove-animation-fluctuation bg-white p-5 rounded-lg card-shadow relative"
              >
                <div>
                  <motion.h3 className="text-[35px] text-center text-numans mb-5 category-gradient text-clip leading-normal mobileMax:text-[28px] mobileMax:mb-3">
                    {data?.field_title}
                  </motion.h3>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.field_description?.processed || "",
                    }}
                    className="mt-5 --font-poppins text-medium text-cardText mobileMax:text-xsmall leading-normal text-center"
                  />
                </div>

                <motion.div className="mt-5">
                  <motion.div className="py-3 px-5 flex flex-col justify-start mobileMax:px-0">
                    <motion.h5 className="h-full mb-5 text-clip support-gradient tracking-tight text-[35px] leading-normal text-center text-numans mobileMax:text-[28px]">
                      Activities
                    </motion.h5>

                    {data?.field_add_activities?.length > 0 && (
                      <motion.div className="elevate-list-view text-cardText text-medium leading-normal --font-poppins mobileMax:text-small">
                        <ul className="list-disc pl-5">
                          {data.field_add_activities.map(
                            (activity: DrupalNode, index: number) => (
                              <li key={activity?.id || index} className="mb-2">
                                {activity?.field_label}
                              </li>
                            )
                          )}
                        </ul>
                      </motion.div>
                    )}

                    {data?.field_button?.length > 0 && (
                      <div
                        className={`flex flex-row justify-between mobileMax:flex-col ${
                          data.field_button.length > 0
                            ? "my-10 mobileMax:my-2"
                            : ""
                        }`}
                      >
                        {data.field_button.map((btn: any, index: number) => (
                          <Link
                            key={index}
                            href={
                              btn?.uri?.startsWith("internal:")
                                ? `${origin}${btn.uri.replace("internal:", "")}`
                                : btn?.uri || "#"
                            }
                            className="--font-poppins mobileMax:mt-2 text-medium text-defaultLink leading-6 flex items-center cursor-pointer mobileMax:text-xsmall"
                          >
                            {btn.title}
                            <MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5" />
                          </Link>
                        ))}
                      </div>
                    )}

                    {data?.field_author_details && (
                      <>
                        <div className="w-full flex items-center justify-between mx-auto pt-10 mobileMax:flex-col">
                          {data?.field_author_details.field_image[0]?.uri
                            ?.url && (
                            <div className="max-w-[220px] min-w-[220px] mobileMax:min-w-[150px] mobileMax:max-w-[150px] mr-5 mobileMax:mr-0">
                              <Image
                                src={`${DEV_PUBLIC_URL}${data?.field_author_details?.field_image[0]?.uri?.url}`}
                                alt={
                                  data.field_author_details.field_image[0]
                                    .alt || "author image"
                                }
                                width={200}
                                height={200}
                                unoptimized
                                className="h-full w-full min-h-[200px] max-h-[200px] max-w-[200px] mobileMax:min-h-[150px] mobileMax:max-h-[150px] mobileMax:min-w-[150px] mobileMax:max-w-[150px] rounded-full overflow-hidden object-cover object-center border-2 border-blueBorder mx-auto"
                              />
                            </div>
                          )}

                          {data?.field_author_details?.field_about && (
                            <div className="quotes-imgBox w-[80%] relative">
                              <p
                                className="--font-poppins font-medium text-xmedium leading-snug italic text-center text-cardText leading-8 my-8 resources-links mobileMax:text-xsmall mobileMax:leading-normal relative quotes-imgBox z-[2] w-[95%] tab:ml-auto"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    data?.field_author_details?.field_about,
                                }}
                              ></p>
                            </div>
                          )}
                        </div>

                        {data.field_author_details.field_name && (
                          <h6 className="text-numans text-right font-semibold text-[22px] uppercase italic history-title-gradient text-clip mobileMax:text-xsmall leading-normal pr-2 m-0">
                            {data.field_author_details.field_name}
                          </h6>
                        )}

                        {data.field_author_details.field_role && (
                          <p className="text-right pr-2 --font-poppins font-medium text-small text-cardText italic">
                            {data.field_author_details.field_role}
                          </p>
                        )}
                      </>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Taskforce;
