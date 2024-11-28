class Pokemon {
    #color;
    
    constructor(name, id, types) {
        this.name = name;
        this.id = parseInt(id);
        this.types = [...types];
        this.#color = types[0].type.name.toLocaleLowerCase();
    }
    
    ConvertPokemonToLi() {  

        const typesList = this.types.map(Type => `<li class="type" color-type="${this.#color}">${Type.type.name}</li>`).join('');
        
        if (this.name.includes("-")) {
            this.name = this.name.split("-");

            if (this.name.length > 2) {
              this.name = this.name[0];
            } else {
              this.name = this.name[0] + "-" + this.name[1];
            }
        }

        return `
            <li class="pokemon" color-type="${(this.#color).toLocaleLowerCase()}">
              <span class="number">#${(this.id).toString().padStart(3, "0")}</span>
              <span class="name">${this.name}</span>

              <div class="detail">
                <ul class="types">
                  ${typesList}
                </ul>
    
                <img src="https://img.pokemondb.net/sprites/home/normal/${this.name}.png"
                     alt="${this.name}"/>
              </div>
            </li>
        `
    }
}
