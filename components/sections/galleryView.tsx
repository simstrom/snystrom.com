'use client';

import { IconArrowRight } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const images = [
	'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
	'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80',
	'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
	'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
	'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80',
	'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
	'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
];
const destinations = [
	'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
	'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
	'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80',
	'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
	'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80',
	'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
	'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
	'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80',
];
const collections = [
	'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
	'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
	'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2640&q=80',
	'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
	'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80',
	'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
	'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
	'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80',
	'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
	'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80',
];

export default function GalleryView() {
	const [view, setView] = useState<1 | 2 | 3>(1);
	const [isFirstLoad, setIsFirstLoad] = useState(true);

	useEffect(() => {
		if (isFirstLoad) {
			setTimeout(() => {
				setIsFirstLoad(false);
			}, 200);
		}
	}, [isFirstLoad]);

	return (
		<>
			<div className="flex pt-8 sm:pt-12 pb-12 font-mono uppercase text-xs tracking-wide text-foreground-secondary">
				<span className="border-r-2 pr-4 select-non opacity-60">View As</span>
				<button
					onClick={() => setView(1)}
					aria-label="Change to all images view"
					className={cn(
						'pl-4 uppercase tracking-wide hover:text-foreground transition',
						view == 1 && 'text-brand'
					)}
				>
					Images
				</button>
				<button
					onClick={() => setView(2)}
					aria-label="Change to destinations view"
					className={cn(
						'pl-4 uppercase tracking-wide hover:text-foreground transition',
						view == 2 && 'text-brand'
					)}
				>
					Destinations
				</button>
				<button
					onClick={() => setView(3)}
					aria-label="Change to collections view"
					className={cn(
						'pl-4 uppercase tracking-wide hover:text-foreground transition',
						view == 3 && 'text-brand'
					)}
				>
					Collections
				</button>
			</div>

			<AnimatePresence mode="wait">
				{view == 1 ? (
					<motion.div
						className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 h-fit"
						key="all"
						initial={{ opacity: 0, y: 50 }}
						exit={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: isFirstLoad ? 0.2 : 0,
							duration: 0.5,
							ease: 'easeInOut',
						}}
					>
						<div className="flex flex-col gap-4">
							{images.slice(0, Math.ceil(images.length / 3)).map((image, idx) => (
								<div>
									<img
										src={image}
										alt=""
										className="border border-black max-h-[450px] sm:max-h-[506px] w-full object-cover object-center"
									/>
								</div>
							))}
						</div>
						<div className="flex flex-col gap-4">
							{images
								.slice(Math.ceil(images.length / 3), Math.ceil((images.length * 2) / 3))
								.map((image, idx) => (
									<div>
										<img
											src={image}
											alt=""
											className="border border-black max-h-[450px] sm:max-h-[506px] w-full object-cover object-center"
										/>
									</div>
								))}
						</div>
						<div className="flex flex-col gap-4">
							{images.slice(Math.ceil((images.length * 2) / 3)).map((image, idx) => (
								<div>
									<img
										src={image}
										alt=""
										className="border border-black max-h-[450px] sm:max-h-[506px] w-full object-cover object-center"
									/>
								</div>
							))}
						</div>
					</motion.div>
				) : view == 2 ? (
					<motion.div
						className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 h-fit"
						key="destination"
						initial={{ opacity: 0, y: 50 }}
						exit={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: isFirstLoad ? 0.2 : 0,
							duration: 0.5,
							ease: 'easeInOut',
						}}
					>
						<div className="flex flex-col gap-4">
							{destinations.slice(0, Math.ceil(destinations.length / 3)).map((image, idx) => (
								<div className="relative">
									<img
										src={image}
										alt=""
										className="border border-black max-h-[450px] sm:max-h-[506px] w-full object-cover object-center"
									/>
									<div className="bg-black flex items-center justify-between absolute w-full bottom-0 py-0.5 px-4 text-foreground-inverse">
										<h3 className="font-mono text-xs tracking-tight">Destination {idx}</h3>
										<IconArrowRight width={12} />
									</div>
								</div>
							))}
						</div>
						<div className="flex flex-col gap-4">
							{destinations
								.slice(Math.ceil(destinations.length / 3), Math.ceil((destinations.length * 2) / 3))
								.map((image, idx) => (
									<div className="relative">
										<img
											src={image}
											alt=""
											className="border border-black max-h-[450px] sm:max-h-[506px] w-full object-cover object-center"
										/>
										<div className="bg-black flex items-center justify-between absolute w-full bottom-0 py-0.5 px-4 text-foreground-inverse">
											<h3 className="font-mono text-xs tracking-tight">Destination {idx}</h3>
											<IconArrowRight width={12} />
										</div>
									</div>
								))}
						</div>
						<div className="flex flex-col gap-4">
							{destinations.slice(Math.ceil((destinations.length * 2) / 3)).map((image, idx) => (
								<div className="relative">
									<img
										src={image}
										alt=""
										className="border border-black max-h-[450px] sm:max-h-[506px] w-full object-cover object-center"
									/>
									<div className="bg-black flex items-center justify-between absolute w-full bottom-0 py-0.5 px-4 text-foreground-inverse">
										<h3 className="font-mono text-xs tracking-tight">Destination {idx}</h3>
										<IconArrowRight width={12} />
									</div>
								</div>
							))}
						</div>
					</motion.div>
				) : (
					<motion.div
						className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 h-fit"'
						key="collections"
						initial={{ opacity: 0, y: 50 }}
						exit={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: isFirstLoad ? 0.2 : 0,
							duration: 0.5,
							ease: 'easeInOut',
						}}
					>
						<div className="flex flex-col gap-4">
							{collections.slice(0, Math.ceil(collections.length / 3)).map((image, idx) => (
								<div className="relative">
									<img
										src={image}
										alt=""
										className="border border-black max-h-[450px] sm:max-h-[506px] w-full object-cover object-center"
									/>
									<div className="bg-black flex items-center justify-between absolute w-full bottom-0 py-0.5 px-4 text-foreground-inverse">
										<h3 className="font-mono text-xs tracking-tight">Collection {idx}</h3>
										<IconArrowRight width={12} />
									</div>
								</div>
							))}
						</div>
						<div className="flex flex-col gap-4">
							{collections
								.slice(Math.ceil(collections.length / 3), Math.ceil((collections.length * 2) / 3))
								.map((image, idx) => (
									<div className="relative">
										<img
											src={image}
											alt=""
											className="border border-black max-h-[450px] sm:max-h-[506px] w-full object-cover object-center"
										/>
										<div className="bg-black flex items-center justify-between absolute w-full bottom-0 py-0.5 px-4 text-foreground-inverse">
											<h3 className="font-mono text-xs tracking-tight">Collection {idx}</h3>
											<IconArrowRight width={12} />
										</div>
									</div>
								))}
						</div>
						<div className="flex flex-col gap-4">
							{collections.slice(Math.ceil((collections.length * 2) / 3)).map((image, idx) => (
								<div className="relative">
									<img
										src={image}
										alt=""
										className="border border-black max-h-[450px] sm:max-h-[506px] w-full object-cover object-center"
									/>
									<div className="bg-black flex items-center justify-between absolute w-full bottom-0 py-0.5 px-4 text-foreground-inverse">
										<h3 className="font-mono text-xs tracking-tight">Collection {idx}</h3>
										<IconArrowRight width={12} />
									</div>
								</div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
