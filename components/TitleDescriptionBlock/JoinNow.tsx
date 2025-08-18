"use client";

import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ElevateJoiningForm from "./ElevateJoiningForm";
import { useState } from "react";

interface JoinNowProps {
  data?: DrupalNode;
  newBanner?: DrupalNode;
}

function JoinNow({ data }: JoinNowProps) {
  const [isOpenJoinForm, setIsOpenJoinForm] = useState<any>(false);

  return (
    <>
      {data?.field_campaign_life_banner?.map(
        (bannerCard: DrupalNode, index: number) => {
          return (
            <>
              <div
                key={index}
                className="py-14 elevate-joining-banner relative"
                id="join-energy-campaign"
                style={{
                  backgroundImage: `url(${
                    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL +
                    bannerCard?.field_image_icon?.uri?.url
                  })`,
                }}
              >
                <div className="absolute top-0 left-0 bg-blackHighOpacity h-full w-full" />
                <div className="mini-container relative z-[2]">
                  <motion.h3
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0,
                    }}
                    className="remove-animation-fluctuation font-bold desktop:text-[55px] text-numans tab:min-h-[300px] mobileMax:min-h-[200px] desktop:leading-[85px] text-white text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-10 text-center"
                  >
                    {bannerCard?.title}
                  </motion.h3>
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
                      className="remove-animation-fluctuation"
                    >
                      <DialogTrigger className="block mx-auto min-w-[220px] get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg focus:!outline-none">
                        {bannerCard?.field_button_text}
                      </DialogTrigger>
                    </motion.div>
                    <DialogContent
                      hideOverlay={true}
                      className="z-[99999] success-pledge-modal aboveLaptop:w-[75%] laptopMax:w-[95%] desktop:w-[70%] desktopMd:w-1/2 desktopLg:w-2/5 px-3 py-5"
                    >
                      <DialogHeader>
                        <DialogTitle className="commonGradientColor text-[32px] font-normal font-numans mobileMax:text-odd mt-3">
                          {bannerCard?.title}
                        </DialogTitle>
                        <ScrollArea className="max-h-[65vh] desktopMd:max-h-[70vh] m-0 px-3">
                          <DialogDescription>
                            <ElevateJoiningForm
                              formFields={data?.field_ready_to_join_form}
                              afterFormSubmission={() => {
                                setIsOpenJoinForm(false);
                              }}
                            />
                          </DialogDescription>
                        </ScrollArea>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </>
          );
        }
      )}
    </>
  );
}

export default JoinNow;
