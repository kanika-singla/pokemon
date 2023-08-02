import express from 'express';
import fs from 'fs';
import { getAllPokemons } from './dumpPokemonDataService.js';
import { prepareData } from './primaryRequirements.js';

var app = express();
app.use(express.json());

app.get('/dumpPokemonDatatoJSONFiles', async function(req, res) {
  let allPokemons =await getAllPokemons();
  fs.writeFileSync('./data/pokemons.json', JSON.stringify(allPokemons));
  res.json(JSON.stringify(allPokemons));
});

app.get('/prepareDataForInvestors', async function(req, res) {
  let filteredPokemons =await prepareData();
  fs.writeFileSync('./data/filteredPokemons.json', JSON.stringify(filteredPokemons));
  res.json(filteredPokemons);
});

app.listen(5000, () => {
  console.log("Server Listening on PORT:", 5000);
});