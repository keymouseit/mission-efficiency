'use client';
import React from 'react';
import Slider from 'react-slick';
import { DrupalNode } from 'next-drupal';
import { PiArrowCircleRightThin, PiArrowCircleLeftThin } from 'react-icons/pi';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HistoryCardSliderProps {
	sliderData: DrupalNode;
}

const HistoryCardSlider: React.FC<HistoryCardSliderProps> = ({
	sliderData,
}) => {
	const settings = {
		dots: false,
		arrows: true,
		infinite: false,
		speed: 1500,
		slidesToShow: 3,
		slidesToScroll: 3,
		prevArrow: <PiArrowCircleLeftThin />,
		nextArrow: <PiArrowCircleRightThin />,
		responsive: [
			{
				breakpoint: 1023,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<>
			<Slider {...settings}>
				{sliderData?.map((timelineCard: DrupalNode, index: number) => {
					return (
						<Link
							key={index}
							href={timelineCard?.field_link || ''}
							target="_blank"
						>
							<motion.div
								// key={index}
								// initial={{ opacity: 0, y: 60 }}
								// whileInView={{ opacity: 1, y: 0 }}
								// viewport={{ once: true }}
								// transition={{
								//   type: "spring",
								//   duration: 3,
								// }}
								className="px-[15px] mb-[30px] w-full mobileMax:w-full mobileMax:px-0  betweenMobileTab:px-[10px]"
							>
								<div className="history-cards relative z-[1]">
									<h2 className="desktop:text-[66px] text-numans mb-6 text-left multi-text text-clip text-[48px] leading-normal mobileMax:text-[32px] mobileMax:mb-3">
										{timelineCard.field_button_text}
									</h2>
									<div className="flex items-start flex-col box-border w-full">
										<div className="mb-[35px] flex justify-center items-center h-[215px] overflow-hidden w-full mobileMax:mb-5">
											<img
												src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${timelineCard?.field_image_icon?.uri?.url}`}
												alt="category img"
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="h-full w-full">
											<h4 className="text-numans tracking-tight text-left text-[27px] mb-5 text-[#313132] leading-9 line-clamp-3 mobileMax:text-medium mobileMax:leading-7 mobileMax:mb-3">
												{timelineCard?.title}
											</h4>
											<div
												className="--font-poppins text-left text-small text-cardText leading-6 line-clamp-5 mobileMax;text-xsmall"
												dangerouslySetInnerHTML={{
													__html: timelineCard?.field_content?.processed,
												}}
											/>
										</div>
									</div>
								</div>
							</motion.div>
						</Link>
					);
				})}
			</Slider>
		</>
	);
};

export default HistoryCardSlider;
