import SmallProject from '@/components/SmallProject';
import Image from 'next/image';
import Link from 'next/link';

import Contact from '../components/Contact';
import Container from '../components/Container';
import FeaturedPost from '../components/FeaturedPost';
import FeaturedProject from '../components/FeaturedProject';
import { ListIcon } from '../components/Icons';
import LinkArrow from '../components/LinkArrow';
import SectionHeader from '../components/SectionHeader';
import forest from '../public/forest.jpg';
import gatta from '../public/gattaPost.jpg';
import heroImg from '../public/hero.jpg';
import hopetoun from '../public/hopetoun.jpg';
import moreton from '../public/moreton.jpg';

export default function Home() {
	return (
		<Container>
			<section className="flex flex-col sm:grid grid-cols-5 gap-10 items-center sm:h-96">
				<div className="order-2 sm:order-1 flex flex-col gap-1 sm:col-span-3">
					<span className="font-medium text-emerald-500">Hi there, my name is</span>
					<h1 className="text-5xl font-bold tracking-tight max-[440px]:text-4xl">Simon Nyström.</h1>
					<h2 className="mb-4 text-2xl max-[440px]:text-xl font-medium tracking-tight text-gray-400 dark:text-gray-600">
						Passion for code, eager to develop.
					</h2>
					<p className="leading-relaxed text-gray-600 dark:text-gray-400">
						I’m currently pursuing a Bachelor’s Degree in Systems Development while spending my
						spare time self-teaching web development.{' '}
					</p>
				</div>
				<div className="order-1 sm:order-2 sm:col-span-2 w-60 sm:w-full">
					<Image
						src={heroImg}
						alt=""
						width={400}
						height={400}
						priority
						draggable="false"
						className="rounded-full sm:rounded-xl image-ring sm:ring-0 image-fluid"
					/>
				</div>
			</section>

			<section>
				<SectionHeader num="01" btnText="Get to Know me More" href="/about">
					About Me
				</SectionHeader>

				<div className="w-full flex flex-col gap-8 sm:grid md:gap-10 grid-cols-3">
					<div className="col-span-2">
						<h3 className="font-semibold text-lg sm:text-xl tracking-tight mb-4">
							A Short Backstory
						</h3>
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
					<LinkArrow text="Get to Know me More" href="/about" sm />
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
				<div className="w-full flex flex-col gap-8 sm:grid grid-cols-2 mb-12">
					<FeaturedProject />
					<FeaturedProject />
				</div>

				<div className="flex justify-center items-center mb-8">
					<h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
						More Things I Have Built
					</h3>
				</div>
				<div className="w-full flex flex-col gap-8 sm:grid grid-cols-2 mb-8">
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
				<div className="w-full flex flex-col gap-6 sm:grid grid-cols-3 mb-8">
					<FeaturedPost gradientFrom={'from-emerald-300'} gradientTo={'to-blue-300'} />
					<FeaturedPost gradientFrom={'from-pink-300'} gradientTo={'to-indigo-300'} />
					<FeaturedPost gradientFrom={'from-orange-300'} gradientTo={'to-rose-300'} />
					<LinkArrow text="View All Articles" href="/blog" sm />
				</div>
			</section>

			<section>
				<SectionHeader num="04" btnText="View Gallery" href="/gallery">
					Photography
				</SectionHeader>
				<div className="w-full flex flex-col gap-8 sm:grid md:gap-10 grid-cols-2 sm:h-96">
					<div className="flex flex-col justify-center">
						<h3 className="font-semibold text-lg sm:text-xl tracking-tight mb-4">
							A Short Backstory
						</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
							I’m currently pursuing a Bachelor’s Degree in Systems Development while spending my
							spare time self-teaching web development. I have become somewhat obsessed in embracing
							new technologies and building things with code.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-2 relative">
						<Image
							src={moreton}
							alt=""
							width={300}
							height={375}
							draggable="false"
							className="rounded-lg sm:absolute min-[639px]:w-44 min-[639px]:h-auto"
						/>
						<Image
							src={hopetoun}
							alt=""
							width={300}
							height={375}
							draggable="false"
							className=" rounded-lg sm:absolute sm:z-10 bottom-32 right-0 min-[639px]:w-44 min-[639px]:h-auto"
						/>
						<Image
							src={gatta}
							alt=""
							width={300}
							height={375}
							draggable="false"
							className="rounded-lg sm:absolute bottom-0 right-24 max-[450px]:block max-[639px]:hidden min-[639px]:w-44 min-[639px]:h-auto"
						/>
						<Image
							src={forest}
							alt=""
							width={300}
							height={375}
							draggable="false"
							className="sm:hidden rounded-lg max-[450px]:block max-[639px]:hidden"
						/>
					</div>
					<LinkArrow text="View Gallery" href="/gallery" sm />
				</div>
			</section>

			<section>
				<SectionHeader num="05">Contact</SectionHeader>
				<Contact />
			</section>
		</Container>
	);
}
