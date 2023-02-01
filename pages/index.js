import SmallProject from '@/components/SmallProject';
import Image from 'next/image';
import Link from 'next/link';

import Contact from '../components/Contact';
import Container from '../components/Container';
import FeaturedPost from '../components/FeaturedPost';
import FeaturedProject from '../components/FeaturedProject';
import { ListIcon } from '../components/Icons';
import SectionHeader from '../components/SectionHeader';
import heroImg from '../public/hero.jpg';

export default function Home() {
	return (
		<Container>
			<section className="grid grid-cols-5 gap-10 items-center h-96">
				<div className="col-span-3 flex flex-col gap-1">
					<span className="font-medium text-emerald-500">Hi there, my name is</span>
					<h1 className="text-5xl font-bold tracking-tight">Simon Nyström.</h1>
					<h2 className="mb-4 text-2xl font-medium tracking-tight text-gray-400 dark:text-gray-600">
						Passion for code, eager to develop.
					</h2>
					<p className="leading-relaxed text-gray-600 dark:text-gray-400">
						I’m currently pursuing a Bachelor’s Degree in Systems Development while spending my
						spare time self-teaching web development.{' '}
					</p>
				</div>
				<div className="col-span-2">
					<Image
						src={heroImg}
						alt=""
						width={300}
						height={300}
						draggable="false"
						className="rounded-xl"
					/>
				</div>
			</section>

			<section>
				<SectionHeader num="01" btnText="Get to know more" href="/about">
					About Me
				</SectionHeader>

				<div className="w-full flex flex-col gap-8 sm:grid md:gap-10 grid-cols-3">
					<div className="col-span-2">
						<h3 className="font-semibold text-xl tracking-tight mb-4">A Short Backstory</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
							I’m currently pursuing a Bachelor’s Degree in Systems Development while spending my
							spare time self-teaching web development. I have become somewhat obsessed in embracing
							new technologies and building things with code.
						</p>
						<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
							Ever since my early days I’ve taken an interest in the world of digital creations.
							However, I didn’t grasp the opportunities and the potential of learning how to code
							until I met a Software Engineer while travelling in Indonesia. He told me about the
							profession and the things he had created. As someone who has an itch for solving
							problems and unleashing creativity, I was hooked.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-lg tracking-tight mb-4">Technologies</h3>

						<ul className="w-full gap-4 grid grid-cols-2 sm:text-sm mb-4 text-gray-600 dark:text-gray-400">
							<li className="flex gap-2 items-center">
								<ListIcon />
								JavaScript
							</li>
							<li className="flex gap-2 items-center">
								<ListIcon />
								Java
							</li>
							<li className="flex gap-2 items-center">
								<ListIcon />
								React
							</li>
							<li className="flex gap-2 items-center">
								<ListIcon />
								SQL
							</li>
							<li className="flex gap-2 items-center">
								<ListIcon />
								Node.js
							</li>
							<li className="flex gap-2 items-center">
								<ListIcon />
								MongoDB
							</li>
						</ul>
						<h4 className="font-semibold text-lg tracking-tight mb-2">Tools</h4>
						<ul className="w-full gap-4 grid grid-cols-2 sm:text-sm text-gray-600 dark:text-gray-400">
							<li className="flex gap-2 items-center">
								<ListIcon />
								Git
							</li>
							<li className="flex gap-2 items-center">
								<ListIcon />
								Figma
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section>
				<SectionHeader num="02" btnText="Explore All Projects" href="/projects">
					Selected Projects
				</SectionHeader>
				<div className="w-full flex flex-col gap-4 sm:grid md:gap-8 grid-cols-2 mb-12">
					<FeaturedProject />
					<FeaturedProject />
				</div>

				<div className="flex justify-center items-center mb-4">
					<h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
						More Things I Have Built
					</h3>
				</div>
				<div className="w-full flex flex-col gap-4 sm:grid md:gap-8 grid-cols-2 mb-8">
					<SmallProject />
					<SmallProject />
				</div>
				<div className="flex justify-center items-center">
					<Link
						href="/projects"
						className="font-medium text-sm tracking-tight py-3 px-6 rounded-lg bg-gray-200/40 dark:bg-gray-800/40 hover:ring-2 ring-emerald-500 transition duration-300"
					>
						See More Projects
					</Link>
				</div>
			</section>

			<section>
				<SectionHeader num="03" btnText="View All Articles" href="/blog">
					Latest Blog Posts
				</SectionHeader>
				<div className="w-full flex flex-col gap-4 sm:grid md:gap-6 grid-cols-3">
					<FeaturedPost gradientFrom={'from-emerald-300'} gradientTo={'to-blue-300'} />
					<FeaturedPost gradientFrom={'from-pink-300'} gradientTo={'to-indigo-300'} />
					<FeaturedPost gradientFrom={'from-orange-300'} gradientTo={'to-rose-300'} />
				</div>
			</section>

			<section>
				<SectionHeader num="05">Contact</SectionHeader>
				<Contact />
			</section>
		</Container>
	);
}
