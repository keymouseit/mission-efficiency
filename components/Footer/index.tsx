'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsYoutube } from 'react-icons/bs';
import { FaTwitter } from 'react-icons/fa6';
import { TfiLinkedin } from 'react-icons/tfi';
import DynamicImage from '../ResuableDynamicImage';

const Footer = () => {
	return (
		<div className="relative mt-12 footerWrap">
			<DynamicImage
				width={1880}
				height={15}
				src="/static/images/blue-curve.png"
				alt="curve"
				className="absolute z-[1] w-full top-[-13px] h-[15px] pointer-events-none"
			/>
			<div className="overflow-hidden relative">
				<div className="px-4 py-10 bg-footerbg inner-footer min-h-[350px] mobileMax:min-h-[260px]">
					<DynamicImage
						src="/static/images/footer-logo.svg"
						alt="logo"
						width={42}
						height={42}
						className="mx-auto block pb-2"
					/>
					<p className="text-sky text-[24px] text-center mb-[72px] text-numans mobileMax:text-xmedium">
						Elevate. Support. Invest.
					</p>
					<p className="capitalize text-center text-xsmall text-white leading-[20px]">
						Follow Us
					</p>
					<div className="flex items-center justify-center mt-5">
						{/* <BsYoutube className="text-white text-xlg mx-2 w-[30px] h-[30px]" /> */}
						<Link href="https://twitter.com/Mission_EE">
							<FaTwitter className="text-white text-[26px] mx-2 w-[30px] h-[28px]" />
						</Link>
						<Link href="https://www.linkedin.com/company/mission-efficiency/">
							{/* <TfiLinkedin className="text-white text-xlg mx-2" /> */}
							<DynamicImage
								src="/static/images/linketin-logo.png"
								alt="img"
								width={30}
								height={30}
								className="mx-2"
							/>
						</Link>
					</div>
					<div className="border border-[1px] border-white my-8 w-[33px] mx-auto" />
					<ul className="flex items-center justify-center flex-col mb-[27px]">
						<li>
							<a
								href="mailto:info@missionefficiency.org"
								className="text-center leading-[25px] text-xsmall text-[#a194d2] hover:text-[#8e7ec9] text-poppins cursor-pointer text-white"
							>
								Contact us
							</a>
						</li>
						<li>
							<a
								href="/terms-and-conditions"
								className="text-center leading-[25px] text-xsmall text-[#a194d2] hover:text-[#8e7ec9] text-poppins cursor-pointer text-white"
							>
								Terms and conditions
							</a>
						</li>
						<li>
							<a
								href="/privacy-policy"
								className="text-center leading-[25px] text-xsmall text-[#a194d2] hover:text-[#8e7ec9] text-poppins cursor-pointer text-white"
							>
								Privacy Policy
							</a>
						</li>
					</ul>

					<p className="text-center leading-[18px] text-xs text-footerPurple text-poppins">
						<span className="mr-0.5">©</span>Mission Efficiency 2024. All rights
						reserved.
					</p>
				</div>
				<div className="absolute bottom-0 left-0 pointer-events-none">
					<DynamicImage
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

export default Footer;
