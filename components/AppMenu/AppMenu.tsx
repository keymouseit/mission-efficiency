'use client';
import React from 'react';
import { Menubar } from '@/components/ui/menubar';
import Link from '@/node_modules/next/link';
import { motion } from 'framer-motion';
import DynamicImage from '../ResuableDynamicImage';
import FadeInWrapper from '../FadeInWrapper';

interface AppMenuProps {
	selectedCountry?: any;
	shadow?: Boolean;
	resetToHome?: () => void;
}

const AppMenu: React.FC<AppMenuProps> = ({ }) => {
	return (
		<>
			<motion.div
				className="app-menu"
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{
					duration: 1.5,
				}}
			>
				<Menubar
					className={`border-none justify-between flex px-[16px] py-[8px] min-h-[80px]`}
					role="toolbar"
				>
					<div className="flex justify-between w-full items-center">
						<div>
							<Link href="/">
								<DynamicImage
									className="cursor-pointer"
									src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/sites/default/files/2023-12/mission-eff-logo.png`}
									width={156}
									height={44}
									alt="app logo"
								/>
							</Link>
						</div>
						<div className="w-full flex justify-end">
							<Link
								href="/toolkit/about"
								className="text-[#575662] text-small px-3 hover:underline"
							>
								About
							</Link>
							<Link
								href="/toolkit/explore-tools"
								className="text-[#575662] text-small pl-3 hover:underline"
							>
								Explore Tools
							</Link>
						</div>
					</div>
				</Menubar>
			</motion.div>
		</>
	);
};

export default AppMenu;
