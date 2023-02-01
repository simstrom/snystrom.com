import Image from 'next/image';

import { GithubIcon, TopRightIcon } from './Icons';
import SkillTag from './SkillTag';

export default function FeaturedProject({ href }) {
	return (
		<div className="w-full flex flex-col gap-4 sm:grid md:gap-8 grid-cols-2">
			<div className="flex flex-col rounded-lg border border-black-opaque-200 dark:border-gray-opaque-200">
				<div className="relative h-60 group">
					<Image
						src="/loop-agile.png"
						alt=""
						fill
						className="object-cover overflow-hidden rounded-t-lg border-b border-black-opaque-200 dark:border-gray-opaque-200"
					/>
					<a
						href={href ? 'liveURL' : 'github.com'}
						target="_blank"
						rel="noopener noreferrer"
						className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-2 bg-gray-100/90 dark:bg-gray-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					>
						{href ? (
							<>
								View Demo
								<TopRightIcon w={10} />
							</>
						) : (
							<>
								View Repo
								<GithubIcon />
							</>
						)}
					</a>
				</div>
				<div className="flex flex-col gap-4 p-6">
					<div className="flex w-full items-center gap-1">
						<h3 className="text-xl font-semibold tracking-tight">Arcturus</h3>
						<div className="flex ml-auto gap-6 text-sm font-medium h-full items-center">
							{!href && (
								<a
									href={''}
									target="_blank"
									rel="noopener noreferrer"
									className="text-emerald-500 gap-1 items-center flex group hover:text-emerald-400 transition"
								>
									<div>Demo</div>
									<div className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
										<TopRightIcon w={8} />
									</div>
								</a>
							)}
							<a
								href=""
								target="_blank"
								rel="noopener noreferrer"
								className="hover:scale-105 transition-transform"
							>
								<GithubIcon />
							</a>
						</div>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Web-based communications platform acting as a forum for signed in users. Built for the
						purpose to learn full-stack React development and its design patterns. Node, Express and
						Sequelize ORM was used as middle layer to build the server and APIs. Lorem, ipsum dolor
						sit amet consectetur adipisicing elit. Odio enim quaerat error facilis. Asperiores,
						blanditiis quas minus deleniti adipisci expedita nemo laudantium sunt ea fugit? Cum
						rerum officia ab corporis.
					</p>
					<div className="flex flex-wrap gap-2 mb-2 mt-auto">
						<SkillTag skill={'HTML'} />
						<SkillTag skill={'CSS'} />
						<SkillTag skill={'Java'} />
						<SkillTag skill={'JavaScript'} />
						<SkillTag skill={'React'} />
						<SkillTag skill={'Next.js'} />
						<SkillTag skill={'Node.js'} />
						<SkillTag skill={'Express'} />
						<SkillTag skill={'MongoDB'} />
						<SkillTag skill={'SQL'} />
						<SkillTag skill={'PostgreSQL'} />
						<SkillTag skill={'Firebase'} />
						<SkillTag skill={'Chakra UI'} />
						<SkillTag skill={'Tailwind'} />
						<SkillTag skill={'Sequelize'} />
					</div>
				</div>
			</div>
		</div>
	);
}
