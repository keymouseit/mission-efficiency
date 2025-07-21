import { DrupalService } from '@/lib/DrupalService';
import { parseQueryString } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

interface filteredTrainingCardsArgs {
	topic?: string;
	language?: string;
	organization?: string;
	sector?: string;
	searchQuery?: string;
	region?: string;
	modality?: string;
	resource: string;
	offset?: number;
	limit?: number;
}

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const searchParams = parseQueryString(url.search);

	const filteredTrainingsCards = await DrupalService.getFilteredTrainingCards(
		searchParams as filteredTrainingCardsArgs,
	);

	if (filteredTrainingsCards) {
		return NextResponse.json({
			data: filteredTrainingsCards.data,
			status: 200,
		});
	}
}
