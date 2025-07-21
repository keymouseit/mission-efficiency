import MapScreen from './screen';
import { DrupalService } from '@/lib/DrupalService';
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

export default async function Home() {
	const mapData = await DrupalService.getMapData();
	const data = await DrupalService.getCommonMetaTags();
	console.log('metaTags ', data);
	return (
		<>
			<MapScreen mapData={mapData} />
		</>
	);
}
