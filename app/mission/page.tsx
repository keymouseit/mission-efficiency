import { DrupalService } from '@/lib/DrupalService';
import { Metadata } from 'next';
import { DrupalNode } from 'next-drupal';
import TheMissionScreen from './screen';

export async function generateMetadata(): Promise<Metadata> {
	const data = await DrupalService.getTheMissionPageData();
	return {
		title: data?.[0]?.field_mission_meta_title || '',
		description: data?.[0]?.field_mission_meta_description || '',
		openGraph: {
			title: data?.[0]?.field_mission_meta_title || '',
			description: data?.[0]?.field_mission_meta_description || '',
			images: [data?.[0]?.field_mission_meta_image || ''],
		},
	};
}

const MissionPage = async () => {
	let newMissionCards: DrupalNode[] = [];
	let newTimelineCards: DrupalNode[] = [];
	let newPartnerCards: DrupalNode[] = [];
	let newMemberCards: DrupalNode[] = [];
	const data = await DrupalService.getTheMissionPageData();
	const allCards = await DrupalService.getAllCards();
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await DrupalService.getFooterSection();
	let newbottomFooterCard: DrupalNode = {} as DrupalNode;

	const matchedBottomFooterCard = allCards.find(
		(card) => card.id === data[0]?.field_mission_bottom_footer?.id,
	);
	if (matchedBottomFooterCard) {
		newbottomFooterCard = matchedBottomFooterCard;
	}

	data[0].field_mission_energy_cards.forEach((missionCards: DrupalNode) => {
		const matchedMissionCards = allCards.find(
			(card) => card?.id === missionCards?.id,
		);

		if (matchedMissionCards) {
			newMissionCards.push(matchedMissionCards);
		}
	});

	data[0].field_mission_timeline_cards.forEach((timelineCard: DrupalNode) => {
		const matchedTimelineCard = allCards.find(
			(card) => card?.id === timelineCard?.id,
		);

		if (matchedTimelineCard) {
			newTimelineCards.push(matchedTimelineCard);
		}
	});


	const theMissionPageData = {
		...data[0],
		field_mission_energy_cards: newMissionCards,
		field_mission_bottom_footer: newbottomFooterCard,
		field_mission_timeline_cards: newTimelineCards,
		field_mission_partners_cards: newPartnerCards,
		field_mission_member_cards: newMemberCards,
	};
	return (
		<TheMissionScreen
			data={theMissionPageData}
			headerData={headerSection[0]}
			footerData={footerSection[0]}
		/>
	);
};

export default MissionPage;
