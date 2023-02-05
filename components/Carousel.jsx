import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import forest from '../public/forest.jpg';
import gatta from '../public/gattaPost.jpg';
import hopetoun from '../public/hopetoun.jpg';
import moreton from '../public/moreton.jpg';

const images = [forest, gatta, hopetoun, moreton, forest, gatta, hopetoun, moreton];

export default function Carousel() {
	const [width, setWidth] = useState(0);
	const carousel = useRef();

	useEffect(() => {
		setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
	}, []);

	return (
		<motion.div ref={carousel} className="overflow-hidden">
			<motion.div
				animate={{ x: -width + 275 }}
				transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
				className="flex gap-4"
			>
				{images.map((img) => {
					return (
						<motion.div key={img} className="item rounded-lg">
							<Image
								src={img}
								alt=""
								width={300}
								height={375}
								draggable="false"
								className="rounded-lg"
							/>
						</motion.div>
					);
				})}
			</motion.div>
		</motion.div>
	);
}
