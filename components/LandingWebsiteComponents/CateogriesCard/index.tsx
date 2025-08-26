import React from "react";
import DynamicImage from "@/components/ResuableDynamicImage";
import FadeInWrapper from "@/components/FadeInWrapper";

interface CategoryCardProps {
  img: string;
  title: string;
  subTitle?: string;
  isCfdTool?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { img, title, subTitle, isCfdTool = false } = props;

  return (
    <FadeInWrapper
      className="remove-animation-fluctuation border-2 border-transparent hover:border-blueBorder transition rounded-xl bg-white desktop:px-10 px-5 py-[25px] flex items-center flex-col h-full box-border w-full card-shadow"
      y={40}
      duration={0}
      once={true}
      border={{ duration: 1.8, ease: "easeInOut" }}

    >
      <div className={`mb-[23px] flex justify-center items-center overflow-hidden category-img ${isCfdTool ? "min-h-[80px]" : "max-h-[80px] h-full"} `}>
        <DynamicImage
          height={80}
          width={80}
          src={img} alt="category img" className="w-full h-full"
        />
      </div>
      <div className="h-full w-full">
        {isCfdTool ? (
          <p className="--font-poppins text-center text-small text-[#7b99c7] leading-5 desktop:leading-6 --font-poppins mobileMax:text-xsmall">
            {title}
          </p>
        ) : (
          <h4 className="text-numans text-center desktop:text-[27px] desktop:leading-8 text-medium mb-2 text-landingBlue leading-7 capitalize --font-poppins">
            {title}
          </h4>
        )}
        {subTitle?.length && <div
          className="--font-poppins text-center text-small text-[#7b99c7] leading-5 desktop:leading-6 --font-poppins mobileMax:text-xsmall"
          dangerouslySetInnerHTML={{ __html: subTitle }}
        />}
      </div>
    </FadeInWrapper>
  );
};

export default CategoryCard;
