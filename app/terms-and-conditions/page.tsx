import React from 'react';
import { DrupalService } from '@/lib/DrupalService';
import TermsConditionScreen from './screen';

const TermsCondition = async () => {
	const getTermsPage = await DrupalService.getTermConditionData();
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await DrupalService.getFooterSection();

	return (
		<>
			<TermsConditionScreen
			    pageData = {getTermsPage[0]}
				headerData={headerSection[0]}
				footerData={footerSection[0]}
			/>
		</>
	);
};

export default TermsCondition;
