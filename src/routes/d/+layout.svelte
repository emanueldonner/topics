<script>
	export let data;
	$: ({ supabase } = data);

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
			<a href="/d">Home</a>
			<a href="/d/dashboard">Dashboard</a>
		</nav>
		<button on:click={logout}>Logout</button>
	</header>
	<main>
		<slot />
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
		padding: 1rem;
		width: 100%;
		/* background-color: #eee; */
		padding: 1rem;
		/* border-bottom: 1px solid #ccc; */
		box-sizing: border-box;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1rem;
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
</style>
