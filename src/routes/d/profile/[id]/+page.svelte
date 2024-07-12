<script>
	import { entries } from '$lib/stores';
	import InfoCard from '$lib/components/InfoCard.svelte';
	import Icon from '@iconify/svelte';
	import CardType from '$lib/components/InfoCard/CardType.svelte';

	export let data;
	const { profile } = data;

	const addProfileImage = () => {
		const input = document.querySelector('input[type="file"]');
		if (input) {
			input.click();
		}
	};

	const uploadProfileImage = async (event) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append('file', file);
		const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData
		});

		if (!response.ok) {
			throw new Error('Failed to upload profile image');
		}
		const data = await response.json();
		profile.image = data.url;
	};
</script>

<div class="container">
	<div class="profile-container">
		<button on:click={addProfileImage} class="add-profile-pic">
			<div class="profile-image">
				{#if profile.image}
					<img src={profile.image} alt="profile pic" />
				{:else}
					<!-- <img src="https://i.pravatar.cc/100?id={profile.user_id}" alt="profile" /> -->

					<Icon icon="lucide:image" />
				{/if}
			</div>
			<input type="file" accept="image/*" on:change={uploadProfileImage} hidden />
		</button>
		<div class="profile-name">{profile.name}</div>
	</div>
	<div class="entries-container">
		{#each $entries as entry (entry.id)}
			<div class="entry-image">
				<img src={entry.image} alt={entry.title} />
				<div class="type-icon">
					<CardType type={entry.type} />
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
	}
	.profile-container {
		padding: 1rem 0 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.profile-image {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
		border: 1px solid #ccc;
	}

	.profile-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.add-profile-pic {
		width: 100%;
		height: 100%;
		border: none;
		background-color: transparent;
		color: #333;
		cursor: pointer;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.profile-name {
		font-size: 1rem;
		font-weight: 700;
		color: #333;
	}

	.entries-container {
		/* width: 100%; */
		display: grid;
		/* 3 columns per row */
		grid-template-columns: repeat(3, 1fr);
		gap: 2px;
	}

	.entry-image {
		aspect-ratio: 1;
		position: relative;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		/* border-radius: 0.5rem; */
	}

	.type-icon {
		position: absolute;
		bottom: 0.5rem;
		right: 0.5rem;
	}
</style>
