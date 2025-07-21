'use client';
import React from 'react';
import Slider from 'react-slick';
import { DrupalNode } from 'next-drupal';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MemberCountrySliderProps {
	sliderData: DrupalNode[];
}

const MemberCountrySlider: React.FC<MemberCountrySliderProps> = ({
	sliderData,
}) => {
	const settings = {
		dots: false,
		arrows: false,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		speed: 8000,
		autoplaySpeed: 100,
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
		]
	};
	const settings2 = {
		dots: false,
		arrows: false,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		speed: 8000,
		autoplaySpeed: 100,
		cssEase: 'linear',
		rtl: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
		]
	};

	return (
		<>
			<Slider {...settings}>
				{sliderData?.map((memberCard: DrupalNode, index: number) => {
					return (
						<motion.div
							key={index}
							className="px-[15px] mb-[30px] w-[16%] mobileMax:w-[50%] betweenMobileTab:w-[25%] mobileMax:mb-5 laptopMax:px-[10px]"
							// initial={{ opacity: 0, y: 50 }}
							// whileInView={{ opacity: 1, y: 0 }}
							// viewport={{ once: true }}
							// transition={{
							// 	type: 'spring',
							// 	duration2.8,
							// }}
						>
							<div className="block rounded-[25px] flex flex-col justify-center items-center bg-white px-[15px] py-[20px] box-border w-full card-shadow">
								<div
									className={`min-h-[128px] mb-4 overflow-hidden`}
								>
									<Image
										src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${memberCard?.field_mission_card_image?.uri?.url}`}
										alt="sponser img"
										width={120}
										height={100}
										className="w-full h-full object-contain"
									/>
								</div>
								<p className="text-cardHeading text-medium m-0 text-center line-climp-1 mobileMax:text-small">
									{memberCard?.title}
								</p>
							</div>
						</motion.div>
					);
				})}
			</Slider>
			{/* <Slider {...settings2}>
				{sliderData?.reverse()?.map((memberCard: DrupalNode, index: number) => {
					return (
						<motion.div
							key={index}
							className="px-[15px] mb-[30px] w-[16%] mobileMax:w-[50%] betweenMobileTab:w-[25%] mobileMax:mb-5 laptopMax:px-[10px]"
							initial={{ opacity: 0, y: 60 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								type: 'spring',
								duration: 3.2,
							}}
						>
							<div className="block rounded-[25px] flex flex-col justify-center items-center bg-white px-[15px] py-[20px] box-border w-full card-shadow">
								<div
									className="min-h-[128px] mb-4 overflow-hidden"
								>
									<Image
										src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${memberCard?.field_mission_card_image?.uri?.url}`}
										alt="sponser img"
										width={120}
										height={100}
										className="w-full h-full object-contain"
									/>
								</div>
								<p className="text-cardHeading text-medium m-0 text-center line-climp-1 mobileMax:text-small">
									{memberCard?.title}
								</p>
							</div>
						</motion.div>
					);
				})}
			</Slider> */}
		</>
	);
};

export default MemberCountrySlider;
