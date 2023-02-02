import Image from 'next/image';
import Contact from '../components/Contact';
import Container from '../components/Container';
import forest from '../public/forest.jpg';
import gatta from '../public/gattaPost.jpg';
import hopetoun from '../public/hopetoun.jpg';
import moreton from '../public/moreton.jpg';

export default function about() {
	return (
		<Container>
			<div className="flex flex-col gap-6 sm:gap-8 max-w-2xl mx-auto">
				<section className="mb-6">
					<h1 className="font-semibold text-3xl sm:text-4xl tracking-tight mb-6 sm:mb-8">
						About Me
					</h1>
					<div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-4">
						<div className="relative h-52">
							<Image
								src={moreton}
								alt=""
								fill
								sizes="(max-width: 640px) 50vw,
								25vw"
								className="object-cover overflow-hidden rounded-lg"
							/>
						</div>
						<div className="relative h-52">
							<Image
								src={hopetoun}
								alt=""
								fill
								sizes="(max-width: 640px) 50vw,
								25vw"
								className="object-cover overflow-hidden rounded-lg"
							/>
						</div>
						<div className="relative h-52 hidden sm:block">
							<Image
								src={gatta}
								alt=""
								fill
								sizes="(max-width: 640px) 50vw,
								25vw"
								className="object-cover overflow-hidden rounded-lg"
							/>
						</div>
						<div className="relative h-52 hidden sm:block">
							<Image
								src={forest}
								alt=""
								fill
								sizes="(max-width: 640px) 50vw,
								25vw"
								className="object-cover overflow-hidden rounded-lg"
							/>
						</div>
					</div>
				</section>
				<article className="mb-8 sm:mb-12">
					<h2 className="text-xl font-semibold tracking-tight mb-2">A Longer Story</h2>
					<div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
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
					<Contact />
				</section>
			</div>
		</Container>
	);
}
