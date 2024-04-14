import { Fragment } from 'react';

interface KbdProps {
	label: string;
	icons: [React.ReactNode, React.ReactNode?];
	letter?: string;
	iconTitle?: string;
}

export default function Kbd({ label, letter, icons, iconTitle }: KbdProps) {
	return (
		<div className="flex items-center gap-x-2">
			{label}
			{icons.map((icon, idx) => (
				<Fragment key={idx}>
					<kbd className="px-1.5 py-0.5 inline-flex space-x-1 items-center text-center text-sm font-sans font-normal shadow-sm bg-primary/10 text-primary rounded">
						{iconTitle && (
							<abbr title={iconTitle} className="font-sans no-underline leading-none">
								{icon}
							</abbr>
						)}
						<span>{iconTitle ? letter : icon}</span>
					</kbd>
					{icons.length > 1 && idx !== icons.length - 1 && <span className="-mx-1">/</span>}
				</Fragment>
			))}
		</div>
	);
}
