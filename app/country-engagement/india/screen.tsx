'use client';
import CommonBanner from '@/components/LandingWebsiteComponents/CommonBanner';
import LandingFooter from '@/components/LandingWebsiteComponents/LandingFooter';
import Header from '@/components/LandingWebsiteComponents/LandingHeader';
import { DrupalNode } from 'next-drupal';
import React from 'react';
import { motion } from 'framer-motion';
import { IoMdImages } from 'react-icons/io';
import TabComponent from '@/components/TabComponent';
import { useState, useEffect } from 'react';
import DynamicImage from '@/components/ResuableDynamicImage';

interface countryProps {
	countryDetail: DrupalNode;
	headerData: DrupalNode;
	footerData: DrupalNode;
}

interface AnimatedCounterProps {
	text: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ text }) => {
	const initialNumberMatch = text.match(/[\d\.]+/);
	const initialNumber = initialNumberMatch
		? parseFloat(initialNumberMatch[0])
		: 0;

	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		if (count < initialNumber) {
			const interval = setInterval(() => {
				setCount((prevCount) => {
					const newCount = Math.min(prevCount + 1, initialNumber);
					if (newCount >= initialNumber) {
						clearInterval(interval);
					}
					return newCount;
				});
			}, 20);
			return () => clearInterval(interval);
		}
	}, [count, initialNumber]);

	const animatedText = text.replace(
		initialNumberMatch ? initialNumberMatch[0] : '',
		count.toString(),
	);

	return <div>{animatedText}</div>;
};

