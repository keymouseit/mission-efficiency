'use client';
import Image from 'next/image';
import React from 'react';
import { DrupalNode } from 'next-drupal';
import Link from 'next/link';

interface LandingFooterProps {
	data: DrupalNode;
}

const LandingFooter: React.FC<LandingFooterProps> = ({ data }) => {
	const {
		field_footer_sub_title = '',
		field_footer_copy_right = '',
		field_footer_menu = [],
		field_footer_social_icons = [],
		field_footer_logo = {},
	} = data;
	return (
		<div className="relative mt-10 footerWrap">
			<img
				src="/static/images/blue-curve.png"
				alt="curve"
				className="absolute z-[1] w-full top-[-13px] h-[15px] pointer-events-none"
			/>
			<div className="overflow-hidden relative">
				<div className="px-4 py-10 bg-footerbg inner-footer min-h-[380px] mobileMax:min-h-[260px]">
					<Image
						src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
							field_footer_logo?.uri?.url || ''
						}`}
						alt="logo"
						width={42}
						height={42}
						className="mx-auto block pb-2"
					/>
					<h5 className="text-sky text-[24px] text-center mb-[72px] text-numans mobileMax:text-xmedium">
						{field_footer_sub_title}
					</h5>
					<p className="capitalize text-center text-xsmall text-white leading-[20px]">
						Follow Us
					</p>
					<div className="flex items-center justify-center mt-5">
						{field_footer_social_icons?.map(
							(socialIcon: DrupalNode, index: number) => {
								return (
										<Link
											className="landing-footer-links"
											key={index}
											href={socialIcon?.field_social_media_link || '#'}
										>
											<Image
												src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
													socialIcon?.field_social_media_logo?.uri?.url || ''
												}`}
												alt="img"
												width={20}
												height={20}
												// className="mx-auto block pb-2"
											/>
										</Link>
								);
							},
						)}
					</div>
					<div className="border border-[1px] border-white my-8 w-[33px] mx-auto" />
					<ul className="flex items-center justify-center flex-col mb-[27px]">
						{field_footer_menu?.map((menuItem: DrupalNode, index: number) => {
							return (
								<Link
									href={
										menuItem?.title.toLocaleLowerCase().includes('contact')
											? `mailTo:${menuItem?.field_menu_link}`
											: menuItem?.field_menu_link || '#'
									}
									key={index}
								>
									<li
										// className={`text-center leading-[25px] text-xsmall text-[#a194d2] hover:text-[#8e7ec9] text-poppins cursor-pointer ${
										// 	index === 0 && 'text-white'
										// }`}
										className='text-center leading-[25px] text-xsmall text-[#a194d2] hover:text-[#8e7ec9] text-poppins cursor-pointer text-white
										text-center leading-[25px] text-xsmall text-[#a194d2] hover:text-[#8e7ec9] text-poppins cursor-pointer text-white'
									>
										{menuItem?.title || ''}
									</li>
								</Link>
							);
						})}
					</ul>
					<p className="text-center leading-[18px] text-xs text-footerPurple text-poppins">
						{field_footer_copy_right}
					</p>
				</div>
				<div className="absolute bottom-0 left-0 pointer-events-none">
					<Image
						src="/static/images/footer-bubble.svg"
						alt="logo"
						width={40}
						height={40}
						className="w-full h-full"
					/>
				</div>
			</div>
		</div>
	);
};

export default LandingFooter;
