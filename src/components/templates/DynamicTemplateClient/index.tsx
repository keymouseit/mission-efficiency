import HomeSlider from "@/components/sections/HomeSlider";
import TextImageSection from "@/components/sections/TextWithImage";
import CardSection from "@/components/sections/CardSection";
import { DrupalNode } from "next-drupal";
import PartnerSection from "@/components/sections/PartnerSection";
import Banner from "@/components/sections/Banner";
import { config } from "@/lib/config";
import MultipleCardSection from "@/components/sections/MultipleCardSection";
import MapSection from "@/components/sections/MapSection";
import FAQSection from "@/components/sections/FAQSection";

interface DynamicTemplateClientProps {
  templateData: DrupalNode | null;
  partnersData?: DrupalNode[];
  newsCarouselCards?: DrupalNode[];
  eventCarouselCards?: DrupalNode[];
}

const DynamicTemplateClient = ({
  templateData,
  partnersData,
  newsCarouselCards,
  eventCarouselCards,
}: DynamicTemplateClientProps) => {
  const sections = templateData?.field_add_section || [];

  const sliderSections = sections.filter(
    (item: any) =>
      item.type === "paragraph--hero_section" &&
      item.field_section_type === "slider"
  );

  const bannerSections = sections.filter(
    (item: any) =>
      item.type === "paragraph--hero_section" &&
      item.field_section_type !== "slider"
  );

  const firstSliderIndex = sections.findIndex(
    (item: any) =>
      item.type === "paragraph--hero_section" &&
      item.field_section_type === "slider"
  );

  const renderBanner = (hero: any) => (
    <Banner
      title={hero?.field_title}
      subTitle={hero?.field_sub_title}
      description={hero?.field_description?.processed}
      backgroundImg={`${config.apiBase}${hero?.field_image?.uri?.url}`}
      buttonText={hero?.field_button?.[0]?.title}
      buttonLink={hero?.field_button?.[0]?.uri}
      button2Text={hero?.field_button?.[1]?.title}
      button2Link={hero?.field_button?.[1]?.uri}
      isRounded
      isNotFirst={bannerSections.length > 1 && hero.id !== bannerSections[0].id}
    />
  );

  const generateUI = (component: DrupalNode) => {
    switch (component.type) {
      case "paragraph--text_with_image":
        return <TextImageSection data={component} />;

      case "paragraph--cards_section": {
        const field_title = component?.field_title;
        const link = component?.field_button_link;

        const cardsData =
          component?.field_isdynamicfetchdata === "event"
            ? {
                field_title,
                link,
                data: eventCarouselCards,
                field_card_ui_types: "dynamic-fetched-cards",
              }
            : component?.field_isdynamicfetchdata === "news"
            ? {
                field_title,
                link,
                data: newsCarouselCards,
                field_card_ui_types: "dynamic-fetched-cards",
              }
            : component;

        return <CardSection data={cardsData} />;
      }

      case "paragraph--partners_section":
        return <PartnerSection data={partnersData || component} />;

      case "paragraph--multiple_card_section":
        return <MultipleCardSection data={component} />;

      case "paragraph--map_section":
        return <MapSection data={component} />;

      case "paragraph--faq_section":
        return <FAQSection data={component} />;

      default:
        return (
          <div className="text-center text-red-500">
            Unknown component: {component.type}
          </div>
        );
    }
  };

  return (
    <div className="pt-20 w-full h-full">
      {sections.map((section: any, index: number) => {
        if (index === firstSliderIndex && sliderSections.length > 0) {
          return (
            <div key={"merged-slider"}>
              <HomeSlider mediaItems={sliderSections} />
            </div>
          );
        }

        if (
          section.type === "paragraph--hero_section" &&
          section.field_section_type === "slider"
        ) {
          return null;
        }

        if (
          section.type === "paragraph--hero_section" &&
          section.field_section_type !== "slider"
        ) {
          return <div key={section.id}>{renderBanner(section)}</div>;
        }

        return <div key={section.id}>{generateUI(section)}</div>;
      })}
    </div>
  );
};

export default DynamicTemplateClient;
