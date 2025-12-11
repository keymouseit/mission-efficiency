import { DrupalNode } from "next-drupal";
import Card from "@/components/ui/Card";

interface CardSectionProps {
  data: any;
}

const CardSection: React.FC<CardSectionProps> = ({ data }) => {
  return (
    <div>
      <Card cardSectionData={data} />
    </div>
  );
};

export default CardSection;
