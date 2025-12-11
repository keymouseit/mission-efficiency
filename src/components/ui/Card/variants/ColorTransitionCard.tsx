import { DrupalNode } from "next-drupal";
import Link from "next/link";
import { config } from "@/lib/config";

interface ColorTransitionCardProps {
  data: DrupalNode;
}

const ColorTransitionCard: React.FC<ColorTransitionCardProps> = ({ data }) => {
  return (
    <div className="py-[120px] betweenMobileTab:py-16 mobileMax:py-10 bg-white">
      <div className="mini-container">
        <h3 className="text-[42px] font-poppins mb-[60px] betweenMobileTab:mb-10 mobileMax:mb-8 font-semibold leading-normal text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-clip mobileMax:text-center mobileMax:text-[28px]">
          {data?.field_title}
        </h3>
        {/* cards */}
        <div className="flex flex-wrap justify-start m-auto box-border">
          {data?.field_add_card?.map((card: DrupalNode, idx: number) => (
            <Link
              key={idx}
              target="_blank"
              href={card?.field_link || "#"}
              className="remove-animation-fluctuation px-[10px] w-[25%] mobileMax:w-full mb-5 mobileMax:px-0 betweenMobileTab:w-[50%] flex mobileMax:mt-0"
            >
              <div className="mb-[20px] h-full">
                <div className="h-full group rounded-[50px] px-[15px] py-[30px] mobileMax:p-5 hover:shadow-2xl hover:scale-[1.02] transition-all duration-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#48DBB2] to-[#003350] transition-opacity duration-700 group-hover:opacity-0 rounded-[50px]" />
                  <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-700 group-hover:opacity-100 rounded-[50px]" />

                  <div className="relative z-10">
                    <div className="w-[91px] h-[91px] mx-auto relative group">
                      <svg viewBox="0 0 91 91" className="w-full h-full">
                        <defs>
                          {/* Mask using the PNG icon */}
                          <mask
                            id={`icon-mask-${idx}`}
                            maskUnits="userSpaceOnUse"
                          >
                            <image
                              href={`${config.apiBase}${card?.field_icon?.uri?.url}`}
                              x="0"
                              y="0"
                              width="91"
                              height="91"
                              preserveAspectRatio="xMidYMid meet"
                            />
                          </mask>

                          {/* 🌈 Vertical gradient (green → blue, top to bottom) */}
                          <linearGradient id={`g-${idx}`} y1="0" y2="1">
                            <stop offset="0%" stopColor="#48DBB2" />{" "}
                            {/* Green at top */}
                            <stop offset="100%" stopColor="#263AAD" />{" "}
                            {/* Blue at bottom */}
                          </linearGradient>
                        </defs>

                        {/* 🟢 Default visible PNG icon */}
                        <image
                          href={`${config.apiBase}${card?.field_icon?.uri?.url}`}
                          width="91"
                          height="91"
                          preserveAspectRatio="xMidYMid meet"
                          className="opacity-100 transition-opacity duration-500 group-hover:opacity-0"
                        />

                        {/* 🎨 Gradient-masked icon (appears on hover) */}
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#g-${idx})`}
                          mask={`url(#icon-mask-${idx})`}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      </svg>
                    </div>

                    <h6 className="text-center my-[14px] font-poppins leading-8 font-semibold mobileMax:text-xsmall mobileMax:leading-normal text-medium text-white group-hover:bg-gradient-to-r group-hover:from-[#48DBB2] group-hover:to-[#263AAD] group-hover:text-transparent bg-clip-text transition-all duration-700">
                      {card?.field_title}
                    </h6>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: card?.field_description?.processed,
                      }}
                      className="remove-animation-fluctuation text-center text-small my-0 text-white group-hover:text-[#828282] font-poppins leading-normal font-normal mobileMax:text-xsmall mobileMax:leading-normal transition-colors duration-700"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorTransitionCard;
