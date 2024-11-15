import React from 'react';
import './App.css';
import { useState } from 'react';
import PokemonDisplay from './components/pokemonDisplay';
import HomeScreen from './components/homeScreen';

function App() {
  const [showPokemonDisplay, setShowPokemonDisplay] = useState(false); // State to control visibility
  const[background, setBackground] = useState('home');
  // Function to handle button click
  const handleStartGame = () => {
    setShowPokemonDisplay(true);
  };

  
  return (
    <div className="App">
       
      {/* Pass the function to handle button click */}
      {!showPokemonDisplay ? (
        <HomeScreen onStartGame={handleStartGame} />
      ) : (
        <PokemonDisplay />
      )}
    </div>
  )
}

export default App;
