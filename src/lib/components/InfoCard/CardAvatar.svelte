<script>
	export let includeName = false;
	export let size = 'medium';
	export let profile;

	const randomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
	let userName;
	async function getRandomUsername() {
		// Generate a random user ID between 1 and 10
		const userId = randomNumber(1, 10);

		const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

		if (!response.ok) {
			throw new Error('Failed to fetch user data');
		}

		const user = await response.json();

		// Assuming the API response contains 'name' field
		const fullName = user.name;
		console.log('fullName', fullName);
		return fullName;
	}

	async function displayUserName() {
		try {
			userName = await getRandomUsername();
		} catch (error) {
			console.error('Error fetching username:', error);
		}
	}

	// Call the function to fetch and display the username when the script runs
	displayUserName();
</script>

<div class="user-avatar" class:small={size === 'small'}>
	{#if profile?.image}
		<img src={profile.image} alt="user avatar" />
	{:else}
		<img src="https://i.pravatar.cc/60?id={randomNumber(1, 70)}" alt="user avatar" />
	{/if}
</div>
{#if includeName}
	<div class="user-name">
		{#if profile?.name}
			{profile.name}
		{:else}
			{userName}
		{/if}
	</div>
{/if}

<style>
	.user-avatar {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background-color: #ccc;
		margin-right: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.small {
		width: 1rem;
		height: 1rem;
	}

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
	}

	.user-name {
		font-size: 0.8rem;
		color: #fff;
	}
</style>
