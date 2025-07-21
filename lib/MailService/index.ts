import { DrupalNode } from 'next-drupal';
import nodemailer from 'nodemailer';
import { DrupalService } from '../DrupalService';

interface SendGetInvolvedEmailProps {
	title: string;
	field_form_support_to: string;
	field_form_commitment: string;
	field_form_first_name: string;
	field_form_last_name: string;
	field_form_email: string;
	field_form_country: string;
	mailTo: string;
	mailFrom: string;
	mailSubject: string;
}

const sendGetInvolvedEmail = async (pageData: SendGetInvolvedEmailProps) => {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.NEXT_EMAIL_USER,
			pass: process.env.NEXT_EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: pageData.mailFrom,
		to: pageData.mailTo,
		subject: pageData.mailSubject || 'test subject',
		replyTo: pageData.mailFrom,
		html: '<h6>TEST MAIL</h6>',
	};

	return await transporter.sendMail(mailOptions);
};

interface SendReadyToJoinEmailProps {
	mailSubject: string;
	title: string;
	field_join_form_email: string;
	field_join_form_age: string;
	field_join_form_gender: string;
	field_join_form_country: string;
}

const sendReadyToJoinEmail = async (pageData: SendReadyToJoinEmailProps) => {
	const {
		title = '',
		field_join_form_email = '',
		field_join_form_age = '',
		field_join_form_gender = '',
		field_join_form_country = '',
	} = pageData;
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.NEXT_EMAIL_USER,
			pass: process.env.NEXT_EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.NEXT_EMAIL_USER,
		to: process.env.NEXT_EMAIL_USER,
		subject: pageData.mailSubject || 'test subject',
		replyTo: process.env.NEXT_EMAIL_USER,
		html: `
		<h6 style="font-size:18px;font-weight:600;margin-bottom:20px;margin-top:0;text-decoration: underline;">${title}</h6>
		<h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Email: <span style="font-weight:400;padding-left: 6px;font-size:16px">${field_join_form_email}</span></h6>
		<h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Age: <span style="font-weight:400;padding-left: 6px;font-size:16px">${field_join_form_age}</span></h6>
		<h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Gender: <span style="font-weight:400;padding-left: 6px;font-size:16px">${field_join_form_gender}</span></h6>
		<h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Country: <span style="font-weight:400;padding-left: 6px;font-size:16px">${field_join_form_country}</span></h6>
	 `,
	};

	return await transporter.sendMail(mailOptions);
};

interface SendPledgeFormEmailProps {
	mailSubject: string;
	title: string;
	field_pledge_data_type: string;
	field_pledge_data_first_name: string;
	field_pledge_data_last_name: string;
	field_pledge_data_email: string;
	field_pledge_data_position: string;
	field_pledge_data_org_name: string;
	field_pledge_data_org_website: string;
	field_pledge_data_pledge_ids: string;
	field_pledge_data_custom_pledge: string;
	field_pledge_data_pledge_actions: string;
	field_pledge_data_pledge_commits: string;
	field_pledge_data_pledge_goals: string;
	field_pledge_data_focus_sectors: string;
	field_pledge_data_support_action: string;
	field_pledge_data_percentage_inc: string;
}

