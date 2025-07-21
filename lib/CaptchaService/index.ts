'use server';

import axios from 'axios';

export async function verifyCaptchaAction(token: string) {
	// console.log(
	// 	'this is the link ---> ',
	// 	`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}`,
	// );
	const res = await axios.post(
		`https://www.google.com/recaptcha/api/siteverify?secret=${
			process?.env?.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY || ''
		}&response=${token}`,
	);
	if (res.data.score > 0.5) {
		return true;
	} else {
		return false;
	}
}
