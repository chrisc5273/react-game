import React, { useState, useEffect } from 'react';

function PokemonDisplay() {
 
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Store clicked Pokemon
  const [pokemonList, setPokemonList] = useState([]);
  const [characterImages, setCharacterImages] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null); // Store index of clicked Pokémon

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {   

        let randomNum = 0;
        const pokemonNames = [];
        const pokemonSprites = [];
        for (let i = 0; i < 20; i++) {
          randomNum = Math.floor(Math.random() * 800 +1)
          const pokemonCharacter = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
          const pokemonData = await pokemonCharacter.json();
          if (pokemonNames.includes(pokemonData.name)) {
            i--;  // If duplicate, decrement `i` to repeat the iteration
          } else {
            pokemonSprites.push(pokemonData.sprites.front_default);  // Add sprite
            pokemonNames.push(pokemonData.name);  // Add name
          }
  
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

  const handleCharacterClick = (pokemonName,index) => {
    if (clickedIndex === index) {
      // If the clicked item is already selected, deselect it
      setClickedIndex(null);
      setSelectedPokemon(null);
    } else {
      // Otherwise, select the clicked item
      setClickedIndex(index);
      setSelectedPokemon(pokemonName);
    }
    console.log(`Character clicked: ${pokemonName}`);
  }
  let selectedPokemonDisplay = null;
  if (selectedPokemon) {
    selectedPokemonDisplay = <h1>You Picked {selectedPokemon}</h1>;
  }
  return (
    <div className='PokemonContainer' >
      
        <h1>Choose your Pokemon</h1>
        
          <ul className='CharacterContainer'>
          {pokemonList.map((pokemon, index) => (
          <li
          className={`Character ${clickedIndex === index ? 'clicked' : ''}`} // Apply 'clicked' class if this item is clicked
            key={index}
            style={{ listStyle: 'none', cursor: 'pointer' }}
            onClick={() => handleCharacterClick(pokemon,index)}
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
            {selectedPokemonDisplay}
        

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
