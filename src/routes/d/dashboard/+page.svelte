<script>
	import InfoCard from '$lib/components/InfoCard.svelte';
	import Icon from '@iconify/svelte';
	import EditInfoCard from '$lib/components/EditInfoCard.svelte';
	import { flip } from 'svelte/animate';
	import Modal from '$lib/components/Modal.svelte';
	import { showModal, entries } from '$lib/stores';

	export let data;
	entries.set(data.entries);

	const handleEntryEdited = (event) => {
		const newEntry = event.detail;
		console.log('newEntry', newEntry);
		// entries = entries.map((entry) => (entry.id === newEntry.id ? newEntry : entry));
	};

	const handleEntryDeleted = async (event) => {
		const deletedEntry = event.detail;
		const response = await fetch('/api/entries', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: deletedEntry.id })
		});
		if (!response.ok) {
			throw new Error('Failed to delete entry');
		}
		entries.set($entries.filter((entry) => entry.id !== deletedEntry.id));
	};
</script>

<div class="container">
	<div class="entry-grid">
		<!-- <button class="add-card-button" on:click={() => showModal.set(true)}>
			<Icon icon="mdi:plus" />
		</button> -->
		{#each $entries as entry (entry.id)}
			<a href={entry.url} target="_blank" animate:flip={{ duration: 200 }}>
				<InfoCard {entry} on:editEntry={handleEntryEdited} on:deleteEntry={handleEntryDeleted} />
			</a>
		{/each}
	</div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<Modal>
	<EditInfoCard />
</Modal>

<style>
	.container {
		width: 100%;
	}
	.entry-grid {
		padding: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
	.add-card-button {
		width: 60px;
		height: 60px;
		padding: 0;
		border: none;
		font-size: 2.4rem;
		line-height: 1;
		color: #4d4d4d;
		border: 3px solid #4d4d4d;
		border-radius: 50%;
		background-color: transparent;
		/* box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.09); */
		cursor: pointer;
		transform: scale(0.95);
		transition: all 0.2s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.add-card-button:hover {
		background-color: #aaccff33;
		transform: scale(1);
	}
	dialog {
		width: 100%;
		max-width: 920px;
		border-radius: 0.2em;
		border: none;
		padding: 1rem;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.close-button {
		position: absolute;
		top: 0;
		left: 0;
		padding: 0.5rem;
		font-size: 1.5rem;
		line-height: 1;
		border: none;
		color: #4d4d4d;
		background-color: transparent;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.entry-grid {
			flex-direction: column;
			align-items: center;
			padding: 0;
			gap: 0.3rem;
		}

		dialog {
			max-width: 100%;
		}
	}
</style>
