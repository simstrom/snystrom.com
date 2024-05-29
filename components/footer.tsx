import { navItems } from '@/lib/data';
import { IconArrowRight, IconArrowUpRight, Logo } from '@/lib/icons';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="mt-20 border-t border-border dark:border-border/20 w-full">
			<div className="max-w-3xl mx-auto w-full pt-10 pb-5 flex flex-col gap-10">
				<ul className="grid grid-cols-12 ">
					<div className="col-span-4 sm:col-span-5 flex flex-col space-y-2">
						<Link href="/" className="w-fit">
							<Logo width={30} height={30} className="mb-3" />
						</Link>
						{navItems.otherLinks.map((item) => (
							<li
								key={item.name}
								className="w-fit group font-mono tracking-tight text-xs text-foreground-secondary hover:text-foreground transition duration-300"
							>
								<a
									href={item.path}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex gap-x-1 items-center relative"
								>
									{item.name}
									<IconArrowRight
										width={14}
										height={14}
										className="group-hover:translate-x-1 transition-transform duration-300"
									/>
								</a>
							</li>
						))}
					</div>
					<div className="col-span-4 font-mono tracking-tight text-xs text-foreground-secondary space-y-2">
						<h5 className="font-mono uppercase text-xs tracking-wide text-foreground">Socials</h5>
						{navItems.socialLinks.map((item) => (
							<li
								key={item.name}
								className="w-fit group hover:text-foreground transition duration-300"
							>
								<a
									href={item.path}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center relative"
								>
									{item.name}
									<IconArrowUpRight
										width={14}
										height={14}
										className="text-brand inline opacity-0 absolute -left-5 group-hover:opacity-100 transition duration-300"
									/>
								</a>
							</li>
						))}
					</div>
					<div className="col-span-4 sm:col-span-3 font-mono tracking-tight text-xs text-foreground-secondary space-y-2">
						<h5 className="font-mono uppercase text-xs tracking-wide text-foreground">
							Navigation
						</h5>
						{navItems.navigationLinks
							.filter((item) => item.name !== 'Colophon' && item.name !== 'Home')
							.map((item) => (
								<li
									key={item.path}
									className="w-fit relative before:content-['‣'] before:absolute before:-left-3 before:text-brand before:opacity-0 hover:before:opacity-100 hover:text-foreground transition duration-300 before:transition before:duration-300"
								>
									<Link href={item.path}>{item.name}</Link>
								</li>
							))}
					</div>
				</ul>

				<div className="mt-auto font-mono tracking-tight text-xs text-foreground-secondary/60">
					© Simon Nyström 2024
				</div>
			</div>
		</footer>
	);
}
