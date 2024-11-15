import React, { useState, useEffect } from 'react';

function PokemonDisplay() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [randomSprite, setRandomSprite] = useState('');
  const [abilityName, setAbilityName] = useState('');
  const [container, setContainer] = useState('flex');
  const [abilities, setAbilities] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
    const fetchData = async () => {
    try {
      const randomPokemon = Math.floor(Math.random() * 413 + 1);
      
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
      const ability1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`);

      if (!response.ok || !response2.ok || !ability1.ok) {
        throw new Error("Could not fetch resource");
      }
      const pokemonNames = [];
      for(let i =0;i<20;i++){
        const pokemonCharacter = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 413 + 1)}`);
        const pokemonData = await pokemonCharacter.json();
        pokemonNames.push(pokemonData.name);
      }
      setPokemonList(pokemonNames);
      const data = await response.json();
      const data2 = await response2.json();
      const abilityData = await ability1.json();

      // Extract necessary data
     
      setPokemonSprite(data.sprites.front_default);
      setRandomSprite(data2.sprites.front_default);
      setAbilityName(abilityData.abilities[0].ability.name);
      setContainer('none') // Example: access first ability
      const allAlibilities = abilityData.abilities.map(ability => ability.ability.name);
      setAbilities(allAlibilities)
      
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='PokemonContainer' >
      <div className = "container">  <h2>Choose your Pokemon</h2>
        <input
        type="text"
        id="pokemonName"
        placeholder="Enter pokemon name"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}  // Update state with input
      />
      <button onClick={fetchData} id="fetchBtn">Fetch Pokemon</button></div>
      
      <div >     
        <img src={pokemonSprite} alt="Pokemon Sprite" id="leftmost-img" style={{ display: pokemonSprite ? "block" : "none" }} />
        <img src={randomSprite} alt="Pokemon Random Sprite" id="rightmost-img" style={{ display: randomSprite ? "block" : "none" }} />
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
