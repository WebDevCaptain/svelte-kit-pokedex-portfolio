<script context="module">
	export async function load({ page }) {
		const url = 'https://pokeapi.co/api/v2/pokemon?limit=100';

		const res = await fetch(url);
		const data = await res.json();

		const loadedPokemons = data.results.map((data, idx) => {
			return {
				name: data.name,
				id: idx + 1,
				image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
					idx + 1
				}.png`
			};
		});
		return {
			props: { pokemon: loadedPokemons }
		};
	}
</script>

<script>
	import PokemonCard from '../components/PokemonCard.svelte';

	export let pokemon;

	// import { onMount } from 'svelte';
	// import { pokemon, fetchPokemon } from '../stores/pokestore';

	// onMount(async () => {
	// 	await fetchPokemon();
	// });

	let searchTerm = '';
	let filteredPokemon = [];

	$: {
		if (searchTerm) {
			// console.log(searchTerm);
			filteredPokemon = pokemon.filter((pokeman) =>
				pokeman.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredPokemon = [...pokemon];
		}
	}
</script>

<svelte:head>
	<title>Pokedex Project</title>
</svelte:head>

<main>
	<h1 class="text-4xl text-center my-8 uppercase">Svelte Kit Pokedex</h1>

	<input
		type="text"
		bind:value={searchTerm}
		placeholder="Search for Pokemons"
		class="w-full rounded-md text-lg p-4 border-2 border-gray-200"
	/>

	<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
		{#each filteredPokemon as pokeman}
			<PokemonCard {pokeman} />
		{/each}
	</div>
</main>

<style>
</style>
