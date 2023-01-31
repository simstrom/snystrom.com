import { CvIcon, EmailIcon, GithubIcon, InstagramIcon, LinkedInIcon } from './Icons';
import LinkCard from './LinkCard';

export default function Contact() {
	return (
		<>
			<div className="mb-8">
				<h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-1">Get in Touch</h3>
				<p className="text-gray-600 dark:text-gray-400">
					I&apos;m more than happy to connect! You can find me through the links below.
				</p>
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
		</>
	);
}
