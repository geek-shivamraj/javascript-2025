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
import Log from "./components/Log.jsx";

function App() {
    const [activePlayer, setActivePlayer] = useState('X');
    const [gameTurns, setGameTurns] = useState([]);

    function handleSelectSquare(rowIndex, columnIndex) {
        setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X');
        setGameTurns((prevTurns) => {
            // Used this approach & didn't use activePlayer state as it's not recommended to merge different states.
            let currentPlayer = 'X';
            if(prevTurns.length > 0 && prevTurns[0].player === 'X') {
                currentPlayer = 'O';
            }
            const updatedTurns = [
                {square: {row: rowIndex, col: columnIndex}, player: currentPlayer},
                ...prevTurns];
            return updatedTurns;
        });
    }

    return <main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
                <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
            </ol>
            <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
        </div>
        <Log turns={gameTurns} />
    </main>;
}

export default App
