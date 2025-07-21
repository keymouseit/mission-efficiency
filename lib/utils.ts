import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DrupalNode } from 'next-drupal';
import countries, { CONSTS } from './constants';
import worldMapData from '../public/resources/mappings/countries.geo.json';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(input: string): string {
	const date = new Date(input);
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}

export function absoluteUrl(input: string) {
	return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${input}`;
}

const colours = {
	map: {
		fillRed: {
			vast: '#C00000',
			significant: '#FF0000',
			highToSignificant: '#ED7D31',
			high: '#FFC000',
			moderateToHigh: '#C0C767',
			moderate: '#70AD47',
		},
		fillBlue: {
			vast: '#1627C1',
			significant: '#4441EB',
			highToSignificant: '#298AE4',
			high: '#40C9E7',
			moderateToHigh: '#4BE4DB',
			moderate: '#53FFCA',
		},
		default: '#C2D1EE',
	},
};

export const getColorFromStat = (value: number) => {
	if (value >= 0 && value < 10) {
		return colours.map.fillBlue.moderate;
	} else if (value >= 10 && value < 20) {
		return colours.map.fillBlue.moderateToHigh;
	} else if (value >= 20 && value < 30) {
		return colours.map.fillBlue.high;
	} else if (value >= 30 && value < 50) {
		return colours.map.fillBlue.highToSignificant;
	} else if (value >= 50 && value < 70) {
		return colours.map.fillBlue.significant;
	} else if (value >= 70 && value < 100) {
		return colours.map.fillBlue.vast;
	} else {
		return colours.map.default;
	}
};

export const getPotentialFromStat = (value: number) => {
	if (value >= 0 && value < 10) {
		return 'moderate';
	} else if (value >= 10 && value < 20) {
		return 'moderate to high';
	} else if (value >= 20 && value < 30) {
		return 'high';
	} else if (value >= 30 && value < 50) {
		return 'high to significant';
	} else if (value >= 50 && value < 70) {
		return 'significant';
	} else if (value >= 70 && value < 100) {
		return 'vast';
	} else {
		return null;
	}
};

export const getColor = (
	geo: any,
	mapData: DrupalNode[] | null,
	selectedCountry: any = null,
	selectField:
		| 'field_country_score'
		| 'field_services_score'
		| 'field_transport_score'
		| 'field_residential_score'
		| 'field_industry_score'
		| 'field_electricity_and_heat_score',
) => {
	let color = colours.map.default;

	mapData?.forEach((data: DrupalNode) => {
		if (
			selectedCountry?.country_iso &&
			data.field_iso_code === selectedCountry.country_iso &&
			data.field_iso_code === geo.id
		) {
			color = getColorFromStat(data?.[selectField]);
		} else if (
			!selectedCountry?.country_iso &&
			data.field_iso_code === geo?.id
		) {
			color = getColorFromStat(data?.[selectField]);
		}
	});

	return color;
};

export const getAlpha2FromISO = (ISO: string) => {
	let alpha2 = null;
	countries.map((country: { country_iso: string | null; code: any }) => {
		if (country?.country_iso === ISO) {
			alpha2 = country.code;
		}
	});

	return alpha2 || '';
};

export const findRegionFromISO = (ISO: string, mapData?: DrupalNode[]) => {
	let region = {} as DrupalNode;

	mapData?.forEach((country) => {
		if (country.field_iso_code === ISO) {
			region = country.field_region;
		}
	});

	return region;
};

export const createQueryString = (obj: { [s: string]: any }) => {
	const queryString = Object.entries(obj)
		.filter(([key, value]) => {
			if (Array.isArray(value)) {
				return value.length > 0;
			}
			return value;
		})
		.map(([key, value]) => {
			if (Array.isArray(value)) {
				return `${encodeURIComponent(key)}=${value
					.map((item) => encodeURIComponent(item))
					.join(',')}`;
			}
			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		})
		.join('&');

	return queryString ? `?${queryString}` : '';
};

export const parseQueryString = (queryString: string): { [s: string]: any } => {
	const obj: { [s: string]: any } = {};

	if (queryString.charAt(0) === '?') {
		queryString = queryString.substring(1);
	}

	const params = new URLSearchParams(queryString);

	params.forEach((value, key) => {
		const decodedKey = decodeURIComponent(key);
		let decodedValue: any;

		// Parse numerical values as numbers
		if (!isNaN(Number(value))) {
			decodedValue = parseFloat(value);
		} else {
			decodedValue = decodeURIComponent(value);
		}

		if (decodedKey in obj) {
			if (Array.isArray(obj[decodedKey])) {
				obj[decodedKey].push(decodedValue);
			} else {
				obj[decodedKey] = [obj[decodedKey], decodedValue];
			}
		} else {
			obj[decodedKey] = decodedValue;
		}
	});

	return obj;
};

const isPointInPolygon = (
	polygonCoordinates: string | any[],
	point: number[],
) => {
	let inside = false;
	for (
		let i = 0, j = polygonCoordinates.length - 1;
		i < polygonCoordinates.length;
		j = i++
	) {
		const xi = polygonCoordinates[i][0];
		const yi = polygonCoordinates[i][1];
		const xj = polygonCoordinates[j][0];
		const yj = polygonCoordinates[j][1];
		const intersect =
			yi > point[1] !== yj > point[1] &&
			point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi;
		if (intersect) {
			inside = !inside;
		}
	}
	return inside;
};

export const getPolygonInfo = (longitude: number, latitude: number) => {
	const { features } = worldMapData;

	const countryContainingPoint = features.find((feature: { geometry: any }) => {
		const geometry = feature.geometry;
		if (geometry.type === 'Polygon') {
			return isPointInPolygon(geometry.coordinates[0], [longitude, latitude]);
		} else if (geometry.type === 'MultiPolygon') {
			for (const polygon of geometry.coordinates) {
				if (isPointInPolygon(polygon[0], [longitude, latitude])) {
					return true;
				}
			}
		}
		return false;
	});

	return countryContainingPoint;
};

function fieldNameByHighestValue(obj: any) {
	let maxNumber = -Infinity;
	let maxKey = null;

	for (const key in obj) {
		if (obj.hasOwnProperty(key) && typeof obj[key] === 'number') {
			if (obj[key] > maxNumber) {
				maxNumber = obj[key];
				maxKey = key;
			}
		}
	}

	return maxKey;
}

export const getSectorByEfficiency = (selectedCountry: any) => {
	const {
		field_residential_score,
		field_transport_score,
		field_electricity_and_heat_score,
		field_industry_score,
		field_services_score,
	} = selectedCountry;
	const highestSectorField = fieldNameByHighestValue({
		field_residential_score,
		field_transport_score,
		field_electricity_and_heat_score,
		field_industry_score,
		field_services_score,
	});

	if (highestSectorField) {
		const sector = CONSTS.SECTORS_LIST.find(
			(sectorItem) => sectorItem.field_name === highestSectorField,
		);

		return sector;
	}
};

export const buildIterableSectors = (parentObject: DrupalNode) => {
	const resultArray = [];

	for (const key in parentObject) {
		if (key.startsWith('field_sector_') && key.endsWith('_title')) {
			const titleKey = key;
			const cardsKey = key.replace('_title', '_cards');
			const cardKey = key.replace('_title', '_card');

			let newObj = {};

			if (parentObject[cardsKey]) {
				newObj = {
					[parentObject[titleKey]]: parentObject[cardsKey],
				};
				resultArray.push(newObj);
			}
			if (parentObject[cardKey]) {
				newObj = {
					[parentObject[titleKey]]: parentObject[cardKey],
				};
				resultArray.push(newObj);
			}
		}
	}

	return resultArray;
};

export const normaliseCardsData = (
	initialObject: DrupalNode,
	dataArray: DrupalNode[],
) => {
	const finalObject = { ...initialObject };

	Object.keys(initialObject).forEach((objectKey: string) => {
		if (
			objectKey.startsWith('field_sector_') &&
			(objectKey.endsWith('_cards') || objectKey.endsWith('_card'))
		) {
			let newArray = [] as DrupalNode[];

			initialObject[objectKey].map((initialItem: DrupalNode) => {
				const matchedItem = dataArray.find(
					(dataItem: DrupalNode) => dataItem.id === initialItem.id,
				);
				if (matchedItem) {
					newArray.push(matchedItem);
				}
			});

			finalObject[objectKey] = newArray;
		}
	});

	return finalObject;
};
export const formatDateToUS = (inputDate: any) => {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	if (!inputDate) {
		return '';
	}
	const isMMMYYFormat = /^[a-zA-Z]{3}-\d{2}$/.test(inputDate);
	if (isMMMYYFormat) {
		const [monthAbbreviation, yearAbbreviation] = inputDate?.split('-');
		const monthIndex = months.findIndex((month) =>
			month.startsWith(monthAbbreviation),
		);
		if (monthIndex !== -1) {
			const year = '20' + yearAbbreviation;
			return `${months[monthIndex]} ${year}`;
		}
	} else {
		const parts = inputDate?.split('-');
		if (parts && parts.length === 3) {
			const year = parseInt(parts[0]);
			const day = parseInt(parts[2]);
			const monthIndex = parseInt(parts[1]) - 1;
			return `${day} ${months[monthIndex]} ${year}`;
		}
	}
	return inputDate;
};

export const normaliseKeysFromNewsAndTrainings = (dataObject: any) => {
	const normalizedData: any = {};

	for (const [commonKey, sourceKeys] of Object.entries(
		CONSTS.NEWS_AND_TRAINING_KEY_MAPPINGS,
	)) {
		for (const sourceKey of sourceKeys) {
			if (dataObject.hasOwnProperty(sourceKey)) {
				normalizedData[commonKey] = dataObject[sourceKey];
				break; // Stop after finding the first matching key
			}
		}
	}

	return normalizedData;
};

export const populateArrayElements = (
	originalArray: DrupalNode[],
	populatedArray: DrupalNode[],
) => {
	const populatedDict = {} as DrupalNode;
	populatedArray.forEach((field) => {
		populatedDict[field.id] = field;
	});

	originalArray.forEach((field, index) => {
		if (populatedDict.hasOwnProperty(field.id)) {
			originalArray[index] = populatedDict[field.id];
		}
	});

	return originalArray;
};

export function fileToBase64(file: File): Promise<string> {
	console.log({ file }, 'Before Conversion');
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.addEventListener('load', () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result);
			} else {
				reject(
					new Error(
						`Incorrect result type. Expected string got ${reader.result}`,
					),
				);
			}
		});

		reader.addEventListener('error', () => {
			reject(new Error('File reader error'));
		});

		reader.readAsDataURL(file);
	});
}

export function fileToBinary(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			const binaryString = reader.result as ArrayBuffer;
			const binaryData = new Uint8Array(binaryString);
			resolve(binaryData);
		};

		reader.onerror = () => {
			reader.abort();
			reject(new Error('Error reading file.'));
		};

		reader.readAsArrayBuffer(file);
	});
}

export const buildMediaTypeAndSrc = (mediaSrcLink: string) => {
	if (!mediaSrcLink) {
		return { type: 'unknown', src: null };
	}

	if (mediaSrcLink.match(/\.(jpeg|jpg|gif|png)$/) != null) {
		return { type: 'image', src: mediaSrcLink };
	} else if (mediaSrcLink.match(/\.(mp4|avi|mov|wmv|flv)$/) != null) {
		return { type: 'video', src: mediaSrcLink };
	} else if (mediaSrcLink.match(/\.(pdf)$/) != null) {
		return { type: 'pdf', src: mediaSrcLink };
	} else if (
		mediaSrcLink.match(/youtube\.com\/watch\?v=([^&]+)/) != null ||
		mediaSrcLink.match(/youtu\.be\/([^&]+)/) != null
	) {
		return { type: 'video', src: mediaSrcLink };
	} else {
		return { type: 'unknown', src: mediaSrcLink };
	}
};

export const formatSubmissions = (numRecords: number) => {
	if (numRecords < 1000) {
		return numRecords.toString();
	} else if (numRecords < 1000000) {
		return (numRecords / 1000).toFixed(0) + 'K+';
	} else if (numRecords < 1000000000) {
		return (numRecords / 1000000).toFixed(0) + 'M+';
	} else {
		return (numRecords / 1000000000).toFixed(0) + 'B+';
	}
};


export const  clearQueryString=(faultyQueryString: string): string =>{
    const params = new URLSearchParams(faultyQueryString);

    const filteredParams: { [key: string]: string | string[] } = {};

    params.forEach((value, key) => {
        const values = value.split(',');

        const uniqueValues = [...(new Set(values) as any)];
        if (filteredParams[key]) {
            let existingValues = Array.isArray(filteredParams[key]) ? filteredParams[key] : [filteredParams[key]];
            uniqueValues.forEach(uniqueValue => {
                if (!existingValues.includes(uniqueValue)) {
                    (existingValues as any).push(uniqueValue);
                }
            });
            (filteredParams as any)[key] = existingValues;
        } else {
            filteredParams[key] = uniqueValues.length > 1 ? uniqueValues : uniqueValues[0];
        }
    });
    const clearedQueryString = new URLSearchParams(filteredParams as any).toString();

    return clearedQueryString;
}