import { DrupalService } from '@/lib/DrupalService';
import MissionPledgeScreen from './screen';
import { DrupalNode } from 'next-drupal';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const data = await DrupalService.getMissionPledgePageData();
	return {
		title: data?.[0]?.field_pledge_meta_title || '',
		description: data?.[0]?.field_pledge_meta_description || '',
		openGraph: {
			title: data?.[0]?.field_pledge_meta_title || '',
			description: data?.[0]?.field_pledge_meta_description || '',
			images: [data?.[0]?.field_pledge_meta_image || ''],
		},
	};
}

const MissionPledgePage = async () => {
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await DrupalService.getFooterSection();
	const pageData = await DrupalService.getMissionPledgePageData();
	const getAllPledges = await DrupalService.getAllPledgesCard();
	let newMissionPledgeCards: DrupalNode[] = [];
	let newSupporterCard: DrupalNode[] = [];
	let newTestimonialCard: DrupalNode[] = [];
	let newDashboardCard: DrupalNode[] = [];
	const allSupporterCards = await DrupalService.getSupporterCards();
	const allCards = await DrupalService.getAllCards();
	const pledgeDashboard = await DrupalService.getPledgeDashboard();

	pageData[0].field_mission_pledges_cards.forEach((pledgeData: DrupalNode) => {
		const matchedPledgeData = getAllPledges?.find(
			(card) => card?.id === pledgeData?.id,
		);
		if (matchedPledgeData) {
			newMissionPledgeCards.push(matchedPledgeData);
		}
	});

	pageData[0].field_pledge_supporter_cards.forEach(
		(supportCard: DrupalNode) => {
			const matchedSupportCard = allSupporterCards?.find(
				(card) => card?.id === supportCard?.id,
			);
			if (matchedSupportCard) {
				newSupporterCard.push(matchedSupportCard);
			}
		},
	);

	pageData[0].field_pledge_testimonial.forEach((testimonial: DrupalNode) => {
		const matchedTestimonialCard = allCards?.find(
			(card) => card?.id === testimonial?.id,
		);
		if (matchedTestimonialCard) {
			newTestimonialCard.push(matchedTestimonialCard);
		}
	});

	pageData[0].field_dashboard_cards.forEach((dashboardCard: DrupalNode) => {
		const matchedDashboardCard = pledgeDashboard?.find(
			(card) => card?.id === dashboardCard?.id,
		);
		if (matchedDashboardCard) {
			newDashboardCard.push(matchedDashboardCard);
		}
	});

	const missionPledgeData = {
		...pageData[0],
		field_mission_pledges_cards: newMissionPledgeCards,
		field_pledge_supporter_cards: newSupporterCard,
		field_pledge_testimonial: newTestimonialCard,
		field_dashboard_cards: newDashboardCard,
	};

	return (
		<MissionPledgeScreen
			pageData={missionPledgeData}
			headerData={headerSection[0]}
			footerData={footerSection[0]}
		/>
	);
};

export default MissionPledgePage;
