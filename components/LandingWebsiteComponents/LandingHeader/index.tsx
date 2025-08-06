"use client";
import React, { useEffect, useState } from "react";
import { Menubar } from "@/components/ui/menubar";
import Link from "@/node_modules/next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import { DrupalNode } from "next-drupal";
import { IoIosArrowDown } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";

interface HeaderProps {
  data: DrupalNode;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const { field_header_logo, field_header_menus_items } = data;
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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

  const titlesToCheckForMenu = [
    "Elevate",
    "Call to Action",
    "Support",
    "Get Involved",
  ];

  return (
    <>
      <div className="app-menu landing-header-zIndex">
        <Menubar
          className={`border-none justify-between flex px-[16px] py-[8px] min-h-[80px]`}
          role="toolbar"
        >
          <div className="flex justify-between w-full items-center">
            <div>
              <Link href="/home">
                <Image
                  className="cursor-pointer"
                  src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
                    field_header_logo?.uri?.url || ""
                  }`}
                  width={156}
                  height={44}
                  alt="app logo"
                />
              </Link>
            </div>
            <div className="w-full justify-end tab:flex hidden">
              {field_header_menus_items?.map(
                (menuItem: DrupalNode, index: number) => {
                  const matchedSubMenu = titlesToCheckForMenu.includes(
                    menuItem.title
                  );

                  return (
                    <div key={index} className="landing-menu">
                      <Link
                        href={menuItem?.field_menu_link || "#"}
                        className={` text-xsmall laptop:text-small desktop:px-4 px-2 hover:text-blue relative min-h-[30px] block ${
                          menuItem?.field_menu_link === currentPath
                            ? "text-blue"
                            : "text-menu"
                        }`}
                      >
                        {menuItem?.title || ""}
                        {matchedSubMenu && (
                          <IoIosArrowDown className="inline text-md ml-1" />
                        )}
                      </Link>
                      {matchedSubMenu && (
                        <div
                          className={`menu-ul hidden absolute top-[55px] z-10 overflow-hidden common-dropShadow bg-white rounded-xl max-w-[240px] min-w-[220px]
												 lieTablets:min-w-[190px] lieTablets:max-w-[190px] ${
                           menuItem.title === "Get Involved" && "right-[20px]"
                         }`}
                        >
                          {menuItem?.field_sub_menu_title.map(
                            (subMenuItems: DrupalNode, index: number) => {
                              const redirectedPath =
                                menuItem.title === "Support" &&
                                subMenuItems.title === "Toolkit"
                                  ? "/toolkit"
                                  : menuItem.title === "Support" &&
                                    subMenuItems.title === "CFD Tools"
                                  ? "/cfd-tool"
                                  : menuItem.title === "Support" &&
                                    subMenuItems.title === "Trainings"
                                  ? "/trainings"
                                  : menuItem.title === "Support" &&
                                    subMenuItems.title === "Country Engagement"
                                  ? "/country-engagement"
                                  : `${menuItem?.field_menu_link || "#"}#${
                                      subMenuItems.field_sub_menu_id || ""
                                    }`;

                              return (
                                <div key={index}>
                                  {subMenuItems?.title && (
                                    <Link
                                      href={redirectedPath}
                                      className="text-xsmall block p-2.5 border-b-[1px] border-borderColor hover:bg-mapGray text-menu hover:text-landingBlue"
                                    >
                                      {subMenuItems.title}
                                    </Link>
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
            {/* toggle */}
            <button
              className="mobileMax:block hidden mobile-menu-toggle"
              onClick={toggleMobileMenu}
            >
              <FaBars className="text-menu text-xlg" />
            </button>
          </div>
        </Menubar>
        {/* mobile menu */}
        {isMobileMenuOpen && (
          <div className="bg-white mt-[-2px] pb-2 card-shadow relative ">
            <div
              className="bg-overlay w-full absolute top-0 left-0 h-screen z-[-1]"
              onClick={() => setMobileMenuOpen(false)}
            />
            {field_header_menus_items?.map(
              (menuItem: DrupalNode, index: number) => {
                const matchedSubMenu = titlesToCheckForMenu.includes(
                  menuItem.title
                );

                return (
                  <>
                    <Accordion key={index} type="single" collapsible>
                      <AccordionItem value={menuItem?.title}>
                        <AccordionTrigger
                          noArrow
                          className={`text-menu text-xsmall p-2 hover:text-blue block text-left px-5 flex 
                        ${
                          menuItem?.field_menu_link === currentPath &&
                          "text-blue"
                        }`}
                        >
                          {" "}
                          <Link
                            href={menuItem?.field_menu_link || "#"}
                            className={`${
                              matchedSubMenu ? "" : "block w-full"
                            }`}
                          >
                            {menuItem?.title || ""}
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
                                  menuItem.title === "Support" &&
                                  subMenuItems.title === "Toolkit"
                                    ? "/toolkit"
                                    : menuItem.title === "Support" &&
                                      subMenuItems.title === "Trainings"
                                    ? "/trainings"
                                    : `${menuItem?.field_menu_link || "#"}#${
                                        subMenuItems.field_sub_menu_id || ""
                                      }`;

                                return (
                                  <div key={itemIndex}>
                                    {subMenuItems?.title && (
                                      <Link
                                        href={redirectedPath}
                                        className="text-xsmall font-normal block px-8 py-1 hover:bg-mapGray text-menu"
                                      >
                                        {subMenuItems.title}
                                      </Link>
                                    )}
                                  </div>
                                );
                              }
                            )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </>
                );
              }
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
