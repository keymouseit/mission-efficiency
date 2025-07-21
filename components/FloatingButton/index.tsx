'use client';
import React, { useEffect, useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import { motion } from 'framer-motion';

interface floatingButtonProps {
	onClick?: () => void;
}

const FloatingButton: React.FC<floatingButtonProps> = ({ onClick }) => {
	const [isTablet, setIsTablet] = useState<Boolean>(false);

	useEffect(() => {
		if(typeof window !== "undefined"){
			if (window?.innerWidth < 1024) {
				setIsTablet(true);
			}
	    }
	}, []);

	return (
		<>
			<motion.button
				animate={{ x: 0, y: [-10, 10, -10] }}
				className="exactLaptop:hidden z-[3] bg-blue text-white flex items-center justify-center cursor-pointer w-[60px] h-[60px] rounded-full bottom-4 right-4 fixed mobileMax:w-[50px] mobileMax:h-[50px]"
				transition={{
					duration: 2,
					ease: 'easeInOut',
					loop: Infinity,
					repeat: Infinity,
				}}
				style={{ boxShadow: '-2px 0.901679px 15.155874px 0px #5a5c9ee0' }}
				onClick={onClick}
			>
				<IoFilter className="text-xlg mobileMax:text-[22px]" />
			</motion.button>
		</>
	);
};

export default FloatingButton;
