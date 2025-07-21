'use client';
import { CaptchaProvider } from '@/lib/CaptchaService/Provider';
import React from 'react';
import PledgeFormsScreen from './screen';

const WrappedPledgeForm = (props: any) => {
	return (
		<>
			<CaptchaProvider>
				<PledgeFormsScreen {...props} />
			</CaptchaProvider>
		</>
	);
};

export default WrappedPledgeForm;
