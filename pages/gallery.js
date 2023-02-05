import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Container from '../components/Container';
import DestinationCard from '../components/DestinationCard';
import { LeftArrowIcon } from '../components/Icons';
import InView from '../lib/InView';

const destinations = [
	{
		title: 'Australia',
	},
	{
		title: 'New Zealand',
	},
	{
		title: 'Norway',
	},
];

export default function Gallery() {
	const [activeDestination, setActiveDestination] = useState(false);
	const destinationsRef = useRef(destinations);

	const enterDestination = (destination) => {
		setActiveDestination(true);
		destinationsRef.current = [destination];
	};

	const exitDestination = () => {
		setActiveDestination(false);
		destinationsRef.current = destinations;
	};

	return (
		<Container>
			<InView>
				<div className="mb-8">
					<h1 className="text-4xl">Gallery</h1>
					<p className="text-base text-secondary">
						This is where I share my writings on programming, tutorials, and my experiences.
					</p>
				</div>

				<div className="mb-4 h-10 flex items-center">
					<AnimatePresence>
						{activeDestination ? (
							<motion.button
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
								className={cn(
									'flex gap-2 text-sm text-tertiary font-medium group hover:text-brand duration-300'
								)}
								onClick={exitDestination}
							>
								<div className="group-hover:-translate-x-1 transition-transform">
									<LeftArrowIcon />
								</div>
								Back to All Destinations
							</motion.button>
						) : (
							<motion.h3
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
								className="text-xl font-medium"
							>
								All Destinations
							</motion.h3>
						)}
					</AnimatePresence>
				</div>

				<div className="flex flex-col gap-4">
					<AnimatePresence>
						{destinationsRef.current.map((destination) => (
							<motion.div
								layout
								key={destination.title}
								initial={{ opacity: 0, x: -20 }}
								exit={{ opacity: 0, x: -20 }}
								animate={{
									opacity: 1,
									x: 0,
								}}
								transition={{ duration: 0.3 }}
							>
								<DestinationCard
									destination={destination}
									enterDestination={enterDestination}
									active={activeDestination}
								/>
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</InView>
		</Container>
	);
}
