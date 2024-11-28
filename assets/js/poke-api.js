const pokeApi = {}

pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())     
}

pokeApi.getPokemons = (offset = 700, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    // Requisição
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokeApi.getPokemonsDetails)))
        .then((DetailsRequest) => Promise.all(DetailsRequest))
        .catch((error) => console.error(error));
}