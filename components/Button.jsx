import Link from 'next/link';
import InView from '../lib/InView';
import { RightArrowIcon } from './Icons';

export default function Button({ children, href }) {
	return (
		<InView>
			<div className="flex justify-center items-center">
				<Link
					href={href}
					className="flex items-center gap-1 group rounded-lg px-6 py-3 mt-8 text-sm text-brand bg-brand/5 hover:bg-brand/10 duration-300"
				>
					<div className="font-medium">{children}</div>
					<div className="ml-auto group-hover:translate-x-2 duration-300">
						<RightArrowIcon />
					</div>
				</Link>
			</div>
		</InView>
	);
}
