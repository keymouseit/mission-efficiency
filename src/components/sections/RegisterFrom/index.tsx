'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { saveRegisterEventFormData } from '@/services/api';
import { Label } from '@radix-ui/react-label';
import { RiLoader4Line } from 'react-icons/ri';
import Link from 'next/link';
import { BsCheckLg } from 'react-icons/bs';
import { Input } from '@/components/ui/Input';
import CommonReactSelect from '../CommonReactSelect';
import { countries } from '@/constants';

const formSchema = yup.object().shape({
	firstname: yup.string().required('First name is required'),
	lastname: yup.string().required('Last name is required'),
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Email is required'),
	gender: yup.string().required('Gender is required'),
	country: yup.string().required('Country is required'),
	role_job_title: yup.string().required('Role / Job title is required'),
	organization: yup.string().required('Organization is required'),
	type_of_organization: yup
		.string()
		.required('Type of organization is required'),

	privacy_policy: yup
		.boolean()
		.oneOf([true], 'You must agree to the privacy policy before submitting.')
		.required('You must agree to the privacy policy before submitting.'),
});

interface FormData {
	firstname: string;
	lastname: string;
	email: string;
	gender: string;
	country: string;
	role_job_title: string;
	organization: string;
	type_of_organization: string;
	privacy_policy: boolean;
}

