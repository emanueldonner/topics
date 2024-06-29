<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { entries, showModal, entryToEdit } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';

	let url = '';
	let info = writable({ type: '', url: '', title: '', description: '', author: '', image: '' });
	let loading = writable(false);
	const dispatch = createEventDispatcher();

	$: if ($entryToEdit) {
		console.log('entryToEdit', $entryToEdit);
		info.set($entryToEdit);
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
			console.log('savedEntry', savedEntry);
			entries.set([savedEntry, ...$entries]);
			showModal.set(false);
			resetForm();
		} catch (error) {
			console.error('Error saving entry:', error);
		}
		loading.set(false);
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
				<label>
					Type:
					<p>{$info.type}</p>
					<!-- dropdown with types -->
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
				<button on:click={saveEntry}>Save Entry</button>
			</div>
		{:else if $info.error}
			<p class="error">{$info.error}</p>
		{/if}
	</div>
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
		min-height: 30rem;
	}
	.url-input {
		width: 80%;
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		margin-bottom: 1rem;
		box-sizing: border-box;
	}
	/* Add your styles here */
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
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		background-color: #fff;
		border-radius: 0.5rem;
		padding: 1rem;
		box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.09);
	}

	.edit-form {
		margin-top: 1rem;
	}

	.edit-form label {
		display: block;
		margin-bottom: 0.5rem;
	}

	.edit-form input,
	.edit-form textarea {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		margin-bottom: 1rem;
		box-sizing: border-box;
	}

	.error {
		color: red;
	}
</style>
