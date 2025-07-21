'use client';
import React from 'react';
import Slider from 'react-slick';
import { DrupalNode } from 'next-drupal';
import { PiArrowCircleRightThin, PiArrowCircleLeftThin } from 'react-icons/pi';
import { motion } from 'framer-motion';
import slugify from 'slugify';
import { buildMediaTypeAndSrc, formatDateToUS } from '@/lib/utils';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { renderIcon } from '@/lib/parsers';
import { MdChevronRight } from 'react-icons/md';
import Image from 'next/image';

interface TaskforceCardSliderProps {
	sliderData: DrupalNode[];
}

const TaskforceCardSlider: React.FC<TaskforceCardSliderProps> = ({
	sliderData,
}) => {
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		speed: 2000,
		autoplaySpeed: 5000,
		cssEase: 'linear',
	};

	return (
		<>
			<Slider {...settings} className="slider-theme-arrow">
				{sliderData?.map((taskforceData: DrupalNode, index: number) => {
					return (
						<div
							key={index}
							className="px-[15px] laptopMax:px-0 w-full mx-auto laptopMax:py-3 laptopMax:border-t-[1px] laptopMax:border-[#8A8C8E]"
						>
							<motion.div
								className="flex items-start mobileMax:flex-col mobileMax:p-3 mobileMax:h-[400px] box-border bg-white card-shadow w-full h-[350px] aboveMinMobile:h-[160px] minMobile:h-[140px] exactLaptop:rounded-[4px] overflow-hidden"
								// viewport={{ once: true }}
								// transition={{
								// 	type: 'spring',
								// 	duration: 0.5,
								// }}
							>
								<div className="p-6 tab:w-[25%] tab:max-w-[25%] mobileMax:max-w-[200px] flex justify-center items-center w-full overflow-hidden relative mobileMax:mb-0 h-full minMobile:w-[90%] mobileMax:mr-2 lieTablets:mr-3">
									<Image
										src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${
											taskforceData?.field_image_icon?.uri?.url || ''
										}`}
										alt="country flag"
										width={200}
										height={100}
										className="h-full w-full min-w-[200px] h-[100px] object-contain"
									/>
								</div>
								<div className="exactLaptop:w-[75%] mobileMax:w-full exactLaptop:p-4 flex flex-col h-full w-full laptopMax:py-0.5">
									<div className="w-full h-full flex flex-col justify-between">
										<div className="m-10 mobileMax:mt-5 mobileMax:m-0">
											<h4 className="text-numans mb-10 block text-left text-[22px] mobileMax:text-small text-cardHeading line-clamp-2 aboveMinMobile:line-clamp-3 webkit-box font-semibold hover:text-blue hover:underline leading-normal mobileMax:h-auto">
												{taskforceData?.title}
											</h4>
											<div
												dangerouslySetInnerHTML={{
													__html: taskforceData?.field_content.processed,
												}}
												className={`mt-5 --font-poppins text-small text-cardText leading-6 mobileMax:text-xsmall mobileMax:leading-normal ${
													true && 'invest-finace-text'
												}`}
											/>
											<div className="flex flex-row justify-between mobileMax:flex-col">
												{taskforceData?.field_button_text && (
													<Link
														href={taskforceData.field_link || '#'}
														target="_blank"
														className="--font-poppins mt-10 mobileMax:mt-2 text-small text-defaultLink leading-6 flex items-center cursor-pointer  mobileMax:text-xsmall"
													>
														{taskforceData?.field_button_text}
														<MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5" />
													</Link>
												)}
												{taskforceData?.field_button_text_2 && (
													<Link
														href={taskforceData.field_link_2 || '#'}
														target="_blank"
														className="--font-poppins mt-10 mobileMax:mt-52text-small text-defaultLink leading-6 flex items-center cursor-pointer  mobileMax:text-xsmall"
													>
														{taskforceData?.field_button_text_2}
														<MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5" />
													</Link>
												)}
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					);
				})}
			</Slider>
		</>
	);
};

export default TaskforceCardSlider;
