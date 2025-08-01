import { DrupalNode } from "next-drupal";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import TitleDescriptionBlock from "../TitleDescriptionBlock";
import UnifiedCTAClient from "../UnifiedCTAClient";
import FAQSections from "../FAQSections";
import Resources from "../Resources";
import NewsAndEventsSection from "../NewsAndEventsSection";
import MissionSection from "../MissionSection";
import MissionWithCTA from "../MissionWithCTA";
import MissionHistory from "../MissionHistory";
import Banner from "../LandingWebsiteComponents/BannerSection";
import GridLayout from "../GridLayout";
import EnergyRelatedSection from "../EnergyRelatedSection";
import MultipleBenefitsSection from "../MultipleBenefitsSection";
import OpportunitySection from "../OpportunitySection";

interface DynamicTemplateClientProps {
  templateData: DrupalNode;
}

const DynamicTemplateClient = ({
  templateData,
}: DynamicTemplateClientProps) => {
  const generateUIBasedOnNodeType = (
    pageComponent: DrupalNode,
    index: number
  ) => {
    // Check for Mission + CTA combination
    const nextComponent = templateData?.field_page_component?.[index + 1];

    if (
      pageComponent.type === "paragraph--cards_section_with_text" &&
      nextComponent?.type === "paragraph--text_with_image" &&
      templateData?.field_page_slug === "mission"
    ) {
      return {
        component: (
          <MissionWithCTA missionData={pageComponent} ctaData={nextComponent} />
        ),
        skipNext: true, // Flag to skip the next component since we're combining them
      };
    }

    // Regular component handling
    switch (pageComponent.type) {
      case "paragraph--hero_section":
        return {
          component:
            templateData?.field_page_slug === "home" ? (
              <Banner
                title={pageComponent?.field_hero_title}
                subtitle={pageComponent?.field_hero_description?.value}
              />
            ) : (
              <CommonBanner
                leftImg="/static/images/left-home-hero.svg"
                rightImg="/static/images/elevate-right-img.svg"
                title={pageComponent?.field_hero_title}
                subTitle={pageComponent?.field_hero_description?.value}
                lightBgClip
              />
            ),
          skipNext: false,
        };
      case "paragraph--text_with_image":
        return {
          component: <UnifiedCTAClient data={pageComponent} />,
          skipNext: false,
        };
      case "paragraph--call_to_action":
        return {
          component: <TitleDescriptionBlock data={pageComponent} />,
          skipNext: false,
        };
      case "paragraph--faq_component":
        return {
          component: <FAQSections data={pageComponent} />,
          skipNext: false,
        };
      case "paragraph--resources":
        return {
          component: <Resources data={pageComponent} />,
          skipNext: false,
        };
      case "paragraph--slider_component":
        return {
          component: <NewsAndEventsSection data={pageComponent} />,
          skipNext: false,
        };
      case "paragraph--cards_section_with_text":
        const title = pageComponent?.field_title;

        const isEnergyRelated =
          title === "Energy efficiency is related but different than:";
        const isMultipleBenefits =
          title === "Multiple Benefits of Energy Efficiency";
        const isOpportunity = title === "The energy efficiency opportunity";

        return {
          component: isOpportunity ? (
            <OpportunitySection data={pageComponent} />
          ) : isMultipleBenefits ? (
            <MultipleBenefitsSection data={pageComponent} />
          ) : isEnergyRelated ? (
            <EnergyRelatedSection data={pageComponent} />
          ) : (
            <MissionSection data={pageComponent} />
          ),
          skipNext: false,
        };

      case "paragraph--history_section":
        return {
          component: <MissionHistory data={pageComponent} />,
          skipNext: false,
        };
      case "paragraph--multiple_images_with_title_and_d":
        return {
          component: <GridLayout data={pageComponent} />,
          skipNext: false,
        };
      default:
        return {
          component: <div>Unknown component: {pageComponent?.type}</div>,
          skipNext: false,
        };
    }
  };

  const renderComponents = () => {
    const components: JSX.Element[] = [];
    const pageComponents = templateData?.field_page_component || [];

    for (let i = 0; i < pageComponents.length; i++) {
      const component = pageComponents[i];
      const result = generateUIBasedOnNodeType(component, i);

      components.push(<div key={component.id}>{result.component}</div>);

      // Skip next component if we combined it
      if (result.skipNext) {
        i++; // Skip the next iteration
      }
    }

    return components;
  };

  return <div className="pt-20">{renderComponents()}</div>;
};

export default DynamicTemplateClient;
