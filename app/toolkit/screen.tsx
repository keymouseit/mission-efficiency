"use client";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import geos from "../../public/resources/mappings/countries.geo.json";
import { Tooltip as ReactTooltip } from "react-tooltip";
// import { countries } from "../lib/constants/countries";
import {
  createQueryString,
  findRegionFromISO,
  getAlpha2FromISO,
  getColor,
  getColorFromStat,
  getPolygonInfo,
  getPotentialFromStat,
  getSectorByEfficiency,
} from "@/lib/utils";
import { DrupalNode } from "next-drupal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PotentialIndicator from "@/components/PotentialIndicator";
import { FaArrowRotateLeft } from "react-icons/fa6";
import {
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiOutlineInfoCircle,
  AiOutlineClose,
} from "react-icons/ai";
import countries, { CONSTS } from "@/lib/constants";
import slugify from "slugify";
// import CommonComboBox from "@/components/CommonComboBox";
import LegendsModal from "@/components/LegendsModal";
import CountryOverviewModal from "@/components/CountryOverviewModal";
import { useRef } from "react";
import CommonReactSelect from "@/components/CommonReactSelect";
import OrientationBlocker from "@/components/OrientationBlocker";
// import axios from "axios";

interface MapScreenInterface {
  mapData: DrupalNode[] | null;
}
type SectorEntity =
  | "field_services_score"
  | "field_transport_score"
  | "field_residential_score"
  | "field_industry_score"
  | "field_electricity_and_heat_score"
  | undefined;

