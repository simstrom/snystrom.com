import { ArrowIcon, CvIcon, EmailIcon, GithubIcon, InstagramIcon, LinkedInIcon } from './Icons';

const LinkCard = ({ href, icon, children }) => (
	<a
		className="flex justify-between border border-black-opaque-100 dark:border-gray-opaque-100 p-4 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
		target="_blank"
		rel="noopener noreferrer"
		href={href}
	>
		<div className="flex gap-4">
			<div>{icon}</div>
			{children}
		</div>
		<div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-300">
			<ArrowIcon />
		</div>
	</a>
);

export default function Contact() {
	return (
		<div className="w-full">
			<div className="my-8">
				<h3 className="text-xl font-semibold tracking-tight mb-1">Get in Touch</h3>
				<p>I&apos;m more than happy to connect! You can find me through the links below.</p>
			</div>
			<div className="grid gap-4 md:grid-cols-2 text-sm font-medium mb-4">
				<LinkCard href="mailto:simons.nystrom@gmail.com" icon={<EmailIcon />}>
					Send Email
				</LinkCard>
				<LinkCard href="" icon={<CvIcon />}>
					View CV
				</LinkCard>
			</div>
			<div className="grid gap-4 md:grid-cols-3 text-sm font-medium">
				<LinkCard href="" icon={<LinkedInIcon />}>
					LinkedIn
				</LinkCard>
				<LinkCard href="" icon={<GithubIcon />}>
					Github
				</LinkCard>
				<LinkCard href="" icon={<InstagramIcon />}>
					Instagram
				</LinkCard>
			</div>
		</div>
	);
}
