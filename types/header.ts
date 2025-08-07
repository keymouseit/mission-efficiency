import { DrupalNode } from "next-drupal";

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  children: MenuItem[];
}

export interface HeaderData extends DrupalNode {
  field_logo?: DrupalNode;
  field_header_menus_items?: MenuItem[];
}

export interface HeaderProps {
  data: HeaderData;
}

export interface RawMenuItem {
  id: string;
  attributes: {
    title: string;
    url: string;
    parent: string;
    enabled: boolean;
    weight: number;
  };
}

export interface ProcessedMenuItem {
  id: string;
  title: string;
  url: string;
  children: ProcessedMenuItem[];
}

export interface DynamicTemplateScreenProps {
  templateData: DrupalNode;
  headerData: HeaderData;
  footerData: DrupalNode;
}

export interface RawHeaderNode extends DrupalNode {
  field_logo?: DrupalNode;
}
