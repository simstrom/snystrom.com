type EmailTemplateProps = {
	message: FormDataEntryValue | null;
	senderEmail: FormDataEntryValue | null;
};

export default function EmailTemplate({ message, senderEmail }: EmailTemplateProps) {
	return (
		<div>
			<h1>New Message</h1>
			<p>{message?.toString()}</p>
			<hr />
			<div>
				<p>
					Sent from: <strong>{senderEmail?.toString()}</strong>
				</p>
			</div>
		</div>
	);
}
