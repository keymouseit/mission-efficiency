import { CONSTS } from '@/constants';
import React from 'react';
import { Tooltip } from 'react-tooltip';

interface StatColourWithTooltipInterface {
	value: string;
	toolTipId: string;
}

const StatColourWithTooltip: React.FC<StatColourWithTooltipInterface> = ({
	value,
	toolTipId = 'tooltip',
}) => {
	const tooltipData = CONSTS.MAP_LEGENDS.find((item) => item.color === value);

	return (
		<div key={toolTipId} className="stat-tooltip-wrap">
			<span
				data-tooltip-id={toolTipId}
				className="w-8 h-8 rounded-full block hover:cursor-pointer"
				style={{
					backgroundColor: tooltipData?.color,
				}}
			></span>
			<Tooltip
				id={toolTipId}
				className="statColourWithTooltip"
				place="bottom"
				variant="info"
			>
				<div className="text-small">
					<p className="text-blue font-bold text-xsmall text-left capitalize font-poppins">
						Potential for energy savings is {tooltipData?.value}.
					</p>
					<p className="text-left font-normal text-xs font-poppins text-purple">
						{' '}
						{tooltipData?.discription}{' '}
					</p>
				</div>
			</Tooltip>
		</div>
	);
};

export default StatColourWithTooltip;
