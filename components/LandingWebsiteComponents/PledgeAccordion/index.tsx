'use client';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { parseStringWithLink } from '@/lib/parsers';
import { DrupalNode } from 'next-drupal';
import React, { useEffect, useState } from 'react';

interface pledgeAccodrionProps {
	checklistData: DrupalNode;
	handleChecklistUpdate: (value: string) => void;
	value: string;
}

const PledgeAccordion: React.FC<pledgeAccodrionProps> = ({
	checklistData,
	handleChecklistUpdate,
	value,
}) => {
	const { field_checklist_item_sublist = [] } = checklistData;
	const [formattedSublist, setFormattedSublist] = useState<DrupalNode[]>([]);
	const [triggerChecked, setTriggerChecked] = useState<any>(false);

	const handleTriggerClick = (triggerValue: any) => {
		const newList = field_checklist_item_sublist.map(
			(sublistItem: DrupalNode) => ({
				...sublistItem,
				itemChecked: triggerValue,
			}),
		);
		setFormattedSublist(newList);

		const sublistIdArray = checklistData.field_checklist_item_sublist.map(
			(sublistItem: DrupalNode) => sublistItem.id,
		);
		const uniqueOnlySublistArray = sublistIdArray.filter(
			(sublistArrayItem: string) => !value.includes(sublistArrayItem),
		);
		handleChecklistUpdate(
			triggerValue
				? uniqueOnlySublistArray.join(',')
				: sublistIdArray.join(','),
		);
		setTriggerChecked(triggerValue);
	};

	useEffect(() => {
		if (value && value.includes(checklistData.id)) {
			setTriggerChecked(true);
		}
		const newList = field_checklist_item_sublist.map(
			(sublistItem: DrupalNode) => {
				const subListItemIsChecked = value.includes(sublistItem.id);
				return { ...sublistItem, itemChecked: subListItemIsChecked };
			},
		);
		setFormattedSublist(newList);
		if (field_checklist_item_sublist.length) {
			const parentCheckValue = newList.every(
				(entry: DrupalNode) => entry.itemChecked,
			);
			setTriggerChecked(parentCheckValue);
		}
	}, [value]);

	const handleSingleItemValueCheck = (checkedItem: DrupalNode, value: any) => {
		const updateIndex = formattedSublist.findIndex(
			(listItem: DrupalNode) => listItem.id === checkedItem.id,
		);
		const checkedArray = [...formattedSublist] as DrupalNode[];
		checkedArray[updateIndex].itemChecked = value;
		setFormattedSublist(checkedArray);

		const parentCheckValue = checkedArray.every((entry) => entry.itemChecked);
		setTriggerChecked(parentCheckValue);
	};

	return (
		<>
			{' '}
			{formattedSublist.length ? (
				<Accordion
					type="single"
					collapsible
					className="pledge-accordion"
					defaultValue="item-1"
				>
					<AccordionItem value="item-1">
						<div className="flex items-center mb-4 ml-[10px] mobileMax:ml-1">
							<Checkbox
								name={''}
								checked={triggerChecked}
								id={checklistData.id}
								onCheckedChange={handleTriggerClick}
								className="block w-[22px] h-[22px] text-white border-[#c7c7c7] mr-4 mobileMax:mr-3 data-[state=checked]:bg-blue"
							/>
							<AccordionTrigger className="!text-small text-cardText font-medium leading-normal py-0 w-full">
								<div className="flex items-center w-full">
									<Label className="word-break !text-small text-left text-cardText pr-2 font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mobileMax:!text-xsmall">
										{parseStringWithLink(checklistData?.title)}
									</Label>
								</div>
							</AccordionTrigger>
						</div>
						{formattedSublist.map((sublistItem: DrupalNode, index: number) => {
							return (
								<AccordionContent key={index}>
									<div className="flex items-center mb-4 ml-12 mobileMax:ml-9">
										<Checkbox
											name={''}
											checked={sublistItem.itemChecked}
											id={sublistItem.id}
											onCheckedChange={(value) => {
												handleChecklistUpdate(sublistItem.id);
												handleSingleItemValueCheck(sublistItem, value);
											}}
											className="block w-[22px] h-[22px] border-[#c7c7c7] mr-4 mobileMax:mr-3 data-[state=checked]:bg-blue"
										/>
										<Label className="word-break text-left !text-small text-cardText font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mobileMax:!text-xsmall">
											{parseStringWithLink(sublistItem?.title || '')}
										</Label>
									</div>
								</AccordionContent>
							);
						})}
					</AccordionItem>
				</Accordion>
			) : (
				<>
					<div className="word-break !text-medium text-landingBlue font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mobileMax:!text-xsmall">
						{checklistData.field_checklist_item_headtext}
					</div>
					<div className="word-break !text-small text-cardHeading leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mobileMax:!text-xsmall mb-3">
						{checklistData.field_checklist_item_subtext}
					</div>
					<div className="flex items-center mb-4 ml-[12px] mobileMax:ml-1">
						<Checkbox
							name={''}
							checked={triggerChecked}
							id={checklistData.id}
							onCheckedChange={() => {
								handleChecklistUpdate(checklistData.id);
								setTriggerChecked(!triggerChecked);
							}}
							className="block w-[22px] h-[22px] border-[#c7c7c7] text-white mr-4 mobileMax:mr-3 data-[state=checked]:bg-blue"
						/>
						<Label
							htmlFor={checklistData.id}
							className="word-break !text-small text-cardText font-medium leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mobileMax:!text-xsmall"
						>
							{parseStringWithLink(checklistData?.title)}
						</Label>
					</div>
				</>
			)}
		</>
	);
};

export default PledgeAccordion;
