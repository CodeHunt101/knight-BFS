import { useState } from 'react';
import { ChessBoard } from './components/ChessBoard';
import './App.css';

function App() {
  const [newGame, setNewGame] = useState({
    knightPosition: "",
    targetPosition: ""
  })


  return (
    <div className="App">
      <main id="main-container">
        <ChessBoard />
        <div id="control">
          <button className="control-button" id="new-game">Start new game</button>
          <button className="control-button" id="help">Help</button>
        </div>
      </main>
    </div>
  );
}

export default App;
