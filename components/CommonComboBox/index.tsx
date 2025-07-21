'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { FiChevronDown } from 'react-icons/fi';
import { Check } from 'lucide-react';
import { numans, poppins } from '@/lib/fonts';

interface CommonComboBoxInterface {
	placeholder: string;
	searchPlaceholder: string;
	value?: string[] | string;
	list?: { label: string; value: string }[];
	onSelectChange?: (e: any) => void;
	multiSelect?: any;
	multipleValuePlaceholder?: string;
	noEllipses?: Boolean;
	isMultiSelectEnable?: boolean;
	emptyCommandClassName?: string;
	commandGrpClassName?: string;
	popoverButtonClassName?: string;
	popoverTitleClassName?: string;
	popoverContentClass?: string;
}

const CommonComboBox: React.FC<CommonComboBoxInterface> = ({
	placeholder = '',
	searchPlaceholder = '',
	value,
	list = [],
	onSelectChange,
	multipleValuePlaceholder = '',
	noEllipses = false,
	isMultiSelectEnable = false,
	emptyCommandClassName = '',
	commandGrpClassName = '',
	popoverButtonClassName = '',
	popoverTitleClassName = '',
	popoverContentClass = '',
}) => {
	const [open, setOpen] = useState(false);
	const handleSelect = (item: any) => {
		if (isMultiSelectEnable) {
			const newValue = [...(value as string[])];
			const targetIndex = newValue.findIndex(
				(selected: string) => selected === item,
			);
			if (targetIndex > -1) {
				// If the item is already in the value array, remove it.

				newValue.splice(targetIndex, 1);

				onSelectChange?.(newValue as string[]);
			} else {
				// If the item is not in the value array, add it.
				onSelectChange?.([...(value as string[]), item]);
			}
			return;
		} else {
			const newValue = item === value ? '' : item;
			onSelectChange?.(newValue);
			setOpen(false);
		}
	};

	const handleSelectValue = () => {
		let result;
		if (isMultiSelectEnable) {
			if ((value as String[])?.length <= 1) {
				result = (value as string[])?.join(', ');
			} else {
				result = multipleValuePlaceholder
					? multipleValuePlaceholder
					: 'Multiple';
			}
		}
		if (typeof value === 'string') {
			result = list.find((item) => item.value === (value as string))?.label;
		}
		return result || placeholder;
	};

	const handleClassName = (itemValue: string) => {
		if (isMultiSelectEnable) {
			return (value as string[]).includes(itemValue);
		}
		if (typeof value === 'string') {
			return value === itemValue;
		}
	};

	useEffect(() => {
		if(typeof window !== "undefined"){
			if (window?.innerWidth <= 1024) {
				if (open) {
					document.getElementsByTagName('html')[0].className = '!overflow-hidden';
					document.body.className = `${numans.variable} ${poppins.variable} !overflow-hidden`;
				} else {
					document.getElementsByTagName('html')[0].className = 'overflow-unset';
					document.body.className = `${numans.variable} ${poppins.variable} overflow-unset`;
				}
			}
	    }
	}, [open]);

	return (
		<>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="button"
						aria-expanded={open}
						className={`w-full justify-between text-xsmall bg-white hover:bg-white commonBoxShadow border-0 ${
							!noEllipses && 'selectEllipsed'
						} comboBox-button ${popoverButtonClassName}`}
					>
						<span className={`${popoverTitleClassName}`}>
							{handleSelectValue()}
						</span>
						<FiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className={`w-full p-0 text-xsmall w-[240px] lieTablets:w-[280px] mobileMax:w-[280px] lieTablets:max-w-[280px] mobileMax:max-w-[280px] ${popoverContentClass}`}
					align="start"
				>
					<Command>
						<CommandInput placeholder={searchPlaceholder || ''} />
						<CommandEmpty
							className={`${emptyCommandClassName} p-4 flex justify-center items-center`}
						>
							No Data Found.
						</CommandEmpty>
						<CommandGroup
							className={`overflow-auto max-h-[350px] mobileMax:max-h-[300px] ${commandGrpClassName}`}
						>
							{list.map((item, index) => {
								return (
									<CommandItem
										key={index}
										onSelect={() => handleSelect(item.value)}
										className="mobileMax:text-[13.5px]"
									>
										<Check
											className={cn(
												'mr-2 h-[16px] w-[16px] max-w-full block',
												handleClassName(item.value)
													? 'opacity-100'
													: 'opacity-0',
											)}
										/>
										<span className="block w-full">{item.label}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	);
};

export default CommonComboBox;
