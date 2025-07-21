import { DrupalService } from '@/lib/DrupalService';
import { Metadata } from 'next';
import { DrupalNode } from 'next-drupal';
import TrainingEventsScreen from './screen';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Training, Events And Webinars - Mission Efficiency',
		description: `Whether you are a student, professional, policy maker or just someone interested in energy efficiency, there are training resources available from our partners on a range of topics and for a range of sectors.`,
		openGraph: {
			title: 'Training, Events And Webinars - Mission Efficiency',
			description: `Whether you are a student, professional, policy maker or just someone interested in energy efficiency, there are training resources available from our partners on a range of topics and for a range of sectors.`,
			images: ['https://missionefficiency.org/assets/Uploads/ME-social-v3.png'],
		},
	};
}

const TrainingEventsPage = async () => {
	let newEventCards: DrupalNode[] = [];
	const data = await DrupalService.getTrainingEventData();
	const allEventCards = await DrupalService.getTrainingEventCards();
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await DrupalService.getFooterSection();

	data[0].field_traning_events_cards.forEach((eventCards: DrupalNode) => {
		const matchedEventCards = allEventCards.find(
			(card) => card?.id === eventCards?.id,
		);
		if (matchedEventCards) {
			newEventCards.push(matchedEventCards);
		}
	});

	const trainingEventScreenData = {
		...data[0],
		field_traning_events_cards: newEventCards,
	};

	return (
		<>
			<TrainingEventsScreen
				data={trainingEventScreenData}
				headerData={headerSection[0]}
				footerData={footerSection[0]}
			/>
		</>
	);
};

export default TrainingEventsPage;
