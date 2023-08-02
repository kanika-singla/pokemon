
import { MongoClient, ServerApiVersion } from 'mongodb';
import {} from 'dotenv/config';

export async function prepareData() {
  const mongoUser = process.env.MONGO_USER;
  const mongoPassword = process.env.MONGO_PASSWORD;
  const mongoServer = process.env.MONGO_SERVER;
  const uri = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoServer}/?retryWrites=true&w=majority`;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  //Aggregation Pipeline to query based on the primary requirements in the case study
  // 1. The name, id, base_experience, weight, height and order of all Pokémon that 
  // appear in the any of the games red, blue, leafgreen or white.
  // 2. The name of the slot 1 (and if available 2) type of each of the Pokémon's types.
  // 3. The Body Mass Index of the Pokémon (hint: The formula for BMI is weight (kg) / height (m2 ))
  // 4. The first letter of names of the Pokémon should be capitalized.
  // 5. The url of the front_default sprite.
  // 6. Prepare the data in an appropriate data format. Consider if it should be multiple or a 
  // single file.

  const aggregationPipeline = [
      {
        '$match': {
          'game_indices.version.name': {
              '$in': ['red', 'leafgreen', 'blue', 'green', 'white']
          }
        }
      },
      {
        '$match': {
          'types.slot': {
              '$in': [1, 2]
          }
        }
      },
      {
          '$project': {
              'name': {
                '$concat': [
                    { "$toUpper": { "$substrCP": ["$name", 0, 1] } }, 
                    {                                                           
                        "$substrCP": [
                            "$name",
                            1,
                            { "$subtract": [{ "$strLenCP": "$name" }, 1 ]}
                        ] 
                    }
                ]
              },
              'id': 1,
              'base_experience': 1,
              'weight': 1,
              'height': 1 ,
              'order': 1,
              'game_indices.version.name': 1,
              'types.slot': 1,
              'types.type.name': 1,
              'bmi': {
                '$divide': [ {
                '$multiply': ["$weight", 0.1]
              },
              {
                '$multiply': ["$height", 0.01]
              }]},
              'sprites.front_default': 1
          }
      }
    ];


    const pokemonCollection = client.db('pokemon').collection('pokemon');
    const cursor = pokemonCollection.aggregate(aggregationPipeline);
    const filteredPokemons = await cursor.toArray();
    //console.log(JSON.stringify(result));
    console.log(`Total pokemons: ${filteredPokemons.length}`);
    await client.close();
    return filteredPokemons;
}
