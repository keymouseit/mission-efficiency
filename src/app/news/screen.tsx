"use client";

import {
  buildMediaTypeAndSrc,
  createQueryString,
  formatDateToUS,
} from "@/utils";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoClose, IoDocumentTextOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { renderIcon } from "@/lib/parsers/parsers";
import { motion } from "framer-motion";
import FloatingButton from "@/components/ui/FloatingButton";
import slugify from "slugify";
import CommonMultiCheckox from "@/components/sections/CommonMultiCheckbox";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsAndTrainingBanner from "@/components/sections/News&TrainingBanner";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface newsProps {
  filteredNewsCards: DrupalNode[];
  resourcesFilteredData: DrupalTaxonomyTerm[];
  searchParams: any;
  selectedResources: string[];
  showClearBtn: boolean;
}

const NewsScreen: React.FC<newsProps> = ({
  searchParams,
  filteredNewsCards,
  resourcesFilteredData,
  selectedResources,
  showClearBtn,
}) => {
  const searchInputRef = useRef(null);
  const searchListRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [searchFocus, setSearchFocus] = useState<null | number>(null);
  const router = useRouter();
  const path = usePathname();
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isAboveMobile, setAboveMobile] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");
  const [searchListOpen, setSearchListOpen] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [paginatedFilterNewsData, setPaginatedNewsData] = useState<
    DrupalNode[]
  >([]);
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);

  const withoutEvents = filteredNewsCards.filter(
    (card) => card?.field_n_resource?.name !== "Event"
  );

  //  sort the news according to date
  const sortedNewsData = paginatedFilterNewsData.sort((a: any, b: any) => {
    const dateA: any = new Date(a.field_news_date);
    const dateB: any = new Date(b.field_news_date);
    return dateB - dateA;
  });

  useEffect(() => {
    setSearchItem(searchParams.search);
  }, [searchParams]);

  useEffect(() => {
    if (isAboveMobile) {
      setTimeout(() => {
        setPaginatedNewsData(withoutEvents);
        setLoading(false);
      }, 800);
    } else {
      setTimeout(() => {
        setPaginatedNewsData(withoutEvents);
        setLoading(false);
      }, 100);
    }
  }, [withoutEvents]);

  const makeResourcesFilteredOptions = () => {
    return resourcesFilteredData
      ?.filter((item) => item.name !== "Event")
      .map((data) => ({
        value: data.name,
        label: data.name,
      }));
  };

  const handleResourceSelect = (value: string[]) => {
    setLoading(true);
    const query = createQueryString({
      ...searchParams,
      resource: value,
    });
    router.push(`${path}${query}`, { scroll: false });
  };

  //  search filter
  const handleSearch = () => {
    setLoading(true);
    let searchValue = searchItem;
    if (searchFocus !== null) {
      searchValue = (searchListRef.current as any).childNodes[searchFocus]
        .innerText;
      setSearchFocus(null);
    }
    const query = createQueryString({
      ...searchParams,
      search: searchValue.trim(),
    });
    router.push(`${path}${query}`, { scroll: false });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setSearchItem(event.target.value.trimStart());
      setSearchListOpen(true);
    } else {
      handleClearSearch();
      setLoading(false);
    }
  };

  const filteredSearchData = sortedNewsData?.filter((item) =>
    item.title.toLowerCase().includes(searchItem?.toLowerCase())
  );

  // clear search filter
  const handleClearSearch = () => {
    setLoading(true);
    const query = createQueryString({
      ...searchParams,
      search: "",
    });
    setLoading(false); // look for better fix :: clear button after typing, keeps loading data
    router.push(`${path}${query}`, { scroll: false });
    setSearchItem("");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth < 1024) {
        setIsTablet(true);
      }
      if (window?.innerWidth > 767) {
        setAboveMobile(true);
      }
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = showMobileFilters ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileFilters]);

  return (
    <>
      <div className="pt-20 bg-mapGray filter-page-height">
        <NewsAndTrainingBanner
          leftImg={"/static/images/left-home-hero.svg"}
          rightImg={"/static/images/elevate-right-img.svg"}
          title={"News & Publications"}
          noHeight={true}
          lightBgClip={true}
        />
        {/* floating filter button */}
        <FloatingButton
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        />
        <div className="flex justify-between py-[60px] betweenMobileTab:pt-14 betweenMobileTab:pb-14 mobileMax:pt-8 mobileMax:pb-12 px-8 lieTablets:px-3 largeDesk:px-2 mobileMax:flex-wrap mobileMax:px-[12px] exactLaptop:min-h-[450px]">
          {showMobileFilters && (
            <div
              className="hidden lieTablets:block fixed h-full w-full bg-blackHighOpacity z-[4] top-0 right-0"
              onClick={() => setShowMobileFilters(false)}
            />
          )}
          <div
            className={`${
              showMobileFilters
                ? "lieTablets:w-[300px] lieTablets:left-0 lieTablets:top-0 fixed left-0 top-0 flex-col mb-0 !z-50 w-full h-full dark-filter-shadow !block overflow-auto"
                : "sticky top-24 left-0 mr-2 mb px-5 w-[25%] desktopLg:w-[20%]"
            } aboveLaptop:w-[30%] mobileMax:w-full z-[3] h-full hidden exactLaptop:block`}
            // initial={{ opacity: 0, y: 20 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={!isTablet ? { once: true } : {}}
            // transition={{
            // 	type: 'spring',
            // 	duration: 1.5,
            // }}
          >
            <div className="h-full bg-mapGray w-full laptopMax:h-full laptopMax:overflow-auto">
              <div className="flex laptopMax:px-3 items-center justify-between laptopMax:pb-2 min-h-[55px] laptopMax:min-h-[82px] laptopMax:pt-[40px] laptopMax:sticky laptopMax:top-0 laptopMax:z-[3] bg-mapGray">
                <IoClose
                  className="exactLaptop:hidden text-odd text-black absolute right-2.5 top-1.5 cursor-pointer"
                  onClick={() => setShowMobileFilters(false)}
                />
                <h5 className="--font-poppins text-medium leading-normal text-black mobileMax:text-small font-bold">
                  Filters by:
                </h5>
                <div className="flex items-center">
                  {showClearBtn && (
                    <button
                      className="block capitalize rounded-full ml-2 px-5 largeDesk:px-3 py-1 border border-borderColor mobileMax:text-xsmall text-small --font-poppins flex items-center justify-center cursor-pointer text-black"
                      onClick={() => {
                        if (isAboveMobile) {
                          window.scrollTo({ top: 400, behavior: "smooth" });
                        }
                        const { search = "" } = searchParams;
                        const query = createQueryString({
                          search,
                        });
                        router.push(`${path}${query}`, { scroll: false });
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full mt-5 mobileMax:mt-3">
                <div className="flex items-center flex-col mobileMax:w-full mt-3 laptopMax:px-3">
                  <div className="mx-3 mobileMax:mx-0 w-full laptopMax:mb-3 bg-white commonBoxShadow">
                    <CommonMultiCheckox
                      singleMenu={true}
                      menuTitle="Resources"
                      value={selectedResources}
                      list={makeResourcesFilteredOptions()}
                      onSelectChange={handleResourceSelect}
                      isOpen={isOpen}
                      toggleOpen={() => setIsOpen((p) => !p)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* no data found */}
          <div className="w-[75%] desktopLg:w-[80%] betweenMobileTab:w-[70%] lieTablets:w-full laptopMax:w-full">
            <div
              // initial={{ opacity: 0, y: 10 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // viewport={{ once: true }}
              // transition={{
              // 	type: 'spring',
              // 	duration: 0.5,
              // }}
              className="w-full flex items-center justify-between mt-2 mb-3 mobileMax:block mobileMax:mb-0 ml-[15px] laptopMax:ml-0"
            >
              <div className="relative w-[48%] mobileMax:w-full mobileMax:mb-8">
                <div className="flex items-center justify-end relative w-full">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className="searchInput text-small --font-poppins mobileMax:text-xsmall"
                    value={searchItem}
                    onChange={handleChange}
                    onKeyDown={(event) => {
                      if (searchItem?.trim?.()?.length) {
                        if (event.key === "Enter") {
                          handleSearch();
                          setSearchListOpen(false);
                          (searchInputRef.current as any)?.blur();
                        }
                        if (
                          event.key === "ArrowUp" ||
                          event.key === "ArrowDown"
                        ) {
                          event.preventDefault();
                          if (searchFocus !== null) {
                            const newIndex =
                              event.key === "ArrowUp"
                                ? Math.max(0, searchFocus - 1)
                                : Math.min(
                                    filteredSearchData.length - 1,
                                    searchFocus + 1
                                  );
                            setSearchFocus(newIndex);
                          } else {
                            setSearchFocus(0);
                          }
                        }
                      }
                    }}
                  />
                  <FiSearch
                    className="absolute text-[21px] right-[10px] cursor-pointer text-[#5e5e5e]"
                    onClick={() => {
                      if (searchItem?.trim?.()?.length) {
                        handleSearch();
                        setSearchListOpen(false);
                      }
                    }}
                  />
                  {searchItem && (
                    <IoMdClose
                      className="absolute text-medium right-[35px] cursor-pointer text-[#000]"
                      onClick={handleClearSearch}
                    />
                  )}
                </div>
                {searchItem && searchListOpen && (
                  <ul
                    ref={searchListRef}
                    className="absolute py-3 px-1 top-[40px] z-10 bg-white card-shadow rounded-lg w-full"
                  >
                    {filteredSearchData?.length ? (
                      filteredSearchData.map(
                        (matchedItem: DrupalNode, index: number) => {
                          return (
                            <li
                              key={index}
                              className={`text-small px-2 rounded-[6px] leading-normal py-1 mobileMax:text-xsmall cursor-pointer search-item ${
                                index === searchFocus ? "focused" : ""
                              }`}
                              onClick={() => {
                                setSearchListOpen(false);
                                setSearchItem(matchedItem?.title);
                                const query = createQueryString({
                                  ...searchParams,
                                  search: matchedItem?.title,
                                });
                                router.push(`${path}${query}`);
                              }}
                            >
                              {matchedItem?.title}
                            </li>
                          );
                        }
                      )
                    ) : (
                      <p className="text-small leading-normal text-center py-3 mobileMax:text-xsmall">
                        No Data Found
                      </p>
                    )}
                  </ul>
                )}
              </div>
              {!loading ? (
                <h5 className="--font-poppins text-medium leading-normal mobileMax:text-small font-bold exactLaptop:pr-[35px]">
                  {sortedNewsData?.length}
                  <span className="ml-2">results</span>
                </h5>
              ) : (
                <p className="h-[30px]" />
              )}
            </div>
            {!loading ? (
              <>
                {!sortedNewsData?.length && !loading ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0,
                    }}
                    className="remove-animation-fluctuation h-full laptop:min-h-[150px] laptopMax:h-[250px] flex items-center justify-center"
                  >
                    <p className="text-xmedium text-center --font-poppins">
                      No Data Found.
                    </p>
                  </motion.div>
                ) : (
                  <div>
                    <InfiniteScroll
                      scrollThreshold={0.5}
                      className="pt-[20px]"
                      dataLength={paginatedFilterNewsData?.length}
                      hasMore={true}
                      next={() => {}}
                      loader={""}
                    >
                      <div className="flex flex-wrap justify-start box-border w-full">
                        {/* card */}
                        {sortedNewsData?.map(
                          (newsData: DrupalNode, index: number) => {
                            const titleLength = newsData.title.length;
                            const sluggedLink =
                              titleLength > 20
                                ? `${path}/${slugify(
                                    `${newsData.title.slice(0, 20)} ${
                                      newsData.id
                                    }`
                                  )}`
                                : `${path}/${slugify(
                                    `${newsData.title} ${newsData.id}`
                                  )}`;

                            const mediaTypeAndSrc = buildMediaTypeAndSrc(
                              newsData.field_news_media_url
                            );

                            return (
                              <Link
                                href={sluggedLink}
                                key={index}
                                className="desktop:px-[15px] desktop:w-[50%] mb-8 w-full betweenMobileTab:mb-6 laptopMax:mb-0 laptopMax:py-3 laptopMax:border-t-[1px] laptopMax:border-[#8A8C8E]"
                              >
                                <motion.div
                                  className="animate-cardHover-speed flex items-start box-border exactLaptop:bg-white remove-news-shadow card-shadow w-full h-[200px] aboveMinMobile:h-[160px] minMobile:h-[140px] exactLaptop:rounded-[4px] overflow-hidden"
                                  whileHover={{ scale: 1.02 }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 0,
                                  }}
                                >
                                  <div className="tab:w-[40%] tab:max-w-[50%] flex justify-center items-center w-full overflow-hidden relative mobileMax:mb-0 h-full minMobile:w-[90%] mobileMax:mr-2 lieTablets:mr-3">
                                    {mediaTypeAndSrc.type === "image" ? (
                                      <img
                                        src={`${mediaTypeAndSrc.src}`}
                                        alt="category img"
                                        className="w-full h-full max-w-full object-cover card-shadow"
                                      />
                                    ) : mediaTypeAndSrc.type === "video" ? (
                                      <div className="w-full h-full">
                                        <ReactPlayer
                                          id="react-video-player"
                                          url={mediaTypeAndSrc?.src || ""}
                                          width="100%"
                                          height="100%"
                                        />
                                      </div>
                                    ) : (
                                      <div className="w-full h-full bg-placeholder flex items-center justify-center">
                                        {mediaTypeAndSrc.type === "pdf" ? (
                                          <IoDocumentTextOutline className="text-white w-[65%] h-[65%]" />
                                        ) : (
                                          <>
                                            {renderIcon(
                                              newsData?.field_n_resource?.name
                                            )}
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <div className="exactLaptop:w-[60%] exactLaptop:p-4 flex flex-col h-full w-full laptopMax:py-0.5">
                                    <div className="w-full h-full flex flex-col justify-between">
                                      <div className="">
                                        <h4 className="text-numans mb-3 block text-left text-[18px] mobileMax:text-small text-cardHeading line-clamp-2 aboveMinMobile:line-clamp-3 webkit-box font-semibold hover:text-blue hover:underline leading-normal mobileMax:h-auto capitalize">
                                          {newsData?.title}
                                        </h4>
                                        <div
                                          className="mobileMax:!hidden mb-2 flex items-start text-left line-clamp-2 webkit-box text-small text-cardText leading-6 mobileMax:text-xsmall mobileMax:leading-normal"
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              newsData?.field_news_blurb?.value,
                                          }}
                                        />
                                      </div>
                                      <div className="flex items-start flex-wrap">
                                        {newsData?.field_news_date ? (
                                          <p className="text-xsmall mobileMax:text-[13px] text-gray font-medium leading-6 --font-poppins pr-2 mobileMax:pr-1 mr-2 mobileMax:mr-2 border-r-[1px] border-gray flex items-center">
                                            {formatDateToUS(
                                              newsData?.field_news_date
                                            )}
                                          </p>
                                        ) : null}
                                        <p className="text-xsmall mobileMax:text-[13px] text-gray font-medium leading-6 --font-poppins">
                                          {newsData?.field_n_resource?.name}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </Link>
                            );
                          }
                        )}
                      </div>
                    </InfiniteScroll>
                  </div>
                )}
              </>
            ) : (
              <div className="pt-[20px] flex w-full justify-start flex-wrap">
                {/* placeholder Ui */}
                {Array(isTablet ? 4 : 8)
                  .fill(0)
                  ?.map((index: number) => {
                    return (
                      <div
                        key={index}
                        className="desktop:px-[15px] desktop:w-[50%] mb-8 w-full betweenMobileTab:mb-6 laptopMax:mb-0 laptopMax:py-3 laptopMax:border-t-[1px] laptopMax:border-[#8A8C8E]"
                      >
                        <div className="flex items-start box-border exactLaptop:bg-white remove-news-shadow card-shadow w-full h-[200px] aboveMinMobile:h-[160px] minMobile:h-[140px] exactLaptop:rounded-[4px] overflow-hidden">
                          <div className="tab:w-[40%] tab:max-w-[50%] flex justify-center items-center w-full overflow-hidden relative mobileMax:mb-0 h-full minMobile:w-[90%] mobileMax:mr-2 lieTablets:mr-3">
                            <div className="w-full h-full bg-emptyState animate-pulse" />
                          </div>
                          <div className="exactLaptop:w-[60%] exactLaptop:p-4 flex flex-col h-full w-full laptopMax:py-0.5">
                            <div className="w-full h-full flex flex-col justify-between">
                              <div className="h-[85%]">
                                <div className="bg-emptyState animate-pulse rounded-md w-full mb-2.5 h-[40px]" />
                                <div className="bg-emptyState animate-pulse rounded-md w-full mb-4 h-[30px]" />
                              </div>
                              <div className="w-full h-[30px] mb-0.5 flex items-center">
                                <div
                                  className={`bg-emptyState animate-pulse rounded-md mr-2 h-[25px] ${
                                    isTablet ? "w-[40%] " : "w-[30%]"
                                  }`}
                                />
                                <div
                                  className={`bg-emptyState animate-pulse rounded-md mr-2 h-[25px] ${
                                    isTablet ? "w-[40%] " : "w-[30%]"
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsScreen;
