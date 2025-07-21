import countries from '@/lib/constants';
import { MetadataRoute } from 'next';
import slugify from 'slugify';

const BASE_URL = 'https://live-metool.appa.pantheon.site/';

const toolkitDashboardPaths = countries.map((country) => {
	const countrySlug = slugify(country?.name, {
		lower: true,
	});
	console;
	return {
		url: `${BASE_URL}toolkit/${countrySlug}/dashboard`,
		lastModified: new Date(),
		changeFrequency: 'daily',
		priority: 1,
	};
});
const toolkitToolPaths = countries.map((country) => {
	const countrySlug = slugify(country?.name, {
		lower: true,
	});
	return {
		url: `${BASE_URL}toolkit/${countrySlug}/tools`,
		lastModified: new Date(),
		changeFrequency: 'daily',
		priority: 1,
	};
});
export default function sitemap(): MetadataRoute.Sitemap {
	const siteArray = [
		{
			url: `${BASE_URL}`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}call-to-action`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}coming-soon`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}elevate`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}get-involved`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}invest`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}mission`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}mission-efficiency-pledge`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}news`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}pledge-form`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}support`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}toolkit`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}toolkit/explore-tools`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}toolkit/about`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}training-events-and-webinars`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${BASE_URL}trainings`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		...(toolkitDashboardPaths as any),
		...(toolkitToolPaths as any),
	];
	return siteArray;
}
