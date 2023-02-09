import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import gatta from '../public/images/gallery/gatta.jpg';
import manarola from '../public/images/gallery/manarola.jpg';
import preike from '../public/images/gallery/preikestolen.jpg';
import treCime from '../public/images/gallery/trecime.jpg';

const images = [treCime, manarola, gatta, preike, treCime, manarola, gatta, preike];

export default function Carousel() {
	const [width, setWidth] = useState(0);
	const carousel = useRef();

	useEffect(() => {
		setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
	}, []);

	return (
		<motion.div ref={carousel} className="overflow-hidden">
			<motion.div
				animate={{ x: -width + 280 }}
				transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
				className="flex gap-4"
			>
				{images.map((img, index) => {
					return (
						<motion.div key={index} className="item rounded-lg">
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
