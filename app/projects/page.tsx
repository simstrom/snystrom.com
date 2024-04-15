import Button from '@/components/ui/button';
import HorizontalScroller from '@/components/ui/horizontalScroller';
import PageHeader from '@/components/ui/pageHeader';
import { IconArrowUpRight, IconGithub } from '@/lib/icons';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
	title: 'Simon Nyström - Projects',
};

const items = ['React', 'Node', 'Express', 'Postgres', 'Chakra', 'Sequelize', 'JavaScript'];

export default function Projects() {
	return (
		<main className="flex flex-col items-center mt-40 gap-20">
			<PageHeader
				title="All Projects"
				content="I love building projects and practice my engineering skills, There's an archive of things that I've worked on."
			/>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-20">
				{/* LARGE */}
				<div className="md:col-span-7 relative rounded-2xl w-full flex flex-col justify-between min-h-[360px] border bg-gray-500/5 shadow-xl backdrop-blur-md">
					<div className="px-4 sm:px-8 py-4 flex flex-col mt-14 justify-center h-full gap-y-4">
						<h3 className="text-2xl sm:text-3xl font-serif">Loop Agile Now</h3>
						<p className="text-pretty leading-relaxed text-sm sm:text-base">
							Web-based communications platform acting as a forum for signed in users. Built for the
							purpose to learn full-stack React development and design patterns. Used an ORM on the
							middle layer and a component library on front-end.
						</p>
					</div>
					<div className="border-t">
						<div className="relative overflow-hidden py-4 text-xs font-mono">
							<HorizontalScroller items={items} separator="•" />
						</div>
					</div>
					<div className="flex space-x-3 absolute top-4 right-4">
						<Button size="icon" className="sm:w-14 sm:h-14">
							<IconArrowUpRight />
						</Button>
						<Button size="icon" className="sm:w-14 sm:h-14">
							<IconGithub />
						</Button>
					</div>
					<div className="absolute w-44 -top-16 left-1 sm:w-60 sm:-top-28 sm:left-6">
						<Image
							src="/images/mockup-right.png"
							alt=""
							width={602}
							height={440}
							draggable={false}
							className="select-none"
							style={{ filter: 'drop-shadow(5px 5px 5px #222)' }}
						/>
					</div>
				</div>

				{/* SMALL */}
				<div className="md:col-span-5 relative rounded-2xl w-full flex flex-col justify-between min-h-[360px] border bg-gray-500/5 shadow-xl backdrop-blur-md">
					<div className="px-4 sm:px-8 py-4 flex flex-col mt-14 justify-center h-full gap-y-4">
						<h3 className="text-2xl sm:text-3xl font-serif">Loop Agile Now</h3>
						<p className="text-pretty leading-relaxed text-sm">
							Web-based communications platform acting as a forum for signed in users. Built for the
							purpose to learn full-stack React development and design patterns. Used an ORM on the
							middle layer and a component library on front-end.
						</p>
					</div>
					<div className="border-t">
						<div className="relative overflow-hidden py-4 text-xs font-mono">
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
					<div className="absolute w-44 -top-16 left-1 sm:w-52 sm:-top-24 sm:left-6">
						<Image
							src="/images/mockup-left.png"
							alt=""
							width={602}
							height={440}
							draggable={false}
							className="select-none"
							style={{ filter: 'drop-shadow(5px 5px 5px #222)' }}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
