"use client";
import React, { useEffect, useState } from "react";
import { Menubar } from "@/components/ui/menubar";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import { MenuItem, HeaderProps } from "@/types/header";
import { DEV_PUBLIC_URL } from "@/services/api";

const Header: React.FC<HeaderProps> = ({ data }) => {
  const { field_header_logo, field_header_menus_items } = data;
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const currentPath = usePathname();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const hasChildren = (item: MenuItem) =>
    item.children && item.children.length > 0;

  return (
    <div className="app-menu landing-header-zIndex">
      <Menubar
        className="border-none justify-between flex px-[16px] py-[8px] min-h-[80px]"
        role="toolbar"
      >
        <div className="flex justify-between w-full items-center">
          {/* Logo */}
          <div>
            <Link href="/home">
              <Image
                className="cursor-pointer"
                src={`${DEV_PUBLIC_URL}${field_header_logo?.uri?.url || ""}`}
                width={156}
                height={44}
                alt="app logo"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="w-full justify-end tab:flex hidden">
            {field_header_menus_items.map((menuItem, index) => {
              const matchedSubMenu = hasChildren(menuItem);

              return (
                <div key={index} className="landing-menu">
                  <Link
                    href={menuItem.url || "#"}
                    className={`text-xsmall laptop:text-small desktop:px-4 px-2 hover:text-blue relative min-h-[30px] block ${
                      currentPath === menuItem.url ? "text-blue" : "text-menu"
                    }`}
                  >
                    {menuItem.title}
                    {matchedSubMenu && (
                      <IoIosArrowDown className="inline text-md ml-1" />
                    )}
                  </Link>

                  {matchedSubMenu && (
                    <div
                      className={`menu-ul hidden absolute top-[55px] z-10 bg-white rounded-xl max-w-[240px] min-w-[220px] overflow-hidden common-dropShadow lieTablets:min-w-[190px] lieTablets:max-w-[190px] ${
                        menuItem.title === "Get Involved" && "right-[20px]"
                      }`}
                    >
                      {menuItem.children.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={
                            ` ${subItem.url.includes("#") ? menuItem.url : ""}${
                              subItem.url
                            }` || "#"
                          }
                          className="text-xsmall block p-2.5 border-b-[1px] border-borderColor hover:bg-mapGray text-menu hover:text-landingBlue"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="mobileMax:block hidden mobile-menu-toggle"
            onClick={toggleMobileMenu}
          >
            <FaBars className="text-menu text-xlg" />
          </button>
        </div>
      </Menubar>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-white mt-[-2px] pb-2 card-shadow relative">
          <div
            className="bg-overlay w-full absolute top-0 left-0 h-screen z-[-1]"
            onClick={() => setMobileMenuOpen(false)}
          />

          {field_header_menus_items.map((menuItem, index) => {
            const matchedSubMenu = hasChildren(menuItem);

            return (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value={menuItem.title}>
                  <AccordionTrigger
                    noArrow
                    className={`text-menu text-xsmall p-2 hover:text-blue block text-left px-5 flex ${
                      currentPath === menuItem.url && "text-blue"
                    }`}
                  >
                    <Link
                      href={menuItem.url || "#"}
                      className={`${matchedSubMenu ? "" : "block w-full"}`}
                    >
                      {menuItem.title}
                    </Link>
                    {matchedSubMenu && (
                      <IoIosArrowDown className="inline text-md ml-1" />
                    )}
                  </AccordionTrigger>

                  <AccordionContent className="pb-0">
                    {matchedSubMenu &&
                      menuItem.children.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.url || "#"}
                          className="text-xsmall font-normal block px-8 py-1 hover:bg-mapGray text-menu"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Header;
