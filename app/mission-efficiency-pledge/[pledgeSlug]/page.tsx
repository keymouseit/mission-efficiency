import { DrupalService, getNewFooter } from '@/lib/DrupalService';
import PledgeDetailScreen from './screen';
import { DrupalNode } from 'next-drupal';
import { Metadata } from 'next';

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
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await getNewFooter();
	const pledgeDetailCard =
		(await DrupalService.getPledgeDetailFromId(pledgeSlug)) ||
		({} as DrupalNode);

	return (
		<PledgeDetailScreen
			headerData={headerSection[0]}
			footerData={footerSection[0]}
			detailCard={pledgeDetailCard}
		/>
	);
};

export default NewsDetailPage;
