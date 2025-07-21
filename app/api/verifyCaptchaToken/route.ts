import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request, response: Response) {
	const secretKey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY || '';

	const postData = await request.json();
	let res: any;

	const { gRecaptchaToken } = postData;

	const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;
	try {
		res = await axios.post(
			'https://www.google.com/recaptcha/api/siteverify',
			formData,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		);
	} catch (e) {
		console.log('recaptcha error:', e);
	}

	console.log('API response ---> ', res?.data);
	// res = {
	// 	data: {
	// 		success: true,
	// 		challenge_ts: '2024-03-29T12:24:13Z',
	// 		hostname: 'live-metool.appa.pantheon.site',
	// 		score: 0.9,
	// 		action: 'onSubmit',
	// 	},
	// };
	// return NextResponse.json({
	// 	data: res?.data || {},
	// });
	if (res && res.data?.success && res.data?.score > 0.5) {
		// Save data to the database from here
		// console.log("Saving data to the database:", firstName, lastName, email, hearFromSponsors);
		console.log('res.data?.score:', res.data?.score);

		return NextResponse.json({
			success: true,
			score: res.data?.score,
		});
	} else {
		console.log('fail: res.data?.score:', res.data?.score);
		return NextResponse.json({ success: false, score: res.data?.score });
	}
}
