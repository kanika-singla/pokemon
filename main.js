import express from 'express';
import fs from 'fs';
import { getAllPokemons } from './dumpPokemonDataService.js';

const pokemonProperties = ['name', 'id', 'base_experience', 'weight', 'height' , 'order'];

var app = express();
app.use(express.json());

app.get('/dumpPokemonData', async function(req, res) {
  let r =await getAllPokemons();
  fs.writeFileSync('./data/pokemons.json', JSON.stringify(r));
  res.json(JSON.stringify(r));
});

app.listen(5000, () => {
  console.log("Server Listening on PORT:", 5000);
});