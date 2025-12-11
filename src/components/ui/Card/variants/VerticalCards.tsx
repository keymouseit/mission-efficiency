"use client";

import { config } from "@/lib/config";
import { motion } from "framer-motion";
import { DrupalNode } from "next-drupal";
import Image from "next/image";

interface CardProps {
  data: DrupalNode;
}

export default function VerticalCards({ data }: CardProps) {
  return (
    <div className="bg-[#003350] relative pt-[80px] pb-[120px] mobileMax:py-10 betweenMobileTab:py-16 overflow-hidden">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{
							type: 'spring',
							duration: 2.8,
						}}
						className="absolute right-[0px] top-[250px] pointer-events-none max-w-[8%] betweenMobileTab:max-w-[35%] mobileMax:max-w-[30%]"
					>
						<Image
							src="/static/images/testimonial-clip.png"
							alt="get-inv-home"
							width={200}
							height={200}
							className="opacity-60 mobileMax:opacity-50"
						/>
					</motion.div>
					<div className="mini-container relative">
						<h3
							className="text-[32px] text-center font-poppins mb-[80px] mobileMax:mb-8 font-semibold leading-normal bg-gradient-to-r from-[#48DBB2] to-[#4FC0FF] 
                       bg-clip-text text-transparent text-clip mobileMax:text-[28px] mobileToDesk:mb-5"
						>
							{data?.field_title}
						</h3>
						<div className="flex mobileMax:flex-col items-stretch justify-center gap-[50px] betweenMobileTab:gap-[35px] mobileMax:gap-[20px]">
							{data?.field_add_card?.map((item: any) => (
								<div
									key={item.id}
									className="flex flex-col items-center justify-between p-[40px] betweenMobileTab:p-[30px] hover:scale-105 transition-all ease-in-out duration-700 bg-white rounded-[30px] 
                 w-[430px] mobileMax:w-full shadow-lg"
								>
									<div className='flex flex-col items-center justify-center gap-6'>
										<div className="w-[250px] h-[250px] rounded-full overflow-hidden">
										<Image
											alt={item.name}
											src={`${config.apiBase}${item?.field_image?.uri?.url || ""}`}
											width={250}
											height={250}
											priority
											quality={90}
											className="object-bottom w-full h-full"
										/>
									</div>

									<div
										className="text-[14px] text-[#003350] font-poppins font-medium text-center 
                   mobileMax:text-xsmall leading-normal mb-[15px] designation"
                   dangerouslySetInnerHTML={{
                                  __html: item?.field_description?.processed,
                                }}
									/>
									</div>  
								</div>
							))}
						</div>
					</div>
				</div>
  );
}
