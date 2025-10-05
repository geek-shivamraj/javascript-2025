import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";

export default function App() {

  // Task 6: Lifting the active player state up from GameBoard component.
  // Task 7: Get active player state to highlight the active player
  const [activePlayer, setActivePlayer] = useState('X');

  const handleSelectSquare = () => {
      setActivePlayer((currentActivePlayer) => {
        return currentActivePlayer === 'X' ? 'O' : 'X';
      });
  }

  return (
    <main>
        <div id="game-container">
            {/* Task 7: Highlight the active player based on isActive prop */}
            <ol id="players" className="highlight-player">
                <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
                <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
            </ol>
            <GameBoard activePlayerSymbol={activePlayer} onSelectSquare={handleSelectSquare} />
        </div>
    </main>
  )
}
