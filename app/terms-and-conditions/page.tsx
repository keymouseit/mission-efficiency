import React from 'react';
import { DrupalService, getMenuDetails, getNewFooter, getNewHeader } from '@/lib/DrupalService';
import TermsConditionScreen from './screen';
import { RawHeaderNode } from '@/types/header';
import { processMenuData } from '@/lib/processMenuData';

const TermsCondition = async () => {
	const getTermsPage = await DrupalService.getTermConditionData();
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
			<TermsConditionScreen
			    pageData = {getTermsPage[0]}
				headerData={headerProps}
				footerData={footerSection[0]}
			/>
		</>
	);
};

export default TermsCondition;
