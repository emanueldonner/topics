// get user by id from supabase

export const load = async ({ locals: { profile } }) => {
	return { profile };
};
