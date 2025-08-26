import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DrupalNode } from "next-drupal";
import DynamicImage from "../ResuableDynamicImage";
import FadeInWrapper from "../FadeInWrapper";

interface FAQSectionProps {
  data: DrupalNode;
}

function FAQSections({ data }: FAQSectionProps) {
  return (
    <section
      id="FAQ"
      className="banner-wrap-styling pt-5 pb-[60px] relative mobileMax:pt-0 mobileMax:pb-10 betweenMobileTab:pb-12 overflow-hidden"
    >
      {/* Background SVG */}
      <div className="absolute top-[-90px] left-0 z-[-2] pointer-events-none">
        <DynamicImage
          width={851}
          height={1703}
          src="/static/images/ewpartners-bg.svg" alt="left-bg"
        />
      </div>

      <div className="mini-container h-full">
        {/* Title */}
        <FadeInWrapper
          y={40}
          duration={0}
          once={true}
          className="remove-animation-fluctuation pt-[82px] category-gradient text-clip desktop:text-[60px] desktop:mb-10 mt-0 leading-tight text-center text-numans text-[48px] mobileMax:text-[28px] betweenMobileTab:mb-8 mb-5"
        >
          {data?.field_faq_title}
        </FadeInWrapper>

        {/* Subtitle */}
        {data?.field_faq_description?.processed && (
          <FadeInWrapper
            y={40}
            duration={0}
            once={true}
            className="remove-animation-fluctuation text-xmedium text-white text-left --font-poppins leading-8 Faq-text mobileMax:text-xsmall mobileMax:leading-normal"
            dangerouslySetInnerHTML={{
              __html: data?.field_faq_description.processed,
            }}
          />
        )}

        {/* FAQ columns */}
        <FadeInWrapper
          y={40}
          duration={0}
          once={true}
          className="remove-animation-fluctuation flex items-start justify-between mt-20 mobileMax:mt-10 betweenMobileTab:mt-12 laptopMax:flex-col"
        >
          {/* Left Column */}
          <div className="remove-animation-fluctuation w-[49%] laptopMax:w-full laptopMax:mb-5">
            <p className="text-[28px] text-white text-left --font-poppins leading-normal mb-0 min-h-[84px] laptopMax:min-h-full laptopMax:mb-2 mobileMax:text-small mobileMax:leading-7">
              {data?.field_faq_left_title}
            </p>

            <div className="mt-4">
              {data?.field_faq_left_section?.map((card: any, index: any) => (
                <Accordion
                  key={`left-faq-${index}`}
                  type="single"
                  collapsible
                  className="mb-4 Faq-text"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-[22px] text-white --font-poppins leading-normal p-3 hover:no-underline text-left mobileMax:text-xsmall mobileMax:leading-6">
                      {card.field_faq_question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className="text-white --font-poppins leading-normal p-3 text-left mobileMax:text-xsmall"
                        dangerouslySetInnerHTML={{
                          __html: card?.field_faq_answer?.processed || "",
                        }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="remove-animation-fluctuation w-[49%] laptopMax:w-full laptopMax:mb-5">
            <p className="text-[28px] text-white text-left text-numans leading-normal mb-0 min-h-[84px] laptopMax:min-h-full laptopMax:mb-2 mobileMax:text-small mobileMax:leading-normal">
              {data?.field_right_title}
            </p>

            <div className="mt-4">
              {data?.field_faq_right_section?.map((card: any, index: any) => (
                <Accordion
                  key={`right-faq-${index}`}
                  type="single"
                  collapsible
                  className="mb-4 Faq-text"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-[22px] text-white --font-poppins leading-normal p-3 hover:no-underline text-left mobileMax:text-xsmall">
                      {card.field_faq_question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className="text-white --font-poppins leading-normal p-3 text-left mobileMax:text-xsmall"
                        dangerouslySetInnerHTML={{
                          __html: card?.field_faq_answer?.processed || "",
                        }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </FadeInWrapper>
      </div>
    </section>
  );
}

export default FAQSections;
