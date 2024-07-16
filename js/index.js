const nomePokemon = document.querySelector('.nome-pokemon');
const PokemonId = document.querySelector('.pokemon-id');
const imagemPokemon = document.querySelector('.imagem-pokemon');

const formulario = document.querySelector('.form')
const inputPesquisa = document.querySelector('.pesquisa')

const botaoVoltar = document.querySelector('.btn-voltar')
const botaoProx = document.querySelector('.btn-prox')

let pokemonInicial = 1;

const buscarPokemon = async (pokemon) =>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(response.status === 200){
        const dados = await response.json();
        return dados;
    }
}

const renderizarPokemon = async (pokemon) => {
   
    nomePokemon.innerHTML = 'Carregando...'
    PokemonId.innerHTML = '';
   
    const dados = await buscarPokemon(pokemon);

    if(dados){
        imagemPokemon.style.display = 'block'
        nomePokemon.innerHTML = dados.name;
        PokemonId.innerHTML = dados.id;
        imagemPokemon.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        inputPesquisa.value = '';
        pokemonInicial = dados.id
    } else{
        imagemPokemon.style.display = 'none'
        nomePokemon.innerHTML = 'Não encontrado :('
        PokemonId.innerHTML = '';
    }

}

formulario.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderizarPokemon(inputPesquisa.value.toLowerCase());
})

botaoVoltar.addEventListener('click', () =>{
    if(pokemonInicial > 1){
        pokemonInicial-= 1;
        renderizarPokemon(pokemonInicial)
    }
})

botaoProx.addEventListener('click', () =>{
    pokemonInicial+= 1;
    renderizarPokemon(pokemonInicial)
})


renderizarPokemon('1')