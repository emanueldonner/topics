<script>
	import { createEventDispatcher } from 'svelte';
	import CardType from './InfoCard/CardType.svelte';
	import CardEditOverlay from './InfoCard/CardEditOverlay.svelte';
	import Icon from '@iconify/svelte';
	import CardAvatar from './InfoCard/CardAvatar.svelte';
	import CardInteraction from './InfoCard/CardInteraction.svelte';
	import CardUserNote from './InfoCard/CardUserNote.svelte';

	export let entry;

	const dispatch = createEventDispatcher();

	const editEntry = (entry) => {
		dispatch('editEntry', entry);
	};
	const deleteEntry = (entry) => {
		dispatch('deleteEntry', entry);
	};

	const shortUrl = (url) => {
		// Extract the domain name from the URL
		const domain = new URL(url).hostname;

		// Return the first 10 characters of the domain name
		return domain;
	};
</script>

<div class="card">
	{#if entry.id}
		<div class="edit-overlay">
			<CardEditOverlay {entry} on:editEntry={editEntry} />
		</div>
	{/if}
	<div class="image">
		<div class="user-wrapper">
			<CardAvatar includeName />
		</div>
		<img src={entry.image} alt={entry.title} />
		<div class="card-type">
			<CardType type={entry.type} />
		</div>
	</div>
	<div class="interaction-container">
		<CardInteraction {entry} />
	</div>
	<div class="card-body">
		<a href={entry.url} class="card-url" target="_blank"
			>{shortUrl(entry.url)}

			<Icon icon="lucide:link" />
		</a>
		<h5 class="card-title">{entry.title}</h5>
		<div class="card-text-container">
			<p class="card-text">{entry.description}</p>
		</div>
		{#if entry.user_note}
			<CardUserNote userNote={entry.user_note} />
		{/if}
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');

	.card {
		position: relative;
		padding: 0;
		background: rgba(255, 255, 255, 0.96);
		border-radius: var(--card-radius);
		width: 16rem;
		box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.09);
		color: #333 !important;
		font-family: 'Quicksand', sans-serif;
		overflow: hidden;
		cursor: pointer;
	}

	.edit-overlay {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		/* mix-blend-mode: difference; */
		z-index: 2;
	}
	.card:hover .edit-overlay {
		opacity: 1;
	}

	.image {
		width: 100%;
		height: 18rem;
		position: relative;
	}

	.user-wrapper {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 1.5rem;
		padding: 0.4rem 0.8rem 0.4rem 0.4rem;
		/* background blur */
		backdrop-filter: blur(10px);
	}

	img {
		border-top-left-radius: var(--card-radius);
		border-top-right-radius: var(--card-radius);
		width: 100%;
		height: 14rem;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.card-type {
		position: absolute;
		bottom: 0.5rem;
		right: 0.5rem;
	}

	.card-body {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0.6rem 0.6rem;

		color: #333;
		box-sizing: border-box;
		transition: height 0.3s ease;
	}

	.card-url {
		font-size: 0.8rem;
		color: #999;
		margin: 0;
		text-wrap: nowrap;
		overflow-x: hidden;
		max-width: 80vw;
		text-decoration: none;
	}
	.card-title {
		margin: 0rem 0 0.6rem;
		font-weight: 700;
	}

	.card-text-container {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.3s ease;
	}

	.card:hover .card-text-container {
		max-height: 10rem; /* Adjust this value as needed */
		/* overflow-y: auto; */
	}

	.card:hover img {
		transform: scale(1.1);
	}

	.card-text {
		font-size: 0.9rem;
		margin: 0.6rem 0;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.card:hover .card-text {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.card {
			width: 100%;
			height: auto;
			padding: 0;
			box-shadow: none;
			border-bottom: 1px solid rgba(0, 0, 0, 0.03);
			border-radius: 0.2rem;
		}
		.card:hover img {
			transform: scale(1);
		}
		.card-body {
			position: static;
			/* background: white; */
		}

		.image {
			height: auto;
			width: 100%;
		}

		img {
			height: auto;
			width: 100%;
		}
	}
</style>
