"use client";
import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const NextBreadcrumb = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const paths = usePathname().replace("/toolkit", "");

  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link
            href={"/toolkit"}
            className="flex items-center font-numans"
            role="button"
          >
            <AiFillHome className="text-purple mr-1 mt-[-1px]" />
            {homeElement}
          </Link>
        </li>
        <li>{pathNames.length > 0 && separator}</li>
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          let itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;
          return (
            <React.Fragment key={index}>
              <li className={`${itemClasses} mobileMax:max-w-[33%]`}>
                <Link
                  href={""}
                  className="mobileMax:text-ellipsis mobileMax:overflow-hidden mobileMax:whitespace-nowrap mobileMax:block"
                >
                  {itemLink.replaceAll("-", " ")}
                </Link>
              </li>
              <li>{pathNames.length !== index + 1 && separator}</li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default NextBreadcrumb;
