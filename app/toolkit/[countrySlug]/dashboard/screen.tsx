"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { DrupalNode } from "next-drupal";
import {
  createQueryString,
  findRegionFromISO,
  getAlpha2FromISO,
  getColorFromStat,
  getSectorByEfficiency,
} from "@/lib/utils";
import slugify from "slugify";
import OverAllCountryTable from "@/components/OverallCountryTable";
import { Button } from "@/components/ui/button";
import { CONSTS } from "@/lib/constants";
import LegendsModal from "@/components/LegendsModal";
import { motion } from "framer-motion";
import PotentialIndicator from "@/components/PotentialIndicator";
import { AiOutlineInfoCircle } from "react-icons/ai";
import NextBreadcrumb from "@/components/Breadcrumbs";
import { MdChevronRight } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import CommonReactSelect from "@/components/CommonReactSelect";
import DynamicImage from "@/components/ResuableDynamicImage";

interface DashboardScreenProps {
  countryList?: DrupalNode[];
  countryData?: DrupalNode;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({
  countryData = {} as DrupalNode,
  countryList = [] as DrupalNode[],
}) => {
  const router = useRouter();
  const [showLegendsModal, setShowLegendsModal] = useState<Boolean>(false);
  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const [isTablet, setIsTablet] = useState<Boolean>(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth < 1200) {
        setIsMobile(true);
      }
      if (window?.innerWidth < 1024) {
        setIsTablet(true);
      }
    }
    handlatchMakingPrefetchAndNavigation(true);
  }, []);

  const countryCode = getAlpha2FromISO(countryData?.field_iso_code) || "";

  const handleCountrySelect = (countryId: string) => {
    const matchedCountry = countryList.find(
      (country) => country.id === countryId
    );
    if (matchedCountry) {
      router.push(
        `/toolkit/${slugify(matchedCountry.title, { lower: true })}/dashboard`
      );
    }
  };

  const handlatchMakingPrefetchAndNavigation = (prefetch: boolean = false) => {
    const sectorInfo = getSectorByEfficiency(countryData);
    if (countryData) {
      const countryRegion = findRegionFromISO(
        countryData.field_iso_code,
        countryList as DrupalNode[]
      );
      const query = createQueryString({
        sector: sectorInfo?.title || "",
        region: countryRegion?.name || "",
      });
      if (prefetch) {
        router.prefetch(
          `/toolkit/${slugify(countryData.title, {
            lower: true,
          })}/tools${query}`
        );
      } else {
        router.push(
          `/toolkit/${slugify(countryData.title, {
            lower: true,
          })}/tools${query}`
        );
      }
    }
  };

  const potentSector = getSectorByEfficiency(countryData);
  const potentSectorColor = getColorFromStat(
    countryData?.[potentSector?.field_name || ""]
  );

  const countryAverageColor = getColorFromStat(
    countryData?.field_country_score
  );
  const countryAverageEfficiency = CONSTS.MAP_LEGENDS.find(
    (item) => item.color === countryAverageColor
  );
  const makeCountryOptions = () => {
    const options = countryList.map((data) => {
      return {
        value: data.id,
        label: data.title,
      };
    });
    return options;
  };

  useEffect(() => {
    const isIOSDetect =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) ||
      (/Macintosh/.test(window.navigator.userAgent) &&
        /Safari/.test(window.navigator.userAgent));
    setIsIOS(isIOSDetect);
  }, []);

  return (
    <div className="parent-card-container">
      <NextBreadcrumb
        homeElement={"Home"}
        separator={
          <span>
            {" "}
            <MdChevronRight className="mt-1" />{" "}
          </span>
        }
        activeClasses="active-breadcrumb-color font-bold"
        containerClasses="flex breadcrumbs"
        listClasses="hover:underline mx-2 text-purple"
        capitalizeLinks
      />
      <div className="card-container">
        <div className="flex items-center justify-center p-0 w-full">
          <Card className="p-6">
            <div className="flex items-start laptopMax:block">
              <div className="flex flex-col items-center mb-5 country-details-header w-1/2 pr-8 pt-0 laptopMax:w-full laptopMax:pr-0">
                <div className="mb-6 text-base flex items-center justify-start w-full mobileMax:mb-2">
                  <Card className="country-card border-none shadow-none w-full max-w-[62px] h-[62px] mobileMax:max-w-[50px] mobileMax:max-h-[50px] mobileMax:w-[50px] mobileMax:w-[50px] rounded-full overflow-hidden common-dropShadow">
                    {countryCode ? (
                      <DynamicImage
                        className="h-full rounded-full object-cover w-full"
                        src={`/static/flags/${countryCode.toLowerCase()}.svg`}
                        width={62}
                        height={62}
                        alt="country flag"
                      />
                    ) : (
                      <div className="animate-pulse w-[65px] h-[65px] mobileMax:w-[50px] mobileMax:h-[50px] overflow-hidden rounded-full bg-skeleton" />
                    )}
                  </Card>
                  <div className="flex items-center justify-center max-w-[85%] aboveMinMobile:max-w-[430px] lieTablets:max-w-[550px] mx-auto minMobile:max-w-[240px] desktopMax:max-w-[350px] largeDesk:max-w-[350px]">
                    {countryData.id ? (
                      <div
                        className={`w-full dashboard-country-comboBox ${
                          isIOS && "no-gradient-countrySelect"
                        }`}
                        data-tooltip-id="country-name"
                      >
                        <CommonReactSelect
                          list={makeCountryOptions()}
                          value={countryData?.id}
                          placeholder={countryData?.title}
                          onSelectChange={handleCountrySelect}
                          isSearchable={false}
                          minMenuListHeight={isTablet ? 164 : 230}
                          maxMenuListHeight={isTablet ? 164 : 230}
                          onFocus={() => setIsSelectOpen(true)}
                        />
                      </div>
                    ) : (
                      <div className="animate-pulse min-w-[500px] aboveMinMobile:min-w-[300px] h-[50px] rounded-md bg-skeleton minMobile:min-w-[200px] desktopMax:min-w-[350px] largeDesk:min-w-[350px]" />
                    )}
                  </div>
                  {countryData?.title && !isSelectOpen && !isMobile && (
                    <Tooltip id="country-name" place="top">
                      {countryData.title}
                    </Tooltip>
                  )}
                </div>
                <div className="px-4 mx-auto">
                  <div className="w-full px-3 mb-20 mt-10 laptopMax:my-8">
                    {potentSector?.icon ? (
                      <div
                        className="p-2 desktopMd:p-3 rounded-full flex items-center justify-center w-[100px] h-[100px] mobileMax:w-[80px] mobileMax:h-[80px] mx-auto mb-2 white-svg-color"
                        style={{
                          backgroundColor: potentSectorColor,
                        }}
                      >
                        <DynamicImage
                          src={`/static/images/${potentSector?.icon}.svg`}
                          alt="home"
                          width={50}
                          height={50}
                          className="max-w-[50px] block"
                          quality={95}
                        />
                      </div>
                    ) : (
                      <div className="animate-pulse w-[95px] h-[95px] mobileMax:w-[80px] mobileMax:h-[80px] rounded-full bg-skeleton block mx-auto mb-2" />
                    )}
                    {potentSector?.title ? (
                      <h5 className="text-odd commonGradientColor text-center mobileMax:text-xmedium mobileMax:leading-[25px]">
                        {potentSector?.title}
                      </h5>
                    ) : (
                      <div className="animate-pulse w-[200px] h-[25px] rounded-md bg-skeleton block mx-auto mb-2" />
                    )}
                    <p className="text-small text-purple text-center mobileMax:text-xsmall mobileMax:leading-normal">
                      Sector with highest energy savings potential
                    </p>
                  </div>
                  <div className="w-full px-3 laptopMax:mb-5">
                    {countryAverageEfficiency?.value ? (
                      <div
                        className="p-2 desktopMd:p-3 rounded-full flex items-center justify-center w-[100px] h-[100px] mobileMax:w-[80px] mobileMax:h-[80px]  mx-auto mb-2 white-svg-color"
                        style={{
                          backgroundColor: countryAverageColor,
                        }}
                      >
                        <DynamicImage
                          src="/static/images/white-mount-flow.png"
                          alt="mount-flow"
                          width={50}
                          height={50}
                          className="max-w-[50px] block"
                        />
                      </div>
                    ) : (
                      <div className="animate-pulse w-[95px] h-[95px] rounded-full bg-skeleton block mx-auto mb-2 mobileMax:w-[80px] mobileMax:h-[80px]" />
                    )}
                    {countryAverageEfficiency?.value ? (
                      <h5 className="text-odd commonGradientColor text-center capitalize mobileMax:text-xmedium mobileMax:leading-[25px]">
                        {countryAverageEfficiency?.value}
                      </h5>
                    ) : (
                      <div className="animate-pulse w-[200px] h-[25px] rounded-md bg-skeleton block mx-auto mb-2" />
                    )}
                    <p className="text-small text-purple text-center mobileMax:text-xsmall mobileMax:leading-normal">
                      Country overall energy savings potential
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 pl-8 mt-4 border-borderColor border-l-2 laptopMax:w-full laptopMax:pl-0 laptopMax:border-l-0 laptopMax:border-t-2 laptopMax:pt-8">
                <p className="text-medium text-purple font-extrabold text-center mb-8 mobileMax:text-small laptopMax:mb-3">
                  Sector(s) with highest energy savings potential
                </p>
                <OverAllCountryTable
                  isCountryDetail={true}
                  selectedCountryMapData={countryData}
                />
              </div>
            </div>
            <div className="w-full mt-8 mx-auto mobileMax:mt-10">
              {potentSector?.title ? (
                <p className="text-black text-xmedium font-semibold text-center uppercase mb-6 mobileMax:text-small mobileMax:mb-3 font-poppins">
                  Ready to accelerate energy efficiency progress? Start with{" "}
                  <span className="text-blue">{potentSector?.title}</span>{" "}
                  sector. See available tools
                </p>
              ) : (
                <div className="animate-pulse w-[80%] h-[35px] rounded-md bg-skeleton mx-auto mb-6" />
              )}
              {potentSector ? (
                <motion.div
                  whileHover={{ scale: isMobile ? 1 : 1.2 }}
                  className="w-[fit-content] mx-auto"
                >
                  <Button
                    className="block min-w-[220px] modals-gradientBtn text-white text-medium capitalize mobileMax:text-small"
                    onClick={() => handlatchMakingPrefetchAndNavigation()}
                  >
                    View Tools
                  </Button>
                </motion.div>
              ) : (
                <div className="animate-pulse w-[220px] h-[35px] rounded-md bg-skeleton mx-auto" />
              )}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center mobileMax:items-start">
        <div className="flex items-center justify-center flex-wrap mobileMax:order-2 mobileMax:block">
          {CONSTS.MAP_LEGENDS?.map(
            (item: { color: any; value: any }, index: number) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    duration: 0.5,
                    delay: Number(`0.${index + 3}`),
                  }}
                >
                  <PotentialIndicator color={item.color} value={item.value} />
                </motion.div>
              );
            }
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            tye: "spring",
            duration: 0.8,
            delay: 0.7,
          }}
          className="mt-2 mobileMax:order-1 mobileMax:mt-0 mobileMax:mb-3"
        >
          <div className="flex items-center justify-center width-[fit-content]">
            <p className="text-xmedium text-dark text-center mobileMax:text-small">
              Potential for energy savings
            </p>
            <LegendsModal
              open={showLegendsModal}
              setOpen={(value) => setShowLegendsModal(value)}
              triggerClassName="legend-info"
            >
              <AiOutlineInfoCircle
                className="ml-2 cursor-pointer relative z-[2] text-medium"
                onClick={() => setShowLegendsModal(true)}
              />
            </LegendsModal>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardScreen;
