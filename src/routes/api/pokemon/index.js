export async function get() {
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
		status: 200,
		body: loadedPokemons
	};
}
