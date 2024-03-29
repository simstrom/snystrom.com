import { CvIcon, EmailIcon, GithubIcon, InstagramIcon, LinkedInIcon } from './Icons';
import LinkCard from './LinkCard';

export default function Contact() {
	return (
		<>
			<div className="mb-8">
				<h3 className="text-lg sm:text-xl mb-1">Get in touch</h3>
				<p className="text-secondary">
					I&apos;m more than happy to connect! You can find me through the links below.
				</p>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 mb-4">
				<LinkCard href="mailto:simons.nystrom@gmail.com" icon={<EmailIcon />}>
					Send Email
				</LinkCard>
				<LinkCard href="/static/cv.pdf" icon={<CvIcon />}>
					View CV
				</LinkCard>
			</div>
			<div className="grid gap-4 sm:grid-cols-3">
				<LinkCard href="https://linkedin.com/in/simon-nystrom" icon={<LinkedInIcon />}>
					LinkedIn
				</LinkCard>
				<LinkCard href="https://github.com/simstrom" icon={<GithubIcon />}>
					Github
				</LinkCard>
				<LinkCard href="https://www.instagram.com/simonnystrom" icon={<InstagramIcon />}>
					Instagram
				</LinkCard>
			</div>
		</>
	);
}
