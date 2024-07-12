// POST /api/upload
// upload a file to supabase storage

import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	const { supabase, user } = locals;
	try {
		const data = await request.formData();
		const file = data.get('file');
		console.log('file', file);
		const filePath = `${user.id}/${file.name}`;

		let imageUrl;
		//upload the file to supabase storage
		const { data: storageData, error: storageError } = await supabase.storage
			.from('avatars')
			.upload(filePath, file, {
				cacheControl: '3600',
				contentType: file.type
			});

		if (storageData) {
			imageUrl = storageData.fullPath;
		} else if (storageError) {
			console.error(storageError);
		}

		// get the user's existing image from the avatars bucket
		const { data: existingImageData, error: existingImageError } = await supabase.storage
			.from('avatars')
			.getPublicUrl(filePath);

		if (existingImageData) {
			console.log('existingImageData', existingImageData);
			imageUrl = existingImageData.publicUrl;
		}
		if (existingImageError) {
			console.error(existingImageError);
		}

		// update the user's profile with the new image url
		console.log('imageUrl', imageUrl);
		const { data: profileData, error: profileError } = await supabase
			.from('profiles')
			.update({ image: imageUrl })
			.eq('user_id', user.id)
			.select();

		if (profileData) {
			console.log('profileData', profileData, 'user.id', user.id);
		}
		if (profileError) {
			console.error(profileError);
			return new Response(profileError.message, {
				status: 500
			});
		}

		return json({ url: imageUrl });
	} catch (error) {
		console.error(error);
		return new Response(error.message, {
			status: 500
		});
	}
}
