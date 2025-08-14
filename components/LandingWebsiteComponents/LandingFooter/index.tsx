"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import { DEV_PUBLIC_URL } from "@/services/api";
import DynamicImage from "@/components/ResuableDynamicImage";

interface LandingFooterProps {
  data: DrupalNode;
}

const LandingFooter: React.FC<LandingFooterProps> = ({ data }) => {
  const {
    field_logo,
    field_logo_title,
    field_follow_title,
    field_add_follow_field = [],
    field_link_with_title = [],
    field_website_rights,
  } = data;

  return (
    <div className="relative mt-10 footerWrap">
      <DynamicImage
        width={1880}
        height={15}
        src="/static/images/blue-curve.png"
        alt="curve"
        className="absolute z-[1] w-full top-[-13px] h-[15px] pointer-events-none"
      />
      <div className="overflow-hidden relative">
        <div className="px-4 py-10 bg-footerbg inner-footer min-h-[380px] mobileMax:min-h-[260px]">
          {field_logo?.uri?.url && (
            <DynamicImage
              src={`${DEV_PUBLIC_URL}${field_logo.uri.url}`}
              alt={field_logo?.resourceIdObjMeta?.alt || "logo"}
              width={42}
              height={42}
              className="mx-auto block pb-2"
            />
          )}

          {field_logo_title && (
            <h5 className="text-sky text-[24px] text-center mb-[72px] text-numans mobileMax:text-xmedium">
              {field_logo_title}
            </h5>
          )}

          {field_follow_title && (
            <p className="capitalize text-center text-xsmall text-white leading-[20px]">
              {field_follow_title}
            </p>
          )}

          <div className="flex items-center justify-center mt-5">
            {field_add_follow_field.map((item: any, index: number) => {
              const icon = item?.field_icon?.uri?.url;
              const link = item?.field_link?.uri;

              return (
                <Link
                  className="landing-footer-links"
                  key={index}
                  href={link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icon && (
                    <DynamicImage
                      src={`${DEV_PUBLIC_URL}${icon}`}
                      alt={
                        item?.field_icon?.resourceIdObjMeta?.alt ||
                        "social icon"
                      }
                      width={20}
                      height={20}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="border border-white my-8 w-[33px] mx-auto" />

          <ul className="flex items-center justify-center flex-col mb-[27px]">
            {field_link_with_title?.map(
              (menuItem: DrupalNode, index: number) => {
                return (
                  <li className="text-center leading-[25px] text-xsmall text-[#fff] hover:text-[#8e7ec9] text-poppins cursor-pointer">
                    <Link
                      href={
                        menuItem?.title.toLocaleLowerCase().includes("contact")
                          ? `mailTo:${menuItem?.uri}`
                          : menuItem?.uri || "#"
                      }
                      key={index}
                    >
                      {menuItem?.title || ""}
                    </Link>
                  </li>
                );
              }
            )}
          </ul>

          <p className="text-center leading-[18px] text-xs text-gray text-poppins">
            {field_website_rights}
            reserved.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 pointer-events-none">
          <DynamicImage
            src="/static/images/footer-bubble.svg"
            alt="footer bubble"
            width={40}
            height={40}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
