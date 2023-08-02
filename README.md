## Gotta Process 'Em all

### Problem Statement
This repository reads ![PokeAPI](https://pokeapi.co/) and prepares the data based on following rules:
1. The name, id, base_experience, weight, height and order of all Pokémon that appear in the any of the games red, blue, leafgreen or white.
2. The name of the slot 1 (and if available 2) type of each of the Pokémon's types.
3. The Body Mass Index of the Pokémon (hint: The formula for BMI is weight (kg) / height (m2))
4. The first letter of names of the Pokémon should be capitalized.
5. The url of the front_default sprite.
6. Prepare the data in an appropriate data format. Consider if it should be multiple or a single file

### Try it out!
1. Install nodejs
2. Clone github repository
3. Run below commands
```
    npm i
    npm start
```
4. To retrieve data prepared based on above rules, open endpoint: localhost:5000/prepareDataForInvestors

### Architecture Diagram
![alt text](https://github.com/kanika-singla/pokemon/blob/main/images/pokemon_api.png?raw=true)