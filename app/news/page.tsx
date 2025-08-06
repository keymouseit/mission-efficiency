import { DrupalService, getNewFooter } from '@/lib/DrupalService';
import { Metadata } from 'next';
import { DrupalNode } from 'next-drupal';
import NewsScreen from './screen';

export async function generateMetadata(): Promise<Metadata> {
	const data = await DrupalService.getCommonMetaTags();
	return {
		title: data?.[0]?.field_news_meta_title || '',
		description: data?.[0]?.field_news_meta_description || '',
		openGraph: {
			title: data?.[0]?.field_news_meta_title || '',
			description: data?.[0]?.field_news_meta_description || '',
			images: [data?.[0]?.field_news_meta_image || ''],
		},
	};
}

// export async function generateMetadata(): Promise<Metadata> {
// 	return {
// 		title: 'News - Mission Efficiency',
// 		description: `Stay updated on Mission Efficiency's latest news and events. Join us in our mission for efficiency and success`,
// 		openGraph: {
// 			title: 'News - Mission Efficiency',
// 			description: `Stay updated on Mission Efficiency's latest news and events. Join us in our mission for efficiency and success`,
// 			images: ['https://missionefficiency.org/assets/Uploads/ME-social-v3.png'],
// 		},
// 	};
// }

const News = async ({ searchParams }: any) => {
	const { resource = '', month = '', year = '', search = '' } = searchParams;
	const filteredNewsCards =
		(await DrupalService.getFilteredNewsCards({
			resource,
			month,
			year,
			searchQuery: search,
		})) || ([] as DrupalNode[]);
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await getNewFooter();
	const resourcesFilteredData = await DrupalService.getNewsResourcesData();
	const { search: searchParam, ...filterParams } = searchParams;

	const findQueryLength = Boolean(Object.keys(filterParams).length);

	return (
		<>
			<NewsScreen
				searchParams={searchParams}
				headerData={headerSection[0]}
				footerData={footerSection[0]}
				filteredNewsCards={filteredNewsCards}
				resourcesFilteredData={resourcesFilteredData}
				selectedResources={
					resource.length ? (resource.split(',') as string[]) : []
				}
				showClearBtn={findQueryLength}
			/>
		</>
	);
};

export default News;
