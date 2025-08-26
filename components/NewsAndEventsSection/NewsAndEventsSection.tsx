import React from "react";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import CardSlider from "../CardSlider";
import FadeInWrapper from "../FadeInWrapper";

type NewsAndEventsSectionProps = {
  data?: DrupalNode;
  newsAndEventSlider?: DrupalNode[];
};

const NewsAndEventsSection: React.FC<NewsAndEventsSectionProps> = ({
  data,
  newsAndEventSlider,
}) => {
  return (
    <>
      {newsAndEventSlider && newsAndEventSlider?.length > 0 && (
        <div className="py-16 bg-mapGray mobileMax:py-10">
          <div className="mini-container">
            <FadeInWrapper
              y={35}
              once={true}
              duration={0}
              className="remove-animation-fluctuation desktop:text-[66px] desktop:leading-[85px] text-numans desktop:mb-[70px] text-center text-clip text-[48px] leading-[60px] mb-[50px] mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-8"
              style={{
                backgroundImage:
                  "linear-gradient(282deg, #716ef8, #716ef8, #40abe7, #40abe7, #40c9e7)",
              }}
            >
              News & Events
            </FadeInWrapper>

            <FadeInWrapper
              y={30}
              once={true}
              duration={0}
              className="remove-animation-fluctuation mb-16 b-10 mobileMax:py-6"
            >
              <CardSlider
                latestSliderData={newsAndEventSlider}
                sliderData={data?.field_add_slide}
                sliderConfig={data?.field_slider_configuration}
              />
            </FadeInWrapper>

            <FadeInWrapper
              y={35}
              once={true}
              duration={0}
              className="remove-animation-fluctuation flex justify-center"
            >
              <Link
                href="/news"
                className="flex justify-center items-center get-involve-btn modals-gradientBtn font-mediums text-white text-medium capitalize min-h-[55px] rounded-lg min-w-[200px] px-5"
              >
                View All News & Events
              </Link>
            </FadeInWrapper>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsAndEventsSection;
