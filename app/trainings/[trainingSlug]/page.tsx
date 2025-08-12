import DetailScreen from '@/isolateScreens/DetailScreen';
import { DrupalService, getMenuDetails, getNewFooter, getNewHeader } from '@/lib/DrupalService';
import { processMenuData } from '@/lib/processMenuData';
import { RawHeaderNode } from '@/types/header';
import { Metadata } from 'next';


export async function generateMetadata(): Promise<Metadata> {
	const data = await DrupalService.getCommonMetaTags();
	return {
		title: data?.[0]?.field_training_meta_title || '',
		description: data?.[0]?.field_training_meta_description || '',
		openGraph: {
			title: data?.[0]?.field_training_meta_title || '',
			description: data?.[0]?.field_training_meta_description || '',
			images: [data?.[0]?.field_training_meta_image || ''],
		},
	};
}

const TrainingDetailPage = async ({
	params,
}: {
	params: { trainingSlug: string };
}) => {
	const { trainingSlug } = params;
	const headerSection = (await getNewHeader()) as RawHeaderNode[];
		const MenuData = await getMenuDetails();
		const processedMenuItems = processMenuData(MenuData);
	
		const headerProps: any = {
			field_logo: headerSection[0]?.field_logo,
			field_header_menus_items: processedMenuItems,
		};
	const footerSection = await getNewFooter();
	const cardDetails = await DrupalService.getNormalisedCardDataFromId(
		trainingSlug,
		'TRAINING',
	);

	return (
		<DetailScreen
			headerData={headerProps}
			footerData={footerSection[0]}
			cardDetails={cardDetails}
			displayType="TRAINING"
		/>
	);
};

export default TrainingDetailPage;
