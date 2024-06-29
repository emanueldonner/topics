<script>
	import { showModal } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import Modal from '../components/Modal.svelte';
	import EditInfoCard from '../components/EditInfoCard.svelte';
	export let user;
</script>

<div class="menu-bar">
	<a href="/d/dashboard">
		<!-- home icon -->
		<Icon icon="lucide:home" />
	</a>
	<a href="#">
		<Icon icon="lucide:search" />
	</a>
	<button class="add-card-button" on:click={() => showModal.set(true)}>
		<Icon icon="lucide:diamond-plus" />
	</button>
	<a href="#">
		<Icon icon="lucide:tag" />
	</a>
	<a href="/d/profile/{user.id}">
		<Icon icon="lucide:circle-user-round" />
	</a>
</div>

<Modal>
	<EditInfoCard />
</Modal>

<style>
	.menu-bar {
		width: 100vw;
		background: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		border-radius: 1.5rem;
		/* border-top-right-radius: 1.5rem; */
	}

	button,
	a {
		border: none;
		text-decoration: none;
		font-size: 1.6rem;
		background: none;
		color: #222;
	}

	.add-card-button {
		transform: scale(1.3);
	}
</style>
