"use client";
import Image from "next/image";
import React from "react";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import { config } from "@/lib/config";

interface FooterProps {
  data: DrupalNode;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const {
    field_footer_sub_title = "",
    field_footer_menu = [],
    field_footer_social_icons = [],
  } = data;

  return (
    <div className="relative py-20 md:py-16 mobileMax:py-10 bg-[#003350] overflow-hidden">
      {/* Left SVG background */}
      <div className="absolute top-[10px] left-0 pointer-events-none">
        <Image
          src="/static/images/footer-leftimg.svg"
          alt="footer background"
          width={752}
          height={754}
          className="w-full h-full mobileMax:w-3/5"
        />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Logo */}
        <Image
          src="/static/images/footer-logo-1.svg"
          alt="logo"
          width={104}
          height={104}
          className="mx-auto mb-2 mobileMax:w-20"
        />

        {/* Subtitle */}
        <h4 className="text-[#48DBB2] text-[32px] mobileMax:text-[26px] text-center mb-8 font-poppins font-semibold">
          {field_footer_sub_title}
        </h4>

        {/* Follow Us */}
        <p className="capitalize text-center text-[22px] mobileMax:text-sm font-semibold text-white">
          Follow Us
        </p>

        {/* Social Icons */}
        <div className="flex justify-center mt-5 mb-20 md:mb-16 mobileMax:mb-10 gap-5">
          {field_footer_social_icons?.map(
            (socialIcon: DrupalNode, index: number) => (
              <Link
                key={index}
                href={socialIcon?.field_social_media_link || "#"}
                target="_blank"
                className="landing-footer-links"
              >
                <Image
                  src={`${config.apiBase}${
                    socialIcon?.field_social_media_logo?.uri?.url || ""
                  }`}
                  alt="social icon"
                  width={50}
                  height={50}
                  className="mobileMax:w-10"
                />
              </Link>
            )
          )}
        </div>

        {/* Subscribe Section */}
        <div className="border-y border-white pt-12 pb-16 mobileMax:py-8">
          <h4 className="text-[32px] mobileMax:text-[26px] text-center font-poppins mb-8 font-semibold text-white">
            Stay Connected
          </h4>

          <div className="flex w-full h-[75px] mobileMax:h-[55px] max-w-[1000px] mx-auto gap-2">
            <input
              type="email"
              placeholder="Your E-Mail"
              className="flex-1 px-10 mobileMax:px-5 py-3 rounded-l-2xl bg-[#D9D9D9] text-[#808080] placeholder-[#808080] font-semibold text-[22px] mobileMax:text-sm focus:outline-none mobileMax:max-w-[70%]"
            />
            <button className="px-6 mobileMax:px-3 py-3 w-[200px] md:w-[250px] mobileMax:w-[100px] font-bold text-white rounded-r-2xl bg-[#48DBB2] text-[22px] mobileMax:text-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Menu */}
        <ul className="flex justify-end mt-16 mobileMax:mt-8 gap-12 mobileMax:gap-3 flex-wrap">
          {field_footer_menu?.map((menuItem: DrupalNode, index: number) => (
            <li
              key={index}
              className="text-center text-small mobileMax:text-xs text-white hover:text-[#8e7ec9] font-poppins cursor-pointer"
            >
              <Link
                href={
                  menuItem?.title.toLowerCase().includes("contact")
                    ? `mailto:${menuItem?.field_menu_link}`
                    : menuItem?.field_menu_link || "#"
                }
              >
                {menuItem?.title || ""}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
