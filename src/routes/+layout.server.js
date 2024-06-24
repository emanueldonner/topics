export const load = async ({ locals: { session } }) => {
	await console.log('session', session);
	return {
		session
	};
};
