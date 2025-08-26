"use client";
import React, { useEffect, useState } from "react";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import ReactPlayer from "react-player";
import { IoMdImages } from "react-icons/io";
import DynamicImage from "../ResuableDynamicImage";
import FadeInWrapper from "../FadeInWrapper";

interface countryProps {
  countryDetail: DrupalNode;
  headerData: DrupalNode;
  footerData: DrupalNode;
}

const TabComponent: React.FC<countryProps> = ({ countryDetail }) => {
  const {
    field_ec_elevate_text = "",
    field_ec_support_text = "",
    field_ec_invest_text = "",
    field_elevate_resource_cards = [],
    field_support_resource_cards = [],
  } = countryDetail;

  const [activeTab, setActiveTab] = useState("Elevate");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const renderInvestTab = () => {
    const investText =
      typeof field_ec_invest_text === "object"
        ? field_ec_invest_text?.value
        : field_ec_invest_text;
    return (
      <div className="py-10">
        <FadeInWrapper
          className="country-list text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
          dangerouslySetInnerHTML={{ __html: investText }}
          y={40}
          once={true}
          duration={0.5}
        />
      </div>
    );
  };

  const renderSupportTab = () => {
    const supportText =
      typeof field_ec_support_text === "object"
        ? field_ec_support_text?.value
        : field_ec_support_text;
    return (
      <div className="py-10">
        <FadeInWrapper
          className="country-list text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
          dangerouslySetInnerHTML={{ __html: supportText }}
          y={40}
          once={true}
          duration={0.5}
        />
        <div className="flex flex-wrap justify-start box-border pt-20">
          {field_support_resource_cards?.map(
            (card: DrupalNode, index: number) => (
              <Link
                href={card?.field_link || "#"}
                key={index}
                target="_blank"
                className="px-[15px] w-[33%] cursor-pointer mb-8 mobileMax:w-full mobileMax:px-0 aboveLaptop:w-[50%] lieTablets:w-[50%] betweenMobileTab:mb-6 mobileMax:mb-6"
              >
                <FadeInWrapper
                  className="animate-cardHover-speed flex items-start flex-col box-border h-full w-full rounded-[23px] overflow-hidden card-shadow bg-white"
                  scale={1.02}
                  duration={0.3}
                >
                  <div className="h-full w-full">
                    <div className="flex justify-center items-center w-full h-[250px] betweenMdDesk:h-[200px] overflow-hidden relative">
                      {card?.field_link ===
                        "https://www.youtube.com/watch?v=0I_Wmhjc5Jo" ? (
                        <ReactPlayer
                          url={card?.field_link || ""}
                          id="react-video-player"
                          width="100%"
                          height="100%"
                        />
                      ) : (
                        <>
                          {card?.field_image_icon ? (
                            <DynamicImage
                              width={371}
                              height={200}
                              alt="card-image"
                              src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${card?.field_image_icon?.uri?.url || ""
                                }`}
                              className="w-full h-full max-w-full object-cover card-shadow"
                            />
                          ) : (
                            <div className="w-full h-full bg-placeholder flex items-center justify-center">
                              <IoMdImages className="text-white w-[60%] h-[60%]" />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex min-h-[80px] p-5 items-center">
                      <h5 className="text-numans cursor-pointer text-left text-[18px] mobileMax:text-small text-cardHeading font-semibold hover:text-blue hover:underline leading-normal">
                        {card?.title}
                      </h5>
                    </div>
                  </div>
                </FadeInWrapper>
              </Link>
            )
          )}
        </div>
      </div>
    );
  };

  const renderElevateTab = () => {
    const elevateText =
      typeof field_ec_elevate_text === "object"
        ? field_ec_elevate_text?.value
        : field_ec_elevate_text;

    return (
      <div className="py-10">
        <FadeInWrapper
          className="country-list text-cardText text-medium leading-normal --font-poppins mobileMax:text-small"
          dangerouslySetInnerHTML={{ __html: elevateText }}
          y={40}
          once={true}
          duration={0.5}
        />
        <div className="flex flex-wrap justify-start box-border pt-20">
          {field_elevate_resource_cards?.map(
            (card: DrupalNode, index: number) => (
              <Link
                href={card?.field_link || "#"}
                key={index}
                target="_blank"
                className="px-[15px] w-[33%] cursor-pointer mb-8 mobileMax:w-full mobileMax:px-0 aboveLaptop:w-[50%] lieTablets:w-[50%] betweenMobileTab:mb-6 mobileMax:mb-6"
              >
                <FadeInWrapper
                  className="animate-cardHover-speed flex items-start flex-col box-border h-full w-full rounded-[23px] overflow-hidden card-shadow bg-white"
                  scale={1.02}
                  duration={0.3}
                >
                  <div className="h-full w-full">
                    <div className="flex justify-center items-center w-full h-[250px] betweenMdDesk:h-[200px] overflow-hidden relative">
                      {card?.field_link ===
                        "https://www.youtube.com/watch?v=0I_Wmhjc5Jo" ? (
                        <ReactPlayer
                          url={card?.field_link || ""}
                          id="react-video-player"
                          width="100%"
                          height="100%"
                        />
                      ) : (
                        <>
                          {card?.field_image_icon ? (
                            <DynamicImage
                              width={371}
                              height={200}
                              alt="card-image"
                              src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${card?.field_image_icon?.uri?.url || ""
                                }`}
                              className="w-full h-full max-w-full object-cover card-shadow"
                            />
                          ) : (
                            <div className="w-full h-full bg-placeholder flex items-center justify-center">
                              <IoMdImages className="text-white w-[60%] h-[60%]" />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex min-h-[80px] p-5 items-center">
                      <h5 className="text-numans cursor-pointer text-left text-[18px] mobileMax:text-small text-cardHeading font-semibold hover:text-blue hover:underline leading-normal">
                        {card?.title}
                      </h5>
                    </div>
                  </div>
                </FadeInWrapper>
              </Link>
            )
          )}
        </div>
      </div>
    );
  };

  const tabs = [
    { id: "Elevate", label: "Elevate", content: renderElevateTab() },
    { id: "Support", label: "Support", content: renderSupportTab() },
    { id: "Invest", label: "Invest", content: renderInvestTab() },
  ];

  return (
    <div className="overflow-hidden">
      <div className="flex justify-center min-h-[60px]">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer px-4 py-2 transition-all box-shadow-prop ${tab.id === activeTab
                ? "border-b-4 border-blue bg-blue text-black transform scale-103 z-10"
                : "border-transparent text-[#797979]"
              } 
            !px-8 !py-2 rounded-s-sm bg-white mobileMax:mx-0 mobileMax:mb-2.5 laptop:max-w-[360px] w-full block text-center text-medium font-bold --font-poppins mobileMax:text-small flex items-center justify-center`}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="p-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabComponent;
