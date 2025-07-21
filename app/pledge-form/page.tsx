import { CaptchaProvider } from '@/lib/CaptchaService/Provider';
import { DrupalService } from '@/lib/DrupalService';
import { Metadata } from 'next';
import WrappedPledgeForm from './pledgeFormWrapper';
import PledgeFormsScreen from './screen';

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
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await DrupalService.getFooterSection();
	const pledgeFormData = await DrupalService.getPledgeFormPage();
	const checklistData = await DrupalService.getFormChecklists();

	return (
		<>
			<WrappedPledgeForm
				headerData={headerSection[0]}
				footerData={footerSection[0]}
				pledgeFormData={pledgeFormData}
				formType={type || 'GOVERNMENT'}
				formChecklist={checklistData}
			/>
		</>
	);
};

export default PledgeForm;
