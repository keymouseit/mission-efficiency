import DetailScreen from '@/isolateScreens/DetailScreen';
import { DrupalService } from '@/lib/DrupalService';
import { Metadata } from 'next';

// type Props = {
// 	params: { trainingSlug: string };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
// 	// read route params
// 	const { trainingSlug } = params;
// 	const cardDetails = await DrupalService.getNormalisedCardDataFromId(
// 		trainingSlug,
// 		'TRAINING',
// 	);
// 	const mediaLink =
// 		cardDetails?.media ||
// 		'https://missionefficiency.org/assets/Uploads/ME-social-v3.png';

// 	return {
// 		title: `${cardDetails?.title} - Mission Efficiency`,
// 		description: cardDetails?.description?.value || '',
// 		openGraph: {
// 			title: `${cardDetails?.title} - Mission Efficiency`,
// 			description: cardDetails?.description?.value || '',
// 			images: [mediaLink],
// 			videos: [mediaLink || ''],
// 		},
// 	};
// }

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
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await DrupalService.getFooterSection();
	const cardDetails = await DrupalService.getNormalisedCardDataFromId(
		trainingSlug,
		'TRAINING',
	);

	return (
		<DetailScreen
			headerData={headerSection[0]}
			footerData={footerSection[0]}
			cardDetails={cardDetails}
			displayType="TRAINING"
		/>
	);
};

export default TrainingDetailPage;
