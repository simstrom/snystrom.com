import { GithubIcon, TopRightIcon } from './Icons';
import SkillTag from './SkillTag';

export default function SmallProject({ href }) {
	return (
		<div className="flex flex-col rounded-lg border border-black-opaque-200 dark:border-gray-opaque-200">
			<div className="flex flex-col gap-4">
				<div className="flex w-full items-center gap-1 py-5 px-6 border-b border-black-opaque-100 dark:border-gray-opaque-100">
					<h3 className="text-lg font-semibold tracking-tight">Screentime 2.0</h3>
					<div className="flex ml-auto gap-6 text-sm font-medium h-full items-center">
						{!href && (
							<a
								href={''}
								target="_blank"
								rel="noopener noreferrer"
								className="gap-1 items-center flex group"
							>
								<div className="p-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
									<TopRightIcon w={14} />
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
				<p className="text-sm text-gray-600 dark:text-gray-400 px-6">
					Web-based communications platform acting as a forum for signed in users. Built for the
					purpose to learn full-stack React development and its design patterns. Node, Express and
					Sequelize ORM was used as middle layer to build the server and APIs.
				</p>

				<div className="flex flex-wrap gap-2 mb-2 mt-auto px-6 pb-4">
					<SkillTag skill={'React'} />
					<SkillTag skill={'Node.js'} />
					<SkillTag skill={'Express'} />
				</div>
			</div>
		</div>
	);
}
