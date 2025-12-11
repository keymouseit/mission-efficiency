import { DrupalNode } from "next-drupal";
import CardWithImageTitleChip from "./variants/CardWithImageTitleChip";
import AnimatedCard from "./variants/AnimatedCard";
import CardWithImageAndIcon from "./variants/CardWithImageAndIcon";
import VerticalSliderSection from "@/components/sections/VerticalSliderSection";
import BorderCard from "./variants/BorderCard";
import HorizontalCard from "./variants/HorizontalCard";
import GridCard from "./variants/GridCard";
import TitleInButtonCard from "./variants/TitleInButtonCard";
import BasicCard from "./variants/BasicCard";
import ColorTransitionCard from "./variants/ColorTransitionCard";
import BorderWithSubtextCard from "./variants/BorderWithSubtextCard";
import SplitLayoutCard from "./variants/SplitLayoutCard";
import TitleInButtonLearnCard from "./variants/TitleInButtonLearnCard";
import IconWithLinesCard from "./variants/IconWithLinesCard";
import ImageWithSubtextCard from "./variants/ImageWithSubtextCard";
import VerticalCards from "./variants/VerticalCards";
import TwoCardsRow from "./variants/TwoCardsRow";
import NewsAndEventCard from "./variants/NewsAndEventCard";
import FlipFlopCard from "./variants/FlipFlopCard";
import VerticalTimeLineCard from "./variants/VerticalTimeLineCard";

interface CardProps {
  cardSectionData: DrupalNode;
}

const Card: React.FC<CardProps> = ({ cardSectionData }) => {
  const renderCardByType = () => {
    switch (cardSectionData[0]?.type || cardSectionData?.field_card_ui_types) {
      case "dynamic-fetched-cards":
        return <NewsAndEventCard data={cardSectionData} />;

      case "t":
        return <CardWithImageTitleChip data={cardSectionData} />;

      case "animated_icon_with":
        return <AnimatedCard data={cardSectionData} />;

      case "image_with_icon_and_title":
        return <CardWithImageAndIcon data={cardSectionData} />;

      case "vertical_slider":
        return <VerticalSliderSection data={cardSectionData} />;

      case "icon_with_title_description_and_border":
        return <BorderCard data={cardSectionData} />;

      case "horizontal_align_content":
        return <HorizontalCard data={cardSectionData} />;

      case "icon_with_title_in_button_and_description":
        return <TitleInButtonCard data={cardSectionData} />;

      case "grid_type":
        return <GridCard data={cardSectionData} />;

      case "icon_with_title_and_description":
      case "step_title_description":
        return <BasicCard data={cardSectionData} />;

      case "icon_color_transition_with_title_and_description":
        return <ColorTransitionCard data={cardSectionData} />;

      case "icon_with_title_description_border_and_subtext":
        return <BorderWithSubtextCard data={cardSectionData} />;

      case "split_layout_with_images":
        return <SplitLayoutCard data={cardSectionData} />;

      case "icon_with_title_in_button_and_learn_more":
        return <TitleInButtonLearnCard data={cardSectionData} />;

      case "icon_with_left_side_lines":
        return <IconWithLinesCard data={cardSectionData} />;

      case "image_with_subtext_title_and_description":
        return <ImageWithSubtextCard data={cardSectionData} />;

      case "verticle_cards":
        return <VerticalCards data={cardSectionData} />;

      case "two_cards_in_a_row":
        return <TwoCardsRow data={cardSectionData} />;

      case "flip_flop_card":
        return <FlipFlopCard data={cardSectionData} />;

      case "time":
        return <VerticalTimeLineCard data={cardSectionData} />;

      default:
        return (
          <div className="p-4 text-center border rounded-md text-red-500">
            ⚠ Unknown card variant: {cardSectionData?.field_card_ui_types}
          </div>
        );
    }
  };

  return <>{renderCardByType()}</>;
};

export default Card;