interface RegisterFormProps {
	afterFormSubmission?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ afterFormSubmission }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [submitStatus, setSubmitStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');
	const [termsChecked, setTermsChecked] = useState<boolean>(false);
	const [termsError, setTermsError] = useState<string>('aw');

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(formSchema),
		defaultValues: {
			firstname: '',
			lastname: '',
			email: '',
			gender: '',
			country: '',
			role_job_title: '',
			organization: '',
			type_of_organization: '',
			privacy_policy: false,
		},
	});

	const onSubmit = async (data: FormData) => {
		setIsLoading(true);
		setSubmitStatus('idle');

		try {
			const response = await saveRegisterEventFormData(data);
			if (response.ok) {
				setSubmitStatus('success');
				reset();
				if (afterFormSubmission) afterFormSubmission();
			} else {
				setSubmitStatus('error');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmitStatus('error');
		} finally {
			setIsLoading(false);
		}
	};

	const closeSuccessModal = () => {
		setSubmitStatus('idle');
	};

	const genderOptions = [
		{ label: 'Male', value: 'Male' },
		{ label: 'Female', value: 'Female' },
		{ label: 'Non-binary / Other', value: 'Non-binary/other' },
		{ label: 'Not Declared', value: 'Not Declared' },
	];

	const organizationTypeOptions = [
		{ label: 'Academic Institutions', value: 'Academic Institutions' },
		{
			label: 'Civil Society Organization',
			value: 'Civil Society Organization',
		},
		{
			label: 'International Organization',
			value: 'International Organization',
		},
		{ label: 'Government', value: 'Government' },
		{
			label: 'Multilateral Development Bank',
			value: 'Multilateral Development Bank',
		},
		{ label: 'Philanthropy', value: 'Philanthropy' },
		{ label: 'Private Sector', value: 'Private Sector' },
		{ label: 'United Nation System', value: 'United Nation System' },
		{ label: 'Other', value: 'Other' },
	];

	const countryOptions = countries
		.map((country) => ({ label: country.name, value: country.name }))
		.sort((a, b) => a.label.localeCompare(b.label));

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mobileMax:px-4 mobileMax:py-6 w-full mt-[40px] betweenMobileTab:mt-[45px] max-w-3xl z-10  text-black"
		>
			{/* Row 1: First Name & Last Name */}
			<div className="grid mobileMax:grid-cols-1 grid-cols-2 gap-4 mb-5">
				<div className="flex flex-col">
					<Label className="!text-[17px] text-left mb-[9.79px]">
						First Name *
					</Label>
					<Input
						type="text"
						placeholder="Enter your first name"
						{...register('firstname')}
						className="px-[15px] py-[16px] bg-transparent min-h-[75px] placeholder-[#424242] text-[15px] text-[#424242] border border-[#EAEAEA] rounded-[10px] bg-white"
					/>
					{errors.firstname && (
						<p className="text-red-500 text-left text-[13px] leading-normal mt-1">
							{errors.firstname.message}
						</p>
					)}
				</div>

				<div className="flex flex-col">
					<Label className="!text-[17px] text-left mb-[9.79px]">
						Last Name *
					</Label>
					<Input
						type="text"
						placeholder="Enter your last name"
						{...register('lastname')}
						className="px-[15px] py-[16px] bg-transparent min-h-[75px] placeholder-[#424242] text-[15px] text-[#424242] border border-[#EAEAEA] rounded-[10px] bg-white"
					/>
					{errors.lastname && (
						<p className="text-red-500 text-left text-[13px] leading-normal mt-1">
							{errors.lastname.message}
						</p>
					)}
				</div>
			</div>

			{/* Row 2: Email */}
			<div className="flex flex-col mb-5">
				<Label className="!text-[17px] text-left mb-[9.79px]">
					Email Address*
				</Label>
				<Input
					type="email"
					placeholder="Enter your email address"
					{...register('email')}
					className="px-[15px] py-[16px] bg-transparent min-h-[75px] placeholder-[#424242] text-[15px] text-[#424242] border border-[#EAEAEA] rounded-[10px] bg-white"
				/>
				{errors.email && (
					<p className="text-red-500 text-left text-[13px] leading-normal mt-1">
						{errors.email.message}
					</p>
				)}
			</div>

			{/* Row 3: Gender */}
			<div className="flex flex-col mb-5">
				<Label className="!text-[17px] text-left mb-[9.79px]">
					Gender *
				</Label>
				<CommonReactSelect
					placeholder="Select gender"
					list={genderOptions}
					isPlanStyle={true}
					onSelectChange={(value) => {
						clearErrors('gender');
						setValue('gender', value);
					}}
					value={watch('gender') || ''}
					minMenuListHeight={200}
					maxMenuListHeight={400}
					isContact={true}
					noShadow={true}
				/>
				{errors.gender && (
					<p className="text-red-500 text-left text-[13px] leading-normal mt-1">
						{errors.gender.message}
					</p>
				)}
			</div>

			{/* Row 4: Country & Role/Job Title */}
			<div className="grid grid-cols-1 betweenMobileTab:grid-cols-2 desktop:grid-cols-2 gap-4 mb-5">
				<div className="flex flex-col">
					<Label className="!text-[17px] text-left mb-[9.79px]">
						Country *
					</Label>
					<CommonReactSelect
						placeholder="Select country"
						list={countryOptions}
						isPlanStyle={true}
						onSelectChange={(value) => {
							clearErrors('country');
							setValue('country', value);
						}}
						value={watch('country') || ''}
						minMenuListHeight={200}
						maxMenuListHeight={400}
						isContact={true}
						noShadow={true}
					/>
					{errors.country && (
						<p className="text-red-500 text-left text-[13px] leading-normal mt-1">
							{errors.country.message}
						</p>
					)}
				</div>

				<div className="flex flex-col">
					<Label className="!text-[17px] text-left mb-[9.79px]">
						Role / Job Title *
					</Label>
					<Input
						type="text"
						placeholder="Enter your role or job title"
						{...register('role_job_title')}
						className="px-[15px] py-[16px] bg-transparent min-h-[75px] placeholder-[#424242] text-[15px] text-[#424242] border border-[#EAEAEA] rounded-[10px] bg-white"
					/>
					{errors.role_job_title && (
						<p className="text-red-500 text-left text-[13px] leading-normal mt-1">
							{errors.role_job_title.message}
						</p>
					)}
				</div>
			</div>

			{/* Row 5: Organization & Type of Organization */}
			<div className="grid grid-cols-1 betweenMobileTab:grid-cols-2 desktop:grid-cols-2 gap-4 mb-5">
				<div className="flex flex-col">
					<Label className="!text-[17px] text-left mb-[9.79px]">
						Organization *
					</Label>
					<Input
						type="text"
						placeholder="Enter organization name"
						{...register('organization')}
						className="px-[15px] py-[16px] bg-transparent min-h-[75px] placeholder-[#424242] text-[15px] text-[#424242] border border-[#EAEAEA] rounded-[10px] bg-white"
					/>
					{errors.organization && (
						<p className="text-red-500 text-left text-[13px] leading-normal mt-1">
							{errors.organization.message}
						</p>
					)}
				</div>

				<div className="flex flex-col">
					<Label className="!text-[17px] text-left mb-[9.79px]">
						Type of Organization *
					</Label>
					<CommonReactSelect
						placeholder="Select type of organization"
						list={organizationTypeOptions}
						isPlanStyle={true}
						onSelectChange={(value) => {
							clearErrors('type_of_organization');
							setValue('type_of_organization', value);
						}}
						value={watch('type_of_organization') || ''}
						minMenuListHeight={200}
						maxMenuListHeight={400}
						isContact={true}
						noShadow={true}
					/>
					{errors.type_of_organization && (
						<p className="text-red-500 text-left text-[13px] leading-normal mt-1">
							{errors.type_of_organization.message}
						</p>
					)}
				</div>
			</div>

			{/* Submit Status Messages */}

			<div className="flex items-center gap-2 mb-[8px]">
				<input
					type="checkbox"
					className="mt-[2px] w-[15px] h-[15px] min-w-[15px] flex-shrink-0 rounded border-2 border-[#828282] bg-white accent-[#003350] cursor-pointer"
				/>
				<p className="text-left text-[14px] cursor-pointer select-none">
					Consent for SEforALL to use your image, quotes, interview in
					programmes and/or other printed publications, websites and social
					media pages, and those of our partners
				</p>
			</div>

			<div className="flex items-center gap-2 mb-[8px]">
				<input
					type="checkbox"
					className="mt-[2px] w-[15px] h-[15px] min-w-[15px] flex-shrink-0 rounded border-2 border-[#828282] bg-white accent-[#003350] cursor-pointer"
				/>
				<p className="text-left text-[14px] cursor-pointer select-none">
					Allow SEforALL to share your information (name, surname, title,
					company only) in the final attendance list
				</p>
			</div>

			<div className="flex items-start gap-2 mb-[4px]">
				<input
					type="checkbox"
					{...register('privacy_policy')}
					className="mt-[4px] w-[15px] h-[15px] min-w-[15px] flex-shrink-0 rounded border border-[#828282] accent-[#003350] cursor-pointer"
				/>
				<p className="text-left text-[14px] cursor-pointer select-none leading-snug mt-[2px]">
					I have read and agree to the{' '}
					<Link
						className="text-[#4FC0FF] underline underline-offset-2"
						href="https://www.seforall.org/privacy-policy#:~:text=We%20are%20committed%20to%20protecting,for%20example%2C%20website%20usage%20statistics"
						target="_blank"
					>
						SEforALL Privacy Policy
					</Link>
					<span> and would like to receive email notifications *</span>
				</p>
			</div>

			{errors.privacy_policy && (
				<p className="text-red-500 text-left text-[13px] leading-normal mb-2">
					{errors.privacy_policy.message}
				</p>
			)}
			{submitStatus === 'success' && (
				<div
					className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
					onClick={closeSuccessModal}
					aria-modal="true"
					role="dialog"
				>
					<div
						className="relative w-[80%] mobileMax:w-[95%] desktop:w-3/5 desktopMd:w-1/2 desktopLg:w-2/5 
					p-5 py-10 mobileMax:py-6 rounded-2xl bg-white shadow-2xl text-center animate-scale-in"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close button (optional) */}
						<button
							className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
							onClick={closeSuccessModal}
							aria-label="Close"
						>
							✕
						</button>

						<div className="flex flex-col items-center">
							<div className="h-[80px] w-[80px] bg-[linear-gradient(to_right,#48DBB2,#003350)] rounded-full overflow-hidden flex items-center justify-center mb-3 laptopMax:h-[70px] laptopMax:w-[70px]">
								<div className="flex items-center justify-center text-numans text-center rounded-full overflow-hidden h-[70px] w-[70px] laptopMax:h-[60px] laptopMax:w-[60px] bg-white">
									<BsCheckLg className="text-[#1fb187] text-[53px] laptopMax:text-[45px]" />
								</div>
							</div>
							<p className="bg-clip-text text-transparent bg-[linear-gradient(to_right,#48DBB2,#003350)] text-lg font-semibold font-numans mobileMax:text-[20px] leading-normal">
								Thank you for registering!
							</p>
						</div>

						<div className="text-gray-600 font-poppins mt-2">
							Your registration has been successfully submitted. We look forward
							to seeing you at the event!
						</div>
					</div>
				</div>
			)}
			{submitStatus === 'error' && (
				<div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
					There was an error submitting the form. Please try again.
				</div>
			)}

			{/* Submit Button */}
			<div className="flex justify-center mt-10">
				<button
					type="submit"
					disabled={isLoading}
					className="w-full md:w-auto bg-[linear-gradient(to_right,#48DBB2,#A0DDFF)] text-[#003055] font-semibold text-[16px] h-[68px] rounded-[10px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-[3px]"
				>
					{isLoading ? (
						<div className="flex items-center justify-center">
							<RiLoader4Line className="animate-spin" />
						</div>
					) : (
						'SEND'
					)}
				</button>
			</div>
		</form>
	);
};

export default RegisterForm;