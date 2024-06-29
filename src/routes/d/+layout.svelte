<script>
	import MenuBar from '$lib/layout/MenuBar.svelte';
	import Icon from '@iconify/svelte';
	export let data;
	$: ({ supabase, user } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};
</script>

<div class="main-container">
	<header>
		<nav>
			<div class="logo">
				<a href="/d">
					<img src="/logo.png" alt="logo" />
				</a>
			</div>
			<!-- dropdown with topics and add new topic button -->
		</nav>
		<button on:click={logout}>
			<Icon icon="lucide:log-out" />
		</button>
	</header>
	<main>
		<slot />
		<div class="menu-container">
			<MenuBar {user} />
		</div>
	</main>
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100vw;
		justify-content: flex-start;
		/* align-items: center; */
		background-color: var(--main-background);
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem 0.3rem;
		width: 100%;
		/* background-color: #eee; */
		/* border-bottom: 1px solid #ccc; */
		box-sizing: border-box;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.logo {
		display: flex;
		align-items: center;
		width: 2rem;
		opacity: 0.8;
	}

	.logo img {
		width: 100%;
		height: 100%;
	}

	a {
		color: #222;
		text-decoration: none;
	}

	button {
		background-color: transparent;
		border: none;
		color: #222;
		/* font-size: 1.5rem; */
		cursor: pointer;
	}
	main {
		flex: 1;
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
	}

	.menu-container {
		position: fixed;
		bottom: 0.4rem;
		z-index: 10;
	}
</style>
