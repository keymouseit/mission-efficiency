import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { ScrollArea } from "@/components/ui/Dialog/scroll-area";
import { CONSTS } from "@/constants";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";

interface LegendsModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  children: any;
  triggerClassName?: string;
}

const LegendsModal: React.FC<LegendsModalProps> = ({
  open,
  setOpen,
  children,
  triggerClassName = "",
}) => {
  return (
    <Dialog open={open as boolean} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger
        aria-label="legend info button"
        className={`${triggerClassName}`}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="w-full aboveLaptop:w-[70%] desktop:w-3/5 desktopMd:w-1/2 desktopLg:w-2/5">
        <DialogHeader>
          <DialogTitle className="commonGradientColor text-lg font-normal font-numans mobileMax:text-odd">
            Legend
          </DialogTitle>
          <ScrollArea className="max-h-[65vh] desktopMd:max-h-[70vh] m-0">
            <DialogDescription className="w-[90%] mx-auto mobileMax:w-full">
              <div className="flex flex-col-reverse">
                {CONSTS.MAP_LEGENDS?.map((items, index) => (
                  <div className="flex items-start mt-4" key={index}>
                    <div>
                      <span
                        className="w-[54px] h-[54px] rounded-full block mobileMax:w-[34px] mobileMax:h-[34px]"
                        style={{ background: items.color }}
                      ></span>
                    </div>
                    <div className="ml-5">
                      <p className="text-blue font-bold text-xsmall text-left capitalize mobileMax:text-xs font-poppins">
                        Potential for energy savings is {items.value}.
                      </p>
                      <p className="text-left font-normal text-xs text-purple font-poppins">
                        {" "}
                        {items.discription}{" "}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogDescription>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LegendsModal;