const CountryScreen: React.FC<countryProps> = ({
	countryDetail,
	headerData,
	footerData,
}) => {
	const {
		title = '',
		field_country_key_points = [],
		field_work_description_cards = [],
		field_how_we_work = '',
		field_work_title = '',
		field_ec_recent_news = '',
	} = countryDetail;

	const [counts, setCounts] = useState(
		() => field_country_key_points?.map(() => 0) || [],
	);

	useEffect(() => {
		const intervals = field_country_key_points?.map(
			(card: any, index: number) => {
				const splittingValue = card.title.split(' ');

				const targetValue = parseInt(splittingValue, 10) || 0;

				const valueThreeNum = parseInt(splittingValue[1].match(/\d+/g));

				if (counts[index] < targetValue) {
					const interval = setInterval(() => {
						setCounts((prevCounts: any) => {
							const newCounts = [...prevCounts];

							if (newCounts[index] < targetValue) {
								newCounts[index] = Math.min(newCounts[index] + 1, targetValue);
							} else {
								clearInterval(interval);
							}

							return newCounts;
						});
					}, 100);

					return interval;
				}
			},
		);

		return () => {
			intervals?.forEach(clearInterval);
		};
	}, [field_country_key_points, counts]);

	return (
		<>
			<Header data={headerData} />
			<div className="pt-20">
				<CommonBanner
					leftImg={'/static/images/left-home-hero.svg'}
					rightImg={'/static/images/elevate-right-img.svg'}
					title={title}
					noHeight={true}
					lightBgClip={true}
					isSmallImage={true}
				/>
				<div className="overflow-hidden">
					<div className="py-[100px] bg-mapGray mobileMax:py-8 relative">
						<div className="mini-container relative z-[2]">
							{/* country card */}
							<div className="flex flex-wrap justify-start box-border">
								{field_country_key_points?.map(
									(card: DrupalNode, index: number) => {
										return (
											<motion.div
												initial={{ opacity: 0, y: 40 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{
													duration: 0,
												}}
												key={index}
												className="remove-animation-fluctuation px-[15px] w-[33%] mobileMax:w-[50%] mobileMax:px-0"
											>
												<motion.div className="px-5 py-[25px] flex items-center flex-col h-full w-full box-border border-t-2 border-b-2 border-[#43A7E8] border-line">
													<div className="h-full w-full flex flex-col items-center">
														

														<DynamicImage
															src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${card?.field_image_icon?.uri?.url}`}
															width={102}
															height={73}
															alt={
																field_country_key_points.title || 'Card image'
															}
															className="w-[30%] h-[30%] object-contain"
														/>

														<h5 className="font-bold text-[25px] category-gradient text-numans text-clip betweenMobileTab:text-[20px] mobileMax:text-medium text-center mt-3">
															<AnimatedCounter text={card?.title} />
														</h5>
														<div
															className="--font-poppins text-[#545D6F] text-center font-semibold text-xmedium mobileMax:text-xsmall leading-normal lieTablets:text-small"
															dangerouslySetInnerHTML={{
																__html: card.field_content?.processed,
															}}
														></div>
														<div></div>
													</div>
												</motion.div>
											</motion.div>
										);
									},
								)}
							</div>
						</div>
					</div>
				</div>
				{/* why important section (pointers) */}

				<div className="py-16 blueBg-gradient mobileMax:pb-8 mobileMax:pt-8 relative imp-country">
					<div className="absolute top-[52%] -translate-y-1/2 max-w-[14%] opacity-25 left-0 betweenMobileTab:max-w-[28%] mobileMax:max-w-[45%]">
						<DynamicImage width={228} height={457} src="/static/images/cta-blue-bg.svg" alt="left-bg" />
					</div>
					<div className="mini-container relative z-[2]">
						<motion.h3
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0,
							}}
							className="remove-animation-fluctuation text-white tracking-tight text-[35px] leading-normal mb-[30px] text-center text-numans mobileMax:text-[28px] mobileMax:mb-8"
						>
							{field_work_title}
						</motion.h3>
						{field_work_description_cards?.map(
							(fieldContent: DrupalNode, index: number) => {
								return (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 40 + index }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{
											type: 'ease',
											duration: 0,
											delay: index * 0.1,
										}}
										className="remove-animation-fluctuation mobileMax:w-full --font-poppins text-medium mb-5 mt-3 leading-8 text-[#C9DEFF]  mobileMax:mb-5 mobileMax:text-xsmall mobileMax:leading-normal description-content pb-4  border-b-2 border-white border-line"
										dangerouslySetInnerHTML={{
											__html: fieldContent?.field_content.processed,
										}}
									></motion.div>
								);
							},
						)}
					</div>
				</div>
				{/* how to work */}
				<div className="py-16 bg-graybg mobileMax:pb-8 mobileMax:pt-8 relative">
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{
							type: 'spring',
							duration: 2.5,
						}}
						className="absolute pointer-events-none left-0 top-[100px] mobileMax:top-[55px] max-w-[30%] mobileMax:max-w-[55%] betweenMobileTab:max-w-[40%] z-[1]"
					>
						<DynamicImage
							width={316}
							height={576}
							src="/static/images/cta-section-bg.svg"
							alt="overlay-bg"
							className="opacity-50 desktopLg:opacity-100"
						/>
					</motion.div>
					<div className="mini-container relative z-[2]">
						<motion.h2
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0,
							}}
							className="remove-animation-fluctuation desktop:text-[56px] text-numans mb-[30px] leading-normal text-center history-title-gradient text-clip text-[48px] mobileMax:text-[28px] mobileMax:px-0 mobileMax:mb-5"
						>
							{field_how_we_work}
						</motion.h2>

						<TabComponent
							countryDetail={countryDetail}
							headerData={headerData}
							footerData={footerData}
						/>
					</div>
				</div>
				{/* recent news */}
				<div className="py-16 bg-mapGray mobileMax:pb-8 mobileMax:pt-8 relative">
					<div className="absolute top-[50%] -translate-y-1/2 max-w-[14%] desktop:opacity-25 opacity-10 right-0 betweenMobileTab:max-w-[28%] mobileMax:max-w-[45%] rotate-180">
						<DynamicImage width={316} height={576} src="/static/images/cta-blue-bg.svg" alt="left-bg" />
					</div>
					<div className="mini-container relative z-[2]">
						<motion.h2
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0,
							}}
							className="remove-animation-fluctuation desktop:text-[56px] text-numans mb-[30px] 
              leading-normal text-center history-title-gradient text-clip text-[48px] mobileMax:text-[28px] mobileMax:px-0 mobileMax:mb-5"
						>
							{'News'}
						</motion.h2>

						{field_ec_recent_news?.map((newsItem: any) => (
							<motion.div
								key={newsItem.id}
								className="card flex bg-white rounded-lg shadow-md mt-3 items-center p-2 news-description-content-card"
							>
								<div className="flex w-[30%] min-h-[250px] items-center ml-[15px]">
									{newsItem.field_card_image?.uri?.url.length > 0 ? (
										<DynamicImage
											width={291}
											height={218}
											src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${newsItem.field_card_image.uri.url}`}
											alt={newsItem.title || 'Card image'}
											className="w-[80%] h-[90%] object-cover rounded-l-lg"
										/>

									) : (
										<div className="w-full h-full bg-placeholder flex items-center justify-center ">
											<IoMdImages className="text-white w-[60%] h-[60%]" />;
										</div>
									)}
								</div>
								<div className="w-[70%]">
									<div
										className="pl-4 text-cardText text-[20px] leading-normal --font-poppins mobileMax:text-medium font-bold news-descriptionDate"
										dangerouslySetInnerHTML={{
											__html: newsItem.field_card_date || '',
										}}
									/>
									<div
										className=" p-4 text-cardText text-[18px] leading-normal --font-poppins mobileMax:text-small news-description-content"
										dangerouslySetInnerHTML={{
											__html: newsItem.field_card_description?.value || '',
										}}
									/>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
			<LandingFooter data={footerData} />
		</>
	);
};

export default CountryScreen;
