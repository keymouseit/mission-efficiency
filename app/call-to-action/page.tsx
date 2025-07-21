import { DrupalService } from '@/lib/DrupalService';
import { Metadata } from 'next';
import { DrupalNode } from 'next-drupal';
import CallToActionScreen from './screen';

export async function generateMetadata(): Promise<Metadata> {
	const data = await DrupalService.getCallToActionPageData();
	return {
		title: data?.[0]?.field_cta_meta_title || '',
		description: data?.[0]?.field_cta_meta_description || '',
		openGraph: {
			title: data?.[0]?.field_cta_meta_title || '',
			description: data?.[0]?.field_cta_meta_description || '',
			images: [data?.[0]?.field_cta_meta_image || ''],
		},
	};
}

const CallToAction = async () => {
	let newLeftFaqCards: DrupalNode[] = [];
	let newRightFaqCards: DrupalNode[] = [];
	let newPledgeAlignCards: DrupalNode[] = [];
	let newSupporterCards: DrupalNode[] = [];
	let newbottomFooterCard: DrupalNode = {} as DrupalNode;
	const data = await DrupalService.getCallToActionPageData();
	const faqCards = await DrupalService.getFaqCards();
	const allCards = await DrupalService.getAllCards();
	const allSupporterCards = await DrupalService.getSupporterCards();
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await DrupalService.getFooterSection();

	data?.[0]?.field_cta_faq_left_cards.forEach((leftFaqCard: DrupalNode) => {
		const matchedLeftFaqCards = faqCards.find(
			(card) => card?.id === leftFaqCard?.id,
		);
		if (matchedLeftFaqCards) {
			newLeftFaqCards.push(matchedLeftFaqCards);
		}
	});

	data?.[0]?.field_cta_faq_right_cards.forEach((rightFaqCard: DrupalNode) => {
		const matchedRightFaqCards = faqCards.find(
			(card) => card?.id === rightFaqCard?.id,
		);
		if (matchedRightFaqCards) {
			newRightFaqCards.push(matchedRightFaqCards);
		}
	});

	data?.[0]?.field_cta_pledge_align_cards.forEach((pledgeCard: DrupalNode) => {
		const matchedCards = allCards?.find((card) => card?.id === pledgeCard?.id);
		if (matchedCards) {
			newPledgeAlignCards.push(matchedCards);
		}
	});

	data?.[0]?.field_cta_supporter_cards?.forEach(
		(supporterCards: DrupalNode) => {
			const matchedSupporterCards = allSupporterCards?.find(
				(card) => card?.id === supporterCards?.id,
			);
			if (matchedSupporterCards) {
				newSupporterCards.push(matchedSupporterCards);
			}
		},
	);

	const matchedCard = allCards.find(
		(card) => card.id === data?.[0]?.field_cta_bottom_footer?.id,
	);
	if (matchedCard) {
		newbottomFooterCard = matchedCard;
	}

	const callToActionPageData = {
		...data[0],
		field_cta_faq_left_cards: newLeftFaqCards,
		field_cta_faq_right_cards: newRightFaqCards,
		field_cta_pledge_align_cards: newPledgeAlignCards,
		field_cta_supporter_cards: newSupporterCards,
		field_cta_bottom_footer: newbottomFooterCard,
	};
	return (
		<>
			<CallToActionScreen
				data={callToActionPageData}
				headerData={headerSection[0]}
				footerData={footerSection[0]}
			/>
		</>
	);
};

export default CallToAction;
