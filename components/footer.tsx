import { SITE_CONTACT } from '@/lib/constants';
import { navItems } from '@/lib/data';
import { IconAt, IconEmail, IconGlobe, Logo } from '@/lib/icons';
import Link from 'next/link';
import CustomLink from './blog/link';
import Copy from './ui/copy';

export default function Footer() {
	return (
		<footer className="mt-20 border-t w-full">
			<div className="max-w-3xl mx-auto w-full pt-10 pb-14 flex flex-col gap-10">
				<div className="grid grid-cols-12 gap-6 sm:gap-2 gap-x-5">
					<div className="col-span-12 sm:col-span-6 flex gap-5 items-center sm:items-start sm:flex-col sm:gap-1 mr-2">
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
							className="hidden sm:flex mt-2"
						>
							{SITE_CONTACT}
						</Copy>
					</div>

					<div className="col-span-5 sm:col-span-3 sm:justify-self-end flex flex-col gap-2 text-foreground-secondary">
						<div className="relative">
							<IconGlobe className="hidden sm:block w-4 h-4 absolute -left-6 top-1/2 -translate-y-1/2 text-foreground" />
							<h5 className="text-foreground text-sm tracking-normal">Navigation</h5>
						</div>
						{navItems.navigationLinks
							.filter((item) => item.name !== 'Colophon' && item.name !== 'Home')
							.map((item) => (
								<CustomLink
									key={item.name}
									href={item.path}
									className="w-fit text-sm before:content-[] hover:text-foreground transition-colors"
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
									className="w-fit text-sm before:content-[] hover:text-foreground transition-colors"
								>
									{item.name}
								</CustomLink>
							))}
					</div>
					<div className="col-span-7 sm:col-span-3 sm:justify-self-end  flex flex-col gap-2 text-foreground-secondary">
						<div className="relative">
							<IconAt className="hidden sm:block w-4 h-4 absolute -left-6 top-1/2 -translate-y-1/2 text-foreground" />
							<h5 className="text-foreground text-sm tracking-normal">Socials</h5>
						</div>
						{navItems.socialLinks.map((item) => (
							<CustomLink
								key={item.name}
								href={item.path}
								className="w-fit text-sm before:content-[] hover:text-foreground transition-colors"
							>
								{item.name}
							</CustomLink>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
