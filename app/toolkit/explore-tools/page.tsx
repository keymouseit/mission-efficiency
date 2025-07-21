import { DrupalService } from '@/lib/DrupalService';
import { Metadata } from 'next';
import { DrupalNode } from 'next-drupal';
import ExploreToolsScreen from './screen';

export async function generateMetadata(): Promise<Metadata> {
	const data = await DrupalService.getCommonMetaTags();
	return {
		title: data?.[0]?.field_tools_meta_title || '',
		description: data?.[0]?.field_tools_meta_description || '',
		openGraph: {
			title: data?.[0]?.field_tools_meta_title || '',
			description: data?.[0]?.field_tools_meta_description || '',
			images: [data?.[0]?.field_tools_meta_image || ''],
		},
	};
}

const ExploreTools = async ({
	searchParams,
}: {
	searchParams: {
		sector?: string;
		region?: string;
		country?: string;
		category?: string;
	};
}) => {
	const { sector = '', region = '', category = '' } = searchParams;
	

	const fetchedTools =
	(await DrupalService.getFilteredToolData({
		sector,
		region,
		category,
	})) || ([] as DrupalNode[]);
	const regionData = await DrupalService.getRegionData();
	const categoryData = await DrupalService.getCategoryData();
	

	return (
		<ExploreToolsScreen
			searchParams={searchParams}
			toolsData={fetchedTools}
			regionList={regionData}
			categoryList={categoryData}
			selectedSector={sector.length > 0 ? sector.split(',') : []}
			selectedRegion={region.length > 0 ? region.split(',') : []}
			selectedCategory={category.length > 0 ? category.split(',') : []}
		/>
	);
};

export default ExploreTools;
