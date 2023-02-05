import SmallProject from '@/components/SmallProject';
import Image from 'next/image';
import Link from 'next/link';

import Carousel from '../components/Carousel';
import Contact from '../components/Contact';
import Container from '../components/Container';
import FeaturedPost from '../components/FeaturedPost';
import { BulletIcon, RightArrowIcon } from '../components/Icons';
import LinkArrow from '../components/LinkArrow';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import InView from '../lib/InView';
import hero from '../public/hero.jpg';

const projects = [
	{
		title: 'Loop Agile',
		href: '',
		skills: ['JavaScript', 'React', 'PostgreSQL', 'Firebase', 'Chakra UI'],
		desc: 'Web-based communications platform acting as a forum for signed in users. Built for the purpose to learn full-stack React development and its design patterns. Node, Express and Sequelize ORM was used as middle layer to build the server and APIs.',
	},
	{
		title: 'CampSpotter',
		href: '',
		skills: ['JavaScript', 'MongoDB', 'Bootstrap'],
		desc: 'Web-based communications platform acting as a forum for signed in users. Built for the purpose to learn full-stack React development and its design patterns. Node, Express and Sequelize ORM was used as middle layer to build the server and APIs.',
	},
	{
		title: 'Arcturus',
		href: '',
		skills: ['Java', 'JavaFX', 'CSS'],
		desc: 'Arcade styled 2D space shooter game with unlimited levels and infinitely increasing difficulty. Has different enemy types and various power ups. Handles game saves locally to file. Built to solidify knowledge about object-oriented programming and learn to implement GUI for Java Apps.',
	},
];

export default function Home() {
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
					<SectionHeader num="01" btnText="Get to Know me More" href="/about">
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
								<li className="flex gap-2 items-center">
									<BulletIcon />
									JavaScript
								</li>
								<li className="flex gap-2 items-center">
									<BulletIcon />
									Java
								</li>
								<li className="flex gap-2 items-center">
									<BulletIcon />
									React
								</li>
								<li className="flex gap-2 items-center">
									<BulletIcon />
									SQL
								</li>
								<li className="flex gap-2 items-center">
									<BulletIcon />
									Node.js
								</li>
								<li className="flex gap-2 items-center">
									<BulletIcon />
									MongoDB
								</li>
							</ul>
							<h4 className="font-semibold text-lg tracking-tight mb-2">Tools</h4>
							<ul className="gap-4 grid grid-cols-2 sm:text-sm text-base text-secondary">
								<li className="flex gap-2 items-center">
									<BulletIcon />
									Git
								</li>
								<li className="flex gap-2 items-center">
									<BulletIcon />
									Figma
								</li>
							</ul>
						</div>
					</div>
				</InView>
			</section>

			<section>
				<InView threshold={0.1}>
					<SectionHeader num="02" btnText="Explore All Projects" href="/projects">
						Selected Projects
					</SectionHeader>
				</InView>

				<div className="flex flex-col gap-8 sm:grid grid-cols-2 mb-8">
					<ProjectCard project={projects[0]} />
					<ProjectCard project={projects[1]} />
				</div>

				<SmallProject project={projects[2]} />

				<InView>
					<div className="flex justify-center items-center">
						<Link
							href="/projects"
							className="flex items-center gap-1 group rounded-lg px-6 py-3 mt-8 text-sm text-brand bg-brand/5 hover:bg-brand/10 duration-300"
						>
							<div className="font-medium">See more Projects</div>
							<div className="ml-auto group-hover:translate-x-2 duration-300">
								<RightArrowIcon />
							</div>
						</Link>
					</div>
				</InView>
			</section>

			<section>
				<InView>
					<SectionHeader num="03" btnText="View All Articles" href="/blog">
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
					<SectionHeader num="04" btnText="View Gallery" href="/gallery">
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
					<SectionHeader num="05">Contact</SectionHeader>
					<Contact />
				</InView>
			</section>
		</Container>
	);
}