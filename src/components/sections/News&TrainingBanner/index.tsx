import React from 'react';

interface CommonBannerProps {
	title?: string;
	subTitle?: string;
	leftImg?: string;
	rightImg?: string;
	lightBgClip?: boolean;
	isCallToAction?: boolean;
	noHeight?: boolean;
	isCfdpage?: boolean;
	isSmallImage?: boolean;
	isNews?: boolean;
}

const NewsAndTrainingBanner: React.FC<CommonBannerProps> = (props) => {
	const {
		title,
		subTitle,
		lightBgClip = false,
		leftImg,
		rightImg,
		isCallToAction = false,
		noHeight = false,
		isCfdpage = false,
		isSmallImage,
		isNews = false,
	} = props;

	const trimTitle = title?.trim();
	return (
		<div
			className={`overflow-hidden banner-wrap-styling relative flex items-center justify-center laptopMax:overflow-hidden box-border pt-[40px] pb-14 ${
				lightBgClip && 'common-banner-wrap'
			} ${
				noHeight
					? 'min-h-[350px] mobileMax:min-h-[300px]'
					: 'min-h-[560px] mobileMax:min-h-[300px]'
			}`}
			style={{
				background: 'radial-gradient(circle at 41% 94%, #48DBB2, #003350 40%)',
			}}
		>
			<div className="absolute top-[-9px] left-0 z-[-2] pointer-events-none laptopMax:max-w-[55%] mobileMax:top-[-33px] mobileMax:max-w-1/2">
				<img
					src={leftImg}
					alt="left-bg"
					className={` ${noHeight && 'tab:w-[62%]'}`}
				/>
			</div>
			<div className="top-[-10px] right-0 z-[-2] absolute pointer-events-none laptopMax:max-w-[55%] hidden mobileMax:hidden betweenMobileTab:block laptop:block desktop:block mobileMax:top-[-33px] mobileMax:max-w-1/2">
				<img
					src={rightImg}
					alt="right-bg"
					className={` ${noHeight && 'tab:w-[70%] tab:ml-auto'}`}
				/>
			</div>
			{/* title section */}
			<div className="mini-container h-full flex flex-col items-center justify-center">
				<div className="fade-in-up-delayed w-[75%] mx-auto mobileMax:w-full betweenMobileTab:w-[80%]">
					<h1
						className={`
              ${
								isCallToAction ||
								(isCfdpage &&
									'belowTab:mx-auto !text-[50px] mobileMax:!text-xlg')
							}
              ${
								isNews
									? 'text-[44px] !text-white font-bold mobileMax:text-[32px]'
									: 'text-xlarge mobileMax:text-[42px]'
							}
              remove-animation-fluctuation ${
								isNews ? 'text-white' : 'title-green-gradient text-clip'
							}  mb-3.5 mt-0 leading-tight text-center text-numans
            `}
					>
						{trimTitle}
					</h1>
					<p
						className={`${
							isCallToAction && '!text-odd mobileMax:!text-medium'
						} remove-animation-fluctuation !text-odd mobileMax:!text-medium leading-normal text-white text-center --font-poppins mobileMax:leading-[25px]`}
					>
						{subTitle}
					</p>
				</div>
			</div>
			{lightBgClip ? (
				<img
					src="/static/images/gray-curve.png"
					alt="curve"
					className="absolute z-[3] w-full bottom-[-2px] h-[18px] "
				/>
			) : (
				<img
					src="/static/images/white-curve.png"
					alt="curve"
					className="absolute z-[3] w-full bottom-[-2px] h-[18px] "
				/>
			)}
		</div>
	);
};

export default NewsAndTrainingBanner;
