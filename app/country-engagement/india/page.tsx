import { DrupalService, getMenuDetails, getNewFooter, getNewHeader } from '@/lib/DrupalService';
import CountryScreen from './screen';
import { DrupalNode } from 'next-drupal';
import { RawHeaderNode } from '@/types/header';
import { processMenuData } from '@/lib/processMenuData';

const CountryPage = async () => {
	const headerSection = (await getNewHeader()) as RawHeaderNode[];
		const MenuData = await getMenuDetails();
		const processedMenuItems = processMenuData(MenuData);
	
		const headerProps: any = {
			field_logo: headerSection[0]?.field_logo,
			field_header_menus_items: processedMenuItems,
		};
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
				headerData={headerProps}
				footerData={footerSection[0]}
			/>
		</>
	);
};

export default CountryPage;
