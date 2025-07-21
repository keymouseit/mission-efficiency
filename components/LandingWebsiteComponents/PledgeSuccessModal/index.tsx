import React, { useEffect, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	TwitterIcon,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from 'react-share';
import { usePathname } from 'next/navigation';
import { FaCopy, FaInstagram } from 'react-icons/fa6';

interface PledgeSuccessModalProps {
	open: Boolean;
	setOpen: (value: boolean) => void;
	elevatePage?: boolean;
}

const PledgeSuccessModal: React.FC<PledgeSuccessModalProps> = ({
	open,
	setOpen,
	elevatePage = false
}) => {
	const path = usePathname();
	const [isTablet, setIsTablet] = useState<Boolean>(false);
    const dashboardPath = "/mission-efficiency-pledge"
	const targetPath = elevatePage ? path : dashboardPath;

	const openInstagramLoginPopover = () => {
		const width = 600;
		const height = 400;
		const left = window?.innerWidth / 2 - width / 2;
		const top = window?.innerHeight / 2 - height / 2;
			window.open(
				`https://www.instagram.com/accounts/login/?redirect_uri=${encodeURIComponent(
					window?.origin + targetPath,
				)}`, "",
				`width=${width},height=${height},left=${left},top=${top}`,
			);
	};
	useEffect(() => {
		if(typeof window !== "undefined") {
			if (window?.innerWidth < 1024) {
				setIsTablet(true);
			}
		}
	}, [typeof window]);

	const handleCopy = () => {
		const currentURL = window.location.href;
		navigator.clipboard.writeText(currentURL);
	};

	const handlePledgeCopy = () => {
		const originPath = window.origin + "/mission-efficiency-pledge";
		navigator.clipboard.writeText(originPath);
	};



	return (
		<Dialog open={open as boolean} onOpenChange={setOpen}>
			<DialogContent
				className="z-[99999] w-[80%] mobileMax:w-[95%] desktop:w-3/5 desktopMd:w-1/2 desktopLg:w-2/5 p-5 py-10 mobileMax:py-6 success-pledge-modal"
				hideOverlay={true}
			>
				<DialogHeader>
					<DialogTitle className="flex flex-col items-center">
						<div className="h-[80px] w-[80px] category-gradient rounded-full overflow-hidden flex items-center justify-center mb-3 laptopMax:h-[70px] laptopMax:w-[70px]">
							<div className="flex items-center justify-center text-numans text-center rounded-full overflow-hidden h-[70px] w-[70px] laptopMax:h-[60px] laptopMax:w-[60px] bg-white">
								<BsCheckLg className="text-[#40BDE7] text-[53px] laptopMax:text-[45px]" />
							</div>
						</div>
						<p className="commonGradientColor text-lg font-normal font-numans mobileMax:text-[28px] leading-normal">
							Congratulations!
						</p>
					</DialogTitle>
					<DialogDescription className="!text-medium --font-poppins leading-normal text-cardText mobileMax:!text-small">
						{elevatePage ? "Your submission has been successfully submitted to the energy efficiency campaign. Thank you!" : "Your Pledge has been created successfully."}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="">
					<div className="pt-5 border-t border-[#dddc]">
						<h5 className="text-numans text-xmedium uppercase leading-normal mb-6 text-cardHeading text-center font-bold mobileMax:text-xmedium">
						{elevatePage ?  "Help People Reach This Campaign" : "Help People Reach This Pledge"}
						</h5>
						{elevatePage ? <div className="flex items-center justify-center">
							<FaCopy
								onClick={handleCopy}
								size={30}
								className="fill-[#7f7f7f] rounded-[7px] p-0.5 block mx-3 mobileMax:mx-2 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
							/>

							<EmailShareButton
								url={
									typeof window !== 'undefined'
										? 
										`${window?.origin}${path}` || '#'
										: '#'
								}
								className="mr-3 mobileMax:mr-2 transform transition-transform duration-300 hover:scale-110"
							>
								<EmailIcon size={32} round />
							</EmailShareButton>
							<FacebookShareButton
								url={
									typeof window !== 'undefined'
										? `${window?.origin}${path}` || '#'
										: '#'
								}
								className="mx-3 mobileMax:mx-2 transform transition-transform duration-300 hover:scale-110"
							>
								<FacebookIcon size={32} round />
							</FacebookShareButton>
							<TwitterShareButton
								url={
									typeof window !== 'undefined'
										? `${window?.origin}${path}` || '#'
										: '#'
								}
								className="mx-3 mobileMax:mx-2 transform transition-transform duration-300 hover:scale-110"
							>
								<TwitterIcon size={32} round />
							</TwitterShareButton>
							<FaInstagram
								size={32}
								className="insta-gradient-color text-white rounded-[7px] p-0.5 block mx-3 mobileMax:mx-2 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
								onClick={() => {
									if (typeof window !== 'undefined') {
										isTablet
											? window.open(
													`https://www.instagram.com/accounts/login/?redirect_uri=${encodeURIComponent(
														window?.origin + path,
													)}`,
											  )
											: openInstagramLoginPopover();
									}
								}}
							/>
							<WhatsappShareButton
								url={
									typeof window !== 'undefined'
										? `${window?.origin}${path}` || '#'
										: '#'
								}
								className="mx-3 mobileMax:mx-2 transform transition-transform duration-300 hover:scale-110"
							>
								<WhatsappIcon size={32} round />
							</WhatsappShareButton>
						</div> :
						<div className="flex items-center justify-center">
							<FaCopy
								onClick={handlePledgeCopy}
								size={30}
								className="fill-[#7f7f7f] rounded-[7px] p-0.5 block mx-3 mobileMax:mx-2 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
							/>

							<EmailShareButton
								url={
									typeof window !== 'undefined'
										? 
										`${window?.origin}${dashboardPath}` || '#'
										: '#'
								}
								className="mr-3 mobileMax:mr-2 transform transition-transform duration-300 hover:scale-110"
							>
								<EmailIcon size={32} round />
							</EmailShareButton>
							<FacebookShareButton
								url={
									typeof window !== 'undefined'
										? `${window?.origin}${dashboardPath}` || '#'
										: '#'
								}
								className="mx-3 mobileMax:mx-2 transform transition-transform duration-300 hover:scale-110"
							>
								<FacebookIcon size={32} round />
							</FacebookShareButton>
							<TwitterShareButton
								url={
									typeof window !== 'undefined'
										? `${window?.origin}${dashboardPath}` || '#'
										: '#'
								}
								className="mx-3 mobileMax:mx-2 transform transition-transform duration-300 hover:scale-110"
							>
								<TwitterIcon size={32} round />
							</TwitterShareButton>
							<FaInstagram
								size={32}
								className="insta-gradient-color text-white rounded-[7px] p-0.5 block mx-3 mobileMax:mx-2 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
								onClick={() => {
									if (typeof window !== 'undefined') {
										isTablet
											? window.open(
													`https://www.instagram.com/accounts/login/?redirect_uri=${encodeURIComponent(
														window?.origin + dashboardPath,
													)}`,
											  )
											: openInstagramLoginPopover();
									}
								}}
							/>
							<WhatsappShareButton
								url={
									typeof window !== 'undefined'
										? `${window?.origin}${dashboardPath}` || '#'
										: '#'
								}
								className="mx-3 mobileMax:mx-2 transform transition-transform duration-300 hover:scale-110"
							>
								<WhatsappIcon size={32} round />
							</WhatsappShareButton>
						</div>}
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PledgeSuccessModal;
