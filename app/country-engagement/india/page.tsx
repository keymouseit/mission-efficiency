import { DrupalService, getNewFooter } from '@/lib/DrupalService';
import CountryScreen from './screen';
import { DrupalNode } from 'next-drupal';

const CountryPage = async () => {
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await getNewFooter();
	const getAllCountries = await DrupalService.getAllCountriesData();
	const allCards = await DrupalService.getAllCards();
	let newCountryCard: DrupalNode[] = [];
	let newResourcesDetailCard: DrupalNode[] = [];
	let newSupportCard: DrupalNode[] = [];

	getAllCountries[0].field_country_key_points.forEach((countriesData: DrupalNode) => {
		const matchedCountriesData = allCards?.find(
			(card) => card?.id === countriesData?.id,
		);
		if (matchedCountriesData) {
			newCountryCard.push(matchedCountriesData);
		}
	});
	getAllCountries[0].field_elevate_resource_cards.forEach((resourcesData: DrupalNode) => {
		const matchedresourcesData = allCards?.find(
			(card) => card?.id === resourcesData?.id,
		);
		if (matchedresourcesData) {
			newResourcesDetailCard.push(matchedresourcesData);
		}
	});
	getAllCountries[0].field_support_resource_cards.forEach((supportData: DrupalNode) => {
		const matchedsupportData = allCards?.find(
			(card) => card?.id === supportData?.id,
		);
		if (matchedsupportData) {
			newSupportCard.push(matchedsupportData);
		}
	});

	const countryEngagmentData = {
        ...getAllCountries[0],
		field_country_key_points: newCountryCard,
		field_elevate_resource_cards:newResourcesDetailCard,
		field_support_resource_cards: newSupportCard,
    };


	return (
		<>
			<CountryScreen
			    countryDetail={countryEngagmentData}
				headerData={headerSection[0]}
				footerData={footerSection[0]}
			/>
		</>
	);
};

export default CountryPage;
