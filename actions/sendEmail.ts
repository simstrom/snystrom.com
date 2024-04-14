'use server';

import EmailTemplate from '@/components/emailTemplate';
import React from 'react';
import { Resend } from 'resend';
// import { validateString, getErrorMessage } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
	const senderEmail = formData.get('senderEmail');
	const message = formData.get('message');

	let data;
	try {
		data = await resend.emails.send({
			from: 'Contact Form <onboarding@resend.dev>',
			to: 'simons.nystrom@gmail.com',
			subject: 'Message from contact form',
			react: React.createElement(EmailTemplate, {
				message: message,
				senderEmail: senderEmail,
			}),
		});
	} catch (error: unknown) {
		return {
			error: Response.error,
		};
	}

	return {
		data,
	};
};
