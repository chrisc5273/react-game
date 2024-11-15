import React, { useState, useEffect } from 'react';

function HomeScreen({onStartGame}) {
   

    return (
        <div className="homeScreen">
      <button className="glitch-window" onClick={onStartGame}>
        Start Game
      </button>
        </div>
    );
}

export default HomeScreen;
