<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { entries, showModal, entryToEdit, topics } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';

	let url = '';
	let info = writable({ type: '', url: '', title: '', description: '', author: '', image: '' });
	let loading = writable(false);
	let newTopic = { name: '', color: '' };
	let showNewTopicForm = true;

	$: if ($entryToEdit) {
		console.log('entryToEdit', $entryToEdit);
		info.set($entryToEdit);
		console.log('topics', $topics);
	}

	const extractInfo = async (url) => {
		loading.set(true);
		try {
			const response = await fetch('/api/extract', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ url })
			});
			if (!response.ok) {
				throw new Error('Failed to fetch metadata');
			}
			const data = await response.json();
			info.set(data);
		} catch (error) {
			console.error('Error extracting info:', error);
			info.set({ error: 'Failed to extract information' });
		}
		loading.set(false);
	};

	const saveEntry = async () => {
		loading.set(true);
		try {
			const entry = $info;

			if (!entry.topic) {
				throw new Error('Topic is required');
			}

			const response = await fetch('/api/entries', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(entry)
			});
			if (!response.ok) {
				throw new Error('Failed to save entry');
			}
			const savedEntry = await response.json();
			if (entry.id) {
				entries.set($entries.map((e) => (e.id === entry.id ? savedEntry : e)));
			} else {
				entries.set([savedEntry, ...$entries]);
			}
			showModal.set(false);
			resetForm();
		} catch (error) {
			console.error('Error saving entry:', error);
		}
		loading.set(false);
	};

	const deleteEntry = async () => {
		loading.set(true);
		try {
			const response = await fetch('/api/entries', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: $info.id })
			});
			if (!response.ok) {
				throw new Error('Failed to delete entry');
			}
			entries.set($entries.filter((entry) => entry.id !== $info.id));
			showModal.set(false);
			resetForm();
		} catch (error) {
			console.error('Error deleting entry:', error);
		}
		loading.set(false);
	};

	const addNewTopic = () => {
		if (newTopic.name && newTopic.color) {
			const newTopicObject = { id: Date.now(), ...newTopic }; // Temporary ID for new topic
			info.update((i) => ({ ...i, topic: newTopicObject }));
			topics.update((t) => [...t, newTopicObject]);
			newTopic = { name: '', color: '' };
			showNewTopicForm = false;
		}
	};

	const handleTopicChange = (event) => {
		if (event.target.value === 'new') {
			showNewTopicForm = true;
		} else {
			const selectedTopicId = event.target.value;
			const selectedTopic = $topics.find((topic) => topic.id === parseInt(selectedTopicId));
			info.update((i) => ({ ...i, topic: selectedTopic }));
		}
	};

	const resetForm = () => {
		url = '';
		info.set({ type: '', url: '', title: '', description: '', author: '', image: '' });
	};
</script>

<div class="container">
	{#if !$entryToEdit}
		<input
			class="url-input"
			type="text"
			name="url"
			id="url"
			placeholder="Paste URL here"
			bind:value={url}
			on:input={() => extractInfo(url)}
		/>
	{/if}
	<div class="info-container" class:active={$info.title}>
		{#if $loading}
			<div class="loading"></div>
		{:else if $info.title}
			<div class="info-card-container">
				<InfoCard entry={$info} />
			</div>
			<div class="edit-form">
				<label for="">
					Topic:
					<select on:change={handleTopicChange}>
						<option value="" disabled>Select a topic</option>
						{#each $topics as topic}
							<option value={topic.id} selected={topic.id === $info.topic?.id}>{topic.name}</option>
						{/each}
						<hr />
						<option value="new">+ Add new topic</option>
					</select>
				</label>
				{#if showNewTopicForm}
					<div class="new-topic-form">
						<label>
							New Topic Name:
							<input type="text" bind:value={newTopic.name} />
						</label>
						<label>
							New Topic Color:
							<input type="color" bind:value={newTopic.color} />
						</label>
						<button on:click={addNewTopic}>Add Topic</button>
					</div>
				{/if}
				<label>
					Type:
					<select bind:value={$info.type}>
						<option value="article">Article</option>
						<option value="book">Book</option>
						<option value="video">Video</option>
						<option value="tvshow">TV Show</option>
						<option value="movie">Movie</option>
						<option value="music">Music</option>
						<option value="podcast">Podcast</option>
						<option value="other">Other</option>
					</select>
				</label>
				<label>
					URL:
					<input
						type="text"
						bind:value={$info.url}
						on:input={(e) => ($info.url = e.target.value)}
					/>
				</label>
				<label>
					Title:
					<input
						type="text"
						bind:value={$info.title}
						on:input={(e) => ($info.title = e.target.value)}
					/>
				</label>
				<label>
					Description:
					<textarea
						bind:value={$info.description}
						on:input={(e) => ($info.description = e.target.value)}
					></textarea>
				</label>
				<label>
					User note:
					<textarea
						bind:value={$info.user_note}
						on:input={(e) => ($info.user_note = e.target.value)}
					></textarea>
				</label>
				<label>
					Author:
					<input
						type="text"
						bind:value={$info.author}
						on:input={(e) => ($info.author = e.target.value)}
					/>
				</label>
				<label>
					Image URL:
					<input
						type="text"
						bind:value={$info.image}
						on:input={(e) => ($info.image = e.target.value)}
					/>
				</label>
				<div class="button-container">
					<button class="save-button" on:click={saveEntry}>Save Entry</button>
					{#if $info.id}
						<button class="delete-button" on:click={deleteEntry}>Delete Entry</button>
					{/if}
				</div>
			</div>
		{:else if $info.error}
			<p class="error">{$info.error}</p>
		{/if}
	</div>
</div>

<style>
	.container {
		width: 100%;
		max-width: 600px;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding-top: 1.2rem;
		background-color: #fff;
	}

	.url-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 0.375rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		font-size: 1rem;
		box-sizing: border-box;
	}

	.loading {
		width: 48px;
		height: 48px;
		border: 5px solid #333;
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.info-container.active {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 0.5rem;
		padding-top: 1.2rem;
	}

	.edit-form {
		width: 100%;
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
	}

	.edit-form label {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		font-size: 0.875rem;
		color: #333;
	}

	.edit-form input,
	.edit-form textarea,
	.edit-form select {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 0.375rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		font-size: 1rem;
		box-sizing: border-box;
		font-family: inherit;
	}

	.edit-form textarea {
		resize: vertical;
		height: 8rem;
	}

	.new-topic-form {
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}

	.button-container {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
	.new-topic-form button,
	.save-button,
	.delete-button {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.375rem;
		font-size: 1rem;
		cursor: pointer;
	}

	.new-topic-form button {
		background-color: #007bff;
		color: white;
	}

	.save-button {
		background-color: #007bff;
		color: white;
	}

	.save-button:hover {
		background-color: #0056b3;
	}

	.delete-button {
		background-color: #dc3545;
		color: white;
	}

	.delete-button:hover {
		background-color: #c82333;
	}

	.error {
		color: red;
	}
</style>
