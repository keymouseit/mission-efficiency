import { CaptchaProvider } from '@/lib/CaptchaService/Provider';
import { DrupalService, getMenuDetails, getNewFooter, getNewHeader } from '@/lib/DrupalService';
import { Metadata } from 'next';
import WrappedPledgeForm from './pledgeFormWrapper';
import PledgeFormsScreen from './screen';
import { RawHeaderNode } from '@/types/header';
import { processMenuData } from '@/lib/processMenuData';

export async function generateMetadata(): Promise<Metadata> {
	const data = await DrupalService.getPledgeFormPage();
	return {
		title: data?.field_pledge_form_gov_title || '',
		description: data?.field_pledge_form_gov_desc || '',
		openGraph: {
			title: data?.field_pledge_form_gov_title || '',
			description: data?.field_pledge_form_gov_desc || '',
			images: ['https://missionefficiency.org/assets/Uploads/ME-social-v3.png'],
		},
	};
}

const PledgeForm = async ({
	searchParams,
}: {
	searchParams: { type: 'GOVERNMENT' | 'ORGANIZATION' };
}) => {
	const { type } = searchParams;
	const headerSection = (await getNewHeader()) as RawHeaderNode[];
		const MenuData = await getMenuDetails();
		const processedMenuItems = processMenuData(MenuData);
	
		const headerProps: any = {
			field_logo: headerSection[0]?.field_logo,
			field_header_menus_items: processedMenuItems,
		};
	const footerSection = await getNewFooter();
	const pledgeFormData = await DrupalService.getPledgeFormPage();
	const checklistData = await DrupalService.getFormChecklists();

	return (
		<>
			<WrappedPledgeForm
				headerData={headerProps}
				footerData={footerSection[0]}
				pledgeFormData={pledgeFormData}
				formType={type || 'GOVERNMENT'}
				formChecklist={checklistData}
			/>
		</>
	);
};

export default PledgeForm;
