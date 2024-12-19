let offset = 0;
let limit = 20;
let pageNumber = 1;
let lastPage = 0;

const page = document.getElementById("loadMorePokemons");
const switchButton = document.querySelector(".switch");
switchButton.style.backgroundImage = "url('/assets/images/handle dark.svg')";
page.textContent = pageNumber;
const pokemonsList = document.getElementById("pokemonsList");
const rightButton = document.querySelector(".right");
const leftButton = document.querySelector(".left");

pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(pokemon => `<pokemon-card name="${pokemon.name}" id="${pokemon.id}" types='${JSON.stringify(pokemon.types)}'></pokemon-card>`).join('');
    
    pokemonsList.innerHTML = newHtml;
});

rightButton.addEventListener("click", () => {
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
        const newHtml = pokemons.map(pokemon => `<pokemon-card name="${pokemon.name}" id="${pokemon.id}" types='${JSON.stringify(pokemon.types)}'></pokemon-card>`).join('');
        pokemonsList.innerHTML = newHtml;
    });

    pageNumber--;
    page.textContent = pageNumber;
});

switchButton.addEventListener("click", () => {
    const h1 = document.querySelector("h1");
    const body = document.querySelector("body");
    const button = document.querySelector(".switch");
    const content = document.querySelector(".content");
    const input = document.querySelector(".input-field");

    if (button.style.backgroundImage == 'url("/assets/images/handle dark.svg")') {
        button.style.backgroundImage = "url('/assets/images/handle light.svg')";
        
        h1.style.color = "#fff";
        body.style.backgroundColor = "#5b5b5b";

        content.style.backgroundColor = "#434343";
        content.style.boxShadow = "9px 9px 27px 0px rgba(203, 203, 203, 0.2)";
        content.style.webkitBoxShadow = "9px 9px 27px 0px rgba(203, 203, 203, 0.2)";
        content.style.mozBoxShadow = "9px 9px 27px 0px rgba(203, 203, 203, 0.2)";

        input.style.color = "#fff";
        input.style.backgroundColor = "#434343";
        input.style.boxShadow = "0px 0px 2px 1px rgba(203, 203, 203, 0.3)";
    } else {
        button.style.backgroundImage = "url('/assets/images/handle dark.svg')";
        
        h1.style.color = "#000";
        body.style.backgroundColor = "#f5f5f5";

        content.style.backgroundColor = "#fff";
        content.style.boxShadow = "9px 9px 27px 0px rgba(0, 0, 0, 0.3)";
        content.style.webkitBoxShadow = "9px 9px 27px 0px rgba(0, 0, 0, 0.3)";
        content.style.mozBoxShadow = "9px 9px 27px 0px rgba(0, 0, 0, 0.3)";
        
        input.style.color = "#000";
        input.style.backgroundColor = "#fff";
        input.style.boxShadow = "0px 0px 2px 1px #00000040";
    }
});