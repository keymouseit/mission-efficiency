"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = [
  {
    title: "Lorem Ipsum Mission One",
    description: {
      value: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet faucibus metus. Suspendisse nec lorem euismod, tincidunt massa vel, suscipit mauris.</p>",
      processed: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet faucibus metus. Suspendisse nec lorem euismod, tincidunt massa vel, suscipit mauris.</p>",
    }
  },
  {
    title: "Efficient Ipsum Strategy Two",
    description: {
      value: "<p>Vestibulum euismod neque vitae magna feugiat, in congue lorem sollicitudin. Sed consequat, nunc vel egestas ultrices, purus metus accumsan nunc.</p>",
      processed: "<p>Vestibulum euismod neque vitae magna feugiat, in congue lorem sollicitudin. Sed consequat, nunc vel egestas ultrices, purus metus accumsan nunc.</p>",
    }
  },
  {
    title: "Global Ipsum Initiative Three",
    description: {
      value: "<p>Praesent hendrerit, tortor nec porta placerat, magna arcu euismod quam, et faucibus odio nisi nec turpis. Donec vel facilisis arcu.</p>",
      processed: "<p>Praesent hendrerit, tortor nec porta placerat, magna arcu euismod quam, et faucibus odio nisi nec turpis. Donec vel facilisis arcu.</p>",
    }
  },
  {
    title: "Energy Ipsum Collaboration Four",
    description: {
      value: "<p>Fusce tincidunt ipsum sed metus gravida, in sodales purus convallis. Mauris id justo congue, tempor purus ac, laoreet libero.</p>",
      processed: "<p>Fusce tincidunt ipsum sed metus gravida, in sodales purus convallis. Mauris id justo congue, tempor purus ac, laoreet libero.</p>",
    }
  }
];

const CommonFaq = () => {
  return (
    <div className="banner-wrap-styling pt-5 pb-[60px] relative mobileMax:pt-0 mobileMax:pb-10 betweenMobileTab:pb-12 overflow-hidden">
      <div className="absolute top-[-90px] left-0 z-[-2] pointer-events-none">
        <img src="/static/images/ewpartners-bg.svg" alt="left-bg" />
      </div>
      <div className="mini-container h-full">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation pt-[82px] category-gradient text-clip desktop:text-[60px] desktop:mb-10 mt-0 leading-tight text-center text-numans text-[48px] mobileMax:text-[28px] betweenMobileTab:mb-8 mb-5"
        >
          FAQ on doubling the rate of energy efficiency improvements by 2030
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation text-xmedium text-white text-left --font-poppins leading-8 Faq-text mobileMax:text-xsmall mobileMax:leading-normal"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="remove-animation-fluctuation flex items-start justify-between mt-20 mobileMax:mt-10 betweenMobileTab:mt-12 laptopMax:flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation w-[49%] laptopMax:w-full laptopMax:mb-5"
          >
            <motion.p className="text-[28px] text-white text-left --font-poppins leading-normal mb-0 min-h-[84px] laptopMax:min-h-full laptopMax:mb-2  mobileMax:text-small mobileMax:leading-7">
            The basics of energy efficiency:
            </motion.p>
            <motion.div className="mt-4">
              {Faq?.map(
                (leftFaqCard: any, index: number) => {
                  return (
                    <Accordion
                      key={index}
                      type="single"
                      collapsible
                      className="mb-4 Faq-text"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-[22px] text-white --font-poppins leading-normal p-3 hover:no-underline text-left  mobileMax:text-xsmall mobileMax:leading-6">
                          {leftFaqCard.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div
                            className="text-white --font-poppins leading-normal p-3 text-left mobileMax:text-xsmall"
                            dangerouslySetInnerHTML={{
                              __html:
                                leftFaqCard?.description?.value
                            }}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                }
              )}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
            }}
            className="remove-animation-fluctuation w-[49%] laptopMax:w-full laptopMax:mb-5"
          >
            <motion.p className="text-[28px] text-white text-left text-numans leading-normal mb-0 min-h-[84px] laptopMax:min-h-full laptopMax:mb-2  mobileMax:text-small mobileMax:leading-normal">
            The basics of energy efficiency:
            </motion.p>
            <motion.div className="mt-4">
              {Faq?.map(
                (rightFaqCard: any, index: number) => {
                  return (
                    <Accordion
                      key={index}
                      type="single"
                      collapsible
                      className="mb-4 Faq-text"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-[22px] text-white --font-poppins leading-normal p-3 hover:no-underline text-left mobileMax:text-xsmall">
                          {rightFaqCard.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div
                            className="text-white --font-poppins leading-normal p-3 text-left mobileMax:text-xsmall"
                            dangerouslySetInnerHTML={{
                              __html:
                                rightFaqCard?.description
                                  ?.processed,
                            }}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                }
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommonFaq;
