import cn from 'clsx';
import Image from 'next/image';

import Contact from '../components/Contact';
import Container from '../components/Container';
import InView from '../lib/InView';
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
								src={img.url}
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
							Hi there! I&apos;m Simon, a Software Development student at Linköping University with
							a passion for combining code and design to build engaging user interfaces. I&apos;ve
							found programming to be the perfect outlet for my combination of logical thinking,
							problem solving, and artistic creativity.{' '}
						</p>
						<p>
							In addition to my studies, I am always exploring new projects and expanding my
							knowledge through courses, reading documentation, and experimentation. I am driven by
							a love of technology and the boundless possibilities of the web.
						</p>
						<p>
							When I&apos;m not coding however, you can find me chasing adventure through
							photography, travel, and skiing while blasting indie rock on full volume. Invite me on
							a roadtrip and we&apos;ll forever be friends.
						</p>
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
