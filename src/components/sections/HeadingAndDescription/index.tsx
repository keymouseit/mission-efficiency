import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { resolveLink } from "@/utils";

interface HeadingAndDescriptionProps {
  link?: {
    uri: string;
    title?: string;
  };
  title?: string;
  description?: string;
  bgColor?: string;
}

const HeadingAndDescription: React.FC<HeadingAndDescriptionProps> = ({
  link,
  title,
  description,
  bgColor,
}) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="relative text-center font-poppins font-semibold leading-normal mobileMax:text-[28px]"
      >
        {title && (
          <h2
            className={`${
              bgColor === "blue"
                ? "bg-[linear-gradient(to_right,#48DBB2,#4FC0FF)]"
                : "bg-[linear-gradient(to_right,#48DBB2,#003350)]"
            } desktop:text-[42px] font-poppins font-semibold text-transparent bg-clip-text leading-normal text-center text-[48px] mobileMax:text-[28px]`}
          >
            {title}
          </h2>
        )}

        {link && (
          <Link
            href={resolveLink(link?.uri)}
            className={`flex betweenMobileTab:hidden mobileMax:hidden absolute right-0 top-[17px] 
              items-center font-poppins font-[600] 
              text-transparent bg-clip-text underline text-[18px]
                ${
                  bgColor === "blue"
                    ? "bg-[linear-gradient(to_right,#48DBB2,#4FC0FF)]"
                    : "bg-[linear-gradient(to_right,#48DBB2,#003350)]"
                } 
              `}
          >
            {link?.title}
            <Image
              className="w-[9px] h-[15.17px] ml-[25px] mt-[2px]"
              src={
                bgColor === "blue"
                  ? "/static/images/Vector.png"
                  : "/static/images/Vector.svg"
              }
              alt="Vector icon"
              width={9}
              height={15}
            />
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default HeadingAndDescription;
