import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DrupalNode } from "next-drupal";
import { CONSTS } from "@/lib/constants";
import { getColorFromStat } from "@/lib/utils";
import StatColourWithTooltip from "../SectorEnergyTooltip";
import DynamicImage from "../ResuableDynamicImage";

interface TableProps {
  isCountryDetail: boolean;
  selectedCountryMapData?: DrupalNode;
}

const OverAllCountryTable: React.FC<TableProps> = ({
  isCountryDetail,
  selectedCountryMapData,
}) => {
  const countryAverageColor = getColorFromStat(
    selectedCountryMapData?.field_country_score
  );

  const getImprovementValue = (fieldName?: string) => {
    const value = selectedCountryMapData?.[fieldName || "field_country_score"];
    if (value) {
      return value;
    }
  };

  const sortedSectors = CONSTS.SECTORS_LIST.sort((a, b) => {
    const statA = selectedCountryMapData?.[a.field_name] || 0;
    const statB = selectedCountryMapData?.[b.field_name] || 0;
    return statB - statA;
  });

  return (
    <Table className="w-full table-fixed countryModal-table">
      <TableHeader className="bg-mapGray">
        <TableRow className="border-none mb-5">
          <TableHead
            className={`w-[40%] text-[15px] leading-[17px] py-0.5 text-numans text-purple ${
              isCountryDetail
                ? "rounded-l-3xl pl-[57px] mobileMax:pl-[37px]"
                : "pl-[104px]"
            }`}
          >
            Sector
          </TableHead>
          <TableHead className="w-[27%] text-[15px] text-center leading-[17px] py-0.5 font-poppins text-purple">
            Potential
          </TableHead>
          <TableHead
            className={`w-[28%] text-[15px] text-center leading-[17px] py-0.5 font-poppins text-purple ${
              isCountryDetail
                ? "rounded-r-3xl pr-[40px] text-right mobileMax:pr-[25px]"
                : "pr-14"
            }`}
            align="right"
          >
            Score
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* rows */}
        {sortedSectors.map((sector, index) => {
          const stat = selectedCountryMapData?.[sector.field_name];
          const sectorColor = getColorFromStat(stat);
          return (
            <TableRow className="border-none mb-5" key={index}>
              <TableCell className={`${isCountryDetail ? "pl-2" : "pl-14"}`}>
                <div className="flex items-start text-small text-purple text-left leading-[25px] font-poppins mobileMax:text-xsmall mobileMax:leading-[20px]">
                  <div className="mt-[2px] map-imageWrap">
                    <DynamicImage
                      src={`/static/images/${sector.icon}.svg`}
                      alt={sector.icon}
                      width={25}
                      height={25}
                    />
                  </div>
                  {sector.title}
                </div>
              </TableCell>
              <TableCell align="center">
                {stat ? (
                  <StatColourWithTooltip
                    value={sectorColor}
                    toolTipId={`tooltip-${index}`}
                    key={index}
                  />
                ) : (
                  <div className="animate-pulse w-[32px] h-[32px] rounded-full bg-skeleton block mx-auto" />
                )}
              </TableCell>
              <TableCell
                align="right"
                className={`${isCountryDetail ? "pr-0" : "pr-14"}`}
              >
                {getImprovementValue(sector.field_name) ? (
                  <p className="flex items-center text-small text-purple bg-mapGray max-w-[120px] justify-center py-1.5 px-6 rounded-full font-poppins mobileMax:text-xsmall mobileMax:leading-normal">
                    {getImprovementValue(sector.field_name) || ""}
                  </p>
                ) : (
                  <div className="animate-pulse w-[70%] h-[32px] rounded-[65px] bg-skeleton block ml-auto" />
                )}
              </TableCell>
            </TableRow>
          );
        })}

        <TableRow
          className={`border-none ${isCountryDetail ? "h-[50px]" : "h-[20px]"}`}
        ></TableRow>
        <TableRow className="border-none mb-5">
          <TableCell className={`${isCountryDetail ? "pl-2" : "pl-14"}`}>
            <div className="flex items-start text-small text-purple text-left leading-[25px] font-poppins mobileMax:text-xsmall mobileMax:leading-[20px]">
              <div className="mt-[2px] map-imageWrap">
                <DynamicImage
                  src="/static/images/overall.png"
                  alt="overall"
                  width={25}
                  height={25}
                />
              </div>
              Country overall energy savings potential
            </div>
          </TableCell>
          <TableCell align="center">
            {getImprovementValue() ? (
              <StatColourWithTooltip
                value={countryAverageColor}
                toolTipId="countryAverage"
              />
            ) : (
              <div className="animate-pulse w-[32px] h-[32px] rounded-full bg-skeleton block mx-auto" />
            )}
          </TableCell>
          <TableCell
            align="right"
            className={`${isCountryDetail ? "pr-0" : "pr-14"}`}
          >
            {getImprovementValue() ? (
              <p className="flex items-center text-small text-purple bg-mapGray max-w-[120px] leading-normal justify-center py-1.5 px-6 rounded-full font-poppins mobileMax:text-xsmall">
                {getImprovementValue() || ""}
              </p>
            ) : (
              <div className="animate-pulse w-[70%] h-[32px] rounded-[65px] bg-skeleton block ml-auto" />
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OverAllCountryTable;
