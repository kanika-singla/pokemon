const express = require('express');
const fs = require('fs');
const dumpPokemonDataService = require('./services/dumpPokemonDataService.js');
const investorDataService = require('./services/investorDataService.js');
const path = require('path');

var app = express();
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/html/index.html'));
 });

app.get('/dumpPokemonDatatoJSONFiles', async function(req, res) {
  let allPokemons =await dumpPokemonDataService.getAllPokemons();
  fs.writeFileSync('./data/mongo_input/pokemons1500.json', JSON.stringify(allPokemons));
  res.json(JSON.stringify(allPokemons));
});

app.get('/getDataForInvestors', async function(req, res) {
  let filteredPokemons =await investorDataService.prepareData();
  const fileName = './data/investor/filteredPokemons.json';
  fs.writeFileSync(fileName, JSON.stringify(filteredPokemons));
  res.download(fileName);
});

app.listen(5000, () => {
  console.log("Server Listening on PORT:", 5000);
});