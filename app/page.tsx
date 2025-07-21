import LandingPage from './screen';
import { DrupalService } from '@/lib/DrupalService';
import { DrupalNode } from 'next-drupal';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const data = await DrupalService.getHomePageData();
	return {
		title: data?.[0]?.field_home_meta_title || '',
		description: data?.[0]?.field_home_meta_description || '',
		openGraph: {
			title: data?.[0]?.field_home_meta_title,
			description: data?.[0]?.field_home_meta_description || '',
			images: [data?.[0]?.field_home_meta_image || ''],
		},
	};
}

export default async function Home() {
	const templates = await DrupalService.getTemplates();
	const data = await DrupalService.getHomePageData();
	const filteredNewsCards =
		(await DrupalService.getFilteredNewsCards({
			resource: '',
			month: '',
			year: '',
			searchQuery: '',
		})) || ([] as DrupalNode[]);
	const sortedNewsData = filteredNewsCards
		.sort((a: any, b: any) => {
			// const dateA: any = new Date(a.field_news_date);
			// const dateB: any = new Date(b.field_news_date);
			const dateA: any = new Date(a.created);
			const dateB: any = new Date(b.created);
			return dateB - dateA;
		})
		.slice(0, 3);
	const sortedTrainingsData =
		(
			await DrupalService.getFilteredTrainingCards({
				topic: '',
				language: '',
				organization: '',
				sector: '',
				searchQuery: '',
				region: '',
				modality: '',
				resource: '',
			})
		)?.data.slice(0, 3) || ([] as DrupalNode[]);
	const allCards = await DrupalService.getAllCards();
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await DrupalService.getFooterSection();
	let newBannerCards: DrupalNode[] = [];

	let newbottomFooterCard: DrupalNode = {} as DrupalNode;
	const matchedCard = allCards.find(
		(card) => card.id === data[0]?.field_home_bottom_footer_section?.id,
	);

	if (matchedCard) {
		newbottomFooterCard = matchedCard;
	}
	
	data[0].field_home_page_banner.forEach((banner: DrupalNode) => {
		const matchedCard = allCards.find((card) => card?.id === banner?.id);

		if (matchedCard) {
			newBannerCards.push(matchedCard);
		}
	});

	const homePageData = {
		...data[0],
		field_home_bottom_footer_section: newbottomFooterCard,
		field_home_page_banner : newBannerCards,
	};
	// console.log('process env ----------------------------------------------------> ', JSON.parse(JSON.stringify(process.env)))
	const env = JSON.parse(JSON.stringify(process.env));
	return (
		<>
			<LandingPage
			templates={templates}
				data={homePageData}
				newsCarouselCards={sortedNewsData}
				trainingsCarouselCards={sortedTrainingsData}
				headerData={headerSection[0]}
				footerData={footerSection[0]}
				env={env}
			/>
		</>
	);
}
