/**
 *
 *  Concept in this project: Best Practice: Lifting State Up
 *    - Instead of managing which player is currently active in the GameBoard or Player component,
 *      we should manage the state in the closest ancestor component that has access to both components.
 *
 * i.e., in our case App.jsx becoz the App component can then pass the information about the active player to both components via props.
 *
 */
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";

function App() {
    const [activePlayer, setActivePlayer] = useState('X');

    // Here the new state depends on the old state
    // This function will be called once the Square button is selected.
    function handleSelectSquare() {
        setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X');
    }

    return <main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
                <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
            </ol>
            <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
        </div>
    </main>;
}

export default App
