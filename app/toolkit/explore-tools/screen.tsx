"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
// import CommonComboBox from "@/components/CommonComboBox";
import { CONSTS } from "@/lib/constants";
import { clearQueryString, createQueryString } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NextBreadcrumb from "@/components/Breadcrumbs";
import { MdChevronRight } from "react-icons/md";
import CustomisableTable from "@/components/CustomisableTable";
import MobileToolsList from "@/components/MobileToolsList";
import CommonReactSelect from "@/components/CommonReactSelect";

const sectorList = [
  ...CONSTS.SECTORS_LIST,
  {
    title: "Crosscutting",
    field_name: "field_sector_crosscutting",
    icon: "",
  },
];
interface ExploreToolsScreenProps {
  searchParams: {
    sector?: string;
    region?: string;
    country?: string;
    category?: string;
  };
  toolsData: DrupalNode[];
  regionList: DrupalTaxonomyTerm[];
  categoryList: DrupalTaxonomyTerm[];
  selectedSector: string[];
  selectedRegion: string[];
  selectedCategory: string[];
}

const ExploreToolsScreen: React.FC<ExploreToolsScreenProps> = ({
  searchParams,
  toolsData,
  regionList,
  categoryList,
  selectedSector,
  selectedRegion,
  selectedCategory,
}) => {
  const [loadingTableData, setLoadingTableData] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<Boolean>(false);
  const router = useRouter();
  const path = usePathname();
  const [regionEnabled, setRegionEnabled] = useState<boolean>(true);
  const [sectorEnabled, setSectorEnabled] = useState<boolean>(true);
  const [categoryEnabled, setCategoryEnabled] = useState<boolean>(true);
  const searchQuery = useSearchParams();
  const region = searchQuery.get("region");
  const sector = searchQuery.get("sector");
  const category = searchQuery.get("category");

  useEffect(() => {
    if (region || sector || category) {
      setRegionEnabled(true);
      setSectorEnabled(true);
      setCategoryEnabled(true);
      setLoadingTableData(false)
    }
  }, [region, sector, category]);

  const makeRegionOptions = () => {
    const options = regionList?.map((data) => {
      return {
        value: data.name,
        label: data.name,
      };
    });
    return options;
  };

  const makeSectorOptions = () => {
    const options = sectorList.map((data) => {
      return {
        value: data.title,
        label: data.title,
      };
    });
    return options;
  };

  const makeCategoryOptions = () => {
    const options = categoryList?.map((data) => {
      return {
        value: data.name,
        label: data.name,
      };
    });
    return options;
  };

  const handleSectorSelect = (value: string[]) => {
    setRegionEnabled(false);
    setCategoryEnabled(false);
    setLoadingTableData(true);
    if (sectorList) {
      const query = createQueryString({
        ...searchParams,
        sector: value,
      });
      router.push(`${path}${query}`);
    }
  };

  const handleRegionSelect = (value: string[]) => {
    setSectorEnabled(false);
    setCategoryEnabled(false);
    setLoadingTableData(true);
    if (regionList) {
      const query = createQueryString({
        ...searchParams,
        region: value,
      });
      router.push(`${path}${query}`);
    }
  };

  const handleCategorySelect = (value: string[]) => {
    setRegionEnabled(false);
    setSectorEnabled(false);
    setLoadingTableData(true);
    if (categoryList) {
      const query = createQueryString({
        ...searchParams,
        category: value,
      });
      router.push(`${path}${query}`);
    }
    // const result = [newQuery, query].map(i => i?.replace?.('?', '')).join('&')
    // const clearedQuery = clearQueryString(result);
    // setNewQuery(`?${clearedQuery}`?.replace('?&', '?'))
  };
  // useEffect(() => {
  // 	if(newQuery){
  // 		router.push(`${path}${newQuery}`)
  // 	}
  // }, [newQuery]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth < 1024) {
        setIsTablet(true);
      }
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
        <Card className="w-full p-6 innerPage-card-height mobileMax:px-0">
          <CardContent className="pb-6 px-6 flex items-center justify-start w-full pt-4 mb-8 betweenMobileTab:justify-center mobileMax:px-5 mobileMax:block mobileMax:pt-0 mobileMax:mb-4">
            <div className="flex items-center justify-start mr-5 mobileMax:mr-0 mobileMax:mb-4 betweenMobileTab:block mobileMax:block w-[33%] mobileMax:w-full">
              <p className="text-xmedium text-purple mr-3 mobileMax:mr-0 mobileMax:mb-1 mobileMax:text-small betweenMobileTab:block betweenMobileTab:mb-1.5 w-[220px]">
                Select Region:
              </p>
              <div className={`w-full ${!region &&"remove-select-text-color"}`}>
                <CommonReactSelect
                  list={makeRegionOptions()}
                  value={selectedRegion}
                  placeholder="Region"
                  onSelectChange={handleRegionSelect}
                  isMulti
                  isSearchable={false}
                  minMenuListHeight={isTablet ? 180 : 230}
                  maxMenuListHeight={isTablet ? 180 : 230}
                  isDisabled={!regionEnabled}
                />
              </div>
            </div>
            <div className="flex items-center justify-start mr-5 mobileMax:mr-0 mobileMax:mb-4 betweenMobileTab:block mobileMax:block w-[33%] mobileMax:w-full">
              <p className="text-xmedium text-purple mr-3 mobileMax:mr-0 mobileMax:mb-1 mobileMax:text-small betweenMobileTab:block betweenMobileTab:mb-1.5 w-[220px]">
                Select Sector:
              </p>
              <div className={`w-full ${!sector &&"remove-select-text-color"}`}>
                <CommonReactSelect
                  list={makeSectorOptions()}
                  value={selectedSector}
                  placeholder="Sector"
                  onSelectChange={handleSectorSelect}
                  isMulti
                  isSearchable={false}
                  minMenuListHeight={isTablet ? 180 : 230}
                  maxMenuListHeight={isTablet ? 180 : 230}
                  isDisabled={!sectorEnabled}
                />
              </div>
            </div>
            <div className="flex items-center justify-start mobileMax:block w-[33%] mobileMax:w-full betweenMobileTab:block">
              <p className="text-xmedium text-purple mr-3 mobileMax:mr-0 mobileMax:mb-1 betweenMobileTab:block mobileMax:text-small betweenMobileTab:block betweenMobileTab:mb-1.5 w-[285px]">
                Select Category:
              </p>
              <div className={`w-full category-dropdown  ${!category &&"remove-select-text-color"}`}>
                <CommonReactSelect
                  list={makeCategoryOptions()}
                  value={selectedCategory}
                  placeholder="Category"
                  onSelectChange={handleCategorySelect}
                  isMulti
                  isSearchable={false}
                  minMenuListHeight={isTablet ? 180 : 230}
                  maxMenuListHeight={isTablet ? 180 : 230}
                  isDisabled={!categoryEnabled}
                />
              </div>
            </div>
          </CardContent>
          <CardContent className="mobileMax:px-0">
            {window?.innerWidth > 767 ? (
              <CustomisableTable
                loading={loadingTableData}
                tools={toolsData}
                searchParams={searchParams}
              />
            ) : (
              <MobileToolsList tools={toolsData} loading={loadingTableData} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExploreToolsScreen;
