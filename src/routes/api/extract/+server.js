// src/routes/api/extract/+server.js

import { json } from '@sveltejs/kit';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export const POST = async ({ request }) => {
	const { url } = await request.json();

	try {
		const response = await fetch(url);
		const html = await response.text();
		const $ = cheerio.load(html);
		const metadata = {
			url: $('meta[property="og:url"]').attr('content') || url,
			title: $('meta[property="og:title"]').attr('content') || $('title').text(),
			description:
				$('meta[property="og:description"]').attr('content') ||
				$('meta[name="description"]').attr('content'),
			image: $('meta[property="og:image"]').attr('content'),
			type: $('meta[property="og:type"]').attr('content') || 'website'
		};
		const metadata_other = {};

		$('meta').each((_, element) => {
			const property = $(element).attr('property');
			if (property && property.startsWith('og:')) {
				metadata_other[property] = $(element).attr('content');
			}
		});

		// Extract author from JSON-LD or Microdata
		const jsonLdScript = $('script[type="application/ld+json"]').html();
		if (jsonLdScript) {
			try {
				const jsonData = JSON.parse(jsonLdScript);
				if (jsonData.author) {
					metadata_other['author'] = jsonData.author[0].name || jsonData.author;
				}
			} catch (e) {
				console.error('Failed to parse JSON-LD:', e);
			}
		}

		// Additional scraping logic for author
		// if (!metadata_other.author) {
		// 	// Example: search for an element with specific classes or other attributes
		// 	const authorElement = $('[itemprop="author"], .author, .byline').first();
		// 	if (authorElement.length) {
		// 		metadata_other['author'] = author;
		// 	}
		// }

		// Additional scraping logic for title and description as a fallback
		if (!metadata_other['og:title']) {
			metadata_other['title'] = $('title').text() || 'No title found';
		}

		if (!metadata_other['og:description']) {
			const metaDescription = $('meta[name="description"]').attr('content');
			if (metaDescription) {
				metadata_other['description'] = metaDescription;
			} else {
				// Fallback: try to extract the first paragraph as a description
				const firstParagraph = $('p').first().text();
				if (firstParagraph) {
					metadata_other['description'] = firstParagraph;
				} else {
					metadata_other['description'] = 'No description found';
				}
			}
		}

		// Additional scraping logic for image as a fallback
		if (!metadata_other['og:image']) {
			const firstImage = $('img').first().attr('src');
			if (firstImage) {
				metadata_other['image'] = firstImage;
			} else {
				metadata_other['image'] = 'No image found';
			}
		}

		// Add more detailed extraction based on the type
		if (metadata.type.includes('article')) {
			metadata.type = 'article';
			metadata.author = metadata_other['author'];
			metadata.published_time = $('meta[property="article:published_time"]').attr('content');
		} else if (metadata.type.includes('book')) {
			metadata.type = 'book';
			metadata.author = metadata_other['author'];
			metadata.release_date = $('meta[property="book:release_date"]').attr('content');
		} else if (metadata.type.includes('video')) {
			metadata.type = 'video';
		} else if (metadata.type.includes('movie')) {
			metadata.type = 'movie';
			metadata.director = $('meta[property="video:director"]').attr('content');
			metadata.release_date = $('meta[property="video:release_date"]').attr('content');
		} else if (metadata.type.includes('tvshow')) {
			metadata.type = 'tvshow';
		} else if (metadata.type.includes('music')) {
			metadata.type = 'music';
			metadata.artist = $('meta[property="music:musician"]').attr('content');
			metadata.album = $('meta[property="music:album"]').attr('content');
		}

		console.log('metadata', metadata, 'metadata_other', metadata_other);

		return json(metadata);
	} catch (error) {
		return json({ error: 'Failed to fetch URL' }, { status: 500 });
	}
};
