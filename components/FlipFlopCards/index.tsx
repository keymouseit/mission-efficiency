import { ExternalLink } from "lucide-react";
import { DrupalNode } from "next-drupal";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";

interface FlipFlopCardsProps {
  data: DrupalNode;
}

const FlipFlopCards: React.FC<FlipFlopCardsProps> = ({ data }) => {
  return (
    <>
      <div className="flip-card relative">
        <div className="px-2.5 py-10 relative min-h-[220px] cursor-pointer flip-flop-card-box">
          <div className="card-front-flop rounded-[15px] px-2.5 py-10 h-full w-full absolute top-0 left-0 blueBg-gradient">
            <p className="--font-poppins text-[27px] leading-normal text-[#9af9ff] text-center">
              {data?.field_title}
            </p>
            <FiPlusCircle className="absolute bottom-2 right-2.5 text-white text-[35px]" />
          </div>
          <div className="card-back-flop rounded-[15px] px-6 py-8 h-full w-full absolute top-0 left-0 blueBg-gradient flex flex-col">
            <div
              dangerouslySetInnerHTML={{
                __html: data?.field_description?.processed,
              }}
              className="--font-poppins text-xsmall leading-normal text-white text-center mb-5 line-climp-6 h-full"
            />
            <Link
              href={data?.field_button[0]?.uri}
              className="--font-poppins text-center text-xsmall text-[#9af9ff] leading-6 flex items-center justify-center h-full"
            >
              <ExternalLink className="w-[16px] h-[16px] max-w-[16px] mr-2" />
              {data?.field_button[0]?.title}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlipFlopCards;
