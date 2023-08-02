import axios from 'axios';

async function getPokemon(url) {
  let pokemon = await axios.get(url);
  return pokemon['data'];
}

export async function getAllPokemons() {
  let startTime = new Date().getTime();
  let promises = [];

  console.log(new Date().getTime());
  let pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5');
    const totalPokemons = pokemons.data.count;
    console.log(totalPokemons);
    for (let index = 0; index < pokemons.data.results.length; index++) {
      const pokemon = pokemons.data.results[index];
      promises.push(getPokemon(pokemon.url));
    }
  const data = await Promise.all(promises);
  let endTime= new Date().getTime();
  console.log('time taken to get ',totalPokemons, ':', (endTime-startTime)/1000, ' seconds');
  
  return data;
}
