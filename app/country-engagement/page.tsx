import { DrupalService, getMenuDetails, getNewFooter, getNewHeader } from '@/lib/DrupalService';
import CountryEngagementScreen from './screen';
import { DrupalNode } from 'next-drupal';
import { RawHeaderNode } from '@/types/header';
import { processMenuData } from '@/lib/processMenuData';

const CountryEngagementPage = async () => {
	const headerSection = (await getNewHeader()) as RawHeaderNode[];
		const MenuData = await getMenuDetails();
		const processedMenuItems = processMenuData(MenuData);
	
		const headerProps: any = {
			field_logo: headerSection[0]?.field_logo,
			field_header_menus_items: processedMenuItems,
		};
	const footerSection = await getNewFooter();
	const data = await DrupalService.getCountryEngagementPage();
	const getAllCountries = await DrupalService.getAllCountriesData();
	const allCards = await DrupalService.getAllCards();
	let newCountryCard: DrupalNode[] = [];

	getAllCountries[0].field_country_key_points.forEach((countriesData: DrupalNode) => {
		const matchedCountriesData = allCards?.find(
			(card) => card?.id === countriesData?.id,
		);
		if (matchedCountriesData) {
			newCountryCard.push(matchedCountriesData);
		}
	});

	const countryData ={
		...getAllCountries[0],
		field_country_key_points: newCountryCard
	}
    const countryEngagmentData = {
        ...data[0],
    };

	return (
		<>
			<CountryEngagementScreen
			    data={countryEngagmentData}
				getAllCountries={countryData}
				headerData={headerProps}
				footerData={footerSection[0]}
			/>
		</>
	);
};

export default CountryEngagementPage;
