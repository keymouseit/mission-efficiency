"use client";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import LandingFooter from "@/components/LandingWebsiteComponents/LandingFooter";
import Header from "@/components/LandingWebsiteComponents/LandingHeader";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { buildMediaTypeAndSrc, createQueryString } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTrainingPaginatedData } from "@/services/api";
import { motion } from "framer-motion";
import slugify from "slugify";
import { MdOutlineMessage } from "react-icons/md";
import {
  IoClose,
  IoDocumentTextOutline,
  IoLocationSharp,
} from "react-icons/io5";
import { FaChartPie, FaUserGraduate } from "react-icons/fa6";
import { LiaLanguageSolid } from "react-icons/lia";
import { CONSTS } from "@/lib/constants";
import CommonMultiCheckox from "@/components/LandingWebsiteComponents/CommonMultiCheckbox";
import FloatingButton from "@/components/FloatingButton";
import { CiVideoOn } from "react-icons/ci";
import { GiBlackBook, GiNotebook } from "react-icons/gi";
import { IoMdImages } from "react-icons/io";
import ReactPlayer from "react-player";

interface trainingProps {
  headerData: DrupalNode;
  footerData: DrupalNode;
  searchParams: any;
  languagefilterData: DrupalTaxonomyTerm[];
  resourcesData: DrupalTaxonomyTerm[];
  organizationData: DrupalTaxonomyTerm[];
  modalityData: DrupalTaxonomyTerm[];
  topicData: DrupalTaxonomyTerm[];
  regionData: DrupalTaxonomyTerm[];
  sectorData: DrupalTaxonomyTerm[];
  filteredTrainingData: DrupalNode[];
  totalFilteredRecords: number;
  selectedLanguage: string;
  selectedOrganization: string[];
  selectedSector: string[];
  selectedTopic: string[];
  selectedModality: string[];
  selectedRegion: string[];
  selectedResources: string[];
  showClearBtn: boolean;
  trainingDataQuery: { [key: string]: string };
}

