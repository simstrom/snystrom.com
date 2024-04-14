'use client';

import { sendEmail } from '@/actions/sendEmail';
import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';
import { IconGithub } from '@/lib/icons';
import { useState } from 'react';

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="flex gap-2">
				<IconGithub />
				Find me on Github
				<Button onClick={() => setIsOpen(true)}>Click here</Button>
				<Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
					<form action={sendEmail}>
						<input type="text" name="message" id="message" />
						<input type="text" name="senderEmail" id="senderEmail" />
						<button type="submit">Send</button>
					</form>
				</Dialog>
			</div>
		</main>
	);
}
