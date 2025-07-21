'use client';
import React, { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { DrupalNode } from 'next-drupal';
import { ExternalLink } from 'lucide-react';
import { IoMdSettings } from 'react-icons/io';
import SettingDropdown from '@/components/SettingDropdown';
import useColumnVisibility from '@/hooks/useColumnVisibility';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { createQueryString } from '@/lib/utils';

interface CustomisableTableProps {
	loading: Boolean;
	tools: DrupalNode[] | undefined;
	searchParams: any;
}

const CustomisableTable: React.FC<CustomisableTableProps> = ({
	loading,
	tools,
	searchParams,
}) => {
	const queryParams = useSearchParams();
	const path = usePathname();
	const router = useRouter();
	const activeTabs = queryParams.get('activeTabs')?.split(',');

	const { headers, toggleColumn, visibleColumns, setVisibleColumns } =
		useColumnVisibility(null);
	const [columnMapping, setColumnMapping] = useState<{
		[key: string]: keyof DrupalNode;
	}>({});
	const [showSettingDropdown, setShowSettingDropdown] =
		useState<Boolean>(false);

	const normaliseColumns = (columnList: DrupalNode[]) => {
		const fieldKeys = Object.keys(columnList[0] || {}).filter(
			(key) => key.startsWith('field_') || key.startsWith('field_tool_d_'),
		);

		const initialColumns: { [key: string]: boolean } = {};
		fieldKeys.forEach((key) => {
			const cleanKey = key.replace(/^field(_tool_d)?_/, '');
			initialColumns[cleanKey] = false;
		});

		const columnMapping: { [key: string]: string } = {};
		fieldKeys.forEach((key) => {
			const cleanKey = key.replace(/^field(_tool_d)?_/, '');
			columnMapping[cleanKey] = key;
		});

		setColumnMapping(columnMapping);
		const { link, ...restColumns } = initialColumns;
		if (activeTabs) {
			const newVisibleColumns = { ...restColumns };
			activeTabs.forEach((activeTab) => {
				newVisibleColumns[activeTab] = true;
			});
			setVisibleColumns(newVisibleColumns);
		} else {
			setVisibleColumns({
				...restColumns,
				...(tools?.length && { sector: true, category: true, type: true }),
			});
		}
	};

	useEffect(() => {
		if (tools) {
			normaliseColumns(tools);
		}
	}, [tools]);

	const handleUrl = (columns: { [x: string]: boolean }) => {
		const activeTabs: string[] = [];
		Object.keys(columns).forEach((column) => {
			if (columns[column]) {
				activeTabs.push(column);
			}
		});

		const query = createQueryString({
			...searchParams,
			activeTabs: activeTabs.join(','),
		});
		router.push(`${path}${query}`);
	};

	return (
		<>
			<div
				className={`relative overflow-auto mb-2 tools-tableHeight w-full ${
					headers.length >= 4 && 'tools-scroll-table'
				}`}
			>
				{!loading && tools?.length ? (
					<div
						className={`absolute z-[3] top-0 text-purple bg-[#F5F9FF] flex items-center justify-center right-0 w-[60px]`}
					>
						<SettingDropdown
							open={showSettingDropdown as boolean}
							setOpen={(value) => setShowSettingDropdown(value)}
							triggerClassName="setting-menu outline-none"
							columns={Object.keys(visibleColumns || {})}
							activeColumns={visibleColumns}
							onColumnToggle={(value) => {
								handleUrl({
									...visibleColumns,
									[value]: !visibleColumns[value],
								});
								toggleColumn(value);
							}}
						>
							<IoMdSettings className="mx-1 h-[40px] text-medium" />
						</SettingDropdown>
					</div>
				) : null}
				<Table className={`potentialTable ${loading && 'h-[510px] w-full'} `}>
					{tools?.length ? (
						<TableHeader
							className={`potentialTable-row sticky top-0 z-[1] border-1 border-b border-grayBorder ${
								loading && 'h-[40px]'
							}`}
						>
							<TableRow>
								{!loading ? (
									<>
										{headers?.map((header, index) => (
											<TableHead key={header} className="capitalize">
												{header}
											</TableHead>
										))}
										<TableHead
											className={`w-[40%] ${
												headers.length <= 1 && 'w-[fit-content]'
											}`}
										>
											Tools
											{/* <IoMdRefresh className="mx-1 text-medium" /> */}
										</TableHead>
									</>
								) : (
									<TableHead
										colSpan={4}
										className="animate-pulse h-[80px] rounded-md w-full bg-skeleton"
									/>
								)}
							</TableRow>
						</TableHeader>
					) : null}
					<TableBody>
						{Array(loading ? 7 : 0)
							.fill(1)
							.map((index) => {
								return (
									<TableRow key={index}>
										<TableCell>
											<div className="animate-pulse h-8 rounded-md w-full bg-skeleton" />
										</TableCell>
										<TableCell>
											<div className="animate-pulse h-8 rounded-md w-full bg-skeleton" />
										</TableCell>
										<TableCell>
											<div className="animate-pulse h-8 rounded-md w-full bg-skeleton" />
										</TableCell>
										<TableCell>
											<div className="animate-pulse h-8 rounded-md w-full bg-skeleton" />
										</TableCell>
									</TableRow>
								);
							})}
						{!loading &&
							(tools?.length ? (
								<>
									{tools?.map((tool, index) => (
										<TableRow key={index}>
											{headers.map((header) => {
												return (
													<TableCell key={header}>
														{typeof tool[columnMapping[header]] === 'string'
															? tool[columnMapping[header]]
															: tool[columnMapping[header]]?.name}
													</TableCell>
												);
											})}
											<TableCell>
												<a
													href={tool.field_tool_d_link}
													target="_blank"
													rel="noopener noreferrer"
												>
													<div className="flex justify-between">
														<div className="w-[90%] laptopMax:w-[85%] text-linkBlue">
															{tool.title}
														</div>
														<ExternalLink className="w-[24px] h-[24px] max-w-[24px]" />
													</div>
												</a>
											</TableCell>
										</TableRow>
									))}
								</>
							) : (
								<TableRow>
									<TableCell
										colSpan={headers.length + 1}
										className="text-xmedium h-[500px] text-center font-poppins"
									>
										No Data Found.
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default CustomisableTable;