const sendPledgeFormEmail = async (pageData: SendPledgeFormEmailProps) => {
	const {
		title = '',
		field_pledge_data_type = '',
		field_pledge_data_first_name = '',
		field_pledge_data_last_name = '',
		field_pledge_data_email = '',
		field_pledge_data_position = '',
		field_pledge_data_org_name = '',
		field_pledge_data_org_website = '',
		field_pledge_data_pledge_ids = '',
		field_pledge_data_custom_pledge = '',
		field_pledge_data_pledge_actions = '',
		field_pledge_data_pledge_commits = '',
		field_pledge_data_pledge_goals = '',
		field_pledge_data_focus_sectors = '',
		field_pledge_data_support_action = '',
		field_pledge_data_percentage_inc = '',
	} = pageData;
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.NEXT_EMAIL_USER,
			pass: process.env.NEXT_EMAIL_PASSWORD,
		},
	});

	const pledgeIds = field_pledge_data_pledge_ids.split('|');
	const pledgeListItems = pledgeIds.map(pledgeId => `<li style="margin-bottom: 6px">${pledgeId.trim()}</li>`).join('');
	const focusSectors = field_pledge_data_focus_sectors.split('|');
	const focusSectorsListItems = focusSectors.map(sector => `<li style="margin-bottom: 6px">${sector.trim()}</li>`).join('');

	const mailOptions = {
		from: process.env.NEXT_EMAIL_USER,
		to: process.env.NEXT_EMAIL_USER,
		subject: pageData.mailSubject || 'test subject',
		replyTo: process.env.NEXT_EMAIL_USER,
		html: `
	
		<div style="margin-bottom:25px">
		<h6 style="font-size:18px;font-weight:600;margin-bottom:12px;margin-top:0;text-decoration: underline;">Contact Details</h6>
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Pledge Type: <span style="font-weight:400;padding-left: 6px;font-size:16px">${field_pledge_data_type}</span></h6>
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">First Name: <span style="font-weight:400;padding-left: 6px;font-size:16px">${field_pledge_data_first_name}</span></h6>
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Last Name: <span style="font-weight:400;padding-left: 6px;font-size:16px">${field_pledge_data_last_name}</span></h6>
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Email: <span style="font-weight:400;padding-left: 6px;font-size:16px">${field_pledge_data_email}</span></h6>
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Pledge Position: <span style="font-weight:400;padding-left: 6px;font-size:16px">${field_pledge_data_position}</span></h6>
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Organization Name: <span style="font-weight:400;padding-left: 6px;font-size:16px">${field_pledge_data_org_name}</span></h6>
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Website Link: <span style="font-weight:400;padding-left: 6px;font-size:16px">${field_pledge_data_org_website}</span></h6>
			   
			   </div>
			   <div style="margin-bottom:25px">
			   <h6 style="font-size:18px;font-weight:600;margin-bottom:12px;margin-top:0;text-decoration: underline;">Selected Pledges</h6> 
			   <ul style="font-weight:400;margin: 8px 0;font-size:16px">
				   ${pledgeListItems}
			   </ul>
		   </div>
		   <div style="margin-bottom:25px">
			   <h6 style="font-size:18px;font-weight:600;margin-bottom:12px;margin-top:0;text-decoration: underline;">Custom Pledges Q&A</h6> 
			<div style="margin-bottom:12px">
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Q: Enter Custom Commitment or type the other energy efficiency initiative that you pledge to join (If selected above)?
			   </h6>
			   <span style="font-weight:400;margin: 8px 0;font-size:16px">A: ${field_pledge_data_custom_pledge}</span>
		   </div>
		   <div style="margin-bottom:12px">
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Q: Tell us more about your pledges: which of the pledges selected above are ACTIONS you are ready to take?
			   </h6>
			   <p style="font-weight:400;margin: 8px 0;font-size:16px">A: ${field_pledge_data_pledge_actions}</p>
		   </div>
		   <div style="margin-bottom:12px">
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Q: Tell us more about your pledges: which of the pledges selected above are COMMITMENTS you are making?
			   </h6>
			   <p style="font-weight:400;margin: 8px 0;font-size:16px">A: ${field_pledge_data_pledge_commits}</p>
		   </div>
		   <div style="margin-bottom:12px">
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Q: Tell us more about your pledges: which of the pledges selected above are GOALS you would like to achieve?
			   </h6>
			   <p style="font-weight:400;margin: 8px 0;font-size:16px">A: ${field_pledge_data_pledge_goals}</p>
		   </div>
		   </div>
		   <div style="margin-bottom:25px">
			   <h6 style="font-size:18px;font-weight:600;margin-bottom:12px;margin-top:0;text-decoration: underline;">Energy Efficiency Sector</h6>  
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Q. Which energy efficiency sector(s) would you like to focus on?
			   </h6>
				<ul style="display:inline;font-weight:400;margin: 8px 0;font-size:16px">
				${focusSectorsListItems}
				</ul>
		   </div>
		   <div style="margin-bottom:25px">
			   <h6 style="font-size:18px;font-weight:600;margin-bottom:12px;margin-top:0;text-decoration: underline;">Additional Supports</h6>  
			  
			   <h6 style="font-size:16px;font-weight:600;margin-bottom:12px;margin-top:0">Q. Increase direct investment in energy efficiency by
				<p style="font-weight:400;margin: 8px 0;font-size:16px">A: ${field_pledge_data_percentage_inc}</p>
		   </div>
		`,
	};

	return await transporter.sendMail(mailOptions);
};

function generateHTML(
	template: string,
	inputObject: { [key: string]: string },
) {
	// Create a regular expression to match "${<keyname>}" patterns
	const regex = /\${([^}]+)}/g;

	// Replace each occurrence of "${<keyname>}" with the corresponding value from inputObject
	const result = template.replace(regex, (match, key) => {
		return inputObject[key] || match; // If the key exists in inputObject, replace it with its value, otherwise keep the original placeholder
	});

	return result;
}

const sendCampaignLifeRegardsEmail = async (pageData: {
	mailTo: string;
	userName: string;
}) => {
	const emailTemplate = (await DrupalService.getEmailTemplates()).find(
		(template: DrupalNode) =>
			template.field_template_key === 'Campaign Life Regard',
	);
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.NEXT_EMAIL_USER,
			pass: process.env.NEXT_EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.NEXT_EMAIL_USER,
		to: pageData.mailTo,
		subject: emailTemplate?.title || 'test subject',
		replyTo: process.env.NEXT_EMAIL_USER,
		html: generateHTML(emailTemplate?.field_template_content?.value || '', {
			userName: pageData.userName,
		}),
	};

	return await transporter.sendMail(mailOptions);
};

const sendPledgeFormRegardsEmail = async (pageData: { mailTo: string }) => {
	const emailTemplate = (await DrupalService.getEmailTemplates()).find(
		(template: DrupalNode) => template.field_template_key === 'Pledge',
	);
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.NEXT_EMAIL_USER,
			pass: process.env.NEXT_EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.NEXT_EMAIL_USER,
		to: pageData.mailTo,
		subject: emailTemplate?.title || 'test subject',
		replyTo: process.env.NEXT_EMAIL_USER,
		html: emailTemplate?.field_template_content?.value || '',
	};

	return await transporter.sendMail(mailOptions);
};

export const MailService = {
	sendGetInvolvedEmail,
	sendReadyToJoinEmail,
	sendPledgeFormEmail,
	sendCampaignLifeRegardsEmail,
	sendPledgeFormRegardsEmail,
};
