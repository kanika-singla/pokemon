## Gotta Process 'Em all

### Problem Statement
This repository reads [PokeAPI](https://pokeapi.co/) and serves the data to Investor based on following rules:
1. The name, id, base_experience, weight, height and order of all Pokémon that appear in the any of the games red, blue, leafgreen or white.
2. The name of the slot 1 (and if available 2) type of each of the Pokémon's types.
3. The Body Mass Index of the Pokémon (hint: The formula for BMI is weight (kg) / height (m2))
4. The first letter of names of the Pokémon should be capitalized.
5. The url of the front_default sprite.
6. Prepare the data in an appropriate data format. Consider if it should be multiple or a single file

### Try it out!
1. Install nodejs
2. Clone github repository
3. Create .env file on root folder. example
```
    MONGO_USER=
    MONGO_PASSWORD=
    MONGO_SERVER=
```
4. After saving .env, run below commands from root directory:
```
    npm i
    npm start
```
5. On root page: http://localhost:5000/, available routes are displayed:
    * Download data from PokeAPI
    * Get data for investors (in csv format)
    * List pokemons and their details

### Architecture Diagram
![alt text](https://github.com/kanika-singla/pokemon/blob/main/architecture/pokemon_api.png?raw=true)

### Architecture for Update Notifications
![alt text](https://github.com/kanika-singla/pokemon/blob/main/architecture/pokemon_update_notifications.png?raw=true)

### What is missing?
* Deployment of nodejs application to AWS
* Interactable dashboard