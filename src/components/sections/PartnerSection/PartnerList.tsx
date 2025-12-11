"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import { config } from "@/lib/config";
import { DrupalNode } from "next-drupal";

interface ListProps {
  data: DrupalNode[];
}

export default function PartnerList({ data }: ListProps) {
  return (
    <div className="mt-[60px] mini-container px-6">
      <div
        className="
			grid 
			grid-cols-1 
			betweenMobileTab:grid-cols-3 
			desktop:grid-cols-4
			desktopMd:grid-cols-5 
			gap-6  
			justify-items-center
			mx-auto
		"
      >
        {data?.map((partner: DrupalNode, index: number) => (
          <motion.div
            key={index}
            className="w-full flex items-center justify-center"
          >
            <Link
              href={partner?.field_button_link.uri || "#"}
              target="_blank"
              className="
						group relative w-full bg-white rounded-[20px] overflow-hidden 
						shadow-[0_2px_5px_rgba(0,0,0,0.15)] 
						hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]
						min-h-[150px] flex flex-col items-center justify-center 
						transition-all duration-300 p-6
					"
            >
              <Image
                src={`${config.apiBase}${partner?.field_icon?.uri?.url}`}
                alt="icon"
                width={180}
                height={180}
                className="object-contain w-auto h-[110px] mx-auto"
              />
              <div
                className="
						absolute bottom-0 left-0 w-full 
						translate-y-full group-hover:translate-y-0 
						transition-transform duration-500
					"
              >
                <div
                  className="
							w-full h-[30px] bg-gradient-to-r from-[#121F90] to-[#48dbb2] 
							flex flex-col items-center justify-center text-white font-medium text-sm
						"
                >
                  <p className="inline-flex items-center">
                    {partner?.field_button_link.title}
                    <MdChevronRight className="w-[18px] h-[18px] ml-1" />
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
