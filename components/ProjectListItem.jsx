import { motion } from 'framer-motion';
import { GithubIcon, TopRightIcon } from './Icons';

const variants = {
	hidden: {
		opacity: 0,
		y: 50,
	},
	show: {
		opacity: 1,
		y: 0,
	},
};

export default function ProjectListItem({ href }) {
	return (
		<motion.div
			initial="hidden"
			animate="show"
			variants={variants}
			transition={{ duration: 0.5 }}
			className="flex justify-between items-center pb-4 border-b border-primary"
		>
			<div className="flex flex-col gap-2">
				<h3 className="text-base font-semibold sm:text-lg">Loop Agile Now</h3>
				<div className="max-[450px]:hidden flex gap-3 flex-wrap">
					<div className="text-xs text-secondary">React</div>
					<div className="text-xs text-secondary">Node.js</div>
					<div className="text-xs text-secondary">Express</div>
					<div className="text-xs text-secondary">Next.js</div>
					<div className="text-xs text-secondary">MongoDB</div>
				</div>
			</div>
			<div className="flex gap-2 items-center text-secondary">
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
					className="hover:text-brand hover:scale-110 transition duration-300"
				>
					<GithubIcon />
				</a>
			</div>
		</motion.div>
	);
}
