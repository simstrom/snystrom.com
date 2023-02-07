import cn from 'clsx';
import Image from 'next/image';

import Contact from '../components/Contact';
import Container from '../components/Container';
import InView from '../lib/InView';
import imageBike from '../public/images/profileBike.jpg';
import imageMilford from '../public/images/profileMilford.jpg';
import imageSki from '../public/images/profileSki.jpg';
import imageWinter from '../public/images/profileWinter.jpg';

const images = [imageWinter, imageMilford, imageSki, imageBike];

export default function About() {
	return (
		<Container>
			<div className="flex flex-col gap-6 sm:gap-8">
				<div className="mb-6 w-full grid gap-4 grid-cols-2 sm:grid-cols-4">
					{images.map((img, index) => (
						<div
							key={index}
							className={cn(
								'relative h-52',
								index >= 2 && 'hidden sm:block',
								`animate-in animation-delay-${index}`
							)}
						>
							<Image
								src={img.src}
								alt={img.alt}
								fill
								sizes="(max-width: 640px) 50vw,
							25vw"
								draggable={false}
								className="object-cover overflow-hidden rounded-lg"
							/>
						</div>
					))}
				</div>

				<article className="mb-8 sm:mb-12 animate-in animation-delay-3">
					<h1 className="text-lg sm:text-xl mb-2">About me</h1>
					<div className="flex flex-col gap-4 text-base text-secondary">
						<p>
							Hi there! I’m Simon, a designer/frontend developer hybrid that loves to build great
							products with delightful interfaces. Currently working at Bitrefill, making living on
							crypto possible. Before that I worked at music startup Tracklib, the record store for
							sampling.
						</p>
						<p>
							I love working in the realm between design and code. Some things that makes me excited
							are CSS, Design Systems, Animation, crafting excellent component apis and making
							interfaces feel fun and human.
						</p>
						<p>
							I grew up in Nacka just outside of Stockholm, Sweden and come from a background of
							studying Photography.
						</p>
						<p>Outside of work I’m obsessed with endurance sports and travelling with my family.</p>
					</div>
				</article>
				<section>
					<InView>
						<Contact />
					</InView>
				</section>
			</div>
		</Container>
	);
}
