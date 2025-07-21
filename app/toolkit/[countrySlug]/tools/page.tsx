import NotFoundPage from '@/components/NotFound';
import { DrupalService } from '@/lib/DrupalService';
import { getSectorByEfficiency } from '@/lib/utils';
import { Metadata } from 'next';
import CountryToolsScreen from './screen';

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

const CountryTools = async ({
	params,
	searchParams,
}: {
	params: { countrySlug: string };
	searchParams: { sector?: string; region?: string };
}) => {
	const { countrySlug } = params;
	const { sector = '', region = '' } = searchParams;

	const countryData = await DrupalService.getCountryDataByCountrySlug(
		countrySlug,
	);

	const fetchedTools = await DrupalService.getFilteredToolData({
		sector,
		region: `${region},Global`,
	});

	if (!countryData || !fetchedTools) {
		return <NotFoundPage />;
	}

	const sectorInfo = getSectorByEfficiency(countryData);

	return (
		<CountryToolsScreen
			searchParams={searchParams}
			countryData={countryData}
			toolsData={fetchedTools}
			sectorByEfficiency={sectorInfo}
			selectedSector={sector.split(',') as string[]}
		/>
	);
};

export default CountryTools;
