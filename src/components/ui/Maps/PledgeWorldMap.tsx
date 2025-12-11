"use client";
import { getJoinFormData } from "@/services/api";
import { DrupalNode } from "next-drupal";
import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { motion } from "framer-motion";
import geos from "../../../../public/resources/mappings/countries.geo.json";
import { formatSubmissions } from "@/utils";

const joinFormMapData = await getJoinFormData();

const PledgeWorldMap = () => {
  const [hoveredCountryData, setHoveredCountryData] = useState<{
    name: string;
    records: number;
  }>({ name: "", records: 0 });
  const [showTooltip, setShowTooltip] = useState(true);

  const handleMouseEnterCountry = (geo: any) => {
    let hoveredCountryName = geo.properties.name;
    const recordsInHoveredCountry = joinFormMapData.filter(
      (submissionData: DrupalNode) =>
        submissionData.data.country === hoveredCountryName
    );

    const totalSubmissionsInHoveredCountry = recordsInHoveredCountry.length;
    if (totalSubmissionsInHoveredCountry > 0) {
      hoveredCountryName = recordsInHoveredCountry[0].data.country;
    }

    setHoveredCountryData({
      name: hoveredCountryName,
      records: totalSubmissionsInHoveredCountry,
    });
    setShowTooltip(true);
  };
  return (
    <div>
      <div className="bg-[#fff] py-16 mobileMax:py-8">
        <motion.h5
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0,
          }}
          className="mx-auto mobileMax:text-center text-center text-[42px] font-poppins mb-[50px] mobileMax:mb-8 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] mobileMax:text-[22px] betweenMobileTab:text-[28px]"
        >
          Worldwide Engagement in the Energy Efficiency Campaign
        </motion.h5>

        {/* stable responsive height wrapper: map fills this container */}
        <div className="w-full h-[310px] betweenMobileTab:h-[50vh] desktop:h-[95vh]">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 100,
            }}
            style={{
              width: "100%",
              height: "100%",
              pointerEvents: "auto",
            }}
          >
            <Geographies geography={geos}>
              {({ geographies }) =>
                geographies.map((geo: any) => (
                  <Geography
                    key={`${geo.rsmKey}`}
                    data-tooltip-id="joinee-tooltip"
                    data-tooltip-float
                    geography={geo}
                    onMouseEnter={() => handleMouseEnterCountry(geo)}
                    onMouseOver={() => handleMouseEnterCountry(geo)}
                    style={{
                      default: {
                        fill: "#003350",
                        outline: "none",
                        stroke: "white",
                        strokeWidth: 0.1,
                        opacity: 1,
                        pointerEvents: "auto",
                      },
                      hover: {
                        fill: "#48DBB2",
                        outline: "none",
                        stroke: "white",
                        strokeWidth: 1,
                        opacity: 0.7,
                        cursor: "pointer",
                        pointerEvents: "auto",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
        {showTooltip && (
          <ReactTooltip
            id="joinee-tooltip"
            className="joinee-tooltip"
            {...({} as any)}
            place={"top"}
            render={() => {
              return (
                <>
                  <div className="z-[4] mobileMax:w-full mobileMax:max-w-full text-ellipsis overflow-hidden whitespace-nowrap">
                    <h6 className="text-odd text-center text-ellipsis overflow-hidden whitespace-nowrap pl-2 pt-2 mobileMax:text-small font-bold font-numans max-w-full text-ellipsis overflow-hidden whitespace-nowrap">
                      {hoveredCountryData.name}
                    </h6>
                    <p className="text-center text-small m-0 mobileMax:text-xsmall mobileMax:leading-normal font-poppins betweenMobileTab:text-small">
                      {formatSubmissions(hoveredCountryData.records)} Pledges
                    </p>
                  </div>
                </>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PledgeWorldMap;
