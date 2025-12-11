
import TrainingScreen from './screen';
import { DrupalNode } from 'next-drupal';
import { Metadata } from 'next';
import { DrupalService } from '@/services';

export async function generateMetadata(): Promise<Metadata> {
	const data = await DrupalService.getCommonMetaTags();
	return {
		title: data?.[0]?.field_training_meta_title || '',
		description: data?.[0]?.field_training_meta_description || '',
		openGraph: {
			title: data?.[0]?.field_training_meta_title || '',
			description: data?.[0]?.field_training_meta_description || '',
			images: [data?.[0]?.field_training_meta_image || ''],
		},
	};
}

const Training = async ({ searchParams }: any) => {
	const {
		topic = '',
		language = '',
		organization = '',
		sector = '',
		search = '',
		region = '',
		modality = '',
		resource = '',
	} = searchParams;
	
	const queryObject = {
		topic,
		language,
		organization,
		sector,
		searchQuery: search,
		region,
		modality,
		resource,
	};

	const [
		topicData,
		languagefilterData,
		regionData,
		sectorData,
		filteredTrainingRecords,
	] = await Promise.all([
		DrupalService.getTopicData(),
		DrupalService.getLanguageData(),
		DrupalService.getTrainingRegionData(),
		DrupalService.getTrainingSectorData(),
		DrupalService.getFilteredTrainingCards({
			topic,
			language,
			organization,
			sector,
			searchQuery: search,
			region,
			modality,
			resource,
		}) || { data: [], totalRecords: 0 },
	]);
	const { data: filteredTrainingData, totalRecords } =
		filteredTrainingRecords ||
		({} as { data: DrupalNode[]; totalRecords: number });

	const { search: searchParam, ...filterParams } = searchParams;
	const findQueryLength = Boolean(Object.keys(filterParams).length);


	return (
		<>
			<TrainingScreen
				searchParams={searchParams}
				trainingDataQuery={queryObject}
				topicData={topicData}
				languagefilterData={languagefilterData}
				resourcesData={[]}
				organizationData={[]}
				modalityData={[]}
				regionData={regionData}
				sectorData={sectorData}
				filteredTrainingData={filteredTrainingData}
				totalFilteredRecords={totalRecords as number}
				selectedLanguage={language}
				showClearBtn={findQueryLength}
				selectedTopic={topic.length ? (topic.split(',') as string[]) : []}
				selectedOrganization={
					organization.length ? (organization.split(',') as string[]) : []
				}
				selectedSector={sector.length ? (sector.split(',') as string[]) : []}
				selectedRegion={region.length ? (region.split(',') as string[]) : []}
				selectedModality={
					modality.length ? (modality.split(',') as string[]) : []
				}
				selectedResources={
					resource.length ? (resource.split(',') as string[]) : []
				}
			/>
		</>
	);
};

export default Training;
