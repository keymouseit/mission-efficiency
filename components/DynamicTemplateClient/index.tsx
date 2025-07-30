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
      nextComponent?.field_twi_title &&
      nextComponent?.field_twi_image?.uri?.url
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
          component: (
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
        return {
          component: <MissionSection data={pageComponent} />,
          skipNext: false,
        };
      case "paragraph--history_section":
        return {
          component: <MissionHistory data={pageComponent} />,
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
