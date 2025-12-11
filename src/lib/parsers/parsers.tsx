import { LucideStickyNote } from 'lucide-react';
import { GiBlackBook } from 'react-icons/gi';
import { GrNotes } from 'react-icons/gr';
import { IoMdImages } from 'react-icons/io';
import { MdEventAvailable } from 'react-icons/md';

export const renderIcon = (resourceName: string) => {
	switch (resourceName) {
		case 'Magazine':
			return (
				<GiBlackBook className="text-white w-[60%] h-[60%]" />
			);

		case 'Report':
			return (
				<GrNotes className="text-white w-[60%] h-[60%]" />
			);

		case 'Event':
			return (
				<MdEventAvailable className="text-white w-[60%] h-[60%]" />
			);

		case 'Whitepaper':
			return (
				<LucideStickyNote className="text-white w-[60%] h-[60%]" />
			);

		default:
			return (
				<IoMdImages className="text-white w-[60%] h-[60%]" />
			);
	}
};
