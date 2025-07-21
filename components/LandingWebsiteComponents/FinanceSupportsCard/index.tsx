import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdChevronRight } from 'react-icons/md';

interface FinaceCardProps {
	title: string;
	subTitle: string;
	showImage?: boolean;
	imgSrc?: string | StaticImport;
	buttonLink?: string;
	buttonText?: string;
}

const FinaceSupportCard: React.FC<FinaceCardProps> = (props) => {
	const {
		title,
		subTitle,
		showImage = false,
		imgSrc = '',
		buttonLink = '',
		buttonText = '',
	} = props;

	return (
		<div className="rounded-xl bg-white p-10 h-full flex items-center flex-col box-border w-full card-shadow mobileMax:p-5 mobileMax:min-h-[350px]">
			<div className="h-full w-full">
				{showImage && (
					<div className="max-w-[200px] h-[100px] w-full mx-auto my-5">
						<Image
							src={imgSrc}
							alt="country flag"
							width={200}
							height={100}
							className="h-full w-full min-w-[200px] h-[100px] object-contain"
						/>
					</div>
				)}
				<h4 className="text-numans text-center desktop:text-[25px] text-clip category-gradient font-medium desktop:leading-10 capitalize text-medium leading-7">
					{title}
				</h4>
				<div className="gradient-border w-[210px] h-[3px] mx-auto" />
				<div
					dangerouslySetInnerHTML={{ __html: subTitle }}
					className={`mt-5 --font-poppins text-center text-small text-cardText leading-6 mobileMax:text-xsmall mobileMax:leading-normal ${
						showImage && 'invest-finace-text'
					}`}
				/>
				{buttonText && (
					<Link
						href={buttonLink || '#'}
						target="_blank"
						className="--font-poppins mt-10 text-small text-defaultLink leading-6 flex items-center justify-center cursor-pointer  mobileMax:text-xsmall"
					>
						{buttonText}
						<MdChevronRight className="w-[18px] h-[18px] max-w-[18px] ml-0.5" />
					</Link>
				)}
			</div>
		</div>
	);
};

export default FinaceSupportCard;
