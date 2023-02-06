export const formatDate = (date) =>
	new Date(date).toLocaleString('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	});
export const date = (date) => new Date(date).toString;
