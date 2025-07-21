import { DrupalNode } from "next-drupal";
import CommonBanner from "@/components/LandingWebsiteComponents/CommonBanner";
import TitleDescriptionBlock from "../TitleDescriptionBlock";
import UnifiedCTAClient from "../UnifiedCTAClient";
import FAQSections from "../FAQSections";
import Resources from "../Resources";
import NewsAndEventsSection from "../NewsAndEventsSection";

interface DynamicTemplateClientProps {
  templateData: DrupalNode;
}

const DynamicTemplateClient = ({
  templateData,
}: DynamicTemplateClientProps) => {
  const generateUIBasedOnNodeType = (pageComponent: DrupalNode) => {
    switch (pageComponent.type) {
      case "paragraph--hero_section":
        return (
          <CommonBanner
            leftImg="/static/images/left-home-hero.svg"
            rightImg="/static/images/elevate-right-img.svg"
            title={pageComponent?.field_hero_title}
            subTitle={pageComponent?.field_hero_description?.value}
            lightBgClip
          />
        );

      case "paragraph--text_with_image":
        return <UnifiedCTAClient data={pageComponent} />;

      case "paragraph--call_to_action":
        return <TitleDescriptionBlock data={pageComponent} />;

      case "paragraph--faq_component":
        return <FAQSections data={pageComponent} />;

      case "paragraph--resources":
        return <Resources data={pageComponent} />;

      case "paragraph--slider_component":
        return <NewsAndEventsSection data={pageComponent} />;

      default:
        return <div>Unknown component: {pageComponent?.type}</div>;
    }
  };

  return (
    <div className="pt-20">
      {templateData?.field_page_component?.map((component: DrupalNode) => (
        <div key={component.id}>{generateUIBasedOnNodeType(component)}</div>
      ))}
    </div>
  );
};

export default DynamicTemplateClient;
