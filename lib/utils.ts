import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Classnames combiner
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Dates
export const formatDate = (dateString: string | Date, asRelative?: boolean) => {
	const date = new Date(dateString).toLocaleString('en-US', {
		month: 'long',
		day: '2-digit',
		year: 'numeric',
	});

	if (asRelative) {
		return `${date} (${formatDateAsRelative(date)})`;
	} else {
		return date;
	}
};

export const formatDateAsRelative = (date: string | Date) => {
	const postDate = new Date(date);
	const currentDate = new Date();
	const timeDifference = Math.abs(currentDate.getTime() - postDate.getTime());
	const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

	if (daysAgo < 1) return 'Today';
	if (daysAgo < 7) return `${daysAgo}d ago`;
	if (daysAgo < 30) return `${Math.floor(daysAgo / 7)}w ago`;
	if (daysAgo < 365) return `${Math.floor(daysAgo / 30)}mo ago`;
	return `${Math.floor(daysAgo / 365)}y ago`;
};

// Safe access to localStorage
export const useLocalStorage = (key: string, value?: string) => {
	if (typeof window !== 'undefined') {
		let storage = window.localStorage.getItem(key);
		if (!storage && value) setToStorage(key, value);
		return storage;
	}
};
export const setToStorage = (key: string, value: string) => {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem(key, value);
	}
};
