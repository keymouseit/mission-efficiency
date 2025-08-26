import { DrupalNode } from "next-drupal";
import FlipFlopCards from "../FlipFlopCards";
import FadeInWrapper from "../FadeInWrapper";

interface MultipleBenefitsSectionProps {
  data: DrupalNode;
}

export default function MultipleBenefitsSection({
  data,
}: MultipleBenefitsSectionProps): React.ReactElement {
  return (
    <div
      id="multiple-benefit"
      className="pt-20 pb-20 relative bg-white mobileMax:pt-10 mobileMax:pb-5"
    >
      <div className="mini-container">
        <FadeInWrapper
          y={40}
          once={true}
          duration={0}
          className="remove-animation-fluctuation category-gradient text-clip text-xlarge mb-[40px] mt-0 leading-tight text-center text-numans mobileMax:text-[28px] mobileMax:mb-5 betweenMobileTab:text-[42px]"
        >
          {data?.field_title}
        </FadeInWrapper>

        {data?.field_description?.processed && (
          <FadeInWrapper
            y={40}
            once={true}
            duration={0}
            className="remove-animation-fluctuation --font-poppins text-medium text-center text-cardText leading-7 mb-20 mobileMax:text-xsmall mobileMax:leading-normal mobileMax:mb-10"
            dangerouslySetInnerHTML={{
              __html: data.field_description.processed || "",
            }}
          />
        )}

        <div className="flex items-center flex-wrap">
          {data?.field_add_card?.map((card: DrupalNode, index: number) => (
            <FadeInWrapper
              key={index}
              className="remove-animation-fluctuation px-[15px] mb-[30px] w-[25%] betweenMobileTab:w-[50%] mobileMax:w-full mobileMax:px-0 mobileMax:mb-5"
              y={40}
              once={true}
              duration={0}
            >
              <FlipFlopCards data={card} />
            </FadeInWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
