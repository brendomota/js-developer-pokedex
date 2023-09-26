const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    //pegando a url do detalhe do pokemons e convertendo o response para json
    return fetch(pokemon.url)
            .then((reponse) => reponse.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    //converte o response pra json
        .then((response) => response.json())
    //pegar o json e pegamos somente os resultados que é realmente a lista de pokemons de vdd
        .then((jsonBody) => jsonBody.results)
    //pegamos a lista que estava dentro do json e estamos transformando essa lista em um lista
    //de promesa do detalhe do pokemon
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))               
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
}