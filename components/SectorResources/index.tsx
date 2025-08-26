import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { DrupalNode } from "next-drupal";
import { DEV_PUBLIC_URL } from "@/services/api";
import DynamicImage from "../ResuableDynamicImage";
import FadeInWrapper from "../FadeInWrapper";

interface SectorResourcesProps {
  data: DrupalNode;
}

const SectorResources: React.FC<SectorResourcesProps> = ({ data }) => {
  return (
    <section
      id="Sector-resources-and-partners"
      className="pt-10 pb-[140px] bg-graybg betweenMobileTab:pb-20 mobileMax:pb-10 mobileMax:pt-0"
    >
      <div className="mini-container">
        {/* Section Title */}
        <FadeInWrapper
          y={40}
          duration={0}
          once={true}
          className="remove-animation-fluctuation pt-[82px] text-numans category-gradient tracking-tight desktop:text-[66px] desktop:leading-[85px] text-center text-clip text-[48px] leading-[60px] mb-14 desktop:mb-[100px] mobileMax:text-[28px] mobileMax:leading-normal mobileMax:mb-8"
        >
          {data?.field_title}
        </FadeInWrapper>

        {/* Sector Cards */}
        {data?.field_create_category.map(
          (sector: DrupalNode, index: number) => {
            return (
              <div
                key={index}
                className="flex items-start w-full justify-between desktop:flex-nowrap flex-wrap mb-[30px] border-b border-[#aec9f1] last:border-0"
              >
                {/* Sector Name */}
                <div className="desktop:w-[30%] w-full mb-5">
                  <FadeInWrapper
                    y={40}
                    duration={0}
                    once={true}
                    className="remove-animation-fluctuation text-clip support-gradient text-[32px] tracking-tight leading-10 mr-5 text-numans mobileMax:text-[25px] desktop:px-0 px-5 mobileMax:px-5 mobileMax:leading-8 mobileMax:mr-0"
                  >
                    {sector?.field_category_name}:
                  </FadeInWrapper>
                </div>

                {/* Sector List */}
                <div className="desktop:w-[70%] flex items-start flex-wrap w-full">
                  {sector?.field_add_card?.map(
                    (listItem: DrupalNode, index: number) => {
                      const bgColor = listItem?.field_background_color;
                      const bgClass =
                        bgColor === "blue"
                          ? "blueBg-gradient text-[#9af9ff]"
                          : bgColor === "gray"
                          ? "bg-[#ebf0f7]"
                          : "bg-white";

                      const linkColor =
                        bgColor === "blue" ? "text-[#fff]" : "text-[#004ee4]";
                      return (
                        <FadeInWrapper
                          key={index}
                          className="remove-animation-fluctuation px-[15px] mb-[30px] w-[50%] min-h-[255px] h-full mobileMax:px-0 mobileMax:w-full mobileMax:mb-5 box-border"
                          y={40}
                          duration={0}
                          once={true}
                        >
                          <div
                            className={`${bgClass} flex items-center justify-center flex-col box-border w-full h-full card-shadow rounded-[30px] px-4 py-[25px] laptopMax:py-5 min-h-[320px] mobileMax:min-h-full`}
                          >
                            <div
                              className={`flex justify-center items-center w-full laptopMax:max-w-[180px] object-contain h-full max-w-[220px] mb-5 max-h-[130px]
                          `}
                            >
                              <DynamicImage
                                width={220}
                                height={130}
                                src={`${DEV_PUBLIC_URL}${listItem?.field_icon?.uri?.url}`}
                                alt="support img"
                                className={`max-h-full w-full object-contain h-[130px]`}
                              />
                            </div>
                            <div className="h-full mobileMax:flex mobileMax:flex-col mobileMax:justify-end mobileMax:items-center">
                              <p
                                className={`--font-poppins text-center text-[20px]  leading-7 laptopMax:mb-2 mobileMax:text-medium ${
                                  bgColor === "blue"
                                    ? "text-[#9af9ff]"
                                    : "text-cardHeading"
                                }`}
                              >
                                {listItem?.field_title}
                              </p>
                              <Link
                                href={listItem?.field_button[0]?.uri}
                                target="_blank"
                                className={`--font-poppins text-center text-xsmall leading-6 flex items-center justify-center ${linkColor}`}
                              >
                                <ExternalLink className="w-[16px] h-[16px] max-w-[16px] mr-2" />
                                {listItem?.field_button[0]?.title}
                              </Link>
                            </div>
                          </div>
                        </FadeInWrapper>
                      );
                    }
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default SectorResources;
