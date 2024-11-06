import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Classnames combiner
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Dates
export function formatDate(dateString: string | Date, short?: boolean, omitYear: boolean = false) {
	const date = new Date(dateString).toLocaleString('en-US', {
		month: short ? 'short' : 'long',
		day: '2-digit',
		...(omitYear ? {} : { year: 'numeric' }),
	});

	return date;
}

export function slugify(str: string) {
	return str
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/&/g, '-and-') // Replace & with 'and'
		.replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
		.replace(/\-\-+/g, '-'); // Replace multiple - with single -
}
