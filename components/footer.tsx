import { navItems } from '@/lib/data';
import { IconEmail, Logo } from '@/lib/icons';
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
							toCopy="simons.nystrom@gmail.com"
							message="Email copied!"
							icon={<IconEmail className="w-4 h-4" />}
							className="hidden sm:flex"
						/>
					</div>

					<div className="col-span-5 sm:col-span-3 sm:justify-self-end flex flex-col gap-2 text-foreground-secondary">
						<h5 className="text-foreground text-sm tracking-normal">Navigation</h5>
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
					</div>
					<div className="col-span-7 sm:col-span-3 sm:justify-self-end  flex flex-col gap-2 text-foreground-secondary">
						<h5 className="text-foreground text-sm tracking-normal">Socials</h5>
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
