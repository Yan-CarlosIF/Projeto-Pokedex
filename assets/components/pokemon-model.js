class Pokemon extends HTMLElement {
  #color;

  constructor() {
    super();
    this.types = JSON.parse(this.getAttribute("types"));
    this.#color = this.types[0].type.name.toLowerCase();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = this.buildPokemon();
    shadow.appendChild(this.styles());
  }

  buildPokemon() {
    const typesList = this.types.map((type) =>`<li class="type" color-type="${this.#color}">${type.type.name}</li>`).join("");

    let name = this.getAttribute("name");
    if (name.includes("-")) {
      let parts = name.split("-");
      name = parts.length > 2 ? parts[0] : `${parts[0]}-${parts[1]}`;
    }

    const imageName = name.toLowerCase();

    return `
    <li class="pokemon" color-type="${this.#color}">
      <span class="number">#${this.getAttribute("id").padStart(3, "0")}</span>
      <span class="name">${imageName}</span>
      <div class="detail">
        <ul class="types">${typesList}</ul>
        <img src="https://img.pokemondb.net/sprites/home/normal/${imageName}.png" alt="${name}" />
      </div>
    </li>`;
  }

  styles() {
    const style = document.createElement("style");
    
    style.textContent = `
    .pokemon {
      display: flex;
      flex-direction: column;
      margin: .5rem;
      padding: 1rem;
      border-radius: 1rem;
      background-color: #48d0b0;
      color: #fff;
    }

    .pokemon .number {
      color: #191919a3;
      opacity: .9;
      text-align: right;
      font-size: .625rem;
    }

    .pokemon .name {
      color: #fff;
      margin-bottom: .25rem;
      text-transform: capitalize;
    }

    .pokemon .detail {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .pokemon .detail .types {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .pokemon .detail .types .type {
      background-color: #ffffff38;
      color: #fff;
      padding: .25rem .5rem;
      font-size: .625rem;
      margin: .25rem 0;
      border-radius: 1rem;
      text-align: center;
    }

    .pokemon .detail img {
      max-width: 100%;
      height: 80px;
    }

    [color-type="grass"] {
      background-color: #65d32d;
    }

    [color-type="poison"] {
      background-color: #a040a0;
    }

    [color-type="fire"] {
      background-color: #f08030;
    }

    [color-type="water"] {
      background-color: #68c0f0;
    }

    [color-type="bug"] {
      background-color: #acbb22;
    }

    [color-type="normal"] {
      background-color: #bbbb8c;
    }

    [color-type="electric"] {
      background-color: #f8d030;
    }

    [color-type="ground"] {
      background-color: #e0c068;
    }

    [color-type="fairy"] {
      background-color: #ee99ac;
    }

    [color-type="fighting"] {
      background-color: #c03028;
    }

    [color-type="psychic"] {
      background-color: #f85888;
    }

    [color-type="rock"] {
      background-color: #b8a038;
    }

    [color-type="ghost"] {
      background-color: #705898;
    }

    [color-type="ice"] {
      background-color: #98d8d8;
    }

    [color-type="dragon"] {
      background-color: #7038f8;
    }

    [color-type="dark"] {
      background-color: #705848;
    }

    [color-type="steel"] {
      background-color: #b8b8d0;
    }

    [color-type="flying"] {
      background-color: #a890f0;
    }`;

    return style;
  }
}

customElements.define("pokemon-card", Pokemon);