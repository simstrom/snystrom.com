import InView from '@/lib/InView';
import { GithubIcon, TopRightIcon } from './Icons';
import SkillTag from './SkillTag';

export default function SmallProject({ href }) {
	return (
		<InView>
			<div className="flex flex-col rounded-lg border border-primary bg-secondary drop-shadow-sm">
				<div className="flex flex-col gap-4">
					<div className="flex w-full items-center gap-1 py-5 px-6 border-b border-primary/70">
						<h3 className="text-lg">Screentime 2.0</h3>
						<div className="flex ml-auto gap-4 h-full items-center">
							{!href && (
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
								className="hover:text-brand hover:scale-110 duration-300"
							>
								<GithubIcon />
							</a>
						</div>
					</div>
					<p className="text-sm text-secondary px-6">
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
		</InView>
	);
}
