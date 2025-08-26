;import Link from "next/link";
import React from "react";
import DynamicImage from "../ResuableDynamicImage";
import FadeInWrapper from "../FadeInWrapper";

interface CTAData {
  field_cta_efficiency_title: string;
  field_cta_efficiency_cop28?: {
    processed: string;
  };
  field_cta_left_button_link: string;
  field_cta_left_button_text: string;
  field_cta_right_button_link: string;
  field_cta_right_button_text: string;
  field_cta_efficiency_image?: {
    uri?: {
      url?: string;
    };
  };
  field_cta_efficiency_content?: {
    processed: string;
  };
}

type PrimaryCTASectionProps = {
  data: CTAData;
};

function PrimaryCTAClient({ data }: PrimaryCTASectionProps) {
  const {
    field_cta_efficiency_title,
    field_cta_efficiency_cop28,
    field_cta_left_button_link,
    field_cta_left_button_text,
    field_cta_right_button_link,
    field_cta_right_button_text,
    field_cta_efficiency_image,
    field_cta_efficiency_content,
  } = data;

  return (
    <section
      id="mission-call-to-action"
      className="pt-[92px] bg-white relative mobileMax:pt-10 betweenMobileTab:pt-16 pb-8 CTA-wrap overflow-hidden"
    >
      {/* Background shape */}
      <FadeInWrapper
        x={-100}
        once={true}
        type="spring"
        duration={2.5}
        className="absolute pointer-events-none top-[-10%] left-0 z-[0] betweenMobileTab:top-[12%] betweenMobileTab:opacity-50 mobileMax:top-[21%]"
      >
        <DynamicImage
          src="/static/images/about-us-home.svg"
          alt="overlay-bg"
          className="mobileMax:opacity-40"
          width={657}
          height={955}
        />
      </FadeInWrapper>

      <div className="mini-container relative z-[1] overflow-hidden">
        <FadeInWrapper
          y={40}
          once={true}
          duration={0}
          className="remove-animation-fluctuation py-12 mobileMax:pb-5"
        >
          {/* Title */}
          <h3 className="desktop:text-[60px] text-numans mb-10 mobileMax:mb-8 desktop:leading-[70px] leading-normal text-center category-gradient text-clip px-5 text-[48px] mobileMax:text-[28px]">
            {field_cta_efficiency_title}
          </h3>

          {/* Subtitle content */}
          <FadeInWrapper
            y={40}
            once={true}
            duration={0}
            className="remove-animation-fluctuation flex items-center mb-20 mobileToDesk:flex-col overflow-hidden"
          >
            <div className="w-full text-list relative mobileToDesk:order-2 mobileToDesk:w-full mobileToDesk:mt-6">
              {field_cta_efficiency_cop28?.processed && (
                <div
                  className="text-medium text-[#545D6F] --font-poppins leading-8 mb-12 !text-left mobileMax:text-xsmall mobileMax:leading-normal"
                  dangerouslySetInnerHTML={{
                    __html: field_cta_efficiency_cop28.processed,
                  }}
                />
              )}

              {/* CTA Buttons */}
              <div className="flex items-center justify-around p-0 mobileMax:flex-col">
                {field_cta_left_button_link && (
                  <Link
                    href={field_cta_left_button_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center min-w-[220px] --font-poppins learnBtn !text-white text-medium min-h-[55px] rounded-lg hover:!text-[#1468a0] hover:!underline !no-underline mobileMax:min-w-full mobileMax:text-medium mobileMax:mb-3"
                  >
                    {field_cta_left_button_text}
                  </Link>
                )}

                {field_cta_right_button_link && (
                  <Link
                    href={"/mission-efficiency-pledge/#our-supporters"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center min-w-[220px] --font-poppins learnBtn !text-white text-medium min-h-[55px] rounded-lg hover:!text-[#1468a0] hover:!underline !no-underline mobileMax:min-w-full mobileMax:text-medium mobileMax:mb-3"
                  >
                    {field_cta_right_button_text}
                  </Link>
                )}
              </div>
            </div>
          </FadeInWrapper>

          {/* Image + Right text */}
          <FadeInWrapper
            y={40}
            once={true}
            duration={0}
            className="remove-animation-fluctuation flex items-start mobileToDesk:flex-col overflow-hidden"
          >
            {/* Image on the left */}
            <div className="w-[50%] h-[650px] mobileToDesk:h-full mr-12 rounded-[40px] overflow-hidden mobileToDesk:w-full mobileToDesk:mb-6 mobileToDesk:mr-0">
              {field_cta_efficiency_image?.uri?.url && (
                <DynamicImage
                  src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${field_cta_efficiency_image.uri.url}`}
                  alt="cta-img"
                  height={520}
                  width={520}
                  objectFit="cover"
                  className="w-full h-full max-w-full card-shadow rounded-[12px] object-cover transform transition-transform duration-500 hover:scale-105"
                />
              )}
            </div>

            {/* Text on the right */}
            <div className="w-[50%] text-list relative mobileToDesk:w-full">
                {field_cta_efficiency_content?.processed && (
                  <div
                    className="text-medium text-[#545D6F] --font-poppins leading-normal mobileMax:text-small mobileMax:leading-normal"
                    dangerouslySetInnerHTML={{
                      __html: field_cta_efficiency_content.processed,
                    }}
                  />
                )}
            </div>
          </FadeInWrapper>
        </FadeInWrapper>
        <div className="border-b border-[#ccc]" />
      </div>
    </section>
  );
}

export default PrimaryCTAClient;
