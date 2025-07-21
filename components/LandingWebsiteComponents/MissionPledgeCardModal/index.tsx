"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DrupalNode } from "next-drupal";
import Image from "next/image";

interface MissionPledgeCardModalProps {
  open: Boolean;
  setOpen: (val: Boolean) => void;
  triggerClassName?: string;
  data: DrupalNode;
}

const MissionPledgeCardModal: React.FC<MissionPledgeCardModalProps> = ({
  open,
  setOpen,
  triggerClassName = "",
  data,
}) => {
  return (
    <Dialog
      open={open as boolean}
      onOpenChange={(value) => {
        setOpen(value);
      }}
      >
      <DialogTrigger
        aria-label="mission pledge card"
        className={`${triggerClassName}`}
      ></DialogTrigger>
      <DialogContent className="z-[99999] w-full aboveLaptop:w-[70%] desktop:w-3/5 desktopMd:w-1/2 desktopLg:w-2/5 mission-pledge-modal" hideOverlay={true}>
        <DialogHeader>
          <DialogTitle className="commonGradientColor text-lg font-normal font-numans mobileMax:text-medium">
            {data.title}
          </DialogTitle>
          <ScrollArea className="max-h-[65vh] desktopMd:max-h-[70vh] m-0">
            <DialogDescription className="w-[90%] mx-auto mobileMax:w-full max-w-full">
              <div
                className="--font-poppins text-left text-small mb-5 text-[#545d6f] leading-6 --font-poppins mobileMax:text-xsmall mobileMax:leading-normal"
                dangerouslySetInnerHTML={{
                  __html: data.field_content.processed,
                }}
              />
              <div className="max-w-[50%] h-[100px] w-full mx-auto">
                <Image
                  src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${data?.field_image_icon?.uri?.url}`}
                  alt="country flag"
                  width={200}
                  height={120}
                  className="h-full w-full max-w-full object-contain"
                />
              </div>
            </DialogDescription>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MissionPledgeCardModal;
