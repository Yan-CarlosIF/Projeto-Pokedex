let offset = 0;
let limit = 20;
let pageNumber = 1;
let lastPage = 0;

const page = document.getElementById("loadMorePokemons");
page.textContent = pageNumber;
const pokemonsList = document.getElementById("pokemonsList");
const rightButton = document.querySelector(".right");
const leftButton = document.querySelector(".left");

pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(pokemon => `<pokemon-card name="${pokemon.name}" id="${pokemon.id}" types='${JSON.stringify(pokemon.types)}'></pokemon-card>`).join('');
    
    pokemonsList.innerHTML = newHtml;
});

rightButton.addEventListener('click', () => {
        if (offset >= 700) {
            offset = 701;
            lastPage++;
        } else {
            offset += limit;    
        }

        if (lastPage < 2) {
            pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
                const newHtml = pokemons.map(pokemon => `<pokemon-card name="${pokemon.name}" id="${pokemon.id}" types='${JSON.stringify(pokemon.types)}'></pokemon-card>`).join('');
                pokemonsList.innerHTML = newHtml;
                pageNumber++;
                page.textContent = pageNumber;
            });
        }
});

leftButton.addEventListener('click', () => {
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
        const newHtml = pokemons.map(pokemon => `<pokemon-card name="${pokemon.name}" id="${pokemon.id}" types='${JSON.stringify(pokemon.types)}'></pokemon-card>`).join('');
        pokemonsList.innerHTML = newHtml;
    });

    pageNumber--;
    page.textContent = pageNumber;
});