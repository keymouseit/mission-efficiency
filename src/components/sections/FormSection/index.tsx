"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { ScrollArea } from "@/components/ui/Dialog/scroll-area";
import DynamicForm from "./DynamicForm";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { config } from "@/lib/config";
import Link from "next/link";
import { resolveLink } from "@/utils";
import { MdChevronRight } from "react-icons/md";

export default function FormSection({ data }) {
  const [isOpenJoinForm, setIsOpenJoinForm] = useState<any>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  //   contact us ref
  const contactContainerRef = useRef<HTMLDivElement | null>(null);
  const [isContactActive, setIsContactActive] = useState<boolean>(false);

  const isTaskforce = data?.field_title === "Join the Taskforce";
  const hasButton = !!data?.field_button_link?.title;
  const hasDescription = !!data?.field_description?.processed;

  // Outside click handler
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsActive(false);
      }
      if (
        contactContainerRef.current &&
        !contactContainerRef.current.contains(e.target as Node)
      ) {
        setIsContactActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {data?.field_background_image ? (
        <div
          className="relative w-full min-h-[507px] py-[60px] mobileMax:py-[40px] betweenMobileTab:py-[50px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url('${config.apiBase}${data.field_image?.uri?.url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 z-0" />

          {/* Centered Content */}
          <div className="relative z-10 max-w-[880px] mx-auto px-[20px] mobileMax:px-[6px] betweenMobileTab:px-[13px] text-center w-full">
            {data?.field_title && (
              <h3 className="text-white text-[42px] font-poppins mb-[20px] mobileMax:mb-[15px] font-semibold leading-normal mobileMax:text-[28px] bg-gradient-to-r from-[#48DBB2] to-[#A0DDFF] bg-clip-text text-transparent text-clip">
                {data?.field_title}
              </h3>
            )}

            {hasDescription && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.field_description?.processed,
                }}
                className="text-white text-[16px] font-poppins mb-[40px] mobileMax:mb-[20px] leading-normal mobileMax:text-xsmall description"
              />
            )}

            <Dialog
              open={isOpenJoinForm}
              onOpenChange={(value) => setIsOpenJoinForm(value)}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0,
                }}
                className="remove-animation-fluctuation mobileMax:flex mobileMax:justify-center"
              >
                <DialogTrigger>
                  <button
                    className={`px-[40px] py-[12px] font-poppins inline-flex items-center text-[#263AAD] text-[16px] font-semibold rounded-lg hover:!underline !no-underline mobileMax:text-small mobileMax:w-full mobileMax:justify-center bg-[linear-gradient(to_right,#48DBB2,#A0DDFF)]`}
                  >
                    {data?.field_button_link?.title}
                  </button>
                </DialogTrigger>
              </motion.div>
              <DialogContent
                hideOverlay={true}
                className="z-[99999] success-pledge-modal aboveLaptop:w-[75%] laptopMax:w-[95%] desktop:w-[70%] desktopMd:w-1/2 desktopLg:w-2/5 desktop:px-[91px] desktop:py-[50px] aboveMinMobile:px-[20px] aboveMinMobile:py-[30px] betweenMobileTab:px-[70px] betweenMobileTab:py-[38px] minMobile:px-[12px] minMobile:py-[27px] rounded-[30px] overflow-hidden"
              >
                <div className="absolute pointer-events-none top-0 max-w-[32%] right-0 betweenMobileTab:opacity-50">
                  <img src="/static/images/contact-bg-1.svg" alt="" />
                </div>

                <div className="absolute pointer-events-none bottom-0 max-w-[16%] left-0 betweenMobileTab:opacity-50">
                  <img src="/static/images/contact-bg-2.svg" alt="" />
                </div>

                <DialogHeader>
                  <DialogTitle className="bg-clip-text bg-[linear-gradient(to_right,#5DE29B,#263DA8)] text-clip text-[42px] font-semibold font-numans mobileMax:text-odd">
                    {isTaskforce ? "Join the Taskforce" : "Contact Us!"}
                  </DialogTitle>
                  <ScrollArea
                    hideScrollbar
                    className="max-h-[65vh] desktopMd:max-h-[70vh] m-0 px-3"
                  >
                    <DialogDescription>
                      <DynamicForm
                        formFields={data?.field_add_form_field}
                        afterFormSubmission={() => {
                          setOpenSuccessModal(true);
                          setIsOpenJoinForm(false);
                        }}
                        isTaskforce={isTaskforce}
                      />
                    </DialogDescription>
                  </ScrollArea>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="bg-mapGray py-24 mobileMax:py-12 betweenMobileTab:py-12 relative min-h-[700px] mobileMax:min-h-[400px] betweenMobileTab:min-h-[480px] flex items-center justify-center">
          <Image
            src={`${config.apiBase}${data?.field_image?.uri?.url}`}
            alt={"Card image"}
            width={1500}
            height={1500}
            className={`${
              isTaskforce ? "w-[50%]" : "w-[57%]"
            } h-full absolute left-0 top-0 mobileMax:w-[65%] mobileMax:opacity-70`}
          />
          <div className="w-full max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0,
              }}
              className="remove-animation-fluctuation flex items-center gap-5 desktop:gap-[200px] relative mobileMax:flex-col mobileMax:items-center mobileMax:justify-center"
            >
              <div
                ref={contactContainerRef}
                onClick={() => setIsContactActive((prev) => !prev)}
                className="w-[63%] mobileMax:w-full"
              ></div>

              <div
                className={`${
                  isTaskforce ? "w-[57%]" : "w-[37%]"
                } relative mobileMax:w-full mobileMax:px-4`}
              >
                <h3 className="text-[32px] font-poppins mb-[27px] mobileMax:mb-8 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip mobileMax:text-[28px] mobileMax:text-center mobileToDesk:mb-5">
                  {data?.field_title}
                </h3>
                <p
                  className="text-small betweenMobileTab:text-black text-[#828282] font-poppins font-medium mb-[13px] mobileMax:text-xsmall leading-normal [&>strong]:text-[#48DBB2]"
                  dangerouslySetInnerHTML={{
                    __html: data?.field_description?.processed,
                  }}
                />

                <Dialog
                  open={isOpenJoinForm}
                  onOpenChange={(value) => setIsOpenJoinForm(value)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0,
                    }}
                    className="remove-animation-fluctuation mobileMax:flex mobileMax:justify-center"
                  >
                    <DialogTrigger>
                      <button
                        className={`${
                          isTaskforce ? "mt-5" : ""
                        } flex items-center justify-center max-w-[230px] px-8 font-poppins !text-white text-[16px] font-semibold min-h-[62px] rounded-lg hover:!underline !no-underline mobileMax:max-w-full mobileMax:text-xmedium mobileMax:mb-3 focus:!outline-none`}
                        style={{
                          background:
                            "linear-gradient(90deg, #48DBB2 0%, #003350 100%)",
                        }}
                      >
                        {isTaskforce ? "Join Now" : "Get in Contact"}
                      </button>
                    </DialogTrigger>
                  </motion.div>
                  <DialogContent
                    hideOverlay={true}
                    className="z-[99999] success-pledge-modal aboveLaptop:w-[75%] laptopMax:w-[95%] desktop:w-[70%] desktopMd:w-1/2 desktopLg:w-2/5 desktop:px-[91px] desktop:py-[50px] aboveMinMobile:px-[20px] aboveMinMobile:py-[30px] betweenMobileTab:px-[70px] betweenMobileTab:py-[38px] minMobile:px-[12px] minMobile:py-[27px] rounded-[30px] overflow-hidden"
                  >
                    <div className="absolute pointer-events-none top-0 max-w-[32%] right-0 betweenMobileTab:opacity-50">
                      <img src="/static/images/contact-bg-1.svg" alt="" />
                    </div>

                    <div className="absolute pointer-events-none bottom-0 max-w-[16%] left-0 betweenMobileTab:opacity-50">
                      <img src="/static/images/contact-bg-2.svg" alt="" />
                    </div>

                    <DialogHeader>
                      <DialogTitle className="bg-clip-text bg-[linear-gradient(to_right,#5DE29B,#263DA8)] text-clip text-[42px] font-semibold font-numans mobileMax:text-odd">
                        {isTaskforce ? "Join the Taskforce" : "Contact Us!"}
                      </DialogTitle>
                      <ScrollArea
                        hideScrollbar
                        className="max-h-[65vh] desktopMd:max-h-[70vh] m-0 px-3"
                      >
                        <DialogDescription>
                          <DynamicForm
                            formFields={data?.field_add_form_field}
                            afterFormSubmission={() => {
                              setOpenSuccessModal(true);
                              setIsOpenJoinForm(false);
                            }}
                            isTaskforce={isTaskforce}
                          />
                        </DialogDescription>
                      </ScrollArea>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
