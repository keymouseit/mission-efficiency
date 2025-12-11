"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { DemandFlexibilitySlider } from "@/constants";
import { MdChevronRight } from "react-icons/md";

const COUNTRIES_LIST = "/static/maps/countries.geo.json";

const WORLD_TOPO_JSON = COUNTRIES_LIST;

const countryCenters: Record<
  string,
  { coords: [number, number]; flag: string }
> = {
  India: { coords: [78.9629, 20.5937], flag: "/static/flags/in.svg" },
  Ghana: { coords: [-1.0232, 7.9465], flag: "/static/flags/gh.svg" },
  Kenya: { coords: [37.9062, -0.0236], flag: "/static/flags/ke.svg" },
};

export default function WorldMap() {
  const [selectedCountry, setSelectedCountry] = useState<string>("India");

  const isiOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="relative py-[120px] desktop:!pb-0 betweenMobileTab:py-16 mobileMax:py-10 bg-[linear-gradient(to_top,#003350,#248781,#37B29A,#48DBB2)] ">
      <div className="mini-container">
        <h2
          className="desktop:text-[52px] font-poppins font-semibold
							 leading-normal text-white text-center text-[48px] mobileMax:text-[28px] mobileMax:px-0 mb-[80px] betweenMobileTab:mb-0 mobileMax:mb-0"
        >
          Country Engagement
        </h2>
        <div className="flex mobileToDesk:flex-col mobileToDesk:items-center desktop:pb-20">
          <div className="flex flex-col items-center justify-center pt-4 mobileMax:pt-0 betweenMobileTab:mt-0 relative">
            <div
              className={`w-full h-[650px] betweenMobileTab:h-[450px] mobileMax:h-[400px] mobileMax:pb-10 ${
                isiOS ? "ios-map-container" : ""
              }`}
            >
              <style jsx>{`
                .ios-map-container {
                  transform: scale(1.2);
                  transform-origin: center center;
                  height: 400px !important;
                }

                .ios-map-container .map-blur-container {
                  height: 100% !important;
                }

                .map-blur-container svg {
                  filter: blur(0.3px);
                }

                @keyframes ripple-breathing {
                  0%,
                  100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0.4;
                    box-shadow: inset 0 0 2px rgba(45, 121, 168, 0.2);
                  }
                  50% {
                    transform: translate(-50%, -50%) scale(1.15);
                    opacity: 0.1;
                    box-shadow: inset 0 0 12px rgba(45, 121, 168, 0.7);
                  }
                }

                @keyframes ripple-breathing-active {
                  0%,
                  100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0.6;
                    box-shadow: inset 0 0 3px rgba(82, 241, 241, 0.4);
                  }
                  50% {
                    transform: translate(-50%, -50%) scale(1.2);
                    opacity: 0.15;
                    box-shadow: inset 0 0 16px rgba(82, 241, 241, 0.8);
                  }
                }

                @keyframes smooth-glow {
                  0%,
                  100% {
                    border-color: rgba(82, 241, 241, 0.6);
                    box-shadow: inset 0 0 4px rgba(82, 241, 241, 0.4),
                      inset 0 0 8px rgba(82, 241, 241, 0.2),
                      0 2px 4px rgba(0, 0, 0, 0.2);
                  }
                  50% {
                    border-color: rgba(82, 241, 241, 0.9);
                    box-shadow: inset 0 0 6px rgba(82, 241, 241, 0.7),
                      inset 0 0 12px rgba(82, 241, 241, 0.4),
                      0 2px 4px rgba(0, 0, 0, 0.2);
                  }
                }

                .flag-container {
                  position: relative;
                  width: 50px;
                  height: 50px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 50%;
                }

                .ripple-ring {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 35px;
                  height: 35px;
                  border: 1.5px solid rgba(45, 121, 168, 0.5);
                  border-radius: 50%;
                  animation: ripple-breathing 3s ease-in-out infinite;
                  pointer-events: none;
                }

                .ripple-ring.active {
                  border-color: rgba(82, 241, 241, 0.7);
                  animation: ripple-breathing-active 3s ease-in-out infinite;
                }

                .flag-marker {
                  position: relative;
                  border-radius: 50%;
                  overflow: hidden;
                  border: 2px solid white;
                  cursor: pointer;
                  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
                  z-index: 2;
                  filter: blur(0px) !important;
                }

                .flag-marker:hover {
                  transform: scale(1.03);
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
                }

                .flag-marker.active {
                  animation: smooth-glow 2.5s ease-in-out infinite;
                }
              `}</style>
              <div className="map-blur-container w-full h-full">
                <ComposableMap
                  projection="geoEqualEarth"
                  projectionConfig={{
                    scale: 190,
                    center: [0, 0],
                  }}
                  className="w-full h-full"
                >
                  <defs>
                    <filter
                      id="coastShadow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feGaussianBlur
                        in="SourceAlpha"
                        stdDeviation="4"
                        result="blur"
                      />
                      <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
                        result="shadow"
                      />
                      <feMerge>
                        <feMergeNode in="shadow" />
                      </feMerge>
                    </filter>
                  </defs>

                  <g filter="url(#coastShadow)">
                    <Geographies geography={WORLD_TOPO_JSON}>
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey + "-shadow"}
                            geography={geo}
                            style={{
                              default: {},
                            }}
                          />
                        ))
                      }
                    </Geographies>
                  </g>

                  <Geographies geography={WORLD_TOPO_JSON}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            style={{
                              default: {
                                fill: "#5DE29B",
                                outline: "none",
                              },
                              hover: {
                                fill: "#5DE29B",
                                outline: "none",
                                cursor: "pointer",
                              },
                              pressed: {
                                fill: "#5DE29B",
                                outline: "none",
                              },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>

                  {Object.entries(countryCenters).map(
                    ([name, { coords, flag }]) => {
                      const isActive = selectedCountry === name;
                      const clipId = `flag-clip-${name}`;
                      return (
                        <Marker
                          key={name}
                          coordinates={coords}
                          onClick={() =>
                            setSelectedCountry && setSelectedCountry(name)
                          }
                        >
                          {isiOS ? (
                            <g transform="translate(-12,-12)">
                              <defs>
                                <clipPath id={clipId}>
                                  <circle cx="20" cy="20" r="20" />
                                </clipPath>
                              </defs>

                              {/* Outer white circular border */}
                              <circle cx="20" cy="20" r="20" fill="#ffffff" />

                              {/* Centered flag image */}
                              <foreignObject
                                x="2"
                                y="2"
                                width="36"
                                height="36"
                                clipPath={`url(#${clipId})`}
                              >
                                <div
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "100%",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "white",
                                  }}
                                >
                                  <img
                                    src={flag}
                                    alt="flag"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      borderRadius: "100%",
                                      display: "block",
                                    }}
                                  />
                                </div>
                              </foreignObject>
                            </g>
                          ) : (
                            <foreignObject
                              x={-25}
                              y={-25}
                              width={50}
                              height={50}
                            >
                              <div className="flag-container">
                                <div
                                  className={`ripple-ring ${
                                    isActive ? "active" : ""
                                  }`}
                                ></div>
                                <div
                                  className={`flag-marker ${
                                    isActive ? "active" : ""
                                  }`}
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "white",
                                    padding: "0",
                                    overflow: "hidden",
                                  }}
                                >
                                  <Image
                                    src={flag}
                                    alt={`${name} flag`}
                                    width={24}
                                    height={24}
                                    style={{
                                      objectFit: "cover",
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "50%",
                                    }}
                                  />
                                </div>
                              </div>
                            </foreignObject>
                          )}
                        </Marker>
                      );
                    }
                  )}
                </ComposableMap>
              </div>
            </div>

            {/* <img src="/static/images/map.png" alt="" /> */}
            <p className="absolute w-full flex flex-col text-center text-[12px] text-white bottom-0 desktop:right-5 mb-5 mobileToDesk:px-5">
              <span className="inline-block">
                *The boundaries and names shown and the designations used
              </span>
              <span>
                on this map do not imply official endorsement or acceptance by
                the United Nations.
              </span>
            </p>
          </div>
          <motion.div
            className="max-w-[450px] tab:max-w-[350px] tab:min-w-[350px] overflow-hidden bg-white flex flex-col h-full rounded-lg shadow-md hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0,
              border: {
                duration: 1.8,
                ease: "easeInOut",
              },
            }}
          >
            <div
              className={`flex justify-center items-center h-[250px] tab:h-[250px] hover:scale-105 transition-all duration-700 overflow-hidden`}
            >
              <Image
                src={
                  selectedCountry.toLowerCase() === "india"
                    ? `/static/images/india-states.webp`
                    : selectedCountry.toLowerCase() === "ghana"
                    ? `/static/images/ghana-states.webp`
                    : `/static/images/kenya-states.webp`
                }
                alt="country states map"
                className="h-full w-full object-cover"
                width={500}
                height={250}
                priority
              />
            </div>

            <div className="country-slider">
              {DemandFlexibilitySlider.map((desc: any, index: number) => (
                <div key={index} className="px-5 mb-[20px] mt-6">
                  <p className="text-[22px] font-poppins text-center mb-3 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip mobileMax:text-xmedium">
                    {selectedCountry}
                  </p>
                  <ul className="list-disc text-small font-normal mb-5 mobileMax:text-xsmall text-[#828282] ml-[20px]">
                    {selectedCountry === "India" && (
                      <>
                        <li>
                          India has established itself as a global leader across
                          all pillars of the energy transition.
                        </li>
                        <li>
                          Since 2000, the country has provided access to
                          electricity to over 700 million people
                        </li>
                        <li>
                          With the G20 Presidency in 2023, India demonstrated
                          its leadership
                        </li>
                      </>
                    )}
                  </ul>
                  <Link
                    href={
                      selectedCountry !== "India"
                        ? "#"
                        : "/country-engagement/india"
                    }
                    target="_blank"
                    className={`px-[23px] py-[12px] flex justify-center max-w-[70%] min-w-[60%] font-poppins bg-[linear-gradient(to_right,#48DBB2,#003350)] text-white
                                                          text-small font-semibold rounded-lg mx-auto text-center mobileMax:max-w-full 
														 ${
                               selectedCountry !== "India"
                                 ? "pointer-events-none opacity-50 cursor-not-allowed"
                                 : "hover:!underline !no-underline"
                             }`}
                    onClick={(e) =>
                      selectedCountry !== "India" && e.preventDefault()
                    }
                  >
                    {selectedCountry === "India"
                      ? "Learn More"
                      : "Coming Soon..."}
                    <MdChevronRight className="text-[25px] ml-0.5" />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
