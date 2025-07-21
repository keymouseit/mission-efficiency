import { Checkbox } from '@/components/ui/checkbox';
import React, { useEffect, useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
interface CommonMultiCheckoxInterface {
	list: { label: string; value: string }[];
	value: string[] | string;
	onSelectChange: (e: any) => void;
	menuTitle?: string;
	menuListHeight?: number;
	isOpen? :boolean;
	toggleOpen?: () => void;
	singleMenu?: boolean;
}

const CommonMultiCheckox: React.FC<CommonMultiCheckoxInterface> = ({
	list = [],
	value,
	menuTitle,
	onSelectChange,
	menuListHeight, 
	isOpen,
    toggleOpen,
	singleMenu
}) => {
	const [selectedOptions, setSelectedOptions] = useState<
		{ label: string; value: string }[]
	>([]);
	const [isAboveMobile, setAboveMobile] = useState<Boolean>(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (window?.innerWidth > 767) {
				setAboveMobile(true);
			}
		}
	}, []);

	useEffect(() => {
		let initialSelectedOptions =
			list.filter((option) => value?.includes(option.value)) || [];
		setSelectedOptions(initialSelectedOptions);
	}, [value, list]);

	const handleChange = (selectedValue: any) => {
		if(isAboveMobile) {
			window.scrollTo({ top: 400, behavior: 'smooth' });
		}
		const isAlreadySelected = selectedOptions.some(
			(option) => option.value === selectedValue.value,
		);

		if (isAlreadySelected) {
			// If already selected, remove from the selection
			const newSelectedOptions = selectedOptions.filter(
				(option) => option.value !== selectedValue.value,
			);
			let selectedValueStrings = newSelectedOptions.map(
				(option) => option.value,
			);
			onSelectChange?.(selectedValueStrings);
			setSelectedOptions(newSelectedOptions);
		} else {
			// If not selected, add to the selection
			const newSelectedOptions = [...selectedOptions, selectedValue];
			let selectedValueStrings = newSelectedOptions.map(
				(option) => option.value,
			);
			console.log({ newSelectedOptions });
			onSelectChange?.(selectedValueStrings);
			setSelectedOptions(newSelectedOptions);
		}
	};

	return (
		<>
			{list.length ? (
				<div className={`${singleMenu ? "p-[10px]" :"p-[10px] border-b border-b-[#e7e7e7]"} w-full`}>
					<div
						className="flex items-center justify-between w-full cursor-pointer"
						onClick={toggleOpen}
					>
						<p className="text-xsmall uppercase flex items-center text-numans text-cardHeading leading-normal">
							{menuTitle}
							{selectedOptions.length ? (
								<span className="w-2 ml-2 h-2 bg-blue rounded-full block" />
							) : null}
						</p>
						{isOpen  ? (
							<HiChevronUp className="block text-odd text-[#7f7f7f]" />
						) : (
							<HiChevronDown className="block text-odd text-[#7f7f7f]" />
						)}
					</div>
					{isOpen  ? (
						<div
							className="mt-3 lighter-scrollbar"
							// style={{
							// 	height: menuListHeight,
							// 	overflow: menuListHeight ? 'hidden' : 'auto',
							// }}
						>
							<div className="flex flex-col items-left overflow-auto h-full">
								{list.map((listItem, index) => {
									return (
										<div key={index} className="flex items-center mb-3">
											<Checkbox
												checked={selectedOptions.includes(listItem)}
												onCheckedChange={() => handleChange(listItem)}
												id={listItem.value}
												className="block mr-2 data-[state=checked]:bg-blue data-[state=checked]:text-white data-[state=checked]:border-blue"
											/>
											<label
												htmlFor={listItem.value}
												className="text-xsmall cursor-pointer font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												{listItem.label}
											</label>
										</div>
									);
								})}
							</div>
						</div>
					) : null}
				</div>
			) : null}
		</>
	);
};

export default CommonMultiCheckox;
