import { DrupalService, getMenuDetails, getNewFooter, getNewHeader } from '@/lib/DrupalService';
import PledgeDetailScreen from './screen';
import { DrupalNode } from 'next-drupal';
import { Metadata } from 'next';
import { RawHeaderNode } from '@/types/header';
import { processMenuData } from '@/lib/processMenuData';

type Props = {
	params: { pledgeSlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// read route params
	const { pledgeSlug } = params;

	return {
		title: `${pledgeSlug} - Mission Efficiency`,
		openGraph: {
			title: `${pledgeSlug} - Mission Efficiency`,
			images: ['https://missionefficiency.org/assets/Uploads/ME-social-v3.png'],
		},
	};
}

const NewsDetailPage = async ({
	params,
}: {
	params: { pledgeSlug: string };
}) => {
	const { pledgeSlug } = params;
	const headerSection = (await getNewHeader()) as RawHeaderNode[];
		const MenuData = await getMenuDetails();
		const processedMenuItems = processMenuData(MenuData);
	
		const headerProps: any = {
			field_logo: headerSection[0]?.field_logo,
			field_header_menus_items: processedMenuItems,
		};
	const footerSection = await getNewFooter();
	const pledgeDetailCard =
		(await DrupalService.getPledgeDetailFromId(pledgeSlug)) ||
		({} as DrupalNode);

	return (
		<PledgeDetailScreen
			headerData={headerProps}
			footerData={footerSection[0]}
			detailCard={pledgeDetailCard}
		/>
	);
};

export default NewsDetailPage;
