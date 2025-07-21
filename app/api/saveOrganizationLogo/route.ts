import { DrupalService } from '@/lib/DrupalService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const data = await request.formData();
	const file: File | null = data.get('file') as unknown as File;

	if (!file) {
		return NextResponse.json({ success: false, status: 500 });
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const response = await DrupalService.postLogoImage(buffer);

	if (response) {
		return NextResponse.json({
			data: response,
			status: 200,
		});
	}
}
