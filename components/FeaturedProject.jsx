import Image from 'next/image';

import { GithubIcon, TopRightIcon } from './Icons';
import SkillTag from './SkillTag';

export default function FeaturedProject({ href }) {
	return (
		<div className="w-full flex flex-col gap-4 sm:grid md:gap-8 grid-cols-2">
			<div className="flex flex-col rounded-lg border border-black-opaque-200 dark:border-gray-opaque-200">
				<div className="relative w-full">
					<Image
						src="/loop-agile.png"
						alt=""
						width={500}
						height={500}
						className="object-cover rounded-t-lg border-b border-black-opaque-200 dark:border-gray-opaque-200"
					/>
				</div>
				<div className="h-full flex flex-col gap-4 p-6">
					<div className="flex w-full items-center">
						<h3 className="text-xl font-semibold tracking-tight">Arcturus</h3>
						<div className="flex ml-auto gap-6 text-sm font-medium h-full items-center">
							{!href && (
								<a
									href={''}
									className="text-emerald-500 gap-1 items-center flex group hover:text-emerald-400 transition"
								>
									<div>Demo</div>
									<div className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
										<TopRightIcon w={8} />
									</div>
								</a>
							)}
							<a href="" className="hover:scale-105 transition-transform">
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
					<div className="flex gap-2 mb-2 text-sm mt-auto">
						<SkillTag skill={'HTML'} />
						<div>Tag</div>
						<div>Tag</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col rounded-lg border border-black-opaque-200 dark:border-gray-opaque-200">
				<div className="relative w-full">
					<Image
						src="/loop-agile.png"
						alt=""
						width={500}
						height={500}
						className="object-cover rounded-t-lg border-b border-black-opaque-200 dark:border-gray-opaque-200"
					/>
				</div>
				<div className="h-full flex flex-col gap-4 p-6">
					<div className="flex w-full items-center">
						<h3 className="text-xl font-semibold tracking-tight">Arcturus</h3>
						<div className="flex ml-auto gap-6 text-sm font-medium h-full items-center">
							{!href && (
								<a
									href={''}
									className="text-emerald-500 gap-1 items-center flex group hover:text-emerald-400 transition"
								>
									<div>Demo</div>
									<div className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
										<TopRightIcon w={8} />
									</div>
								</a>
							)}
							<a href="" className="hover:scale-105 transition-transform">
								<GithubIcon />
							</a>
						</div>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem inventore atque at
						eveniet quia eius corrupti? Laudantium incidunt magni, quod veniam consequuntur
						consequatur nulla temporibus. Esse molestias libero ut iste!
					</p>
					<div className="flex gap-2 mb-2 text-sm mt-auto">
						<div>Tag</div>
						<div>Tag</div>
						<div>Tag</div>
					</div>
				</div>
			</div>
		</div>
	);
}
