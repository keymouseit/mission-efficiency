import { DrupalService, getMenuDetails, getNewFooter, getNewHeader } from '@/lib/DrupalService';
import { Metadata } from 'next';
import { DrupalNode } from 'next-drupal';
import TrainingEventsScreen from './screen';
import { RawHeaderNode } from '@/types/header';
import { processMenuData } from '@/lib/processMenuData';

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
	const headerSection = (await getNewHeader()) as RawHeaderNode[];
		const MenuData = await getMenuDetails();
		const processedMenuItems = processMenuData(MenuData);
	
		const headerProps: any = {
			field_logo: headerSection[0]?.field_logo,
			field_header_menus_items: processedMenuItems,
		};
	const footerSection = await getNewFooter();

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
				headerData={headerProps}
				footerData={footerSection[0]}
			/>
		</>
	);
};

export default TrainingEventsPage;
