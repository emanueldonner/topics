<script>
	import InfoCard from '$lib/components/InfoCard.svelte';
	import Icon from '@iconify/svelte';
	import EditInfoCard from '$lib/components/EditInfoCard.svelte';
	import { flip } from 'svelte/animate';
	import Modal from '$lib/components/Modal.svelte';
	import { showModal, entries, entryToEdit, topics } from '$lib/stores';

	export let data;
	entries.set(data.entries);
	topics.set(data.topics);
	const { profile } = data;
	console.log('profile', profile);

	const handleEntryEdited = (event) => {
		const newEntry = event.detail;
		console.log('newEntry', newEntry.detail);
		entryToEdit.set(newEntry.detail);
		showModal.set(true);
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
			<div target="_blank" animate:flip={{ duration: 200 }}>
				<InfoCard
					{profile}
					{entry}
					on:editEntry={handleEntryEdited}
					on:deleteEntry={handleEntryDeleted}
				/>
			</div>
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
		/* padding: 1rem; */
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	a {
		text-decoration: none;
	}

	@media (max-width: 768px) {
		.entry-grid {
			flex-direction: column;
			align-items: center;
			padding: 0.3rem;
			gap: 1rem;
		}
	}
</style>
