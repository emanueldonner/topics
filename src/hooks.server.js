import { createServerClient } from '@supabase/ssr';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabase = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: '/' });
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: '/' });
			}
		}
	});

	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null, profile: null };
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			return { session: null, user: null, profile: null };
		}

		// Fetch the user's profile
		const { data: profileData, error: profileError } = await event.locals.supabase
			.from('profiles')
			.select('*')
			.eq('user_id', user.id)
			.single();

		if (profileError) {
			console.error('Error fetching profile:', profileError);
		}

		return { session, user, profile: profileData };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

const authGuard = async ({ event, resolve }) => {
	const { session, user, profile } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;
	event.locals.profile = profile;

	if (event.locals.session && event.url.pathname === '/login') {
		return redirect(303, '/d');
	} else if (!event.locals.session && event.url.pathname.startsWith('/d')) {
		return redirect(303, '/login');
	}

	return resolve(event);
};

export const handle = sequence(supabase, authGuard);
