<script>
	import Icon from '@iconify/svelte';

	import { showModal } from '$lib/stores';

	let dialog; // HTMLDialogElement

	console.log('showmodal', $showModal);

	$: if (dialog && $showModal) dialog.showModal();
	$: if (dialog && !$showModal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => showModal.set(false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()} class="close-button">
			<Icon icon="mdi:close" />
		</button>
		<slot />
	</div>
</dialog>

<style>
	dialog {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100vh;
		max-width: 920px;
		border-radius: 0.2em;
		border: none;
		padding: 0rem 1rem 2rem;
		overflow-y: scroll;
		background-color: white;
		transform: translateY(100%);
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		transform: translateY(3%);
		animation: toasting 0.3s ease;
	}
	@keyframes toasting {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(3%);
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
		font-size: 1.1rem;
		line-height: 1;
		border: none;
		color: #222;
		background-color: transparent;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		dialog {
			max-width: 100%;
		}
	}
</style>
