import Image from 'next/image';
import InView from '../lib/InView';

import { GithubIcon, TopRightIcon } from './Icons';
import SkillTag from './SkillTag';

export default function ProjectCard({ project }) {
	return (
		<InView>
			<div className="h-full flex flex-col rounded-lg border border-primary bg-secondary drop-shadow-sm">
				<div className="relative h-60 group">
					<Image
						src="/loop-agile.png"
						alt=""
						fill
						sizes="(max-width: 640px) 100vw,
							50vw"
						className="object-cover overflow-hidden rounded-t-lg border-b border-primary"
					/>
					<a
						href={project.href ? 'liveURL' : 'github.com'}
						target="_blank"
						rel="noopener noreferrer"
						className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-2 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					>
						{project.href ? (
							<>
								View Live
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
				<div className="flex-grow flex flex-col gap-4">
					<div className="flex w-full items-center gap-1 p-6 pb-0">
						<h3 className="text-lg sm:text-xl">{project.title}</h3>
						<div className="flex ml-auto gap-4 h-full items-center">
							{project.href && (
								<a
									href={''}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 hover:text-brand hover:translate-x-0.5 hover:-translate-y-0.5 hover:scale-110 duration-300"
								>
									<TopRightIcon w={14} />
								</a>
							)}
							<a
								href=""
								target="_blank"
								rel="noopener noreferrer"
								className="p-1 hover:text-brand hover:scale-110 transition duration-300"
							>
								<GithubIcon />
							</a>
						</div>
					</div>
					<p className="text-sm text-secondary px-6">{project.desc}</p>

					<div className="flex flex-wrap gap-2 mb-2 mt-auto px-6 pb-4">
						{project.skills.map((skill) => (
							<span key={skill} className="text-xs text-secondary">
								<SkillTag skill={skill} />
							</span>
						))}
					</div>
				</div>
			</div>
		</InView>
	);
}
