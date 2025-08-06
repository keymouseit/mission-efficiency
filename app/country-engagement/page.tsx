import { DrupalService, getNewFooter } from '@/lib/DrupalService';
import CountryEngagementScreen from './screen';
import { DrupalNode } from 'next-drupal';

const CountryEngagementPage = async () => {
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await getNewFooter()
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
				headerData={headerSection[0]}
				footerData={footerSection[0]}
			/>
		</>
	);
};

export default CountryEngagementPage;
