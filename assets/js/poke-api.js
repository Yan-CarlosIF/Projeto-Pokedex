const pokeApi = {};

pokeApi.getPokemonsDetails = (pokemon) => {
  return fetch(pokemon.url).then((response) => response.json());
};

pokeApi.getPokemons = (offset = 700, limit = 20) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  // Requisição
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
    .then((DetailsRequest) => Promise.all(DetailsRequest))
    .catch((error) => console.error(error));
};

function refreshPage() {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(pokemon => 
      `<pokemon-card name="${pokemon.name}" id="${pokemon.id}" types='${JSON.stringify(pokemon.types)}'></pokemon-card>`).join('');
      
    pokemonsList.innerHTML = newHtml;
  });

  pageNumber = 1;
  page.textContent = pageNumber;
}

function findPokemonById(id) {
  if (id > 0 && id < 722) {
    // limita os pokemons a 6 geração
    pokeApi.getPokemons(id - 1, 1).then((pokemons = []) => {
      const pokemonFound = pokemons.map((pokemon) =>
        `<pokemon-card name="${pokemon.name}" id="${pokemon.id}" types='${JSON.stringify(pokemon.types)}'></pokemon-card>`).join("");

      if (pokemonFound) {
        pokemonsList.innerHTML = pokemonFound;
      }
    });
  }
}

function findPokemonByName(name) {
  pokemonsList.innerHTML = "";
  offset = 0;
  limit = 721;

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemons.map((pokemon) => {
      if (pokemon.name.toLowerCase().startsWith(name.toLowerCase())) {
        pokemonsList.innerHTML += `<pokemon-card name="${pokemon.name}" id="${pokemon.id}" types='${JSON.stringify(pokemon.types)}'></pokemon-card>`;
      }
    });
  });

  limit = 20;
}