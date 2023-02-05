import InView from '../lib/InView';
import { GithubIcon, TopRightIcon } from './Icons';

export default function ProjectListItem({ project }) {
	return (
		<InView>
			<div className="flex justify-between items-center pb-4 border-b border-primary">
				<div className="flex flex-col gap-2">
					<h3 className="text-base font-medium sm:text-lg">{project.title}</h3>
					<div className="max-[450px]:hidden flex gap-3 flex-wrap">
						{project.skills.map((skill) => (
							<span key={skill} className="text-xs text-secondary">
								{skill}
							</span>
						))}
					</div>
				</div>
				<div className="flex gap-2 items-center text-secondary">
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
						className="hover:text-brand hover:scale-110 transition duration-300"
					>
						<GithubIcon />
					</a>
				</div>
			</div>
		</InView>
	);
}
