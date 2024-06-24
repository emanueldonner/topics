export const load = async ({ fetch }) => {
	const response = await fetch('/api/entries');
	const entries = await response.json();
	return { entries };
};
