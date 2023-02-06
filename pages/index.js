import Image from 'next/image';
import { client } from '../lib/contentful-server';

import Button from '@/components/Button';
import SmallProject from '@/components/SmallProject';
import Carousel from '../components/Carousel';
import Contact from '../components/Contact';
import Container from '../components/Container';
import FeaturedPost from '../components/FeaturedPost';
import { BulletIcon } from '../components/Icons';
import LinkArrow from '../components/LinkArrow';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import InView from '../lib/InView';
import hero from '../public/hero.jpg';

const skills = {
	technologies: ['JavaScript', 'Java', 'React', 'SQL', 'Node.js', 'MongoDB'],
	tools: ['Git', 'Figma'],
};

export default function Home({ featuredProjects }) {
	return (
		<Container>
			<InView>
				<section className="flex flex-col sm:grid grid-cols-5 gap-10 items-center sm:h-96">
					<div className="order-2 sm:order-1 flex flex-col gap-1 sm:col-span-3">
						<span className="text-2xl text-brand">👋🏼 Hi there, my name is</span>
						<h1 className="text-4xl max-[440px]:text-3xl leading-normal">Simon Nyström.</h1>
						<h2 className="text-xl max-[440px]:text-3xl text-secondary font-medium">
							I’m currently pursuing a Bachelor’s Degree in Systems Development while spending my
							spare time self-teaching web development.
						</h2>
					</div>
					<div className="order-1 sm:order-2 sm:col-span-2 w-60 sm:w-full">
						<Image
							src={hero}
							alt=""
							width={400}
							height={400}
							priority
							draggable="false"
							className="rounded-full sm:rounded-xl drop-shadow-lg image-fluid"
						/>
					</div>
				</section>
			</InView>

			<section>
				<InView>
					<SectionHeader btnText="Get to Know me More" href="/about">
						About Me
					</SectionHeader>

					<div className="flex flex-col gap-8 sm:grid md:gap-10 grid-cols-3">
						<div className="col-span-2">
							<p className="text-secondary text-base mb-2">
								I’m currently pursuing a Bachelor’s Degree in Systems Development while spending my
								spare time self-teaching web development. I have become somewhat obsessed in
								embracing new technologies and building things with code.
							</p>
							<p className="text-secondary text-base">
								Ever since my early days I’ve taken an interest in the world of digital creations.
								However, I didn’t grasp the opportunities and the potential of learning how to code
								until I met a Software Engineer while travelling in Indonesia. He told me about the
								profession and the things he had created. As someone who has an itch for solving
								problems and unleashing creativity, I was hooked.
							</p>
						</div>
						<LinkArrow text="Get to Know me More" href="/about" sm />
						<div>
							<h3 className="text-lg mb-4">Technologies</h3>

							<ul className="gap-4 grid grid-cols-2 sm:text-sm mb-4 text-base text-secondary">
								{skills.technologies.map((skill) => (
									<li key={skill} className="flex gap-2 items-center">
										<BulletIcon />
										{skill}
									</li>
								))}
							</ul>
							<h4 className="font-semibold text-lg tracking-tight mb-2">Tools</h4>
							<ul className="gap-4 grid grid-cols-2 sm:text-sm text-base text-secondary">
								{skills.tools.map((skill) => (
									<li key={skill} className="flex gap-2 items-center">
										<BulletIcon />
										{skill}
									</li>
								))}
							</ul>
						</div>
					</div>
				</InView>
			</section>

			<section>
				<InView threshold={0.1}>
					<SectionHeader btnText="Explore All Projects" href="/projects">
						Selected Projects
					</SectionHeader>
				</InView>

				<div className="flex flex-col gap-8 sm:grid grid-cols-2 mb-8">
					{featuredProjects.slice(0, 2).map((proj) => (
						<ProjectCard key={proj.fields.title} project={proj.fields.project.fields} />
					))}
				</div>

				<SmallProject project={featuredProjects[2].fields.project.fields} />
				<Button href="/projects">See more Projects</Button>
			</section>

			<section>
				<InView>
					<SectionHeader btnText="View All Articles" href="/blog">
						Latest Blog Posts
					</SectionHeader>
					<div className="flex flex-col gap-6 sm:grid grid-cols-3 mb-8">
						<FeaturedPost gradientFrom={'from-emerald-300'} gradientTo={'to-blue-300'} />
						<FeaturedPost gradientFrom={'from-pink-300'} gradientTo={'to-indigo-300'} />
						<FeaturedPost gradientFrom={'from-orange-300'} gradientTo={'to-rose-300'} />
						<LinkArrow text="View All Articles" href="/blog" sm />
					</div>
				</InView>
			</section>

			<section>
				<InView>
					<SectionHeader btnText="View Gallery" href="/gallery">
						Photography
					</SectionHeader>
					<div className="flex flex-col gap-8 ">
						<p className="text-secondary text-base mb-2">
							I’m currently pursuing a Bachelor’s Degree in Systems Development while spending my
							spare time self-teaching web development. I have become somewhat obsessed in embracing
							new technologies and building things with code.
						</p>

						<Carousel />
						<LinkArrow text="View Gallery" href="/gallery" sm />
					</div>
				</InView>
			</section>

			<section>
				<InView>
					<SectionHeader>Contact</SectionHeader>
					<Contact />
				</InView>
			</section>
		</Container>
	);
}

export async function getStaticProps() {
	const projects = await client.getEntries({
		content_type: 'featuredProject',
	});

	return {
		props: {
			featuredProjects: projects.items,
		},
	};
}
