import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import React from 'react';
import { BsCheckLg } from 'react-icons/bs';
interface RegisterSuccessModalProps {
	open: boolean;
	setOpen: (value: boolean) => void;
}

const RegisterSuccessModal: React.FC<RegisterSuccessModalProps> = ({
	open,
	setOpen,
}) => {
	return (
		<Dialog open={open as boolean} onOpenChange={setOpen}>
			<DialogContent
				className="z-[99999] w-[80%] mobileMax:w-[95%] desktop:w-3/5 desktopMd:w-1/2 desktopLg:w-2/5 p-5 py-10 mobileMax:py-6 success-pledge-modal"
				hideOverlay={true}
			>
				<DialogHeader>
					<DialogTitle className="flex flex-col items-center">
						<div className="h-[80px] w-[80px] bg-[linear-gradient(to_right,#48DBB2,#003350)] rounded-full overflow-hidden flex items-center justify-center mb-3 laptopMax:h-[70px] laptopMax:w-[70px]">
							<div className="flex items-center justify-center text-numans text-center rounded-full overflow-hidden h-[70px] w-[70px] laptopMax:h-[60px] laptopMax:w-[60px] bg-white">
								<BsCheckLg className="text-[#1fb187] text-[53px] laptopMax:text-[45px]" />
							</div>
						</div>
						<p className="bg-clip-text text-transparent bg-[linear-gradient(to_right,#48DBB2,#003350)] text-lg font-normal font-numans mobileMax:text-[28px] leading-normal">
							Thank you for registering!
						</p>
					</DialogTitle>
					<DialogDescription className="!text-medium --font-poppins leading-normal text-cardText mobileMax:!text-small">
						Your registration has been successfully submitted. We look forward
						to seeing you at the event!
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default RegisterSuccessModal;
