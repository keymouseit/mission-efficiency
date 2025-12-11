"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose, AiOutlineThunderbolt } from "react-icons/ai";
import { GiGrowth } from "react-icons/gi";
import { FaArrowTrendUp } from "react-icons/fa6";

interface StateProperties {
  name: string;
  TFEC?: string;
  energyIntensity?: string;
  region?: string;
}

interface DemandFlexibilityMapProps {
  data: any;
  hideHover?: boolean;
  maharashtraActive?: boolean;
}
const INDIA_TOPO_JSON = "/static/maps/india-states.json";

const DemandFlexibilityMap: React.FC<DemandFlexibilityMapProps> = ({
  hideHover = false,
  maharashtraActive = false,
  data,
}) => {
  const [selectedState, setSelectedState] = useState<StateProperties | null>(
    null
  );

  const mapRef = useRef<any>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const handleGeographyClick = (stateProps: any) => {
    setSelectedState(stateProps);
  };

  const handleCloseCard = () => {
    setSelectedState(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        cardRef.current &&
        !cardRef.current.contains(target) &&
        mapRef.current &&
        !mapRef.current.contains(target) &&
        selectedState
      ) {
        setSelectedState(null);
      }
    };

    if (selectedState) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedState]);

  function cleanHtmlToJson(messyHtmlString) {
    let clean = messyHtmlString
      ?.replace(/<[^>]*>/g, "")
      ?.replace(/,\s*}/g, "}")
      ?.replace(/,\s*]/g, "]")
      .trim();
    clean = clean
      ?.replace(/\s+/g, "")
      ?.replace(/}(?={)/g, "},{")
      ?.replace(/\[\{/g, "[{")
      ?.replace(/\}\]/g, "}]");

    clean = clean?.replace(/,(\s*[}\]])/g, "$1");

    try {
      return JSON.parse(clean);
    } catch (e) {
      console.error("Error", e);
      const finalAttempt = messyHtmlString
        ?.replace(/<[^>]*>/g, "")
        ?.replace(/["']?(\w+)["']?\s*:/g, '"$1":')
        ?.replace(/,\s*}/g, "}")
        ?.replace(/,\s*]/g, "]")
        .trim();

      return JSON.parse(finalAttempt);
    }
  }

  const parsed = cleanHtmlToJson(data?.field_description?.value);

  return (
    <div className="relative py-[120px] betweenMobileTab:py-16 mobileMax:py-10 bg-[#d0d2e9]">
      <div className="mini-container">
        <motion.h3 className="text-[42px] font-poppins text-center mb-[50px] betweenMobileTab:mb-10 mobileMax:mb-14 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip mobileMax:text-center mobileMax:text-[28px]">
          India Demand Flexibility Dashboard
        </motion.h3>
        <div className="flex flex-col mobileToDesk:flex-col mobileToDesk:items-center mt-20">
          <div className="flex items-center justify-center px-4 pt-4">
            <div
              className="w-full desktop:h-[700px] betweenMobileTab:h-[500px] mobileMax:h-[300px] -mt-20 relative"
              ref={mapRef}
            >
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 1000, center: [78.9629, 22.5937] }}
                className="w-full h-full"
              >
                <Geographies geography={INDIA_TOPO_JSON}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateProps = geo.properties;
                      const isMaharashtra =
                        stateProps?.name === "Maharashtra" && maharashtraActive;
                      const isLakshadweep = stateProps?.name === "Lakshadweep";
                      const isSelected =
                        selectedState?.name === stateProps?.name;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => handleGeographyClick(stateProps)}
                          style={{
                            default: {
                              fill: isLakshadweep
                                ? "#323ABB"
                                : isSelected
                                ? "#48DBB2"
                                : isMaharashtra
                                ? "#48DBB2"
                                : "#003350",
                              stroke: isLakshadweep ? "#323ABB" : "#fff",
                              strokeWidth: 0.5,
                              outline: "none",
                              cursor: "pointer",
                            },
                            hover: {
                              fill: isLakshadweep ? "#323ABB" : "#48DBB2",
                              stroke: isLakshadweep ? "#48DBB2" : "#fff",
                              strokeWidth: 0.7,
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: {
                              fill: isLakshadweep ? "#323ABB" : "#10B981",
                              stroke: "#fff",
                              strokeWidth: 0.7,
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>

              {selectedState &&
                (() => {
                  const dfData = parsed?.find(
                    (d) => d.state === selectedState?.name
                  );
                  return (
                    <div
                      ref={cardRef}
                      className="absolute desktop:right-[-28px] desktop:top-[240px] desktopLg:right-[-60px] desktopLg:top-[260px] right-0 top-[90%] mt-4 desktop:mt-0 desktop:w-[330px] w-full bg-white rounded-lg shadow-lg pt-[30px] p-4 max-h-[80vh] overflow-y-auto commonBoxShadow z-[1]"
                    >
                      <div className="text-black relative">
                        <button
                          onClick={handleCloseCard}
                          className="absolute -top-[25px] -right-3 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer z-10"
                          aria-label="Close card"
                        >
                          <AiOutlineClose className="text-md text-[#003350]" />
                        </button>
                        <div className="flex justify-between">
                          <div className="w-full">
                            <h6 className="text-[22px] text-transparent break-words leading-[28px] bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] overflow-hidden max-w-[250px] whitespace-normal font-bold font-numans betweenMobileTab:pt-0 text-gray-800">
                              {selectedState?.name}
                            </h6>
                            <p className="text-gray-600 text-sm leading-[16px]">
                              <span className="font-semibold">
                                {selectedState?.region}
                              </span>{" "}
                              <span className="text-[10px]">{`region`} </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col justify-center w-full my-2 pt-2 font-semibold">
                          <div className="flex justify-between">
                            <p className="text-[#828282] flex items-center">
                              <FaArrowTrendUp className="mr-1 text-[#48DBB2]" />
                              {`Peak load demand (In GW)`}
                            </p>
                            <p>{dfData?.pld || 0}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-[#828282] flex items-center">
                              <GiGrowth className="mr-1 text-[#48DBB2]" />
                              {`Peak Demand Growth`}
                            </p>
                            <p>
                              {dfData?.pdg || 0}
                              {`%`}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-[#828282] flex items-center">
                              <AiOutlineThunderbolt className="mr-1 text-[#48DBB2]" />
                              {`Share of RE in Electricity`}{" "}
                            </p>
                            <p>
                              {dfData?.share || 0}
                              {`%`}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between mt-4">
                          <div className="border-t border-[#828282] pt-2 font-semibold">
                            <p className="text-[20px] leading-4">
                              State Readiness
                            </p>
                            <p>Category Score</p>
                          </div>

                          <div className="font-semibold mt-2">
                            <p className="text-[32px] leading-7 text-right text-[#48DBB2]">
                              {dfData?.total || 0}
                            </p>
                            <p className="text-[#828282]">Total Score</p>
                          </div>
                        </div>
                        <div className="py-2 font-semibold mt-2">
                          <div className="flex justify-between">
                            <p className="text-[#828282]">Load behaviour</p>
                            <p>{dfData?.loadBehaviour || 0}/40</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-[#828282]">
                              Regulatory environment{" "}
                            </p>
                            <p>{dfData?.regulatoryEnvironment || 0}/16</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-[#828282]">Infrastructure</p>
                            <p>{dfData?.infrastructure || 0}/20</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-[#828282]">DSM Experience</p>
                            <p>{dfData?.dsmExperience || 0}/24</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandFlexibilityMap;
