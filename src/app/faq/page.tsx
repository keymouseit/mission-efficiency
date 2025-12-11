import { DrupalService } from "@/services";
import FaqScreen from "./screen";

const FaqPage = async () => {
  const FAQData = await DrupalService.getFAQData();

  return <FaqScreen data={FAQData} />;
};

export default FaqPage;
