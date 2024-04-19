'use client';

import Button from '@/components/ui/button';
import Cursor from '@/components/ui/cursor';
import HorizontalScroller from '@/components/ui/horizontalScroller';
import PageHeader from '@/components/ui/pageHeader';
import { IconArrowUpRight, IconCompass, IconGithub } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';

// export const metadata: Metadata = {
// 	title: 'Simon Nyström - Projects',
// };

const items = ['React', 'Node', 'Express', 'Postgres', 'Chakra', 'Sequelize', 'JavaScript'];

export default function Projects() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isGridView, setIsGridView] = useState(true);

	return (
		<main className="flex flex-col justify-center mt-32 sm:mt-40">
			<PageHeader
				title="All Projects"
				content="I love building projects and practice my engineering skills, There's an archive of things that I've worked on."
			/>

			<div className="flex px-2 pt-8 sm:pt-12 pb-12 text-sm font-medium uppercase tracking-wide text-foreground-secondary">
				<span className="border-r-2 pr-4 select-non opacity-60">View As</span>
				<button
					onClick={() => setIsGridView(true)}
					className={cn(
						'pl-4 uppercase tracking-wide font-medium hover:text-foreground transition',
						isGridView && 'text-brand'
					)}
				>
					Grid
				</button>
				<button
					onClick={() => setIsGridView(false)}
					className={cn(
						'pl-4 uppercase tracking-wide font-medium hover:text-foreground transition',
						!isGridView && 'text-brand'
					)}
				>
					List
				</button>
			</div>

			{isGridView ? (
				<motion.div
					key="grid-view"
					initial={{ opacity: 0.0, y: 50 }}
					exit={{ opacity: 0.0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.3,
					}}
					className="grid grid-cols-1 md:grid-cols-12 gap-4 h-fit"
				>
					{/* LARGE */}
					<div className="col-span-12 lg:col-span-9 relative rounded-2xl w-full flex flex-col justify-between lg:min-h-[360px] border bg-background-tertiary/50 shadow-shadow backdrop-blur-md">
						<div className="grid grid-cols-6 gap-2 h-full">
							<div className="relative col-span-2 lg:col-span-3 py-4 flex items-center">
								<div className="relative rounded-r-xl h-full">
									<Cursor containerClass="rounded-r-xl">
										<IconArrowUpRight className="w-6 h-6" />
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
								<h3 className="text-xl sm:text-2xl lg:text-3xl tracking-tight text-balance">
									Loop Agile Now
								</h3>
								<p className="text-pretty text-foreground-secondary">
									Arcade styled 2D space shooter game with unlimited levels and infinitely
									increasing difficulty. Has different enemy types and various power ups. Handles
									game saves locally to file. Built to solidify knowledge about object-oriented
									programming and learn to implement GUI for Java Apps.
								</p>
							</div>
						</div>
						<div className="border-t">
							<div className="relative overflow-hidden py-4 text-xs uppercase font-medium tracking-wide text-foreground-secondary bg-background-secondary/50 rounded-b-2xl select-none">
								<HorizontalScroller items={items} separator="•" />
							</div>
						</div>
						<div className="flex space-x-2 absolute top-5 right-3 sm:right-6">
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
						className="relative overflow-hidden hidden lg:flex lg:col-span-3 flex-col justify-center rounded-2xl w-full lg:min-h-[360px] border bg-background-tertiary/50 shadow-shadow backdrop-blur-md group"
					>
						<div className="flex-1 flex flex-col justify-center px-5 py-10">
							<h3 className="text-lg tracking-tight">
								<span className="text-brand text-lg mr-2">‣</span>
								My Expertise
							</h3>
							<p className="text-pretty text-foreground-secondary pt-3">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet accusamus suscipit
								ipsam voluptas. Porro dolorum laudantium neque corporis, enim officia tenetur itaque
								unde optio soluta, nostrum placeat sed ab quasi!
							</p>
						</div>
						<div className="border-t py-4 bg-background-secondary/50 flex">
							{/* LINK START */}
							<div className="inline-flex w-fit gap-2 items-center ml-auto text-xs uppercase font-medium tracking-wide pr-7">
								<IconArrowUpRight
									width={14}
									height={14}
									className="text-foreground-secondary group-hover:text-foreground group-hover:translate-x-1.5 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-500"
								/>
								<span className="relative group-hover:translate-x-1.5 transition-transform duration-500">
									Get to know me more
									<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand transition scale-x-0 origin-left group-hover:scale-x-100 duration-500" />
								</span>
							</div>
						</div>

						<div className="absolute -z-10 -top-10 -right-14 text-background-secondary/50 -rotate-12 animate-wiggle [animation-play-state:paused] group-hover:[animation-play-state:running]">
							<IconCompass width={200} height={200} />
						</div>
					</Link>

					{/* SMALL NO IMAGE */}
					<div className="col-span-12 md:col-span-5 lg:col-span-4 relative rounded-2xl w-full flex flex-col justify-between min-h-[300px] border bg-background-tertiary/50 shadow-shadow backdrop-blur-md">
						<div className="py-5 px-3 sm:px-6 flex flex-col h-full gap-y-2 pt-16 lg:pt-16 justify-center">
							<h3 className="text-xl sm:text-2xl lg:text-3xl tracking-tight text-balance">
								Loop Agile Now
							</h3>
							<p className="text-pretty text-foreground-secondary">
								Web-based communications platform acting as a forum for signed in users. Built for
								the purpose to learn full-stack React development and design patterns. Used an ORM
								on the middle layer and a component library on front-end.
							</p>
						</div>
						<div className="border-t">
							<div className="relative overflow-hidden py-4 text-xs uppercase font-medium tracking-wide text-foreground-secondary bg-background-secondary/50 rounded-b-2xl select-none">
								<HorizontalScroller items={items} separator="•" />
							</div>
						</div>
						<div className="flex space-x-3 absolute top-4 right-3 sm:right-6">
							<Button size="icon">
								<IconArrowUpRight />
							</Button>
							<Button size="icon">
								<IconGithub />
							</Button>
						</div>
					</div>

					{/* INVERTED */}
					<div className="col-span-12 md:col-span-7 lg:col-span-8 relative rounded-2xl w-full flex flex-col justify-between lg:min-h-[360px] border bg-background-tertiary/50 shadow-shadow backdrop-blur-md">
						<div className="grid grid-cols-6 gap-2 h-full">
							<div className="col-span-4 lg:col-span-4 py-5 px-3 sm:px-6 flex flex-col h-full gap-y-2 pt-20 lg:pt-16 justify-center">
								<h3 className="text-xl sm:text-2xl lg:text-3xl tracking-tight text-balance">
									Loop Agile Now
								</h3>
								<p className="text-pretty text-foreground-secondary">
									Arcade styled 2D space shooter game with unlimited levels and infinitely
									increasing difficulty. Has different enemy types and various power ups. Handles
									game saves locally to file. Built to solidify knowledge about object-oriented
									programming and learn to implement GUI for Java Apps.
								</p>
							</div>
							<div className="relative col-span-2 lg:col-span-2 py-4 flex items-center">
								<a href="https://youtube.com" className="relative rounded-l-xl h-full">
									<Cursor containerClass="rounded-l-xl">
										<IconArrowUpRight className="w-6 h-6" />
									</Cursor>
									<Image
										src="/images/webpic.png"
										alt=""
										width={600}
										height={450}
										draggable={false}
										className="select-none h-full w-full object-cover rounded-l-xl shadow-xl object-left-bottom lg:object-left"
									/>
									<div className="absolute inset-0 bg-gradient-to-tl from-black/70 to-black/10 rounded-l-xl"></div>
								</a>
							</div>
						</div>
						<div className="border-t">
							<div className="relative overflow-hidden py-4 text-xs uppercase font-medium tracking-wide text-foreground-secondary bg-background-secondary/50 rounded-b-2xl select-none">
								<HorizontalScroller items={items} separator="•" />
							</div>
						</div>
						<div className="flex space-x-2 absolute top-5 left-3 sm:left-6">
							<Button size="icon">
								<IconArrowUpRight />
							</Button>
							<Button size="icon">
								<IconGithub />
							</Button>
						</div>
					</div>
				</motion.div>
			) : (
				<motion.div
					key="list-view"
					initial={{ opacity: 0.0, y: 50 }}
					exit={{ opacity: 0.0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.3,
					}}
					className="flex flex-col gap-6 h-fit px-3"
				>
					<div className="flex justify-between items-center pb-6 border-b">
						<div className="flex flex-col gap-y-2">
							<h3 className="text-xl sm:text-2xl lg:text-3xl tracking-tight">Loop Agile Now</h3>
							<ul className="mt-2 hidden sm:flex flex-wrap gap-2 items-center text-xs uppercase font-medium tracking-wide text-foreground-secondary">
								{items.map((item: any, idx: number) => (
									<Fragment key={idx}>
										<li>
											{item}
											{idx != items.length - 1 && <span className="text-brand pl-2">•</span>}
										</li>
									</Fragment>
								))}
							</ul>
						</div>
						<div className="flex space-x-2">
							<Button size="icon">
								<IconArrowUpRight />
							</Button>
							<Button size="icon">
								<IconGithub />
							</Button>
						</div>
					</div>
				</motion.div>
			)}
		</main>
	);
}
