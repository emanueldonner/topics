<script>
	import { createEventDispatcher } from 'svelte';

	export let entry;

	const dispatch = createEventDispatcher();

	const editEntry = (entry) => {
		dispatch('editEntry', entry);
	};
	const deleteEntry = (entry) => {
		dispatch('deleteEntry', entry);
	};
</script>

<div class="card">
	{#if entry.id}
		<div class="edit-overlay">
			<button on:click|preventDefault={() => editEntry(entry)}>edit</button>
			<button on:click|preventDefault={() => deleteEntry(entry)}>delete</button>
		</div>
	{/if}
	<div class="image">
		<img src={entry.image} alt={entry.title} />
	</div>
	<div class="card-body">
		<span class="card-type">{entry.type}</span>
		<h5 class="card-title">{entry.title}</h5>
		<div class="card-text-container">
			<p class="card-text">{entry.description}</p>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');

	.card {
		position: relative;
		padding: 0;
		background-color: #000;
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
		top: 0;
		right: 0;
		padding: 0.2rem 0.4rem;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		gap: 0.5rem;
		z-index: 1;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.card:hover .edit-overlay {
		opacity: 1;
	}

	.edit-overlay button {
		background: none;
		border: none;
		padding: 0;
		color: white;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
	}

	.image {
		width: 100%;
		height: 18rem;
	}

	img {
		border-top-left-radius: var(--card-radius);
		border-top-right-radius: var(--card-radius);
		width: 100%;
		height: 14rem;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.card-body {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0.6rem 1.4rem;
		background: rgba(255, 255, 255, 0.96);
		color: #333;
		box-sizing: border-box;
		transition: height 0.3s ease;
	}

	.card-type {
		font-size: 0.8rem;
		padding: 0.3rem 0.5rem;
		border-radius: 0.5rem;
		background-color: #555;
		color: white;
		display: inline-block;
	}

	.card-title {
		margin: 0.6rem 0;
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
			border-radius: 0;
			box-shadow: none;
		}
		.card:hover img {
			transform: scale(1);
		}
		.card-body {
			position: static;
			background: white;
		}

		.image {
			height: auto;
			width: 100%;
		}

		img {
			height: auto;
			width: 100%;
			border-radius: 0;
		}
	}
</style>
