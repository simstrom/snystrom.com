import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Classnames combiner
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Dates
export const formatDate = (dateString: string | Date, asRelative?: boolean, short?: boolean) => {
	const date = new Date(dateString).toLocaleString('en-US', {
		month: short ? 'short' : 'long',
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
export const safeLocalStorageSetItem = (key: string, item: string): void => {
	let storageAccessible = false;
	try {
		localStorage.setItem('testkey', 'testvalue');
		localStorage.removeItem('testkey');
		storageAccessible = true;
	} catch (e) {
		storageAccessible = false;
	}
	if (storageAccessible) {
		localStorage.setItem(key, item);
	}
};

export const safeLocalStorageGetItem = (key: string): string => {
	if (typeof Storage !== 'undefined') {
		try {
			return localStorage.getItem(key) || '';
		} catch (e) {
			return '';
		}
	}
	return '';
};
