import cn from 'clsx';
import Image from 'next/image';
import forest from '../public/forest.jpg';
import { RightArrowIcon } from './Icons';

export default function DestinationCard({ destination, enterDestination, active }) {
	return (
		<div
			className={cn(
				'py-8 px-8 flex items-center justify-between drop-shadow relative h-30 text-[#e7edfe] group',
				!active && 'cursor-pointer'
			)}
			onClick={() => enterDestination(destination)}
		>
			<div
				className={cn(
					'-z-10 absolute top-0 left-0 bg-black/30 w-full h-full rounded-lg',
					!active && 'group-hover:bg-black/10 duration-300'
				)}
			/>
			<Image
				src={forest}
				alt=""
				fill
				className="-z-20 absolute top-0 left-0 object-cover rounded-lg "
			/>
			<h2 className="text-lg">{destination.title}</h2>
			{!active && (
				<div className="group-hover:translate-x-1 transition-transform">
					<RightArrowIcon />
				</div>
			)}
		</div>
	);
}
