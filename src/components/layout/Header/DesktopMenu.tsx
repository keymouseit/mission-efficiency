"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdChevronRight } from "react-icons/md";
import { usePathname } from "next/navigation";
import {
  getPageTitleFromRoute,
  setSelectedMenuItemInStorage,
  setSelectedMainMenuInStorage,
  initializeSelectedMenuItemFromRoute,
  findParentMainMenuTitle,
  getSelectedMenuItemFromStorage,
  getSelectedMainMenuFromStorage,
} from "./utils";

const DesktopMenu = ({ menuData }: any) => {
  const [activeMainMenu, setActiveMainMenu] = useState<string>("");
  const [activeSubmenu, setActiveSubmenu] = useState<string>("");
  const [activeThirdLevel, setActiveThirdLevel] = useState<string>("");
  const [activeFourthLevel, setActiveFourthLevel] = useState<string>("");
  const [menuLeft, setMenuLeft] = useState<number>(-80);
  const [currentPageTitle, setCurrentPageTitle] = useState<string | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [selectedMainMenu, setSelectedMainMenu] = useState<string | null>(null);

  const pathname = usePathname();

  // Get current page title based on route and initialize localStorage
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const title = getPageTitleFromRoute(pathname, hash);
    setCurrentPageTitle(title);

    // Initialize selected menu item from route
    initializeSelectedMenuItemFromRoute(pathname, hash);

    // Load selected items from localStorage
    const storedMenuItem = getSelectedMenuItemFromStorage();
    const storedMainMenu = getSelectedMainMenuFromStorage();
    setSelectedMenuItem(storedMenuItem);
    setSelectedMainMenu(storedMainMenu);
  }, [pathname]);

  // Handle mouse enter for the entire dropdown area
  const handleDropdownEnter = (menuKey: string) => {
    setActiveMainMenu(menuKey);
  };

  // Handle mouse leave for the entire dropdown area
  const handleDropdownLeave = () => {
    setActiveMainMenu("");
    setActiveSubmenu("");
    setActiveThirdLevel("");
    setActiveFourthLevel("");
    setMenuLeft(-80);
  };

  // Handle submenu hover
  const handleSubmenuEnter = (submenu: string) => {
    setActiveSubmenu(submenu);
    setActiveThirdLevel(""); // Reset third level when changing second level
    setActiveFourthLevel(""); // Reset fourth level
  };

  // Handle third level menu hover
  const handleThirdLevelEnter = (thirdLevel: string) => {
    setActiveThirdLevel(thirdLevel);
    setActiveFourthLevel(""); // Reset fourth level when changing third level
  };

  // Handle fourth level menu hover
  const handleFourthLevelEnter = (fourthLevel: string) => {
    setActiveFourthLevel(fourthLevel);
  };

  // Handle hover over items without submenus - closes next levels
  const handleNoSubmenuHover = (level: string) => {
    if (level === "second") {
      setActiveThirdLevel("");
      setActiveFourthLevel("");
    } else if (level === "third") {
      setActiveFourthLevel("");
    }
  };

  // Calculate dropdown width dynamically
  const getDropdownWidth = () => {
    if (activeFourthLevel) return "min-w-[1000px]";
    if (activeThirdLevel) return "min-w-[750px]";
    if (activeSubmenu) return "min-w-[500px]";
    return "min-w-[280px]";
  };

  // Function to check if any descendant at any level is selected
  const hasSelectedDescendant = (item: any): boolean => {
    if (!selectedMenuItem) return false;

    // Direct match
    if (item.title === selectedMenuItem) return true;

    // Check all descendants recursively
    if (item.items) {
      return Object.values(item.items).some((child: any) =>
        hasSelectedDescendant(child)
      );
    }

    return false;
  };

  // Handle menu item click
  const handleMenuItemClick = (item: any) => {
    // Store the clicked menu item in localStorage
    setSelectedMenuItemInStorage(item.title);
    setSelectedMenuItem(item.title);

    // Also store which main menu section this belongs to
    const parentMainMenu = findParentMainMenuTitle(item.title);
    if (parentMainMenu) {
      setSelectedMainMenuInStorage(parentMainMenu);
      setSelectedMainMenu(parentMainMenu);
    }
  };

  // Handle main menu click
  const handleMainMenuClick = (menuConfig: any) => {
    // Store the clicked main menu item in localStorage
    setSelectedMainMenuInStorage(menuConfig.title);
    setSelectedMenuItemInStorage(menuConfig.title);
    setSelectedMainMenu(menuConfig.title);
    setSelectedMenuItem(menuConfig.title);
  };

  // Render menu item
  const renderMenuItem = (
    key: string,
    item: any,
    level: number = 1,
    length: number,
    index: number
  ) => {
    const iconPath = item.icon?.toLowerCase?.() || "";
    const isComingSoon = item.title?.includes("Coming soon") ?? false;
    const comingSoonClass = isComingSoon ? "coming-soon-item" : "";
    const isIndiaItem = item.title?.toLowerCase?.().includes("india") ?? false;
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
    // Check if this menu item should be highlighted based on click selection
    const isClickedItem = selectedMenuItem === item.title;
    const hasDescendantSelected = hasSelectedDescendant(item);

    // Check if this item is part of the selected main menu section
    const parentMainMenu = findParentMainMenuTitle(item.title);
    const isPartOfSelectedSection = selectedMainMenu === parentMainMenu;

    // Keep hover state for dropdown interaction
    const isHoverActive =
      (level === 2 && activeSubmenu === key) ||
      (level === 3 && activeThirdLevel === key) ||
      (level === 4 && activeFourthLevel === key);

    // Item is highlighted if it was clicked, has a selected descendant, OR if it's being hovered
    const isHighlighted =
      isClickedItem || hasDescendantSelected || isHoverActive;

    return (
      <div key={key}>
        <div
          onMouseEnter={() => {
            if (level === 2) {
              if (item.hasSubmenu) {
                handleSubmenuEnter(key);
                setMenuLeft(-200);
              } else {
                handleNoSubmenuHover("second");
                setActiveSubmenu("");
                setMenuLeft(-80);
              }
            } else if (level === 3) {
              if (item.hasSubmenu) {
                handleThirdLevelEnter(key);
                setMenuLeft(-400);
              } else {
                handleNoSubmenuHover("third");
                setMenuLeft(-200);
              }
            } else if (level === 4) {
              if (item.hasSubmenu) {
                handleFourthLevelEnter(key);
                setMenuLeft(-600);
              }
            }
          }}
          className={`w-full transition-colors duration-200`}
        >
          <Link
            href={item.href}
            className={`block w-full my-2 transition-all duration-150 ${
              isHighlighted
                ? "bg-[#48DBB2] active-menu-wrap font-semibold"
                : isComingSoon
                ? ""
                : "hover:bg-[#48DBB2]"
            } ${isComingSoon ? "opacity-50 cursor-default" : ""} ${
              itemIconClass || ""
            }`}
            aria-disabled={isComingSoon}
            tabIndex={isComingSoon ? -1 : 0}
            onClick={(event) => {
              if (isComingSoon) {
                event.preventDefault();
                return;
              }
              handleMenuItemClick(item);
            }}
          >
            <div
              className={`p-3 flex font-normal active-menu text-small items-center ${
                isHighlighted
                  ? "text-[#003350] font-semibold"
                  : `text-normalText ${
                      isComingSoon ? "" : "hover:text-[#003350]"
                    }`
              } ${isComingSoon ? "opacity-70" : ""} ${itemIconClass}`}
            >
              <div className="w-full flex items-start">
                <Image
                  src={item.icon}
                  alt="menu"
                  height={20}
                  width={20}
                  className="w-[20px] h-[20px] block mr-[8px] object-contain"
                />
                <span className="text-xsmall flex-1">{item.title}</span>
              </div>
              {item.hasSubmenu && (
                <MdChevronRight
                  className={`text-[25px] ${
                    isComingSoon ? "opacity-50" : "opacity-100"
                  }`}
                />
              )}
            </div>
          </Link>
          {index < length - 1 && (
            <div className="mx-auto h-[1px] bg-[#82828259]"></div>
          )}
        </div>
      </div>
    );
  };

  // Render submenu level
  const renderSubmenuLevel = (items: any, activeKey: string, level: number) => {
    if (!activeKey || !items[activeKey] || !items[activeKey].hasSubmenu)
      return null;

    const activeItem = items[activeKey];
    if (!activeItem.items) return null;

    return (
      <div className="w-[280px] bg-white border-l border-[#82828259]">
        <div className="my-2 mx-4 flex flex-col justify-center">
          {Object.entries(activeItem.items).map(([key, item], _i, arr) =>
            renderMenuItem(key, item, level + 1, arr.length, _i)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full justify-end mobile:flex tab:flex hidden">
      <div className="relative flex items-center justify-end">
        {/* Main Links */}
        {Object.entries(menuData).map(
          ([menuKey, menuConfig]: [string, any], index, arr) => {
            const isMainComingSoon =
              menuConfig.title?.includes("Coming soon") ?? false;
            const isLastMenu = index === arr.length - 1;

            // Check if this main menu item should be highlighted based on click selection
            const isMainMenuClicked = selectedMainMenu === menuConfig.title;
            const isMainMenuHovered = activeMainMenu === menuKey;
            const hasDescendantInMainMenu = hasSelectedDescendant(menuConfig);

            // Main menu is highlighted if clicked, has descendant selected, OR hovered
            const isMainMenuHighlighted =
              isMainMenuClicked || hasDescendantInMainMenu || isMainMenuHovered;

            return (
              <div
                key={menuKey}
                className={`relative ${
                  isMainComingSoon ? "opacity-50 cursor-default" : ""
                }`}
                onMouseEnter={() => {
                  if (isMainComingSoon) return;
                  handleDropdownEnter(menuKey);
                }}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={isMainComingSoon ? "#" : menuConfig.href}
                  className={`text-small transition-all duration-100 desktop:mx-4 mx-2 betweenMobileTab:mx-2 font-semibold font-poppins relative min-h-[30px] 
    inline-flex items-center 
    ${
      isMainMenuHighlighted
        ? "text-[#003350] after:w-full font-semibold"
        : `text-normalText ${
            isMainComingSoon ? "" : "hover:text-[#003350] hover:after:w-full"
          }`
    }
    after:content-[""] after:absolute after:left-0 after:bottom-0 
    after:h-[2px] after:bg-gradient-to-r after:from-[#48DBB2] after:to-[#323ABB]
    after:transition-all after:duration-500
  ${isMainComingSoon ? "pointer-events-none" : ""}`}
                  aria-disabled={isMainComingSoon}
                  tabIndex={isMainComingSoon ? -1 : 0}
                  onClick={(event) => {
                    if (isMainComingSoon) {
                      event.preventDefault();
                      return;
                    }
                    handleMainMenuClick(menuConfig);
                  }}
                >
                  {menuConfig.title}
                  <IoIosArrowDown
                    className={`ml-1 hover:text-[#003350] ${
                      isMainComingSoon ? "opacity-50" : ""
                    }`}
                  />
                </Link>

                {/* Dropdown Menu for current menu */}
                {!isMainComingSoon && activeMainMenu === menuKey && (
                  <>
                    <div
                      className="border-l-[15px] py-5 border-r-[15px] border-b-[15px] 
													drop-shadow-lg border-l-transparent border-r-transparent border-b-white bottom-[-41px] w-0 h-0 absolute left-1/2 -translate-x-1/2 z-10"
                    ></div>
                    <div
                      className={`menu-ul popup-menu absolute top-full pt-2 z-50 transition-all duration-700 opacity-100 pointer-events-auto`}
                      style={
                        isLastMenu
                          ? { left: `${menuLeft - 80}px` }
                          : { left: `${menuLeft}px` }
                      }
                    >
                      {/* Invisible bridge to prevent gap issues */}
                      <div className="h-[30px] bg-transparent w-full" />

                      {/* Dropdown Container - Dynamic width based on active sections */}
                      <div
                        className={`bg-white drop-shadow-lg py-2 overflow-hidden flex transition-all duration-300 ${getDropdownWidth()}`}
                      >
                        {/* First Level Menu - Always visible when dropdown is open */}
                        <div className="w-[280px] bg-white">
                          <div className="my-2 mx-4">
                            {Object.entries(menuConfig.items).map(
                              ([key, item]: [string, any], _i, arr) =>
                                renderMenuItem(key, item, 2, arr.length, _i)
                            )}
                          </div>
                        </div>

                        {/* Second Level Menu */}
                        {renderSubmenuLevel(menuConfig.items, activeSubmenu, 2)}

                        {/* Third Level Menu */}
                        {activeSubmenu &&
                          menuConfig.items[activeSubmenu] &&
                          renderSubmenuLevel(
                            menuConfig.items[activeSubmenu].items,
                            activeThirdLevel,
                            3
                          )}

                        {/* Fourth Level Menu */}
                        {activeThirdLevel &&
                          menuConfig.items[activeSubmenu]?.items[
                            activeThirdLevel
                          ] &&
                          renderSubmenuLevel(
                            menuConfig.items[activeSubmenu].items[
                              activeThirdLevel
                            ].items,
                            activeFourthLevel,
                            4
                          )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default DesktopMenu;
