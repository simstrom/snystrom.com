import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Classnames combiner
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Dates
export const formatDate = (date: string | Date) =>
	new Date(date).toLocaleString('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	});

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
