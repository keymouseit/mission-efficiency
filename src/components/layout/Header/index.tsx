"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { usePathname } from "next/navigation";
import DesktopMenu from "./DesktopMenu";
import { Menubar } from "@/components/ui/Menubar";
import { buildMenuData } from "./utils";
import { DrupalNode } from "next-drupal";

interface MenuItemType {
  title: string;
  href?: string;
  icon?: string;
  hasSubmenu?: boolean;
  items?: Record<string, MenuItemType>;
}

const Header: React.FC<{ data: DrupalNode[] }> = ({ data }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());
  const [activeLink, setActiveLink] = useState<string>("");

  // Transform all routes at once
  const menuData = buildMenuData(data[0]);
  const currentPath = usePathname();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1201) {
        // desktop breakpoint
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to check if any child item matches current path (including hash fragments)
  const checkIfAccordionOpen = (item: MenuItemType): boolean => {
    if (!item.href) return false;

    // Check exact match
    if (item.href === currentPath) return true;

    // Check hash-based match (e.g., /call-to-action#UN-energy-compact)
    if (item.href.includes("#")) {
      const [basePath] = item.href.split("#");
      if (basePath === currentPath) return true;
    }

    if (!item.items) return false;
    return Object.values(item.items).some((child) =>
      checkIfAccordionOpen(child)
    );
  };

  // Function to get all parent keys that should be open based on current path (including hash)
  const getParentKeys = (
    items: Record<string, MenuItemType>,
    targetPath: string,
    currentKey: string = "",
    parents: string[] = []
  ): string[] => {
    for (const [key, item] of Object.entries(items)) {
      const fullKey = currentKey ? `${currentKey}-${key}` : key;

      if (!item.href) continue;

      if (item.href === targetPath) {
        return [...parents, fullKey];
      }

      if (item.items) {
        const result = getParentKeys(item.items, targetPath, fullKey, [
          ...parents,
          fullKey,
        ]);
        if (result.length > 0) {
          return result;
        }
      }
    }
    return [];
  };

  // Initialize open accordions and active link based on current path
  useEffect(() => {
    const currentHash =
      typeof window !== "undefined" ? window.location.hash : "";
    const fullCurrentUrl = currentPath + currentHash;

    const parentKeys = getParentKeys(menuData, fullCurrentUrl);
    setOpenAccordions(new Set(parentKeys));
    setActiveLink(fullCurrentUrl || currentPath);
  }, [currentPath]);

  // Function to check if item or any of its children is active (for accordion highlighting)
  const isItemOrChildActive = (item: MenuItemType): boolean => {
    if (item.href && activeLink === item.href) {
      return true; // direct match
    }
    if (item.items) {
      return Object.values(item.items).some((child) =>
        isItemOrChildActive(child)
      );
    }
    return false;
  };

  if (currentPath?.startsWith("/toolkit")) return null;
  
  const renderMenu = (
    items: Record<string, MenuItemType>,
    level = 0,
    parentKey = ""
  ) => {
    return Object.entries(items).map(([key, item], index: number, arr) => {
      const iconPath = item.icon?.toLowerCase?.() || "";
      const isComingSoon = item.title?.includes("Coming soon") ?? false;
      const comingSoonClass = isComingSoon ? "coming-soon-item" : "";
      const isIndiaItem =
        item.title?.toLowerCase?.().includes("india") ?? false;
      const isCountryItem =
        iconPath.includes("/flags/") ||
        iconPath.includes("flag") ||
        (item.href?.includes("/country-engagement") ?? false);
      const itemIconClass = [
        comingSoonClass,
        isCountryItem ? "country-flag-item" : "",
        isIndiaItem ? "india-flag-item" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const childItems =
        item.items && Object.keys(item.items || {}).length > 0
          ? item.items
          : undefined;
      const hasSubItems = Boolean(childItems);
      const fullKey = parentKey ? `${parentKey}-${key}` : key;
      const isOpen = openAccordions.has(fullKey);
      const isLast = index === arr.length - 1;
      const isCurrentPage =
        activeLink === item.href ||
        activeLink.startsWith((item.href || "") + "#");

      const isChildActive = item.items
        ? Object.values(item.items).some((child) => isItemOrChildActive(child))
        : false;

      const isHighlighted = isCurrentPage || isChildActive;

      const paddingLeft = 15 + level * 20;

      if (!hasSubItems || !childItems) {
        return (
          <Link
            key={key}
            href={item.href || "#"}
            className={`border-b border-[#82828259] text-small py-2 pr-6 flex items-center gap-2 ${
              isComingSoon
                ? ""
                : "hover:underline hover:underline-offset-4 hover:decoration-[#003350] hover:text-[#003350]"
            } ${
              isCurrentPage
                ? "!text-[#003350] underline underline-offset-4 decoration-[#003350] active-menu-wrap font-semibold"
                : "text-normalText font-normal"
            } ${isComingSoon ? "opacity-50 cursor-default" : ""} ${
              itemIconClass || ""
            }`}
            style={{ paddingLeft: `${paddingLeft}px` }}
            aria-disabled={isComingSoon}
            tabIndex={isComingSoon ? -1 : 0}
            onClick={() => {
              if (isComingSoon) return;
              setMobileMenuOpen(false);
              setActiveLink(item.href || "");
            }}
          >
            {item.icon && (
              <Image
                src={item.icon}
                height={18}
                width={18}
                alt="icon"
                className="w-[18px] h-[18px] mr-2"
              />
            )}
            {item.title}
          </Link>
        );
      }

      const handleAccordionValueChange = (value: string) => {
        if (isComingSoon) return;
        setOpenAccordions((prev) => {
          const newSet = new Set(prev);
          if (value) {
            newSet.add(fullKey);
          } else {
            newSet.delete(fullKey);
          }
          return newSet;
        });
      };

      return (
        <Accordion
          key={key}
          type="single"
          collapsible
          value={isOpen ? fullKey : undefined}
          onValueChange={handleAccordionValueChange}
        >
          <AccordionItem value={fullKey}>
            <AccordionTrigger
              noArrow
              disabled={isComingSoon}
              aria-disabled={isComingSoon}
              className={`${
                isLast ? "" : "border-b border-[#82828259]"
              } text-small flex items-center justify-between py-2 pr-6 ${
                isComingSoon
                  ? ""
                  : "hover:text-[#003350] hover:underline hover:underline-offset-4 hover:decoration-[#003350]"
              } ${
                isHighlighted
                  ? "bg-[#48DBB2] !text-[#003350] underline underline-offset-4 decoration-[#003350] font-semibold active-menu-wrap"
                  : "text-normalText font-normal"
              } ${isComingSoon ? "opacity-50 cursor-default" : ""}`}
              style={{ paddingLeft: `${paddingLeft}px` }}
            >
              <Link
                key={key}
                href={item.href || "#"}
                className={`flex items-center gap-2 pr-2 ${
                  isComingSoon ? "pointer-events-none" : ""
                } ${itemIconClass}`.trim()}
                aria-disabled={isComingSoon}
                tabIndex={isComingSoon ? -1 : 0}
                onClick={(event) => {
                  if (isComingSoon) {
                    event.preventDefault();
                    return;
                  }
                  setMobileMenuOpen(false);
                  setActiveLink(item.href || "");
                }}
              >
                {item.icon && (
                  <Image
                    src={item.icon}
                    height={18}
                    width={18}
                    alt="icon"
                    className="w-[18px] h-[18px] mr-2"
                  />
                )}
                <span
                  className={`text-normalText font-poppins text-small ${
                    isHighlighted
                      ? "!text-[#003350] underline underline-offset-4 decoration-[#003350] active-menu-wrap font-semibold"
                      : "text-normalText font-normal"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
              <IoIosArrowDown
                className={`ml-1 text-md transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                } ${isComingSoon ? "opacity-50" : ""}`}
              />
            </AccordionTrigger>

            <AccordionContent className="pb-0">
              {childItems && renderMenu(childItems, level + 1, fullKey)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    });
  };

  return (
    <>
      <motion.div
        className="app-menu landing-header-zIndex"
        style={{
          boxShadow: "0px 11px 12.9px 0px #0000000D",
          backdropFilter: "blur(12.600000381469727px)",
        }}
      >
        <Menubar
          className={`border-none justify-between flex min-h-[80px]`}
          role="toolbar"
        >
          <div className="mini-container">
            <div className="flex justify-between w-full items-center">
              <div>
                <Link href="/" className="cursor-pointer z-50">
                  <Image
                    className="cursor-pointer"
                    src="/static/images/main-logo.svg"
                    width={255}
                    height={45}
                    alt="app logo"
                  />
                </Link>
              </div>
              <div className="hidden desktop:block">
                <DesktopMenu menuData={menuData} />
              </div>
              {/* <div className="w-full justify-end tab:flex hidden">
								{field_header_menus_items?.map(
									(menuItem: DrupalNode, index: number) => {
										const matchedSubMenu = titlesToCheckForMenu.includes(
											menuItem.title,
										);

										return (
											<div key={index} className="landing-menu relative">
												<Link
													href={menuItem?.field_menu_link || '#'}
													className={`text-xsmall laptop:text-small desktop:mx-4 mx-2 betweenMobileTab:mx-2 font-bold font-poppins relative min-h-[30px] block
													 ${
																												menuItem.field_menu_link ===
																												currentPath
																													? 'text-[#323ABB] after:w-full'
																													: 'text-[#828282] after:w-0'
																											}
													 hover:text-[#323ABB]
													 after:content-[''] after:absolute after:left-0 after:bottom-0 
														 after:h-[2px] after:bg-gradient-to-r after:from-[#48DBB2] after:to-[#323ABB]
													 after:transition-all after:duration-500 hover:after:w-full
												   `}
												>
													{menuItem?.title || ''}
													{matchedSubMenu && (
														<IoIosArrowDown className="inline text-md ml-1" />
													)}
												</Link>

												{matchedSubMenu && (
													<div className={`menu-ul hidden absolute top-full left-[-100px] py-4 z-50 `}>
														<div className="h-[30px] bg-transparent" />

														<div
															className="absolute -top-[8px] left-[150px] w-0 h-0 
														"
														>
															<div
																className="border-l-[10px] py-5 border-r-[10px] border-b-[15px] 
														border-l-transparent border-r-transparent border-b-white"
															></div>
														</div>
														<div
															className={` bg-white group shadow-md`}
														>
															<div key={index} className="flex items-start py-2">
																<div
																	className={`flex flex-col p-4 ${
																		isHoveredMenu &&
																		'border-r-[1px] border-[#82828259]'
																	}`}
																>
																	{menuItem?.field_sub_menu_title.map(
																		(
																			subMenuItems: DrupalNode,
																			index: number,
																		) => {
																			const redirectedPath =
																				menuItem.title === 'Support' &&
																				subMenuItems.title === 'Toolkit'
																					? '/toolkit'
																					: menuItem.title === 'Support' &&
																					  subMenuItems.title === 'CFD Tools'
																					? '/cfd-tool'
																					: menuItem.title === 'Support' &&
																					  subMenuItems.title === 'Trainings'
																					? '/trainings'
																					: menuItem.title === 'Support' &&
																					  subMenuItems.title ===
																							'Country Engagement'
																					? '/country-engagement'
																					: `${
																							menuItem?.field_menu_link || '#'
																					  }#${
																							subMenuItems.field_sub_menu_id ||
																							''
																					  }`;

																			return (
																				<>
																					{subMenuItems?.title && (
																						<Link
																							key={index}
																							href={redirectedPath}
																							className="w-[280px] min-w-[280px] h-full"
																							onMouseEnter={() =>
																								setIsHoveredMenu(true)
																							}
																							onMouseLeave={() =>
																								setIsHoveredMenu(false)
																							}
																						>
																							<div className="text-xsmall popup-menu group flex items-start p-2.5 mb-2 hover:bg-[#48DBB2] text-normalText hover:text-[#323ABB]">
																								<div className="w-full flex items-start">
																									<Image
																										src="/static/images/menu-icon.png"
																										alt="menu"
																										height={15}
																										width={15}
																										objectFit="cover"
																										className="w-[15px] h-[15px] block mr-[8px] mt-[2px] "
																									/>{' '}
																									{subMenuItems.title}
																								</div>
																								<MdChevronLeft className="text-[25px] ml-0.5 text-normalText" />
																							</div>
																							<div className="w-full h-[1px] bg-[#82828259]  px-2"></div>
																						</Link>
																					)}
																				</>
																			);
																		},
																	)}
																</div>
																<div
																	className={`min-w-0 w-0 transition-all overflow-hidden delay-500 ease-in-out duration-700 ${
																		isHoveredMenu &&
																		'min-w-[300px] w-[300px] p-4'
																	} `}
																>
																	{isHoveredMenu && (
																		<>
																			<Link
																				href="#"
																				className="w-full"
																				onMouseEnter={() =>
																					setIsHoveredMenu(true)
																				}
																				onMouseLeave={() =>
																					setIsHoveredMenu(false)
																				}
																			>
																				<div className="text-xsmall popup-menu group flex items-start p-2.5 mx-2 hover:bg-[#48DBB2] text-normalText hover:text-[#323ABB]">
																					<div className="w-full flex items-start">
																						<Image
																							src="/static/images/menu-icon.png"
																							alt="menu"
																							height={15}
																							width={15}
																							objectFit="cover"
																							className="w-[15px] h-[15px] block mr-[8px] mt-[2px] "
																						/>{' '}
																						ddddd
																					</div>
																					<MdChevronLeft className="text-[25px] ml-0.5 text-normalText" />
																				</div>
																				<div className="w-full h-[1px] bg-[#82828259] my-2"></div>
																			</Link>
																		</>
																	)}
																</div>
															</div>
														</div>
													</div>
												)}
											</div>
										);
									},
								)}
							</div> */}
              {/* toggle */}
              <button
                className="block desktop:hidden mobile-menu-toggle"
                onClick={toggleMobileMenu}
              >
                {!isMobileMenuOpen ? (
                  <Image
                    src="/static/images/bar-icon.svg"
                    alt="bar"
                    height={23}
                    width={34}
                    objectFit="cover"
                    className="w-[34px] h-[23px]"
                  />
                ) : (
                  <Image
                    src="/static/images/gradient-close.svg"
                    alt="bar"
                    height={23}
                    width={34}
                    objectFit="cover"
                    className="w-[34px] h-[23px]"
                  />
                )}
              </button>
            </div>
          </div>
        </Menubar>
        {/* mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white mt-[-2px] card-shadow absolute top-[80px] w-full h-[calc(100vh_-82px)] overflow-hidden"
            >
              <Image
                src="/static/images/menu-clip.png"
                height={209}
                width={223}
                className="max-w-[50%] absolute bottom-[-8px] left-0 opacity-70 pointer-events-none"
                alt="menu"
              />
              {/* <div
								className="bg-overlay w-full absolute top-0 left-0 h-screen z-[-1]"
								onClick={() => setMobileMenuOpen(false)}
							/> */}
              <div className="popup-menu h-full w-full overflow-auto border-t border-[#66393959]">
                {renderMenu(menuData)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* {isMobileMenuOpen && (
					<div className="bg-white mt-[-2px] card-shadow absolute top-[80px] w-full h-[calc(100vh_-82px)] overflow-hidden">
						<Image
							src="/static/images/menu-clip.png"
							height={209}
							width={223}
							className="max-w-[50%] absolute bottom-[-8px] left-0 opacity-70 pointer-events-none"
							alt="menu"
						/>
						<div
							className="bg-overlay w-full absolute top-0 left-0 h-screen z-[-1]"
							onClick={() => setMobileMenuOpen(false)}
						/>
						 {field_header_menus_items?.map(
							(menuItem: DrupalNode, index: number) => {
								const matchedSubMenu = titlesToCheckForMenu.includes(
									menuItem.title,
								);

								return (
									<>
										<Accordion key={index} type="single" collapsible>
											<AccordionItem value={menuItem?.title}>
												<AccordionTrigger
													noArrow
													className={`text-menu text-xsmall p-2 hover:text-[#323ABB] text-left px-5 flex 
						${
													menuItem.field_menu_link === currentPath &&
													'text-[#323ABB]'
												}`}
												>
													{' '}
													<Link
														href={menuItem?.field_menu_link || '#'}
														className={`${
															matchedSubMenu ? '' : 'block w-full'
														}`}
													>
														{menuItem?.title || ''} ds
													</Link>
													{matchedSubMenu && (
														<IoIosArrowDown className="inline text-md ml-1" />
													)}
												</AccordionTrigger>
												<AccordionContent className="pb-0">
													{matchedSubMenu &&
														menuItem?.field_sub_menu_title.map(
															(subMenuItems: DrupalNode, itemIndex: number) => {
																const redirectedPath =
																	menuItem.title === 'Support' &&
																	subMenuItems.title === 'Toolkit'
																		? '/toolkit'
																		: menuItem.title === 'Support' &&
																		  subMenuItems.title === 'Trainings'
																		? '/trainings'
																		: menuItem.title === 'Support' &&
																		  subMenuItems.title ===
																				'Country Engagement'
																		? '/country-engagement'
																		: `${menuItem?.field_menu_link || '#'}#${
																				subMenuItems.field_sub_menu_id || ''
																		  }`;

																return (
																	<>
																		{subMenuItems?.title && (
																			<Link
																				key={itemIndex}
																				href={redirectedPath}
																				className="text-xsmall font-normal block px-8 py-2 text-normalText hover:text-[#323ABB]"
																			>
																				{subMenuItems.title}
																			</Link>
																		)}
																	</>
																);
															},
														)}
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									</>
								);
							},
						)} 
					</div>
				)} */}
      </motion.div>
    </>
  );
};

export default Header;
