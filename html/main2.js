const pokemonList = document.getElementById('pokemon')
const loadMoreButton = document.getElementById('LoadMoreButton')

let limit = 10
let offset = 0

const maxRecords = 151

function convertPokemonToLi(pokemon){
    return `
    <section id="pokemon ${pokemon.type}">
        <div class="loadVoltar">
            <a href='/index.html'>
                <button id="Voltar" type="button">
                    Voltar
                </button>
            </a>
        </div>
        <h1 class="name">${pokemon.name}</h1>
        <scan class="number">#${pokemon.number}</scan>
        <div class="details">
            <div class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </div>

            <img src="${pokemon.photo}" 
            alt="${pokemon.name}">
        </div>

        <section class="moreDetails">
            <div class="titulo">Mais Detalhes</div>
                <div class="detail">
                    <li class="altura">Height: ${pokemon.height}</li>
                    <li class="largura">Weight: ${pokemon.weight}</li>
                </div>
        </section>
    </section>

    `
}

function loadPokemonItems(offset, limit){
    //Requisição HTTP para receber a lista de pokemons
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        //Transformamos esses pokemons em uma lista de HTMP com a função map
        //join = como voce vai separar a contatenação, no caso com nada um espaço
        const newList= pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML = newList
    })
}

loadPokemonItems(offset,limit)

loadMoreButton.addEventListener('click', () => {
    limit += 10

    const qtdRecordNextPage = offset+limit
    if(qtdRecordNextPage >= maxRecords)
    {
        const newLimit = maxRecords
        loadPokemonItems(offset,newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
    loadPokemonItems(offset,limit)
    }
})