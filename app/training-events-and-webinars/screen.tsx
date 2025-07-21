'use client';
import CommonBanner from '@/components/LandingWebsiteComponents/CommonBanner';
import LandingFooter from '@/components/LandingWebsiteComponents/LandingFooter';
import Header from '@/components/LandingWebsiteComponents/LandingHeader';
import { DrupalNode } from 'next-drupal';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TrainingEventsProps {
	data: DrupalNode;
	headerData: DrupalNode;
	footerData: DrupalNode;
}

const TrainingEventsScreen: React.FC<TrainingEventsProps> = ({
	data,
	headerData,
	footerData,
}) => {
	const { title = '', field_traning_events_cards = [] } = data;
	return (
		<>
			<Header data={headerData} />
			<div className="pt-20 bg-white">
				<CommonBanner
					leftImg={'/static/images/left-home-hero.svg'}
					rightImg={'/static/images/elevate-right-img.svg'}
					title={title}
				/>
				<div className="pt-[140px] pb-10 betweenMobileTab:py-16 mobileMax:py-12">
					<div className="mini-container flex items-start justify-start flex-wrap">
						{field_traning_events_cards?.map(
							(eventCards: DrupalNode, index: number) => {
								return (
									<div
										key={index}
										className="px-[15px] w-[33%] mb-32 mobileMax:w-full mobileMax:px-0 lieTablets:w-[50%] betweenMobileTab:mb-20 mobileMax:mb-8"
									>
										<div className="flex items-start flex-col box-border w-full">
											<div className="mb-10 flex justify-center items-center h-[280px] rounded-[23px] overflow-hidden mobileMax:mb-5">
												<Image
													src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${eventCards?.field_event_image?.uri?.url}`}
													alt="category img"
													height={350}
													width={300}
													className="w-full h-full max-w-full object-cover card-shadow"
												/>
											</div>
											<div className="h-full w-full">
												<h4 className="text-numans text-left text-[22px] mobileMax:text-small mb-2 text-cardHeading leading-normal line-clamp-4">
													{eventCards.title}
												</h4>
												<p className="--font-poppins text-left text-small text-[#8A8787] leading-6 mb-2 mobileMax:text-xsmall mobileMax:leading-normal">
													{eventCards.field_event_date}
												</p>
											</div>
											<Link
												href={eventCards.field_event_button_link}
												target="_blank"
												className="font-medium block text-left learnBtn text-clip --font-poppins"
											>
												{eventCards.field_event_button_text}
											</Link>
										</div>
									</div>
								);
							},
						)}
					</div>
				</div>
			</div>
			<LandingFooter data={footerData} />
		</>
	);
};

export default TrainingEventsScreen;
