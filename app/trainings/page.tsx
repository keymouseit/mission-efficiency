import { DrupalService, getNewFooter } from '@/lib/DrupalService';
import TrainingScreen from './screen';
import { DrupalNode } from 'next-drupal';
import { Metadata } from 'next';

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
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await getNewFooter();
	const topicData = await DrupalService.getTopicData();
	const languagefilterData = await DrupalService.getLanguageData();
	const resourcesData = await DrupalService.getResourcesData();
	const organizationData = await DrupalService.getOrganizationData();
	const modalityData = await DrupalService.getModalityData();
	const regionData = await DrupalService.getTrainingRegionData();
	const sectorData = await DrupalService.getTrainingSectorData();
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
	const { data: filteredTrainingData, totalRecords } =
		(await DrupalService.getFilteredTrainingCards(queryObject)) ||
		({} as { data: DrupalNode[]; totalRecords: number });

	const trainingCardImages = await DrupalService.getTrainingCardImages();

	const { search: searchParam, ...filterParams } = searchParams;

	const findQueryLength = Boolean(Object.keys(filterParams).length);

	return (
		<>
			<TrainingScreen
				searchParams={searchParams}
				trainingDataQuery={queryObject}
				headerData={headerSection[0]}
				footerData={footerSection[0]}
				topicData={topicData}
				languagefilterData={languagefilterData}
				resourcesData={resourcesData}
				organizationData={organizationData}
				modalityData={modalityData}
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
