import React, { useState, useEffect } from 'react';

function PokemonDisplay() {
 
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Store clicked Pokemon
  const [pokemonList, setPokemonList] = useState([]);
  const [characterImages, setCharacterImages] = useState([]);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {   


        const pokemonNames = [];
        const pokemonSprites = [];
        for (let i = 0; i < 20; i++) {
          const pokemonCharacter = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${Math.floor(Math.random() * 413 + 1)}`);
          const pokemonData = await pokemonCharacter.json();
          pokemonSprites.push(pokemonData.sprites.front_default)
          pokemonNames.push(pokemonData.name);
        }

        setCharacterImages(pokemonSprites);
        setPokemonList(pokemonNames);
 
   
       

      } catch (error) {
        console.error(error);
      }
    };

    // Call fetchData on component mount
    fetchData();
  }, []); // You can add other dependencies if needed, but using an empty array [] would only run once on mount

  const handleCharacterClick = (pokemonName) => {
    setSelectedPokemon(pokemonName);

    console.log(`Character clicked: ${pokemonName}`);
  }

  return (
    <div className='PokemonContainer' >
      
        <h1>Choose your Pokemon</h1>
        
          <ul className='CharacterContainer'>
          {pokemonList.map((pokemon, index) => (
          <li
            className="Character"
            key={index}
            style={{ listStyle: 'none', cursor: 'pointer' }}
            onClick={() => handleCharacterClick(pokemon)}
          >
            <img
              src={characterImages[index]}
              alt={`Pokemon ${index + 1}`}
              style={{height: '100px'}}
            />
            <p style={{color:"black", fontWeight: "bolder"}}>{pokemon}</p> {/* Show Pokemon name */}
          </li>
            ))}
          </ul>
    
        

      <div >
        {/* <img src={pokemonSprite} alt="Pokemon Sprite" id="leftmost-img" style={{ display: pokemonSprite ? "block" : "none" }} />
        <img src={randomSprite} alt="Pokemon Random Sprite" id="rightmost-img" style={{ display: randomSprite ? "block" : "none" }} /> */}
        {/* <h2 id="abilityName" style={{ display: abilityName ? "block" : "none", color:'white' }}>{abilityName}</h2> */}
        {/* <h2 style={{color: 'white'}}>Abilities</h2>
          <ul style={{display: 'none'}}>
            {abilities.map((ability,index)=> (
              <li key = {index} style={{color: 'white', listStyle:'none'}}>{ability}</li>
            ))}
          </ul> */}
        {/* <h1>Pokemon list</h1>
            <ul>
              {pokemonList.map((pokemon,index)=>(
                <li key={index}>{pokemon}</li>
              ))}
            </ul> */}


      </div>

    </div>
  );
}

export default PokemonDisplay;