const MapScreen: React.FC<MapScreenInterface> = ({ mapData = [] }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<Boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedSector, setSelectedSector] = useState<SectorEntity>(undefined);
  const [hoveredData, setHoveredData] = useState<any>();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [showMapReset, setShowMapReset] = useState<Boolean>(false);
  const [showSelectorReset, setShowSelectorReset] = useState(false);
  const [showLegendsModal, setShowLegendsModal] = useState<Boolean>(false);
  const [countryOverviewModalOpen, setCountryOverviewModalOpen] =
    useState<Boolean>(false);
  const [mapClickCoordinates, setMapClickCoordinates] = useState<{
    x: null | number;
    y: null | number;
  }>({
    x: 160,
    y: 650,
  });
  const [zoom, setZoom] = useState(CONSTS.ZOOM);
  const [center, setCenter] = useState<[number, number]>(CONSTS.MAP_CENTER);
  const [mapInitialCenter, setMapInitialCenter] = useState<
    [number, number] | null
  >(null);
  const [userLocationMode, setUserLocationMode] = useState<Boolean>(true);
  const [orientation, setOrientation] = useState("portrait-primary");
  const [scale, setScale] = useState(110);

  const mapRef = useRef<any>({});

  const handleUserGeoSelect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          const polygonInfo = getPolygonInfo(longitude, latitude);
          if (polygonInfo) {
            setUserLocationMode(true);
            if (polygonInfo.properties.name) {
              // prefetch the user country page at getting the polygon
              router.prefetch(
                `/toolkit/${slugify(polygonInfo.properties.name, {
                  lower: true,
                })}/dashboard`
              );
            }
            const countryCode = polygonInfo.properties["Alpha-2"] || "";
            handleCountrySelect(countryCode);
            setCenter([longitude, latitude]);
            const clientCenter = {
              x: Number(mapRef.current?.clientWidth) / 2,
              y: Number(mapRef.current?.clientHeight) / 2,
            };

            setMapClickCoordinates(clientCenter);
            setIsTooltipOpen(true);
            setZoom(CONSTS.MAX_ZOOM);
          } else {
            setUserLocationMode(false);
          }
        },
        (error) => {
          console.error(error.message);
          setUserLocationMode(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUserLocationMode(false);
    }
  };

  const handleCountrySelect = (countryCode: string) => {
    const matchedCountry = countries.find(
      (country) => country.code === countryCode
    );

    //

    if (selectedCountry) {
      setIsTooltipOpen(true);
    }
    setSelectedCountry(matchedCountry);
  };

  const resetMapPosition = () => {
    setZoom(CONSTS.ZOOM);
    setCenter(CONSTS.MAP_CENTER);
    setShowMapReset(false);
  };

  // const resetMapState = () => {
  //   setIsTooltipOpen(false);
  //   setSelectedCountry(null);
  // };

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      event.stopPropagation();
      setIsTooltipOpen(false);
      setUserLocationMode(false);
    });
    handleUserGeoSelect();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth < 767) {
        setIsMobile(true);
      }
    }
  }, []);

  const handleGeographyClick = (
    geography: any,
    event: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    setMapClickCoordinates({ x: event.clientX, y: event.clientY });
    handleCountrySelect(geography.properties["Alpha-2"]);
  };

  const renderStateGeographies = useCallback(
    ({ geographies }: { geographies: any }) => {
      return geographies.map((geo: any) => {
        const color: any = getColor(
          geo,
          mapData as DrupalNode[],
          selectedCountry,
          selectedSector || "field_country_score"
        );
        return (
          <Geography
            key={`${geo.rsmKey}`}
            data-tooltip-id="my-tooltip"
            geography={geo}
            onMouseEnter={() => setHoveredData(geo)}
            onMouseLeave={() => setHoveredData(null)}
            onClick={(event) => {
              if (geo.id) {
                setIsTooltipOpen(true);
                handleGeographyClick(geo, event);
                setShowSelectorReset(true);
              }
            }}
            style={{
              default: {
                fill: color,
                outline: "none",
                stroke: "white",
                strokeWidth: 0.1,
                opacity: 1,
                pointerEvents: "auto",
              },
              hover: {
                fill: color,
                outline: "none",
                stroke: "white",
                strokeWidth: window?.innerWidth > 1200 ? 1 : 0.1,
                opacity: window?.innerWidth > 1200 ? 0.7 : 1,
                cursor: "pointer",
                pointerEvents: "auto",
              },
            }}
          />
        );
      });
    },
    [hoveredData, selectedCountry, selectedSector, isTooltipOpen]
  );

  const getSelectedCountryMapData = (selectedCountry: {
    country_iso: string;
  }) => {
    let countryMapData = {} as DrupalNode;
    if (selectedCountry) {
      mapData?.forEach((data) => {
        if (data.field_iso_code === selectedCountry?.country_iso) {
          countryMapData = data;
        }
      });
    }
    return countryMapData;
  };

  const getImprovementValue = () => {
    const selectedCountryMapData = getSelectedCountryMapData(selectedCountry);
    const value =
      selectedCountryMapData?.[selectedSector || "field_country_score"];
    if (value) {
      return value;
    }
  };

  const mapZoom = (value: "IN" | "OUT") => {
    setIsTooltipOpen(false);
    const panValue = 0.8;
    switch (value) {
      case "IN":
        const zoomInValue = zoom + panValue;
        const newCalculatedZoomIn =
          zoomInValue >= CONSTS.MAX_ZOOM ? CONSTS.MAX_ZOOM : zoomInValue;
        setZoom(newCalculatedZoomIn);
        break;
      case "OUT":
        const zoomOutValue = zoom - panValue;
        const newCalculatedZoomOut =
          zoomOutValue <= CONSTS.ZOOM ? CONSTS.ZOOM : zoomOutValue;
        setZoom(newCalculatedZoomOut);
        if (newCalculatedZoomOut === CONSTS.ZOOM) {
          setShowMapReset(false);
        }
        break;

      default:
        break;
    }
  };

  const navigateToMatchmaking = (countryIso: string) => {
    const country = mapData?.find(
      (element) => element.field_iso_code === countryIso
    );
    const sectorInfo = getSectorByEfficiency(country);
    if (country) {
      const countryRegion = findRegionFromISO(
        selectedCountry.country_iso,
        mapData as DrupalNode[]
      );
      const query = createQueryString({
        sector: sectorInfo?.title || "",
        region: countryRegion?.name || "",
      });
      router.push(
        `/toolkit/${slugify(country.title, { lower: true })}/tools${query}`
      );
    }
  };

  const fetchCountryCoordinatesAndFocus = async (country: any) => {
    try {
      setIsTooltipOpen(false);
      await fetch(`https://restcountries.com/v3.1/alpha/${country.country_iso}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const countryData = data[0];
            setCenter(countryData?.latlng?.reverse());
            setZoom(CONSTS.MAX_ZOOM);
            setSelectedCountry(country);
            const clientCenter = {
              x: Number(mapRef.current?.clientWidth) / 2,
              y: Number(mapRef.current?.clientHeight) / 2,
            };
            setMapClickCoordinates(clientCenter);
            setIsTooltipOpen(true);
          }
        });
    } catch (error) {
      console.error("Error fetching country coordinates", error);
    }
  };

  const countrySelectorSelect = (countryIso?: string) => {
    scrollMapToTop();
    setShowSelectorReset(true);
    if (countryIso) {
      const countryAlpha2 = getAlpha2FromISO(countryIso) || "";
      setMapClickCoordinates({
        x: 160,
        y: 650,
      });
      const matchedCountry = countries.find(
        (country) => country.code === countryAlpha2
      );
      if (matchedCountry) {
        fetchCountryCoordinatesAndFocus(matchedCountry);
      }
    } else {
      setSelectedCountry(null);
      setIsTooltipOpen(false);
    }
  };

  const makeCountryOptions = () => {
    const options = mapData?.map((data) => {
      return {
        value: data.field_iso_code,
        label: data.title,
      };
    });
    return options;
  };

  const makeSectorOptions = () => {
    const options = CONSTS.SECTORS_LIST.map((data) => {
      return {
        value: data.field_name,
        label: data.title,
      };
    });
    return options;
  };

  const showPotential = () => {
    const potentialStat = getImprovementValue() || null;

    if (potentialStat) {
      return getPotentialFromStat(potentialStat);
    }
  };

  const showPotentialColor = () => {
    const potentialStat = getImprovementValue() || null;

    if (potentialStat) {
      return getColorFromStat(potentialStat);
    }
  };

  const scrollMapToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  };
  // find landscape mode
  const handleResize = () => {
    const orientation = getOrientation();

    if (orientation) {
      setOrientation(orientation);
    }
  };

  const getOrientation = () => {
    if (typeof window !== "undefined") {
      if (window) {
        if (window?.innerWidth > window?.innerHeight) {
          return "landscape-primary" || "landscape-secondary";
        }
      }
    }
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("orientationchange", (event: any) => {
      if (
        event?.currentTarget?.orientation === 90 ||
        event?.currentTarget?.orientation === -90
      ) {
      }
      if (
        event?.currentTarget?.orientation === 0 ||
        event?.currentTarget?.orientation === 180
      ) {
        window.location.reload();
      }
    });
  }, []);
console.log(orientation,"orentation")
  useEffect(() => {
    window?.addEventListener("resize", handleResize);
    const screenWidth = window.innerWidth;
    const isCustomMobileLandscapeMode = screenWidth >= 320 && screenWidth <= 990 && window.screen.orientation && (window.screen.orientation.angle === 90 || window.screen.orientation.angle === -90);
    const isCustomTabLandscapeMode = screenWidth >= 768 && screenWidth <= 1181 && window.screen.orientation && (window.screen.orientation.angle === 90 || window.screen.orientation.angle === -90);
    if(orientation == "landscape-primary" && isCustomTabLandscapeMode) {
      setScale(80);
    }
    if(orientation == "landscape-primary" && isCustomMobileLandscapeMode) {
      setScale(70);
    }

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, [orientation]);
console.log(scale,"scale")
  return (
    <>
      {/* <OrientationBlocker /> */}
      <motion.div
        className="absolute top-[90px] w-[100%] flex flex-row justify-center mt-5 mobileToDesk:mt-1 z-[2]"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          duration: 1.5,
        }}
      >
        <h1 className="text-xl w-[980px] font-light tracking-tight text-gray-900 text-xl map-heading">
          Opportunity to drive progress through energy efficiency
        </h1>
      </motion.div>
      <motion.div
        className={`app-menu-shadow ${
          true && "show-shadow"
        } absolute w-[100%] top-0 border-none justify-between flex px-[16px] py-[8px] min-h-[80px]`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1.5,
        }}
      ></motion.div>
      <div className="w-full">
        <div className={`mapCard-map-container`} ref={mapRef}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: scale,
            }}
            style={{
              width: "100%",
              height: "80vh",
              pointerEvents: "none",
            }}
            className="adjust-map-height"
          >
            <ZoomableGroup
              center={center}
              zoom={zoom}
              minZoom={zoom}
              maxZoom={zoom}
              onMoveStart={({ coordinates }) =>
                setMapInitialCenter(coordinates)
              }
              onMove={() => {
                setUserLocationMode(false);
              }}
              onMoveEnd={({ coordinates, zoom }) => {
                setZoom(zoom);
                setCenter(coordinates);
                if (
                  JSON.stringify(mapInitialCenter) !==
                  JSON.stringify(coordinates)
                ) {
                  setShowMapReset(true);
                  setIsTooltipOpen(false);
                }
              }}
            >
              <Geographies geography={geos}>
                {renderStateGeographies}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          <div className="w-[90%] absolute desktopMd:top-[125px] top-[180px] laptopMax:w-[96%] map-icons">
            {!userLocationMode && (
              <div className="absolute top-0 right-0 flex flex-col map-controllers">
                <motion.div
                  className=""
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    duration: 0.5,
                  }}
                >
                  <Button
                    role="button"
                    aria-label="zoom in buttom"
                    className="cursor-pointer map-options-btn"
                    onClick={() => {
                      mapZoom("IN");
                      setShowMapReset(true);
                    }}
                  >
                    <AiOutlineZoomIn className="change-svg-fill" />
                  </Button>
                </motion.div>
                <motion.div
                  className=""
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    duration: 0.5,
                    delay: 0.3,
                  }}
                >
                  <Button
                    role="button"
                    aria-label="zoom out buttom"
                    className="cursor-pointer map-options-btn"
                    onClick={() => {
                      mapZoom("OUT");
                    }}
                  >
                    <AiOutlineZoomOut className="change-svg-fill" />
                  </Button>
                </motion.div>
                {(zoom > CONSTS.ZOOM || showMapReset) && (
                  <motion.div
                    className=""
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      duration: 0.5,
                      delay: 0.4,
                    }}
                  >
                    <Button
                      role="button"
                      aria-label="reset buttom"
                      className="cursor-pointer map-options-btn"
                      onClick={() => {
                        resetMapPosition();
                        setShowMapReset(false);
                        setIsTooltipOpen(false);
                      }}
                    >
                      <FaArrowRotateLeft className="change-svg-fill p-1" />
                    </Button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full px-6 relative left-1/2 -translate-x-1/2 bottom-[33px] app-landscape-bottom z-[40]">
        <div className="app-legends">
          {userLocationMode && (
            <div className="h-[104px] mobileMax:h-[168px]" />
          )}
          {!userLocationMode && (
            <div className="mx-auto relative mobileMax:w-full mb-8 mobileMax:mb-6 app-legends-select">
              <div className="w-[500px] desktop:mb-8 mb-4 flex items-center justify-between relative mobileMax:w-full mobileMax:flex-col mobileMax:mb-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    duration: 0.5,
                    delay: 0.3,
                  }}
                  className="w-[240px] mr-2 mobileMax:w-full mobileMax:mb-2 mobileMax:mx-0"
                >
                  <CommonReactSelect
                    list={makeCountryOptions()}
                    value={selectedCountry?.country_iso}
                    placeholder="Select Country"
                    onSelectChange={countrySelectorSelect}
                    minMenuListHeight={isMobile ? 120 : 230}
                    maxMenuListHeight={isMobile ? 120 : 230}
                    onFocus={() => setIsTooltipOpen(false)}
                    // onBlur={() => setIsTooltipOpen(true)}
                  />
                  {/* <CommonComboBox
                    list={makeCountryOptions()}
                    value={selectedCountry?.country_iso}
                    placeholder="Select Country"
                    searchPlaceholder="Search Country"
                    onSelectChange={countrySelectorSelect}
                    emptyCommandClassName="mobileMax:h-[260px] mobileMax:px-4 mobileMax:pt-6 laptopMax:items-start aboveLaptop:items-start laptopMax:h-[240px] aboveLaptop:h-[350px]"
                    commandGrpClassName="mobileMax:h-[250px] laptopMax:h-[240px] aboveLaptop:h-[400px]"
                  /> */}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    duration: 0.5,
                    delay: 0.3,
                  }}
                  className="w-[240px] mx-2 mobileMax:w-full mobileMax:mb-2 mobileMax:mx-0"
                >
                  {/* <CommonComboBox
                    list={makeSectorOptions()}
                    value={selectedSector}
                    placeholder="Select Sector"
                    searchPlaceholder="Search Sector"
                    onSelectChange={(value: string) => {
                      setShowSelectorReset(true);
                      setSelectedSector(value as SectorEntity);
                    }}
                    emptyCommandClassName="mobileMax:h-[260px] mobileMax:px-4 mobileMax:pt-6 laptopMax:items-start aboveLaptop:items-start laptopMax:h-[240px] aboveLaptop:h-[350px]"
                    commandGrpClassName="mobileMax:h-[255px] laptopMax:h-[240px] aboveLaptop:h-[400px]"
                  /> */}
                  <CommonReactSelect
                    list={makeSectorOptions()}
                    value={selectedSector}
                    placeholder="Select Sector"
                    onSelectChange={(value: string) => {
                      setShowSelectorReset(true);
                      setSelectedSector(value as SectorEntity);
                      // if (selectedCountry) {
                      //   setIsTooltipOpen(true);
                      // }
                    }}
                    minMenuListHeight={isMobile ? 120 : 230}
                    maxMenuListHeight={isMobile ? 120 : 230}
                    onFocus={() => setIsTooltipOpen(false)}
                    // onBlur={() => setIsTooltipOpen(true)}
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: window?.innerWidth > 1200 ? 1.2 : 1 }}
                transition={{
                  type: "spring",
                  duration: 0.5,
                }}
                className={`clearBtn desktop:absolute desktop:right-[-135px] desktop:top-0 cursor-pointer `}
                onClick={() => {
                  if (showSelectorReset || selectedCountry || selectedSector) {
                    setSelectedCountry(null);
                    setSelectedSector(undefined);
                    setShowSelectorReset(false);
                    setIsTooltipOpen(false);
                    resetMapPosition();
                  }
                }}
                style={{
                  visibility:
                    showSelectorReset || selectedCountry || selectedSector
                      ? "visible"
                      : "hidden",
                }}
              >
                <span className="block capitalize rounded-full bg-muted px-4 py-1 border border-borderColor flex items-center justify-center min-h-[40px] desktop:min-w-[120px] max-w-full w-full min-w-full">
                  Clear Filters
                </span>
              </motion.div>
            </div>
          )}
          <div className="flex flex-col items-center mobileMax:items-start" />
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
            <div className="flex items-center justify-center width-[fit-content] mobileMax:justify-start">
              <p className="text-xmedium text-dark text-center mobileMax:text-small">
                Potential for energy savings
              </p>
              <LegendsModal
                open={showLegendsModal}
                setOpen={(value) => setShowLegendsModal(value)}
                triggerClassName="legend-info"
              >
                <AiOutlineInfoCircle
                  className="ml-2 cursor-pointer relative z-50 text-medium"
                  onClick={() => setShowLegendsModal(true)}
                />
              </LegendsModal>
            </div>
          </motion.div>
        </div>
      </div>
      {isTooltipOpen && (
        <ReactTooltip
          id="my-tooltip"
          {...({} as any)}
          className="custom-tooltip commonBoxShadow"
          place={window?.innerWidth > 768 ? "right" : "bottom"}
          isOpen={isTooltipOpen}
          clickable={isTooltipOpen}
          position={mapClickCoordinates}
          closeOnScroll
          offset={window?.innerWidth > 768 ? Number(35) : Number(20)}
          render={() => {
            return (
              <>
                <div className="desktop:w-[480px] w-[340px] py-2 relative z-[4] minMobile:w-full minMobile:max-w-full mobileMax:pt-0">
                  <AiOutlineClose
                    className="absolute -right-2.5 text-close text-medium hover:text-closeHover w-[28px] h-[28px] cursor-pointer -top-1"
                    onClick={() => {
                      if (userLocationMode) {
                        setUserLocationMode(false);
                        setShowSelectorReset(true);
                        setShowMapReset(true);
                      }
                      setIsTooltipOpen(false);
                    }}
                  />
                  <h6
                    className="text-odd text-center text-ellipsis overflow-hidden max-w-[95%] whitespace-nowrap pl-2 pt-2 font-bold font-numans betweenMobileTab:pt-0"
                    style={{
                      color: showPotentialColor(),
                    }}
                  >
                    {selectedCountry?.name || ""}
                  </h6>
                  <div className="flex items-start w-full mb-6 justify-center pt-6 mobileMax:w-full mobileMax:mb-3 mobileMax:pt-3 ">
                    <p className="w-full text-purple text-medium pr-6 text-right font-semibold capitalize mobileMax:text-xsmall mobileMax:leading-normal mobileMax:w-1/2 mobileMax:pr-4 font-poppins betweenMobileTab:text-small">
                      Your potential for energy savings is {showPotential()}.
                    </p>
                    <div className="w-full pl-6  border-1 border-borderColor border-l mobileMax:w-1/2 mobileMax:pl-4">
                      <p className="text-purple text-small m-0 mobileMax:text-xsmall mobileMax:leading-normal font-poppins betweenMobileTab:text-small">
                        Energy Efficiency Potential on a 1-100 Scale:
                      </p>
                      <p
                        className="text-large m-0 leading-[60px] font-bold text-center mobileMax:text-xlg mobileMax:leading-[40px] betweenMobileTab:text-lg betweenMobileTab:leading-[40px]"
                        style={{
                          color: showPotentialColor(),
                        }}
                      >
                        {getImprovementValue() || ""}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: window?.innerWidth > 1200 ? 1.2 : 1 }}
                    className="w-[fit-content] mx-auto"
                  >
                    <Button
                      role="button"
                      aria-label="clear filter buttom"
                      onClick={() => {
                        router.push(
                          `/toolkit/${slugify(selectedCountry?.name, {
                            lower: true,
                          })}/dashboard`
                        );
                      }}
                      className="block text-xsmall text-darkBlue min-w-[200px] h-[38px] greenGradient uppercase rounded-[53px] leading-[14px]"
                    >
                      {" "}
                      Learn How
                    </Button>
                  </motion.div>
                </div>
              </>
            );
          }}
        />
      )}

      <CountryOverviewModal
        open={countryOverviewModalOpen}
        setOpen={(value) => setCountryOverviewModalOpen(value)}
        selectedCountryMapData={getSelectedCountryMapData(selectedCountry)}
        onNext={() => {
          navigateToMatchmaking(selectedCountry?.country_iso || "");
        }}
      />
    </>
  );
};

export default MapScreen;
