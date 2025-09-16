import { SITE_CONTACT } from '@/data/constants';
import { navItems } from '@/data/data';
import { IconAt, IconEmail, IconGlobe, Logo } from '@/data/icons';
import Link from 'next/link';

import CustomLink from '../blog/Link';
import ContactModal from '../sections/ContactModal';
import Copy from '../ui/Copy';
import Modal from '../ui/Modal';

export default function Footer() {
	return (
		<>
			<footer className="border-y relative z-30">
				<div className="w-full max-w-[1088px] mx-auto flex flex-col border-x">
					<div className="relative grid grid-cols-2">
						<div className="flex items-center sm:items-start justify-center sm:flex-col gap-1 p-6">
							<Link href="/" className="w-fit">
								<Logo width={30} height={30} />
							</Link>
							<p className="text-foreground-secondary text-sm sm:mb-2 sm:mt-4">
								Crafted by Simon Nyström.
								<br /> Thank you for visiting.
							</p>

							<Copy
								toCopy={SITE_CONTACT}
								successMessage="Email copied!"
								icon={<IconEmail className="w-3.5 h-3.5" />}
								className="hidden sm:flex mt-2 w-full text-foreground"
							>
								{SITE_CONTACT}
							</Copy>
							<p className="absolute z-30 -bottom-10 left-1/2 -translate-x-1/2 text-xs text-foreground-tertiary">
								© 2025 Simon Nyström. All rights reserved.
							</p>
						</div>

						<div className="border-l w-full flex">
							<div className="flex-1 flex flex-col text-foreground-secondary border-r">
								<div className="border-b p-4 flex items-center gap-x-2">
									<IconGlobe className="hidden sm:block w-3.5 h-3.5 text-foreground" />
									<h5 className="text-foreground text-sm tracking-normal">Navigation</h5>
								</div>
								{navItems.navigationLinks
									.filter((item) => item.name !== 'Colophon' && item.name !== 'Home')
									.map((item) => (
										<NavItem key={item.name} name={item.name} path={item.path} />
									))}
								{navItems.exploreLinks
									.filter((item) => item.name === 'Gallery')
									.map((item) => (
										<NavItem key={item.name} name={item.name} path={item.path} />
									))}
							</div>
							<div className="flex-1 flex flex-col text-foreground-secondary">
								<div className="border-b p-4 flex items-center gap-x-2">
									<IconAt className="hidden sm:block  w-3.5 h-3.5 text-foreground" />
									<h5 className="text-foreground text-sm tracking-normal">Socials</h5>
								</div>

								<Modal
									trigger={'Contact'}
									triggerClassName="w-full text-left text-sm font-medium px-4 py-2.5 text-foreground transition-colors text-foreground-secondary hover:text-foreground hover:bg-background-secondary"
								>
									<ContactModal />
								</Modal>

								{navItems.socialLinks
									.filter((item) => item.name !== 'RSS')
									.map((item) => (
										<NavItem key={item.name} name={item.name} path={item.path} />
									))}
							</div>
						</div>
					</div>
				</div>

				{/* CROSSES */}
				<span className="absolute left-0 -top-px z-20 hidden h-px w-4 bg-black/30 dark:bg-white/20 md:block" />
				<span className="absolute left-0 -top-0 z-20 hidden h-4 w-px bg-black/30 dark:bg-white/20 md:block" />

				<span className="absolute right-0 -top-px z-20 hidden h-px w-4 bg-black/30 dark:bg-white/20 md:block" />
				<span className="absolute right-0 -top-0 z-20 hidden h-4 w-px bg-black/30 dark:bg-white/20 md:block" />

				<span className="absolute right-0 -bottom-px z-20 hidden h-px w-4 bg-black/30 dark:bg-white/20 md:block" />
				<span className="absolute right-0 bottom-0 z-20 hidden h-4 w-px bg-black/30 dark:bg-white/20 md:block" />

				<span className="absolute left-0 -bottom-px z-20 hidden h-px w-4 bg-black/30 dark:bg-white/20 md:block" />
				<span className="absolute left-0 bottom-0 z-20 hidden h-4 w-px bg-black/30 dark:bg-white/20 md:block" />
			</footer>
			<div className="z-20 max-w-[1088px] opacity-75 mx-auto border-x w-full h-14 bg-[linear-gradient(-45deg,var(--color-border)_12.50%,transparent_12.50%,transparent_50%,var(--color-border)_50%,var(--color-border)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px]" />
		</>
	);
}

const NavItem = ({ name, path }: { name: string; path: string }) => {
	return (
		<CustomLink
			key={name}
			href={path}
			className="before:content-none w-full text-sm font-medium px-4 py-2.5 text-foreground-secondary hover:text-foreground hover:bg-background-secondary"
		>
			{name}
		</CustomLink>
	);
};
