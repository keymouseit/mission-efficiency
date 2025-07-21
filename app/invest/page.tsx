import { DrupalService } from '@/lib/DrupalService';
import { Metadata } from 'next';
import { DrupalNode } from 'next-drupal';
import InvestScreen from './screen';

export async function generateMetadata(): Promise<Metadata> {
	const data = await DrupalService.getInvestPageData();
	return {
		title: data?.[0]?.field_invest_meta_title || '',
		description: data?.[0]?.field_invest_meta_description || '',
		openGraph: {
			title: data?.[0]?.field_invest_meta_title || '',
			description: data?.[0]?.field_invest_meta_description || '',
			images: [data?.[0]?.field_invest_meta_image || ''],
		},
	};
}

const Invest = async () => {
	const data = await DrupalService.getInvestPageData();
	const allCards = await DrupalService.getAllCards();
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await DrupalService.getFooterSection();
	let newFinancingContent: DrupalNode = {} as DrupalNode;
	let newbottomFooterCard: DrupalNode = {} as DrupalNode;
	let newInvestmentActionCards: DrupalNode[] = [] as DrupalNode[];

	const matchedFinancingCard = allCards.find(
		(card) => card.id === data[0].field_energy_financing_content.id,
	);
	if (matchedFinancingCard) {
		newFinancingContent = matchedFinancingCard;
	}

	const matchedFooterCard = allCards.find(
		(card) => card.id === data[0].field_invest_bottom_footer.id,
	);
	if (matchedFooterCard) {
		newbottomFooterCard = matchedFooterCard;
	}

	data[0].field_investment_action_cards.forEach(
		(investmentActionCard: DrupalNode) => {
			const matchedCard = allCards.find(
				(card) => card.id === investmentActionCard.id,
			);

			if (matchedCard) {
				newInvestmentActionCards.push(matchedCard);
			}
		},
	);


	const investPageData = {
		...data[0],
		field_energy_financing_content: newFinancingContent,
		field_invest_bottom_footer: newbottomFooterCard,
		field_investment_action_cards: newInvestmentActionCards,
	};
	return (
		<>
			<InvestScreen
				data={investPageData}
				headerData={headerSection[0]}
				footerData={footerSection[0]}
			/>
		</>
	);
};

export default Invest;
