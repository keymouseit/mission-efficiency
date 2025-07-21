'use client';
import React from 'react';
import Slider from 'react-slick';
import { DrupalNode } from 'next-drupal';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface PartnerCardSliderProps {
	sliderData: DrupalNode[];
}

const PartnerCardSlider: React.FC<PartnerCardSliderProps> = ({
	sliderData,
}) => {
	const settings = {
		dots: false,
		arrows: false,
		infinite: true,
		slidesToShow: 5,
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
		slidesToShow: 5,
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
				{sliderData?.slice(0,30).map((partnerCard: DrupalNode, index: number) => {
					return (
						<motion.div
							key={index}
							className="px-[15px] mb-[30px] w-[16%] mobileMax:w-[50%] betweenMobileTab:w-[25%] mobileMax:mb-5 mobileMax:px-[10px]"
							// initial={{ opacity: 0, y: 50 }}
							// whileInView={{ opacity: 1, y: 0 }}
							// viewport={{ once: true }}
							// transition={{
							// 	type: 'spring',
							// 	duration2.8,
							// }}
						>
							<Link
								href={partnerCard.field_mission_card_link}
								target="_blank"
								className="border-2 border-transparent hover:border-blueBorder transition block rounded-[25px] flex justify-center items-center bg-white px-[15px] py-[10px] box-border w-full card-shadow"
							>
								<div className="max-w-[160px] w-full h-[110px] max-h-[110px] min-w-[120px] min-h-[100px] overflow-hidden">
									<Image
										src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${partnerCard?.field_mission_card_image?.uri?.url}`}
										alt="sponser img"
										width={160}
										height={100}
										className="w-full h-full max-w-full object-scale-down min-w-[120px] min-h-[100px]"
									/>
								</div>
							</Link>
						</motion.div>
					);
				})}
			</Slider>
			<Slider {...settings2}>
				{sliderData?.slice(31, sliderData?.length).map((partnerCard: DrupalNode, index: number) => {
					return (
						<motion.div
							key={index}
							className="px-[15px] mb-[30px] w-[16%] mobileMax:w-[50%] betweenMobileTab:w-[25%] mobileMax:mb-5 mobileMax:px-[10px]"
							// initial={{ opacity: 0, y: 60 }}
							// whileInView={{ opacity: 1, y: 0 }}
							// viewport={{ once: true }}
							// transition={{
							// 	type: 'spring',
							// 	duration: 3.2,
							// }}
						>
							<Link
								href={partnerCard.field_mission_card_link}
								target="_blank"
								className="border-2 border-transparent hover:border-blueBorder transition block rounded-[25px] flex justify-center items-center bg-white px-[15px] py-[10px] box-border w-full card-shadow"
							>
								<div className="max-w-[160px] w-full h-[110px] max-h-[110px] min-w-[120px] min-h-[100px] overflow-hidden">
									<Image
										src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${partnerCard?.field_mission_card_image?.uri?.url}`}
										alt="sponser img"
										width={160}
										height={100}
										className="w-full h-full max-w-full object-scale-down min-w-[120px] min-h-[100px]"
									/>
								</div>
							</Link>
						</motion.div>
					);
				})}
			</Slider>
		</>
	);
};

export default PartnerCardSlider;
