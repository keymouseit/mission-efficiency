import DynamicImage from "@/components/ResuableDynamicImage";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PartnerCardProps {
  img?: string;
  title?: string;
  buttonText?: string;
  link: string;
  isTransparentCard?: boolean;
  isSupport?: boolean;
}

const PartnerCard: React.FC<PartnerCardProps> = (props) => {
  const {
    img,
    title,
    link = "",
    isTransparentCard = false,
    isSupport = false,
    buttonText = "visit Website",
  } = props;

  return (
    <div className={`flex items-center justify-center flex-col box-border w-full h-full ${isTransparentCard ? "bg-transparent px-2.5 pt-[30px] partner-card" : "card-shadow bg-white rounded-[30px] px-4 py-[25px] laptopMax:py-5"} ${isSupport && "min-h-[320px] mobileMax:min-h-full"}`}>
      <div className={`mb-[23px] flex justify-center items-center w-full laptopMax:max-w-[180px] object-contain h-full ${isTransparentCard ? "max-w-[180px] mb-[15px] max-h-[110px]" : " max-w-[220px] mb-5 max-h-[130px]"}`}>

        <DynamicImage
          width={180}
          height={130}
          src={img as string}
          alt="support img"
          className={`${isTransparentCard && "h-[100px]"} max-h-full w-full object-contain h-[130px]`}
        />
      </div>
      <div className="h-full mobileMax:flex mobileMax:flex-col mobileMax:justify-end mobileMax:items-center">
        <p
          className={`--font-poppins text-center text-[20px] text-cardHeading leading-7 laptopMax:mb-2 mobileMax:text-medium ${isTransparentCard && "uppercase mb-4"
            }`}
        >
          {title}
        </p>
        <Link
          href={link}
          target="_blank"
          className="--font-poppins text-center text-xsmall text-[#004ee4] leading-6 flex items-center justify-center"
        >
          <ExternalLink className="w-[16px] h-[16px] max-w-[16px] mr-2" />
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default PartnerCard;
