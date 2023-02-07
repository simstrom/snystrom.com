import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Container from '../components/Container';
import DestinationCard from '../components/DestinationCard';
import { InstagramIcon, LeftArrowIcon, RightArrowIcon } from '../components/Icons';

import forest from '../public/forest.jpg';
import gatta from '../public/gattaPost.jpg';
import hopetoun from '../public/hopetoun.jpg';
import moreton from '../public/moreton.jpg';

const destinations = [
	{
		title: 'Australia',
		images: [forest, gatta, hopetoun, moreton],
	},
	{
		title: 'New Zealand',
		images: [gatta, hopetoun, moreton, forest],
	},
	{
		title: 'Norway',
		images: [hopetoun, moreton, forest, gatta],
	},
	{
		title: 'Scotland',
		images: [hopetoun, moreton, forest, gatta],
	},
	{
		title: 'Indonesia',
		images: [hopetoun, moreton, forest, gatta],
	},
	{
		title: 'Italy',
		images: [hopetoun, moreton, forest, gatta],
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			delayChildren: 0.5,
			staggerChildren: 0.2,
		},
	},
};
const itemVariants = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
};

export default function Gallery() {
	const [activeDestination, setActiveDestination] = useState(false);
	const [redirected, setRedirected] = useState(false);
	const [nextDestination, setNextDestination] = useState();
	const [previousDestination, setPreviousDestination] = useState();
	const destinationRef = useRef(destinations);

	const enterDestination = (destination) => {
		setActiveDestination(true);
		setRedirected(false);
		destinationRef.current = [destination];

		const activeIndex = destinations.findIndex((obj) => obj.title.match(destination.title));
		const nextIndex = (activeIndex + 1) % destinations.length;
		let previousIndex;
		activeIndex === 0
			? (previousIndex = destinations.length - 1)
			: (previousIndex = (activeIndex - 1) % destinations.length);

		setNextDestination(destinations[nextIndex]);
		setPreviousDestination(destinations[previousIndex]);
	};

	const exitDestination = () => {
		setActiveDestination(false);
		destinationRef.current = destinations;
	};

	const handleRedirect = (destination) => {
		window.scrollTo(0, 0);
		exitDestination();
		setRedirected(true);
		setTimeout(() => {
			enterDestination(destination);
		});
	};

	return (
		<Container>
			<div>
				<div className="mb-8">
					<div className="flex items-baseline">
						<h1 className="text-4xl animate-in">Gallery</h1>
						<a
							href="https://www.instagram.com/simonnystrom"
							target="_blank"
							rel="noopener noreferrer"
							className="ml-auto text-sm text-tertiary flex items-center gap-2 group hover:text-brand duration-300 animate-in"
						>
							<span className="max-[450px]:hidden">Find me on Instagram</span>
							<div className="group-hover:scale-110 transition-transform">
								<InstagramIcon />
							</div>
						</a>
					</div>
					<div className="sm:grid grid-cols-3 animate-in animation-delay-1">
						<p className="text-base text-secondary col-span-2">
							This is where I share my writings on programming, tutorials, and my experiences.
						</p>
					</div>
				</div>

				<div className="mb-4 h-10 flex items-center animate-in animation-delay-2">
					<AnimatePresence>
						{activeDestination ? (
							<motion.button
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
								className="flex gap-2 text-sm font-medium group hover:text-brand duration-300"
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

				<div className="flex flex-col gap-2 animate-in animation-delay-3">
					{!redirected && (
						<AnimatePresence>
							{destinationRef.current.map((destination) => (
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
					)}
					{activeDestination && (
						<>
							<AnimatePresence>
								<motion.div
									initial="hidden"
									animate="show"
									exit="hidden"
									variants={containerVariants}
									className="grid max-[450px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 gap-2 mb-4"
								>
									{destinationRef.current[0].images.map((image, index) => (
										<motion.div key={index} variants={itemVariants}>
											<Image src={image} alt="" draggable={false} className="rounded" />
										</motion.div>
									))}
								</motion.div>
							</AnimatePresence>
							<div className="flex items-center justify-between">
								<button
									className="group text-left"
									onClick={() => handleRedirect(previousDestination)}
								>
									<span className="block text-sm uppercase tracking-widest text-secondary">
										Prev
									</span>
									<div className="flex items-center gap-2 font-medium text-tertiary group-hover:text-brand duration-300">
										<div className="group-hover:-translate-x-1 transition-transform">
											<LeftArrowIcon />
										</div>
										{previousDestination.title}
									</div>
								</button>
								<button
									className="group text-right"
									onClick={() => handleRedirect(nextDestination)}
								>
									<span className="block text-sm uppercase tracking-widest text-secondary">
										Next
									</span>
									<div className="flex items-center gap-2 font-medium text-tertiary group-hover:text-brand duration-300 ">
										{nextDestination.title}
										<div className="group-hover:translate-x-1 transition-transform">
											<RightArrowIcon />
										</div>
									</div>
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</Container>
	);
}
