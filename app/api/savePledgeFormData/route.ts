import { DrupalService } from '@/lib/DrupalService';
import { MailService } from '@/lib/MailService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	// const { mailTo, mailFrom, mailSubject, ...body } = await request.json();
	const data = await request.json();
	// const createdData = await DrupalService.postPledgeFormData(body)
	// 	.then(async () => {
	// 		console.log('--------- SENDING MAIL  ------------');
	// 		const pledgeType = body.field_pledge_data_type;
	// 		MailService.sendPledgeFormEmail({
	// 			mailSubject: `ME Pledge Submission Received for ${pledgeType}`,
	// 			...body,
	// 		})
	// 			.then(() => {
	// 				console.log('--------- ADMIN MAIL IS SENT ------------');
	// 			})
	// 			.catch(() => {
	// 				throw new Error('Could not send Email');
	// 			});
	// 		MailService.sendPledgeFormRegardsEmail({
	// 			mailTo: body.field_pledge_data_email,
	// 		})
	// 			.then(() => {
	// 				console.log('--------- REGARDS MAIL IS SENT ------------');
	// 			})
	// 			.catch(() => {
	// 				throw new Error('Could not send Email');
	// 			});
	// 		return true;
	// 	})
	const createdData = await fetch(
		`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`,
		{
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(data),
		}
		)
		.catch(() => false);
		if (createdData) {
			return NextResponse.json({
				data: {},
				status: 200,
			});
		}
	}
