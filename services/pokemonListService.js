const mongodb = require('mongodb');
require('dotenv').config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoServer = process.env.MONGO_SERVER;
const uri = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoServer}/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb.MongoClient(uri, {
  serverApi: {
    version: mongodb.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function listPokemons() {
  const pokemonCollection = client.db("pokemon").collection("pokemon");
  const cursor = pokemonCollection.find({}).project({name:1,id:1,'sprites.front_default':1, _id: 0}).limit(5);
  const pokemonArrays = await cursor.toArray();
  var htmlText='';
  for(var i=0;i<pokemonArrays.length;i++) {
    htmlText += `<li><a href="http://localhost:5000/pokemon/${pokemonArrays[i]['id']}">${pokemonArrays[i]['name']}</a></li>`;
  }
  console.log(htmlText);
  return htmlText;
}

async function getPokemon(pokemonId) {
  const pokemonCollection = client.db("pokemon").collection("pokemon");
  const pokemon = await pokemonCollection.findOne({id: parseInt(pokemonId)},{name:1,id:1, _id: 0});
    return pokemon;
}

module.exports = { listPokemons, getPokemon}