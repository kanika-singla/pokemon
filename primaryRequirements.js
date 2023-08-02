
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://import_user:admin@sandbox.zdiry.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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
            'name': 1,
            'id': 1,
            'base_experience': 1,
            'weight': 1,
            'height': 1 ,
            'order': 1,
            'game_indices.version.name': 1,
            'types.slot': 1,
            'types.type.name': 1
        }
    }
  ];


  const pokemonCollection = client.db('pokemon').collection('pokemon');
  const cursor = pokemonCollection.aggregate(aggregationPipeline);
  const result = await cursor.toArray();
  console.log(JSON.stringify(result));
  console.log(result.length);
  await client.close();
