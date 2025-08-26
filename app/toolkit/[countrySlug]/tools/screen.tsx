"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { DrupalNode } from "next-drupal";
import {
  createQueryString,
  getAlpha2FromISO,
} from "@/lib/utils";
import slugify from "slugify";
import NextBreadcrumb from "@/components/Breadcrumbs";
import { MdChevronRight } from "react-icons/md";
import { CONSTS } from "@/lib/constants";
import CustomisableTable from "@/components/CustomisableTable";
import MobileToolsList from "@/components/MobileToolsList";
import CommonReactSelect from "@/components/CommonReactSelect";
import DynamicImage from "@/components/ResuableDynamicImage";
import FadeInWrapper from "@/components/FadeInWrapper";

const sectorList = [
  ...CONSTS.SECTORS_LIST,
  {
    title: "Crosscutting",
    field_name: "field_sector_crosscutting",
    icon: "",
  },
];

interface CountryToolsScreenProps {
  searchParams: { sector?: string; region?: string; crossCutting?: Boolean };
  countryData?: DrupalNode | null;
  toolsData?: DrupalNode[];
  sectorByEfficiency?: {
    title: string;
    field_name: string;
    icon: string;
  };
  selectedSector: string[];
}

const CountryToolsScreen: React.FC<CountryToolsScreenProps> = ({
  searchParams,
  countryData = {} as DrupalNode,
  toolsData = [] as DrupalNode[],
  sectorByEfficiency,
  selectedSector,
}) => {
  const router = useRouter();
  const [loadingTableData, setLoadingTableData] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<Boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  const path = usePathname();
  const countryCode = getAlpha2FromISO(countryData?.field_iso_code) || "";

  const makeSectorOptions = () => {
    const options = sectorList.map((data) => {
      return {
        value: data.title,
        label: data.title,
      };
    });
    return options;
  };

  const handleSectorSelect = (value: string[]) => {
    const query = createQueryString({
      ...searchParams,
      sector: value,
    });
    router.push(`${path}${query}`);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth < 1024) {
        setIsTablet(true);
      }
    }
    handleToolsPrefetchAndNaviagation(true);
  }, []);

  const handleToolsPrefetchAndNaviagation = (prefetch: boolean = false) => {
    if (prefetch) {
      router.prefetch("/toolkit/explore-tools");
    } else {
      router.push("/toolkit/explore-tools");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
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
        <Card className="w-full px-6 py-4 innerPage-card-height mobileMax:p-0">
          <CardHeader className="mobileMax:px-5">
            <CardTitle>
              <div
                className={`flex items-center mb-4 justify-start w-full mobileMax:mb-0 ${countryCode && "mobileMax:items-start"
                  }`}
              >
                <div className="relative">
                  <div className="w-[65px] h-[65px] max-w-[65px] relative  bg-blue flex items-center justify-center rounded-full p-4 white-svg-color mobileMax:w-[50px] mobileMax:h-[50px] mobileMax:max-w-[50px]">
                    {sectorByEfficiency && (
                      <DynamicImage
                        src={`/static/images/${sectorByEfficiency?.icon || ""
                          }.svg`}
                        alt="home"
                        width={40}
                        height={40}
                        className="max-w-[40px] block"
                      />
                    )}
                  </div>

                  {!countryCode ? (
                    <div className="animate-pulse rounded-[6px] absolute -right-6 top-[2px] h-[24px] w-[35px] max-w-[35px] rounded-md w-full bg-skeleton" />
                  ) : (
                    <DynamicImage
                      className="cursor-pointer h-[fit-content] rounded-[6px] absolute -right-6 top-[2px] white-svg-color"
                      src={`/static/flags/${countryCode.toLowerCase()}.svg`}
                      width={36}
                      height={28}
                      alt="country flag"
                      onClick={() => {
                        if (countryData) {
                          router.push(
                            `/toolkit/${slugify(countryData.title, {
                              lower: true,
                            })}/dashboard`
                          );
                        }
                      }}
                    />
                  )}
                </div>
                {!countryData ? (
                  <div className="ml-[35px] animate-pulse h-[35px] w-[90%] rounded-md w-full bg-skeleton" />
                ) : (
                  <p className="flex items-center justify-start w-full text-black text-midSmall font-medium ml-[35px] leading-[24px] uppercase w-full flex items-center flex-wrap mobileMax:text-small mobileMax:leading-normal font-poppins">
                    <span className="mr-1.5">Available tools for</span>
                    <b className="themeColor-combobox text-left">
                      <div className="tools-selectWrap">
                        <CommonReactSelect
                          list={makeSectorOptions()}
                          value={selectedSector}
                          placeholder="Sector"
                          onSelectChange={handleSectorSelect}
                          isMulti
                          isSearchable={false}
                          minMenuListHeight={isTablet ? 165 : 240}
                          maxMenuListHeight={isTablet ? 165 : 240}
                        />
                      </div>
                    </b>
                    <span className="mr-1.5">in</span>
                    <b>{countryData?.title}</b>
                  </p>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="mobileMax:px-0">
            { windowWidth !== null && windowWidth > 767 ?(
              <CustomisableTable
                loading={loadingTableData}
                tools={toolsData}
                searchParams={searchParams}
              />
            ) : (
              <MobileToolsList tools={toolsData} loading={loadingTableData} />
            )}
          </CardContent>
          <CardFooter className="pt-1 bg-white pb-4">
            {!loadingTableData ? (
              <FadeInWrapper
                scale={windowWidth !== null && windowWidth > 1200 ? 1.2 : 1}
                className="mx-auto"
              >
                <Button
                  className="min-w-[240px] block mx-auto capitalize text-xl leading-6 font-bold modals-gradientBtn px-14 cursor-pointer mobileMax:px-2"
                  onClick={() => handleToolsPrefetchAndNaviagation()}
                >
                  View tools for all sectors
                </Button>
              </FadeInWrapper>
            ) : (
              <div className="animate-pulse w-[30%] h-[40px] rounded-md bg-skeleton mx-auto mobileMax:w-[80%]" />
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CountryToolsScreen;
