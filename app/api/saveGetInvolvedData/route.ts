import { DrupalService } from '@/lib/DrupalService';
import { MailService } from '@/lib/MailService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const { mailTo, mailFrom, mailSubject, ...body } = await request.json();
	const createdData = await DrupalService.postGetInvolvedPageData({
		...body,
		title: body.field_form_first_name,
	})
		.then(async () => {
			// await MailService.sendGetInvolvedEmail({ mailTo, mailFrom, mailSubject, ...body });
			return true;
		})
		.catch(() => false);
	if (createdData) {
		return NextResponse.json({
			data: {},
			status: 200,
		});
	}
}
