"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface StateProperties {
  name: string;
  TFEC?: string;
  energyIntensity?: string;
  region?: string;
  SEEAP_URL?: string;
  action_URL?: string;
}

interface StateData {
  state: string;
  region?: string;
  TFEC?: string | number;
  energyIntensity?: string | number;
  action_URL?: string;
  SEEAP_URL?: string;
  [key: string]: any;
}

interface IPosition {
  x: number;
  y: number;
}

const INDIA_TOPO_JSON = "/static/maps/india-states.json";

interface IndiaMapProps {
  data: any;
  hideHover?: boolean;
  maharashtraActive?: boolean;
  isDemandFlexibility?: boolean;
}

const IndiaMap: React.FC<IndiaMapProps> = ({
  hideHover = false,
  maharashtraActive = false,
  isDemandFlexibility = false,
  data,
}) => {
  const [hoveredState, setHoveredState] = useState<StateProperties | null>(
    null
  );
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [mapHoverCoordinates, setMapHoverCoordinates] =
    useState<IPosition | null>(null);
  const [isMouseOverTooltip, setIsMouseOverTooltip] = useState(false);
  const [clickedState, setClickedState] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<StateData[]>([]);

  const mapRef = useRef<any>({});
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any pending timeouts
  const clearTimeouts = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
  }, []);

  // Show tooltip with proper timing
  const showTooltip = useCallback(
    (stateProps: any, event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
      clearTimeouts();
      // Set coordinates and state first
      const coordinates = { x: event.clientX, y: event.clientY };

      // Set everything together to prevent animation
      setMapHoverCoordinates(coordinates);
      setHoveredState(stateProps);
      setIsTooltipOpen(true);
    },
    [clearTimeouts]
  );

  // Hide tooltip with delay - longer delay for small states
  const hideTooltip = useCallback(() => {
    clearTimeouts();
    hideTimeoutRef.current = setTimeout(() => {
      if (!isMouseOverTooltip) {
        setHoveredState(null);
        setIsTooltipOpen(false);
        setMapHoverCoordinates(null);
      }
    }, 300);
  }, [clearTimeouts, isMouseOverTooltip]);

  // Keep tooltip visible
  const keepTooltipVisible = useCallback(() => {
    clearTimeouts();
    setIsMouseOverTooltip(true);
  }, [clearTimeouts]);

  // Handle tooltip mouse leave
  const handleTooltipMouseLeave = useCallback(() => {
    setIsMouseOverTooltip(false);
    // For isDemandFlexibility, hide tooltip on mouse leave (original hover behavior)
    // For !isDemandFlexibility, keep it open (click-based behavior)
    if (isDemandFlexibility) {
      hideTooltip();
    }
  }, [hideTooltip, isDemandFlexibility]);

  const handleGeographyMouseEnter = (
    stateProps: any,
    event: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    // Only show tooltip on hover for isDemandFlexibility
    if (!hideHover && isDemandFlexibility) {
      setIsMouseOverTooltip(false);
      showTooltip(stateProps, event);
    }
  };

  const handleGeographyMouseLeave = () => {
    // Only hide tooltip on mouse leave for isDemandFlexibility
    if (isDemandFlexibility) {
      hideTooltip();
    }
  };

  const handleGeographyClick = (
    stateProps: any,
    event: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    // Show tooltip on click for !isDemandFlexibility
    if (!hideHover && !isDemandFlexibility) {
      event.stopPropagation();
      setIsMouseOverTooltip(false);
      setClickedState(stateProps.name);
      showTooltip(stateProps, event);
    }
  };

  // Close tooltip function
  const closeTooltip = useCallback(() => {
    setHoveredState(null);
    setIsTooltipOpen(false);
    setClickedState(null);
    setIsMouseOverTooltip(false);
    setMapHoverCoordinates(null);
    clearTimeouts();
  }, [clearTimeouts]);

  // Handle outside click
  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (!isDemandFlexibility && isTooltipOpen) {
        const target = event.target as Element;

        // Check if click is inside the tooltip container
        const isInsideTooltip =
          tooltipRef.current && tooltipRef.current.contains(target);

        // Check if click is inside the map
        const isInsideMap = target.closest("svg");

        // Close tooltip if click is outside all of the above
        if (!isInsideTooltip && !isInsideMap) {
          closeTooltip();
        }
      }
    },
    [isDemandFlexibility, isTooltipOpen, closeTooltip]
  );

  // Handle scroll to close tooltip
  const handleScroll = useCallback(() => {
    if (!isDemandFlexibility && isTooltipOpen) {
      closeTooltip();
    }
  }, [isDemandFlexibility, isTooltipOpen, closeTooltip]);

  // Add outside click and scroll listeners
  useEffect(() => {
    if (!isDemandFlexibility && isTooltipOpen) {
      // Use a small delay to prevent immediate closing
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        window.addEventListener("scroll", handleScroll, { passive: true });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleOutsideClick);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isDemandFlexibility, isTooltipOpen, handleOutsideClick, handleScroll]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  // Calculate tooltip position
  const getTooltipPosition = () => {
    if (!mapHoverCoordinates) return { left: 0, top: 0 };

    const offset = window?.innerWidth > 768 ? 35 : 20;
    const place = window?.innerWidth > 768 ? "right" : "bottom";

    if (place === "right") {
      return {
        left: mapHoverCoordinates.x + offset,
        top: mapHoverCoordinates.y,
      };
    } else {
      return {
        left: mapHoverCoordinates.x,
        top: mapHoverCoordinates.y + offset,
      };
    }
  };

  const tooltipPosition = getTooltipPosition();

  useEffect(() => {
    if (!data?.field_description?.processed) return;

    try {
      const parsed = cleanHtmlToJson(data.field_description.value);

      if (Array.isArray(parsed)) {
        setParsedData(parsed);
      } else {
        console.error("Parsed data is not an array", parsed);
      }
    } catch (err) {
      console.error("JSON Parse Error:", err);
    }
  }, [data]);

  function cleanHtmlToJson(messyHtmlString: string) {
    // Remove HTML tags
    let clean = messyHtmlString?.replace(/<[^>]*>/g, "").trim();

    try {
      // Directly parse JSON if possible
      return JSON.parse(clean);
    } catch (e) {
      // If parsing fails, fix quotes around keys
      clean = clean?.replace(/["']?(\w+)["']?\s*:/g, '"$1":');
      clean = clean?.replace(/,\s*}/g, "}")?.replace(/,\s*]/g, "]").trim();
      return JSON.parse(clean);
    }
  }

  return (
    <div className="relative py-[120px] betweenMobileTab:py-16 mobileMax:py-10 bg-mapGray">
      <div className="mini-container">
        <motion.h3 className="text-[42px] font-poppins text-center mb-[50px] betweenMobileTab:mb-10 mobileMax:mb-8 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip mobileMax:text-center mobileMax:text-[28px]">
          India Energy Efficiency Dashboard
        </motion.h3>
        <div className="flex flex-col mobileToDesk:flex-col mobileToDesk:items-center mt-20">
          <div className="flex items-center justify-center px-4 pt-4">
            <div
              className="w-full desktop:h-[700px] betweenMobileTab:h-[500px] mobileMax:h-[300px] -mt-20"
              ref={mapRef}
              onClick={(e) => {
                // Handle outside click for !isDemandFlexibility
                if (!isDemandFlexibility && isTooltipOpen) {
                  const target = e.target as Element;
                  // Only close if clicking on the container itself, not its children
                  if (target === e.currentTarget) {
                    closeTooltip();
                  }
                }
              }}
            >
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 1000, center: [78.9629, 22.5937] }}
                className="w-full h-full"
                onClick={(e) => {
                  // Close tooltip when clicking on empty map areas for !isDemandFlexibility
                  if (!isDemandFlexibility && isTooltipOpen) {
                    closeTooltip();
                  }
                }}
              >
                <Geographies geography={INDIA_TOPO_JSON}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateProps = geo.properties;
                      const isMaharashtra =
                        stateProps?.name === "Maharashtra" && maharashtraActive;
                      const isClicked = clickedState === stateProps?.name;
                      const isLakshadweep = stateProps?.name === "Lakshadweep";

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(event) =>
                            handleGeographyMouseEnter(stateProps, event)
                          }
                          onMouseLeave={handleGeographyMouseLeave}
                          onClick={(event) =>
                            handleGeographyClick(stateProps, event)
                          }
                          style={{
                            default: {
                              fill: isLakshadweep
                                ? "#323ABB"
                                : isClicked
                                ? "#48DBB2"
                                : isMaharashtra
                                ? "#48DBB2"
                                : "#003350",
                              stroke: isLakshadweep ? "#323ABB" : "#fff",
                              strokeWidth: isClicked ? 1 : 0.5,
                              outline: "none",
                              cursor: "pointer",
                            },
                            hover: {
                              fill: isLakshadweep
                                ? "#323ABB"
                                : isClicked
                                ? "#48DBB2"
                                : "#48DBB2",
                              stroke: isLakshadweep ? "#48DBB2" : "#fff",
                              strokeWidth: isClicked ? 1.2 : 0.7,
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: {
                              fill: isLakshadweep ? "#323ABB	" : "#48DBB2",
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

              {isTooltipOpen &&
                hoveredState &&
                (() => {
                  const dfData = parsedData?.find(
                    (d) => d.state === hoveredState?.name
                  );

                  return (
                    <div
                      ref={tooltipRef}
                      className="fixed z-[9999] desktop:w-[300px] w-[250px] minMobile:w-full minMobile:max-w-[250px] bg-white rounded-lg shadow-lg"
                      style={{
                        left: `${tooltipPosition.left}px`,
                        top: `${tooltipPosition.top}px`,
                        transform:
                          window?.innerWidth > 768
                            ? "translateY(-50%)"
                            : "translateX(-50%)",
                      }}
                      onMouseEnter={keepTooltipVisible}
                      onMouseLeave={handleTooltipMouseLeave}
                    >
                      <div
                        className="absolute w-0 h-0"
                        style={{
                          ...(window?.innerWidth > 768
                            ? {
                                left: "-30px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                borderTop: "15px solid transparent",
                                borderBottom: "15px solid transparent",
                                borderRight: "30px solid white",
                              }
                            : {
                                left: "50%",
                                top: "-8px",
                                transform: "translateX(-50%)",
                                borderLeft: "8px solid transparent",
                                borderRight: "8px solid transparent",
                                borderBottom: "8px solid white",
                              }),
                        }}
                      />

                      <div className="p-4">
                        <h6 className="text-[22px] leading-[26px] text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-center overflow-hidden max-w-[95%] font-bold font-numans text-gray-800">
                          {dfData?.state}
                        </h6>

                        <p className="text-gray-600 text-sm text-center mt-1">
                          Region:{" "}
                          <span className="font-semibold">
                            {dfData?.region}
                          </span>
                        </p>

                        <div className="flex flex-col items-center justify-center w-full mt-4">
                          <p className="text-gray-600 text-sm text-center">
                            Per Capita TFEC (TOE):{" "}
                            <span className="font-semibold">
                              {dfData?.TFEC}
                            </span>
                          </p>

                          <p className="text-gray-600 text-sm text-center">
                            Energy Intensity (MJ/USD):{" "}
                            <span className="font-semibold">
                              {dfData?.energyIntensity}
                            </span>
                          </p>

                          <div className="w-full flex flex-col items-center justify-center gap-2 mt-4">
                            {dfData?.action_URL && (
                              <Link
                                href={dfData?.action_URL}
                                target="_blank"
                                className="px-3 py-1 bg-[linear-gradient(to_right,#48DBB2,#003350)] !text-white font-semibold text-[10px] desktop:text-xs rounded transition-colors"
                              >
                                Plan Summary
                              </Link>
                            )}

                            {dfData?.SEEAP_URL && (
                              <Link
                                href={dfData?.SEEAP_URL}
                                target="_blank"
                                className="px-3 py-1 bg-[linear-gradient(to_right,#48DBB2,#003350)] !text-white font-semibold text-[10px] desktop:text-xs rounded transition-colors"
                              >
                                State Energy Efficiency Action Plan
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
            </div>
          </div>
          <p className="w-full flex flex-col max-w-[880px] mx-auto text-center text-[12px] text-gray pb-4">
            *The data is for the financial year 2020–21.
            <span className="">
              *The boundaries and names shown and the designations used
            </span>
            <span className="">
              on this map do not imply official endorsement or acceptance by the
              United Nations.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
