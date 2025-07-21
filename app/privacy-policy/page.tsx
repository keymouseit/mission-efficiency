import React from 'react'
import PrivacyPolicyScreen from './screen'
import { DrupalService } from '@/lib/DrupalService';

const PrivacyPolicy =  async() => {
  const getPolicyPage = await DrupalService.getPrivacyPolicy();
	const headerSection = await DrupalService.getHeaderSection();
	const footerSection = await DrupalService.getFooterSection();

  return (
    <>
    <PrivacyPolicyScreen 
        pageData = {getPolicyPage[0]}
				headerData={headerSection[0]}
				footerData={footerSection[0]}/>
    </>
  )
}

export default PrivacyPolicy;