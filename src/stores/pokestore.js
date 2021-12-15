import { writable } from 'svelte/store';

export const pokemon = writable([]);

const url = 'https://pokeapi.co/api/v2/pokemon?limit=100';

export const fetchPokemon = async () => {
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

	pokemon.set(loadedPokemons);
};
