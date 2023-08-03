const express = require('express');
const fs = require('fs');
const dumpPokemonDataService = require('./services/dumpPokemonDataService.js');
const investorDataService = require('./services/investorDataService.js');
const pokemonListService = require('./services/pokemonListService.js');
const path = require('path');
const jsonTocsv = require('json2csv');

var app = express();
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/html/index.html'));
 });

app.get('/dumpPokemonDatatoJSONFiles', async function(req, res) {
  let allPokemons =await dumpPokemonDataService.getAllPokemons();
  const filePokemons = './data/mongo_input/pokemons500.json';
  fs.writeFileSync(filePokemons, JSON.stringify(allPokemons));
  res.download(filePokemons);
});

app.get('/getDataForInvestors', async function(req, res) {
  let filteredPokemons =await investorDataService.prepareData();
  const fileInvestors = './data/investor/primaryRequiredData.csv';
  fs.writeFileSync(fileInvestors, jsonTocsv.parse(filteredPokemons));
  res.download(fileInvestors);
});

app.get('/listPokemons', async function(req, res) {
  let listPokemons =await pokemonListService.listPokemons();
  res.send(listPokemons);
});

app.get('/pokemon/:id', async function(req, res) {
  console.log("id = ", req.params.id);
  let pokemonData =await pokemonListService.getPokemon(req.params.id);
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(pokemonData, null, 4));
});

app.listen(5000, () => {
  console.log("Server Listening on PORT:", 5000);
});