const TrainingScreen: React.FC<trainingProps> = ({
  headerData,
  footerData,
  searchParams,
  languagefilterData,
  topicData,
  organizationData,
  modalityData,
  resourcesData,
  sectorData,
  filteredTrainingData,
  selectedLanguage,
  selectedOrganization,
  selectedSector,
  selectedTopic,
  regionData,
  selectedRegion,
  selectedModality,
  selectedResources,
  showClearBtn,
  trainingDataQuery,
  totalFilteredRecords,
}) => {
  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState(false); // Changed from true to false
  const [paginatedFilterTrainingData, setPaginatedTrainingData] = useState<
    DrupalNode[]
  >(
    filteredTrainingData // Initialize directly with data
  );

  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<Boolean>(false);
  const [isAboveMobile, setAboveMobile] = useState<Boolean>(false);
  const [openIndex, setOpenIndex] = useState<{
    [key: number]: boolean | Boolean;
  }>({});

  const handleToggleOpen = useCallback((index: number) => {
    setOpenIndex((prev) => ({ ...prev, [index]: !Boolean(prev[index]) }));
  }, []);

  // Memoize options to prevent recreation on every render
  const topicOptions = useMemo(
    () =>
      topicData?.map((data) => ({
        value: data.name.replaceAll(",", "-"),
        label: data.name,
      })) || [],
    [topicData]
  );

  const languageFilterOptions = useMemo(
    () =>
      languagefilterData?.map((data) => ({
        value: data.name,
        label: data.name,
      })) || [],
    [languagefilterData]
  );

  const organizationOptions = useMemo(
    () =>
      organizationData?.map((data) => ({
        value: data.name.replaceAll(",", "-"),
        label: data.name,
      })) || [],
    [organizationData]
  );

  const sectorOptions = useMemo(
    () =>
      sectorData?.map((data) => ({
        value: data.name.replaceAll(",", "-"),
        label: data.name,
      })) || [],
    [sectorData]
  );

  const regionOptions = useMemo(
    () =>
      regionData?.map((data) => ({
        value: data.name.replaceAll(",", "-"),
        label: data.name,
      })) || [],
    [regionData]
  );

  const modalityOptions = useMemo(
    () =>
      modalityData?.map((data) => ({
        value: data.name,
        label: data.name,
      })) || [],
    [modalityData]
  );

  const resourceOptions = useMemo(
    () =>
      resourcesData?.map((data) => ({
        value: data.name.replaceAll(",", "-"),
        label: data.name,
      })) || [],
    [resourcesData]
  );

  // Memoize handlers to prevent recreations
  const handleTopicSelect = useCallback(
    (value: string[]) => {
      setLoading(true);
      const query = createQueryString({
        ...searchParams,
        topic: value,
      });
      router.push(`${path}${query}`, { scroll: false });
    },
    [searchParams, path, router]
  );

  const handleLanguageSelect = useCallback(
    (value: string[]) => {
      setLoading(true);
      const query = createQueryString({
        ...searchParams,
        language: value,
      });
      router.push(`${path}${query}`, { scroll: false });
    },
    [searchParams, path, router]
  );

  const handleSectorSelect = useCallback(
    (value: string[]) => {
      setLoading(true);
      const query = createQueryString({
        ...searchParams,
        sector: value,
      });
      router.push(`${path}${query}`, { scroll: false });
    },
    [searchParams, path, router]
  );

  const handleOrganizationSelect = useCallback(
    (value: string[]) => {
      setLoading(true);
      const query = createQueryString({
        ...searchParams,
        organization: value,
      });
      router.push(`${path}${query}`, { scroll: false });
    },
    [searchParams, path, router]
  );

  const handleRegionSelect = useCallback(
    (value: string[]) => {
      setLoading(true);
      const query = createQueryString({
        ...searchParams,
        region: value,
      });
      router.push(`${path}${query}`, { scroll: false });
    },
    [searchParams, path, router]
  );

  const handleModalitySelect = useCallback(
    (value: string[]) => {
      setLoading(true);
      const query = createQueryString({
        ...searchParams,
        modality: value,
      });
      router.push(`${path}${query}`, { scroll: false });
    },
    [searchParams, path, router]
  );

  const handleResourceSelect = useCallback(
    (value: string[]) => {
      setLoading(true);
      const query = createQueryString({
        ...searchParams,
        resource: value,
      });
      router.push(`${path}${query}`, { scroll: false });
    },
    [searchParams, path, router]
  );

  const handleTrainingData = useCallback(async () => {
    setLoading(false);
    try {
      const response = await getTrainingPaginatedData({
        ...trainingDataQuery,
        offset: paginatedFilterTrainingData.length,
      });
      setPaginatedTrainingData((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error("Error loading more training data:", error);
    }
  }, [trainingDataQuery, paginatedFilterTrainingData.length]);

  const renderIcon = useCallback((resourceName: string) => {
    switch (resourceName) {
      case "Webinar":
        return <CiVideoOn className="text-white w-[60%] h-[60%]" />;
      case "Training":
        return <GiNotebook className="text-white w-[60%] h-[60%]" />;
      case "Course":
        return <FaUserGraduate className="text-white w-[50%] h-[50%]" />;
      case "Guide":
        return <GiBlackBook className="text-white w-[60%] h-[60%]" />;
      default:
        return <IoMdImages className="text-white w-[60%] h-[60%]" />;
    }
  }, []);

  // Update data when filteredTrainingData changes
  useEffect(() => {
    setPaginatedTrainingData(filteredTrainingData);
    setLoading(false);
  }, [filteredTrainingData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTablet(window.innerWidth < 1024);
      setAboveMobile(window.innerWidth > 767);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = showMobileFilters ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileFilters]);

  // Memoize training cards rendering
  const trainingCards = useMemo(() => {
    return paginatedFilterTrainingData?.map(
      (trainingItems: DrupalNode, index: number) => {
        const titleLength = trainingItems.title.length;
        const sluggedLink =
          titleLength > 20
            ? `${path}/${slugify(
                `${trainingItems.title.slice(0, 20)} ${trainingItems.id}`
              )}`
            : `${path}/${slugify(
                `${trainingItems.title} ${trainingItems.id}`
              )}`;

        const language = (CONSTS.LANGUAGE_CODE as any)[
          trainingItems?.field_t_language?.name?.toLowerCase()
        ];
        const mediaTypeAndSrc = buildMediaTypeAndSrc(
          trainingItems.field_t_media_url
        );

        return (
          <Link
            href={sluggedLink || "#"}
            key={`${trainingItems.id}-${index}`} // Better key
            className="px-[15px] w-[33%] mb-8 mobileMax:w-full mobileMax:px-0 aboveLaptop:w-[50%] lieTablets:w-[50%] betweenMobileTab:mb-6 mobileMax:mb-6"
          >
            <motion.div
              className="animate-cardHover-speed flex items-start flex-col box-border h-full w-full rounded-[23px] overflow-hidden card-shadow bg-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-center items-center w-full h-[280px] betweenMdDesk:h-[200px] overflow-hidden mb-5 mobileMax:mb-3 mobileMax:h-[240px] relative">
                {mediaTypeAndSrc.type === "video" ? (
                  <div className="w-full h-full">
                    <ReactPlayer
                      url={mediaTypeAndSrc?.src || ""}
                      id="react-video-player"
                      width="100%"
                      height="100%"
                      light={true} // Add light mode for better performance
                    />
                  </div>
                ) : mediaTypeAndSrc.type === "image" ? (
                  <img
                    src={`${mediaTypeAndSrc.src}`}
                    alt={`Training: ${trainingItems.title}`}
                    className="w-full h-full max-w-full object-cover card-shadow"
                    loading="lazy" // Add lazy loading
                  />
                ) : (
                  <div className="w-full h-full bg-placeholder flex items-center justify-center">
                    {mediaTypeAndSrc.type === "pdf" ? (
                      <IoDocumentTextOutline className="text-white w-[60%] h-[60%]" />
                    ) : (
                      renderIcon(trainingItems?.field_t_resource?.name)
                    )}
                  </div>
                )}

                <div
                  className={`${
                    trainingItems?.field_training_image && "bg-blackOverlay"
                  } flex items-start justify-end p-3 absolute top-0 w-full h-full z-[2]`}
                >
                  {trainingItems?.field_t_resource?.name && (
                    <p className="text-xsmall text-white font-medium bg-[#271AAF] card-shadow leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal --font-poppins py-1 px-2 rounded-[25px]">
                      {trainingItems?.field_t_resource?.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="px-4 pb-4 flex flex-col justify-between w-full">
                <div className="h-full w-full mb-3 flex-1">
                  <h4 className="text-numans mb-5 block text-left text-[18px] mobileMax:text-small text-cardHeading font-semibold hover:text-blue hover:underline leading-normal training-card-ellipse h-[55px] laptopMax:h-auto laptopMax:mb-3">
                    {trainingItems?.title}
                  </h4>

                  {trainingItems?.field_t_topic?.name && (
                    <div className="mb-2 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                      <MdOutlineMessage className="block text-odd max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                      <p className="--font-poppins font-normal">
                        {trainingItems?.field_t_topic?.name}
                      </p>
                    </div>
                  )}
                  {trainingItems?.field_t_sector?.name && (
                    <div className="mb-2 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                      <FaChartPie className="block text-odd max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                      <p className="--font-poppins font-normal">
                        {trainingItems?.field_t_sector?.name}
                      </p>
                    </div>
                  )}
                  {trainingItems?.field_t_region?.name && (
                    <div className="mb-2 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                      <IoLocationSharp className="block text-odd max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                      <p className="--font-poppins font-normal">
                        {trainingItems?.field_t_region?.name}
                      </p>
                    </div>
                  )}
                  {language && (
                    <div className="mb-2 flex items-start text-left text-small text-cardText leading-6 mobileMax:mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
                      <LiaLanguageSolid className="block text-odd max-w-[30px] w-[30px] mr-2 text-[#4441EB]" />
                      <p className="--font-poppins font-normal">{language}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        );
      }
    );
  }, [paginatedFilterTrainingData, path, renderIcon]);

  useEffect(() => {
    const start = performance.now();
    console.log("🎨 TrainingScreen client render started");

    return () => {
      const end = performance.now();
      console.log(
        `🏁 TrainingScreen total render time: ${(end - start).toFixed(2)}ms`
      );
    };
  }, []);
  // Track data updates
  useEffect(() => {
    const start = performance.now();
    setPaginatedTrainingData(filteredTrainingData);
    setLoading(false);
    const end = performance.now();
    console.log(`📊 Data update: ${(end - start).toFixed(2)}ms`);
  }, [filteredTrainingData]);
  return (
    <>
      <Header data={headerData} />
      <div className="pt-20 bg-mapGray filter-page-height">
        <CommonBanner
          leftImg={"/static/images/left-home-hero.svg"}
          rightImg={"/static/images/elevate-right-img.svg"}
          title={"Trainings"}
          noHeight={true}
          lightBgClip={true}
        />
        <FloatingButton
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        />
        <div className="flex justify-between py-[60px] betweenMobileTab:pt-14 betweenMobileTab:pb-14 mobileMax:pb-12 mobileMax:pt-6 px-8 lieTablets:px-2 largeDesk:px-2 mobileMax:flex-wrap mobileMax:px-[12px]">
          {showMobileFilters && (
            <div
              className="hidden lieTablets:block fixed h-full w-full bg-blackHighOpacity z-[4] top-0 right-0"
              onClick={() => setShowMobileFilters(false)}
            />
          )}
          <div
            className={`${
              showMobileFilters
                ? "lieTablets:w-[300px] lieTablets:left-0 lieTablets:top-0 fixed left-0 top-0 flex-col mb-0 !z-[5] w-full h-full dark-filter-shadow !block overflow-auto"
                : "sticky top-20 left-0 mr-2 px-5  w-[25%] desktopLg:w-[20%]"
            } aboveLaptop:w-[30%] mobileMax:w-full z-[3] h-full hidden exactLaptop:block`}
          >
            <div className="h-full bg-mapGray w-full laptopMax:h-full laptopMax:overflow-auto">
              <div className="flex laptopMax:px-3 items-center justify-between min-h-[55px] laptopMax:min-h-[82px] pt-[20px] laptopMax:pt-[40px] laptopMax:pb-2 laptopMax:sticky laptopMax:top-0 laptopMax:z-[3] bg-mapGray">
                <IoClose
                  className="exactLaptop:hidden text-odd text-black absolute right-2.5 top-1.5 cursor-pointer"
                  onClick={() => setShowMobileFilters(false)}
                />
                <h5 className="--font-poppins text-medium leading-normal mobileMax:text-small font-bold">
                  Filters by:
                </h5>
                <div className="flex items-center">
                  {showClearBtn && (
                    <button
                      className="block capitalize rounded-full ml-2 px-5 largeDesk:px-3 py-1 border border-borderColor mobileMax:text-xsmall text-small --font-poppins flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        if (isAboveMobile) {
                          window.scrollTo({ top: 400, behavior: "smooth" });
                        }
                        const query = createQueryString({});
                        router.push(`${path}${query}`, { scroll: false });
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full laptopMax:px-3 custom-react-combbox">
                <div className="bg-white commonBoxShadow w-full mt-5 mobileMax:mt-3 border-box max-h-[75vh] lieTablets:max-h-[80vh] mobileMax:max-h-[80vh] overflow-auto">
                  <div className="w-full">
                    <CommonMultiCheckox
                      menuTitle="Topic"
                      value={selectedTopic}
                      list={topicOptions}
                      onSelectChange={handleTopicSelect}
                      menuListHeight={130}
                      isOpen={Boolean(openIndex[0])}
                      toggleOpen={() => handleToggleOpen(0)}
                    />
                  </div>
                  <div className="w-full">
                    <CommonMultiCheckox
                      menuTitle="Sector"
                      value={selectedSector}
                      list={sectorOptions}
                      onSelectChange={handleSectorSelect}
                      menuListHeight={130}
                      isOpen={Boolean(openIndex[1])}
                      toggleOpen={() => handleToggleOpen(1)}
                    />
                  </div>
                  <div className="w-full">
                    <CommonMultiCheckox
                      menuTitle="Region"
                      value={selectedRegion}
                      list={regionOptions}
                      onSelectChange={handleRegionSelect}
                      menuListHeight={isTablet ? 195 : 200}
                      isOpen={Boolean(openIndex[2])}
                      toggleOpen={() => handleToggleOpen(2)}
                    />
                  </div>
                  <div className="w-full">
                    <CommonMultiCheckox
                      menuTitle="organization"
                      value={selectedOrganization}
                      list={organizationOptions}
                      onSelectChange={handleOrganizationSelect}
                      menuListHeight={170}
                      isOpen={Boolean(openIndex[3])}
                      toggleOpen={() => handleToggleOpen(3)}
                    />
                  </div>
                  <div className="w-full">
                    <CommonMultiCheckox
                      menuTitle="Training"
                      value={""}
                      list={[]}
                      onSelectChange={() => {}}
                      isOpen={Boolean(openIndex[4])}
                      toggleOpen={() => handleToggleOpen(4)}
                    />
                  </div>
                  <div className="w-full">
                    <CommonMultiCheckox
                      menuTitle="Language"
                      value={selectedLanguage}
                      list={languageFilterOptions}
                      onSelectChange={handleLanguageSelect}
                      isOpen={Boolean(openIndex[5])}
                      toggleOpen={() => handleToggleOpen(5)}
                    />
                  </div>
                  <div className="w-full">
                    <CommonMultiCheckox
                      menuTitle="Resources"
                      value={selectedResources}
                      list={resourceOptions}
                      onSelectChange={handleResourceSelect}
                      isOpen={Boolean(openIndex[6])}
                      toggleOpen={() => handleToggleOpen(6)}
                    />
                  </div>
                  <div className="w-full">
                    <CommonMultiCheckox
                      menuTitle="Modality"
                      value={selectedModality}
                      list={modalityOptions}
                      onSelectChange={handleModalitySelect}
                      isOpen={Boolean(openIndex[7])}
                      toggleOpen={() => handleToggleOpen(7)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="exactLaptop:min-h-[80vh] w-[75%] desktopLg:w-[80%] betweenMobileTab:w-[70%] lieTablets lieTablets:w-full laptopMax:w-full pt-[20px] laptopMax:pt-0">
            {!loading ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="remove-animation-fluctuation --font-poppins text-medium leading-normal mobileMax:text-small font-bold px-[15px] mobileMax:px-0"
              >
                {totalFilteredRecords}
                <span className="ml-2">results</span>
              </motion.div>
            ) : (
              <p className="h-[30px]" />
            )}
            {!loading ? (
              <>
                {!paginatedFilterTrainingData?.length ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="remove-animation-fluctuation h-full min-h-[80vh] laptopMax:h-[250px] flex items-center justify-center"
                  >
                    <p className="text-xmedium text-center --font-poppins">
                      No Data Found.
                    </p>
                  </motion.div>
                ) : (
                  <InfiniteScroll
                    scrollThreshold={0.5}
                    className="pt-[20px]"
                    dataLength={paginatedFilterTrainingData?.length}
                    hasMore={
                      paginatedFilterTrainingData.length < totalFilteredRecords
                    }
                    next={handleTrainingData}
                    loader={""}
                  >
                    <div className="flex w-full justify-start flex-wrap">
                      {trainingCards}
                    </div>
                  </InfiniteScroll>
                )}
              </>
            ) : (
              <div className="pt-[20px] flex w-full justify-start flex-wrap">
                {Array(isTablet ? 6 : 12)
                  .fill(0)
                  .map((_, index: number) => (
                    <div
                      key={index}
                      className="px-[15px] w-[33%] mb-8 mobileMax:w-full mobileMax:px-0 aboveLaptop:w-[50%] lieTablets:w-[50%] betweenMobileTab:mb-6 mobileMax:mb-6"
                    >
                      <div className="flex items-start flex-col box-border h-full w-full rounded-[23px] overflow-hidden card-shadow bg-white">
                        <div className="flex justify-center items-center w-full h-[280px] betweenMdDesk:h-[200px] overflow-hidden mb-5 mobileMax:mb-3 mobileMax:h-[240px] relative">
                          <div className="w-full h-full bg-emptyState animate-pulse" />
                        </div>
                        <div className="px-4 pb-4 flex flex-col justify-between w-full">
                          <div className="h-full w-full mb-3 flex-1">
                            <div className="w-full bg-emptyState animate-pulse rounded-md h-[40px] mb-2.5" />
                            {Array(4)
                              .fill(0)
                              .map((_, idx) => (
                                <div
                                  key={idx}
                                  className="w-full h-[30px] mb-0.5 flex items-center"
                                >
                                  <div className="bg-emptyState animate-pulse rounded-md w-[8%] mr-2 h-[25px]" />
                                  <div className="bg-emptyState animate-pulse rounded-md w-[92%] h-[25px]" />
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <LandingFooter data={footerData} />
    </>
  );
};

export default TrainingScreen;
