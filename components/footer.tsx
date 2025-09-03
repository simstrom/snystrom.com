import { SITE_CONTACT } from '@/lib/constants';
import { navItems } from '@/lib/data';
import { IconAt, IconEmail, IconGlobe, Logo } from '@/lib/icons';
import Link from 'next/link';
import CustomLink from './blog/link';
import Copy from './ui/copy';

export default function Footer() {
	return (
		<>
			<div className="max-w-5xl mx-auto border-x border-t w-full h-32 bg-[linear-gradient(-45deg,var(--color-border)_12.50%,transparent_12.50%,transparent_50%,var(--color-border)_50%,var(--color-border)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[6px_6px]" />

			<footer className="border-y">
				<div className="w-full max-w-5xl mx-auto flex flex-col border-x bg-background-secondary">
					<div className="relative grid grid-cols-2">
						<div className="flex items-center sm:items-start justify-center sm:flex-col gap-1 p-6">
							<Link href="/" className="w-fit hover:rotate-180 transition-transform duration-500">
								<Logo width={30} height={30} />
							</Link>
							<p className="text-foreground-secondary text-sm sm:mb-2 sm:mt-4">
								Crafted by Simon Nyström.
								<br /> Thank you for visiting.
							</p>

							<Copy
								toCopy={SITE_CONTACT}
								successMessage="Email copied!"
								icon={<IconEmail className="w-4 h-4" />}
								className="hidden sm:flex mt-2 w-full text-foreground"
							>
								{SITE_CONTACT}
							</Copy>
							<p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-foreground-secondary/80">
								© 2025 Simon Nyström. All rights reserved.
							</p>
						</div>

						<div className="border-l w-full flex">
							<div className="flex-1 flex flex-col text-foreground-secondary border-r">
								<div className="border-b p-4 flex items-center gap-x-2">
									<IconGlobe className="hidden sm:block w-4 h-4 text-foreground" />
									<h5 className="text-foreground text-sm tracking-normal">Navigation</h5>
								</div>
								{navItems.navigationLinks
									.filter((item) => item.name !== 'Colophon' && item.name !== 'Home')
									.map((item) => (
										<CustomLink
											key={item.name}
											href={item.path}
											className="before:content-none w-full text-sm font-medium px-4 py-2 hover:bg-foreground hover:text-background"
										>
											{item.name}
										</CustomLink>
									))}
								{navItems.exploreLinks
									.filter((item) => item.name === 'Gallery')
									.map((item) => (
										<CustomLink
											key={item.name}
											href={item.path}
											className="before:content-none w-full text-sm font-medium px-4 py-2 hover:bg-foreground hover:text-background"
										>
											{item.name}
										</CustomLink>
									))}
							</div>
							<div className="flex-1 flex flex-col text-foreground-secondary">
								<div className="border-b p-4 flex items-center gap-x-2">
									<IconAt className="hidden sm:block w-4 h-4 text-foreground" />
									<h5 className="text-foreground text-sm tracking-normal">Socials</h5>
								</div>
								{navItems.socialLinks.map((item) => (
									<CustomLink
										key={item.name}
										href={item.path}
										className="before:content-none w-full text-sm font-medium px-4 py-2 hover:bg-foreground hover:text-background"
									>
										{item.name}
									</CustomLink>
								))}
							</div>
						</div>
					</div>
				</div>
			</footer>
			<div className="h-10 mb-5 max-w-5xl mx-auto w-full border-x text-center text-xs text-foreground-secondary" />
		</>
	);
}
