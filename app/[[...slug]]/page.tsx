import {
  getMenuDetails,
  getNewFooter,
  getNewHeader,
  getPageTemplateNew,
} from "@/lib/DrupalService";
import { DrupalNode } from "next-drupal";
import DynamicTemplateServer from "./screen";
import { processMenuData } from "@/lib/processMenuData";
import { handleServerError } from "@/lib/serverErrorHandler";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

const HomePage = async ({ params }: { params: { slug?: string[] } }) => {
  return handleServerError(async () => {
    const slugArray = params?.slug || [];
    const slug = slugArray.length === 0 ? "/" : slugArray.join("/");

    // Use Promise.all for better performance
    const [newData, rawHeaderData, footerData, MenuData] = await Promise.all([
      getPageTemplateNew(),
      getNewHeader(),
      getNewFooter(),
      getMenuDetails(),
    ]);

    const processedMenuItems = processMenuData(MenuData);

    const headerProps: any = {
      field_logo: rawHeaderData[0]?.field_logo,
      field_header_menus_items: processedMenuItems,
    };

    const matchedTemplate = newData.find(
      (template: DrupalNode) => template.field_page_slug === slug
    );

    if (!matchedTemplate) {
      notFound(); // This will trigger Next.js not-found.tsx
    }

    return (
      <DynamicTemplateServer
        templateData={matchedTemplate}
        headerData={headerProps}
        footerData={footerData[0]}
      />
    );
  });
};

export default HomePage;
