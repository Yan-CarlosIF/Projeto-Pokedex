let offset = 0;
let limit = 20;
let pageNumber = 1;
let lastPage = 0;

const page = document.getElementById("loadMorePokemons");
const switchButton = document.querySelector(".switch");
const pokemonsList = document.getElementById("pokemonsList");
const rightButton = document.querySelector(".right");
const leftButton = document.querySelector(".left");

refreshPage();

rightButton.addEventListener("click", () => {
  if (offset >= 700) {
    offset = 701;
    lastPage++;
  } else {
    offset += limit;
  }

  if (lastPage < 2) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map((pokemon) =>
        `<pokemon-card name="${pokemon.name}" id="${pokemon.id}" types='${JSON.stringify(pokemon.types)}'></pokemon-card>`).join("");

      pokemonsList.innerHTML = newHtml;
      pageNumber++;
      page.textContent = pageNumber;
    });
  }
});

leftButton.addEventListener("click", () => {
  if (offset - limit < 0) {
    offset = 0;
    return;
  } else if (offset == 701) {
    offset--;
    lastPage = 0;
  } else {
    offset -= limit;
  }

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) =>
      `<pokemon-card name="${pokemon.name}" id="${pokemon.id}" types='${JSON.stringify(pokemon.types)}'></pokemon-card>`).join("");

    pokemonsList.innerHTML = newHtml;
  });

  pageNumber--;
  page.textContent = pageNumber;
});

switchButton.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

function searchPokemon() {
  const input = document.querySelector(".input-field");
  const search = input.value.toLowerCase();
  const searchId = parseInt(search);

  offset = 0;
  lastPage = 0;

  if (search === "") {
    // Se o input for vazio, volta para a primeira página
    refreshPage();
  } else if (isNaN(search)) {
    // Se o input não for um número, busca por nome
    findPokemonByName(search);
  } else if (typeof searchId === "number") {
    // Se o input for um número, busca por ID
    findPokemonById(searchId);
  }

  offset = 0;
}