"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils";
import { config } from "@/lib/config";

interface Faq {
  question: string;
  answer: string;
  className?: string;
}

interface CommonFaqProps {
  faqs: Faq[];
  className?: string;
}

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border border-white rounded-md faq-accordion", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

interface PlusMinusIconProps {
  className?: string;
}

const PlusMinusIcon: React.FC<PlusMinusIconProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-[42px] h-[42px] min-w-[42px] mobileMax:min-w-[32px] mobileMax:w-[32px] mobileMax:h-[32px] flex items-center justify-center transition-all duration-300",
        className
      )}
    >
      <span className="relative flex items-center justify-center h-5 w-5 shrink-0">
        {/* vertical line */}
        <span
          className="
            absolute h-6 w-[4px] mobileMax:h-5 mobileMax:w-[3.1px]
            bg-white rounded-full transition-all duration-300
            group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0
          "
        />
        {/* horizontal line */}
        <span
          className="
            absolute w-6 h-[4px] mobileMax:w-5 mobileMax:h-[3.1px]
            bg-white rounded-full transition-all duration-300
          "
        />
      </span>
    </div>
  );
};

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  noArrow?: boolean;
  plusArrow?: boolean;
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(
  (
    { className, children, noArrow = false, plusArrow = false, ...props },
    ref
  ) => (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex flex-1 items-center justify-between py-4 font-medium transition-all gap-[8px]",
          plusArrow && noArrow && "justify-start",
          className
        )}
        {...props}
      >
        {plusArrow && noArrow && <PlusMinusIcon className="bg-[#003350]" />}

        {children}

        {/* fallback chevron arrow */}
        {!noArrow && (
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-small leading-6 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0 accordion-row", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

const CommonFaqAccordion: React.FC<CommonFaqProps> = ({ faqs, className }) => {
  return (
    <Accordion type="single" collapsible className={`${className} Faq-text `}>
      {faqs?.map((faq: any, index: number) => {
        const baseUrl = config.apiBase;

        const processHtml = (html: string) => {
          return html?.replace(/src="\/(.*?)"/g, `src="${baseUrl}/$1"`);
        };
        return (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="banner-greadient px-[47px] py-[23px] rounded-[20px] mb-[25px] mobileMax:px-[20px] mobileMax:py-[15px] mobileMax:mb-5 "
          >
            <AccordionTrigger
              plusArrow
              noArrow
              className="text-[21px] !py-0 font-semibold text-[#003350] font-poppins leading-normal hover:no-underline text-left mobileMax:text-xsmall"
            >
              {faq?.question || faq?.field_question}
            </AccordionTrigger>
            <AccordionContent>
              <p
                dangerouslySetInnerHTML={{
                  __html: processHtml(
                    faq?.answer || faq?.field_answer?.processed || ""
                  ),
                }}
                className="text-[#003350] font-poppins leading-normal pt-3 text-left mobileMax:text-xsmall"
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  CommonFaqAccordion,
};
