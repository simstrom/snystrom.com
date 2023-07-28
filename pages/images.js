import Container from '@/components/Container';
import { motion } from 'framer-motion';
import { useState } from 'react';

import Lightbox from '@/components/Lightbox';
import Image from 'next/image';
import imageBike from '../public/images/profileBike.jpg';
import imageMilford from '../public/images/profileMilford.jpg';
import imageSki from '../public/images/profileSki.jpg';
import imageWinter from '../public/images/profileWinter.jpg';

const images = [
	{ url: imageWinter, alt: 'Test' },
	{ url: imageMilford, alt: 'Test2' },
	{ url: imageSki, alt: '' },
	{ url: imageBike, alt: '' },
];

export default function Images() {
	const [showLightbox, setShowLightbox] = useState(false);
	const [currImage, setCurrImage] = useState();

	const showImage = (curr) => {
		setCurrImage(curr);
		setShowLightbox(true);
	};

	return (
		<Container>
			<Lightbox
				images={images}
				currImage={currImage}
				setCurrImage={setCurrImage}
				showLightbox={showLightbox}
				hideLightbox={() => setShowLightbox(false)}
			/>
			<div className="w-full grid gap-4 grid-cols-2">
				{images.map((img, index) => (
					<motion.div
						key={index}
						onClick={() => showImage(images.indexOf(img))}
						className="hover:cursor-zoom-in"
					>
						<Image src={img.url} alt={img.alt} width={400} height={400} draggable={false} />
					</motion.div>
				))}
			</div>
		</Container>
	);
}
