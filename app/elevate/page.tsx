import { DrupalService } from '@/lib/DrupalService';
import { Metadata } from 'next';
import { DrupalNode } from 'next-drupal';
import ElevateScreen from './screen';
import { getJoinFormData } from '@/services/api';

export async function generateMetadata(): Promise<Metadata> {
	const data = await DrupalService.getElevatePageData();

	return {
		title: data?.[0]?.field_elevate_meta_title || '',
		description: data?.[0]?.field_elevate_meta_description || '',
		openGraph: {
			title: data?.[0]?.field_elevate_meta_title || '',
			description: data?.[0]?.field_elevate_meta_description || '',
			images: [data?.[0]?.field_elevate_meta_image || ''],
		},
	};
}

const Elevate = async () => {
	const data = await DrupalService.getElevatePageData();
	// const allJoinFormSubmissions =
	// 	await DrupalService.getElevateJoinFormSubmissions();
	const allCards = await DrupalService.getAllCards();
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await DrupalService.getFooterSection();
	let newRelatedCards: DrupalNode[] = [];
	let newBenefitsCards: DrupalNode[] = [];
	let newEneryEfficiencyCard: DrupalNode[] = [];
	let newtrainingSection: DrupalNode = {} as DrupalNode;
	let newEfficiencyBanner: DrupalNode = {} as DrupalNode;
	let newbottomFooterCard: DrupalNode = {} as DrupalNode;
	let newActivityCards: DrupalNode[] = [];
	let newJoinsCards: DrupalNode[] = [];
	let newCampaignMaterialCards: DrupalNode[] = [];
	let newCampaignResdourceCards: DrupalNode[] = [];
	const newOpportunityCards: DrupalNode[] = [];
	let newBanner: DrupalNode[] = [];

	const joinFormMapData = await getJoinFormData();

	const matchedTrainingSectionCard = allCards.find(
		(card) => card.id === data[0]?.field_elevate_training_section?.id,
	);
	if (matchedTrainingSectionCard) {
		newtrainingSection = matchedTrainingSectionCard;
	}

	const matchedEfficiencyBannerCard = allCards.find(
		(card) => card.id === data[0]?.field_elevate_efficiency_banner?.id,
	);
	if (matchedEfficiencyBannerCard) {
		newEfficiencyBanner = matchedEfficiencyBannerCard;
	}

	const matchedBottomFooterCard = allCards.find(
		(card) => card.id === data[0]?.field_elevate_bottom_footer?.id,
	);
	if (matchedBottomFooterCard) {
		newbottomFooterCard = matchedBottomFooterCard;
	}

	data[0].field_energy_related_cards.forEach((relatedCard: DrupalNode) => {
		const matchedCard = allCards.find((card) => card?.id === relatedCard?.id);

		if (matchedCard) {
			newRelatedCards.push(matchedCard);
		}
	});

	data[0].field_elevate_benefits_cards.forEach((benefitsCard: DrupalNode) => {
		const matchedCard = allCards.find((card) => card?.id === benefitsCard?.id);

		if (matchedCard) {
			newBenefitsCards.push(matchedCard);
		}
	});

	data[0].field_energy_efficiency_101.forEach(
		(eneryEfficiencyCard: DrupalNode) => {
			const matchedCard = allCards.find(
				(card) => card?.id === eneryEfficiencyCard?.id,
			);

			if (matchedCard) {
				newEneryEfficiencyCard.push(matchedCard);
			}
		},
	);

	data[0].field_energy_activity_cards.forEach((actCard: DrupalNode) => {
		const matchedActivityCard = allCards.find(
			(card) => card?.id === actCard?.id,
		);

		if (matchedActivityCard) {
			newActivityCards.push(matchedActivityCard);
		}
	});

	data[0].field_ready_to_move_cards.forEach((joinCard: DrupalNode) => {
		const matchedJoinCard = allCards.find((card) => card?.id === joinCard?.id);

		if (matchedJoinCard) {
			newJoinsCards.push(matchedJoinCard);
		}
	});

	data[0].field_elevate_campaign_materials.forEach(
		(materialCard: DrupalNode) => {
			const matchedMaterialCard = allCards.find(
				(card) => card?.id === materialCard?.id,
			);

			if (matchedMaterialCard) {
				newCampaignMaterialCards.push(matchedMaterialCard);
			}
		},
	);

	data[0].field_elevate_campaign_resources.forEach(
		(resourceCard: DrupalNode) => {
			const matchedResourceCard = allCards.find(
				(card) => card?.id === resourceCard?.id,
			);

			if (matchedResourceCard) {
				newCampaignResdourceCards.push(matchedResourceCard);
			}
		},
	);

	data[0].field_opportunity_cards.forEach(
		(opportunityCard: DrupalNode) => {
			const matchedCard = allCards.find(
				(card) => card.id === opportunityCard.id,
			);

			if (matchedCard) {
				newOpportunityCards.push(matchedCard);
			}
		},
	);
	data[0].field_campaign_life_banner.forEach((bannerCard: DrupalNode) => {
		const matchedCard = allCards.find((card) => card.id === bannerCard.id);

		if (matchedCard) {
			newBanner.push(matchedCard);
		}
	});

	const elevatePageData = {
		...data[0],
		field_energy_related_cards: newRelatedCards,
		field_elevate_benefits_cards: newBenefitsCards,
		field_elevate_training_section: newtrainingSection,
		field_elevate_efficiency_banner: newEfficiencyBanner,
		field_elevate_bottom_footer: newbottomFooterCard,
		field_energy_efficiency_101: newEneryEfficiencyCard,
		field_energy_activity_cards: newActivityCards,
		field_ready_to_move_cards: newJoinsCards,
		field_elevate_campaign_materials: newCampaignMaterialCards,
		field_elevate_campaign_resources: newCampaignResdourceCards,
		field_campaign_life_banner: newBanner,
	};
	return (
		<>
			<ElevateScreen
				data={elevatePageData}
				opportunityCards={newOpportunityCards}
				joinFormSubmissions={joinFormMapData}
				headerData={headerSection[0]}
				footerData={footerSection[0]}
			/>
		</>
	);
};

export default Elevate;
