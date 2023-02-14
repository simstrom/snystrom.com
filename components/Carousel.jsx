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
	const carouselRef = useRef();

	useEffect(() => {
		setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
	}, []);

	return (
		<motion.div ref={carouselRef} className="overflow-hidden cursor-grab">
			<motion.div
				className="flex w-full gap-4"
				animate={{ x: -width }}
				transition={{ ease: 'linear', duration: 30, repeat: Infinity, repeatType: 'reverse' }}
				drag="x"
				dragConstraints={{ right: 0, left: -width }}
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
