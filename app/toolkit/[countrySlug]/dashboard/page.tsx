import countries from '@/lib/constants';
import { DrupalService } from '@/lib/DrupalService';
import { DrupalNode } from 'next-drupal';
import slugify from 'slugify';
import DashboardScreen from './screen';
import NotFoundPage from '@/components/NotFound';
import { Metadata } from 'next';

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

export async function generateStaticParams() {
	const params = countries.map(async (country) => {
		const countrySlug = slugify(country?.name, {
			lower: true,
		});
		return {
			countrySlug: countrySlug,
		};
	});
	return params;
}

const DashboardPage = async ({
	params,
}: {
	params: { countrySlug: string; countryData: any };
}) => {
	const { countrySlug } = params;
	const countryList = await DrupalService.getMapData();
	const matchedCountry = countryList?.find(
		(data: DrupalNode) =>
			slugify(data.title, { lower: true }) === countrySlug ||
			slugify(data.title, { lower: true }).includes(countrySlug),
	);

	if (!countryList || !matchedCountry) {
		return <NotFoundPage />;
	}

	return (
		<DashboardScreen countryList={countryList} countryData={matchedCountry} />
	);
};

export default DashboardPage;
