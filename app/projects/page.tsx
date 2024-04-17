'use client';

import Button from '@/components/ui/button';
import Cursor from '@/components/ui/cursor';
import HorizontalScroller from '@/components/ui/horizontalScroller';
import PageHeader from '@/components/ui/pageHeader';
import { IconArrowUpRight, IconCompass, IconGithub } from '@/lib/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

// export const metadata: Metadata = {
// 	title: 'Simon Nyström - Projects',
// };

const items = ['React', 'Node', 'Express', 'Postgres', 'Chakra', 'Sequelize', 'JavaScript'];

export default function Projects() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<main className="min-h-[6000px] flex flex-col items-center mt-32 gap-8 sm:mt-40 sm:gap-20">
			<PageHeader
				title="All Projects"
				content="I love building projects and practice my engineering skills, There's an archive of things that I've worked on."
			/>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-fit">
				{/* LARGE */}
				<div className="col-span-12 lg:col-span-9 relative rounded-2xl w-full flex flex-col justify-between lg:min-h-[360px] border bg-background/10 shadow-shadow backdrop-blur-md">
					<div className="grid grid-cols-6 gap-2">
						<div className="relative col-span-2 lg:col-span-3 py-4 flex items-center">
							<div className="relative rounded-r-xl h-full">
								<Cursor containerClass="rounded-r-xl">
									<IconArrowUpRight />
								</Cursor>
								<Image
									src="/images/webpic.png"
									alt=""
									width={600}
									height={450}
									draggable={false}
									className="select-none h-full w-full object-cover rounded-r-xl shadow-xl object-right-bottom lg:object-right"
								/>
								<div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-black/10 rounded-r-xl"></div>
							</div>
						</div>
						<div className="col-span-4 lg:col-span-3 py-5 px-3 sm:px-5 flex flex-col h-full gap-y-2 pt-20 lg:pt-16 justify-center">
							<h3 className="text-xl xl:text-2xl uppercase text-balance">Loop Agile Now</h3>
							<p className="text-pretty text-foreground/80">
								Arcade styled 2D space shooter game with unlimited levels and infinitely increasing
								difficulty. Has different enemy types and various power ups. Handles game saves
								locally to file. Built to solidify knowledge about object-oriented programming and
								learn to implement GUI for Java Apps.
							</p>
						</div>
					</div>
					<div className="border-t">
						<div className="relative overflow-hidden py-4 text-xs uppercase font-medium tracking-wide text-foreground/80 bg-background/30 rounded-b-2xl select-none">
							<HorizontalScroller items={items} separator="•" />
						</div>
					</div>
					<div className="flex space-x-2 absolute top-5 right-3 sm:right-5">
						<Button size="icon">
							<IconArrowUpRight />
						</Button>
						<Button size="icon">
							<IconGithub />
						</Button>
					</div>
				</div>

				{/* SIDE CONTENT */}
				<Link
					href="/about"
					className="relative overflow-hidden hidden lg:flex lg:col-span-3 p-5 flex-col justify-center rounded-2xl w-full lg:min-h-[360px] border bg-background/30 shadow-shadow backdrop-blur-md group"
				>
					<div className="flex-1 flex flex-col justify-center">
						<h3 className="text-sm uppercase tracking-wider">
							<span className="text-primary text-lg mr-2">‣</span>
							My Expertise
						</h3>
						<p className="text-pretty text-foreground/80 py-3">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet accusamus suscipit ipsam
							voluptas. Porro dolorum laudantium neque corporis, enim officia tenetur itaque unde
							optio soluta, nostrum placeat sed ab quasi!
						</p>
					</div>
					{/* LINK START */}
					<div className="inline-flex w-fit gap-2 items-center ml-auto text-xs uppercase font-medium tracking-wide pr-2">
						<IconArrowUpRight
							width={14}
							height={14}
							className="text-foreground/50 group-hover:text-foreground group-hover:translate-x-1.5 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-500"
						/>
						<span className="relative group-hover:translate-x-1.5 transition-transform duration-500">
							Get to know me more
							<span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition scale-x-0 origin-left group-hover:scale-x-100 duration-500" />
						</span>
					</div>

					<div className="absolute -z-10 -top-10 -right-14 text-foreground/5 -rotate-12 animate-spinner [animation-play-state:paused] group-hover:[animation-play-state:running]">
						<IconCompass width={200} height={200} />
					</div>
				</Link>

				{/* <div className="lg:col-span-2 relative rounded-2xl w-full md:min-h-[360px] border bg-background/10 shadow-shadow backdrop-blur-md">
					<motion.div
						initial={{ filter: 'grayscale(100%)' }}
						whileHover={{ filter: 'none' }}
						transition={{ duration: 0.3 }}
						className="relative h-full rounded-2xl"
					>
						<Image
							src="/images/gallery/trecime.jpg"
							alt=""
							width={600}
							height={450}
							draggable={false}
							className="select-none h-full w-full object-cover rounded-2xl"
						/>
						<motion.div
							whileHover={{ opacity: 0.5 }}
							className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20 rounded-2xl"
						></motion.div>
						<motion.div className="absolute inset-0 w-full h-full flex flex-col justify-end p-6 text-xl text-foreground/80">
							I also do adventure photography
						</motion.div>
					</motion.div>
				</div> */}

				{/* SMALL NO IMAGE */}
				<div className="col-span-12 md:col-span-5 lg:col-span-4 relative rounded-2xl w-full flex flex-col justify-between min-h-[300px] border bg-background/10 shadow-shadow backdrop-blur-md">
					<div className="py-5 px-3 sm:px-5 flex flex-col h-full gap-y-2 pt-16 lg:pt-16 justify-center">
						<h3 className="text-xl uppercase text-balance">Loop Agile Now</h3>
						<p className="text-pretty text-foreground/80">
							Web-based communications platform acting as a forum for signed in users. Built for the
							purpose to learn full-stack React development and design patterns. Used an ORM on the
							middle layer and a component library on front-end.
						</p>
					</div>
					<div className="border-t">
						<div className="relative overflow-hidden py-4 text-xs uppercase font-medium tracking-wide text-foreground/80 bg-background/30 rounded-b-2xl select-none">
							<HorizontalScroller items={items} separator="•" />
						</div>
					</div>
					<div className="flex space-x-3 absolute top-4 right-4">
						<Button size="icon">
							<IconArrowUpRight />
						</Button>
						<Button size="icon">
							<IconGithub />
						</Button>
					</div>
				</div>

				{/* INVERTED */}
				<div className="col-span-12 md:col-span-7 lg:col-span-8 relative rounded-2xl w-full flex flex-col justify-between lg:min-h-[360px] border bg-background/10 shadow-shadow backdrop-blur-md">
					<div className="grid grid-cols-6 gap-2">
						<div className="col-span-4 lg:col-span-3 py-5 px-3 sm:px-5 flex flex-col h-full gap-y-2 pt-20 lg:pt-16 justify-center">
							<h3 className="text-xl uppercase text-balance">Loop Agile Now</h3>
							<p className="text-pretty text-foreground/80">
								Arcade styled 2D space shooter game with unlimited levels and infinitely increasing
								difficulty. Has different enemy types and various power ups. Handles game saves
								locally to file. Built to solidify knowledge about object-oriented programming and
								learn to implement GUI for Java Apps.
							</p>
						</div>
						<div className="relative col-span-2 lg:col-span-3 py-4 flex items-center">
							<div className="relative rounded-l-xl h-full">
								<Image
									src="/images/webpic.png"
									alt=""
									width={600}
									height={450}
									draggable={false}
									className="select-none h-full w-full object-cover rounded-l-xl shadow-xl object-left-bottom lg:object-left"
								/>
								<div className="absolute inset-0 bg-gradient-to-tl from-black/70 to-black/10 rounded-l-xl"></div>
							</div>
						</div>
					</div>
					<div className="border-t">
						<div className="relative overflow-hidden py-4 text-xs uppercase font-medium tracking-wide text-foreground/80 bg-background/30 rounded-b-2xl select-none">
							<HorizontalScroller items={items} separator="•" />
						</div>
					</div>
					<div className="flex space-x-2 absolute top-5 left-3 sm:left-5">
						<Button size="icon">
							<IconArrowUpRight />
						</Button>
						<Button size="icon">
							<IconGithub />
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
