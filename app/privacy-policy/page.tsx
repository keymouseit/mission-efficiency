import React from 'react'
import PrivacyPolicyScreen from './screen'
import { DrupalService, getMenuDetails, getNewFooter, getNewHeader } from '@/lib/DrupalService';
import { RawHeaderNode } from '@/types/header';
import { processMenuData } from '@/lib/processMenuData';

const PrivacyPolicy =  async() => {
  const getPolicyPage = await DrupalService.getPrivacyPolicy();
	const headerSection = (await getNewHeader()) as RawHeaderNode[];
    const MenuData = await getMenuDetails();
    const processedMenuItems = processMenuData(MenuData);
  
    const headerProps: any = {
      field_logo: headerSection[0]?.field_logo,
      field_header_menus_items: processedMenuItems,
    };
	const footerSection = await getNewFooter();

  return (
    <>
    <PrivacyPolicyScreen 
        pageData = {getPolicyPage[0]}
				headerData={headerProps}
				footerData={footerSection[0]}/>
    </>
  )
}

export default PrivacyPolicy;