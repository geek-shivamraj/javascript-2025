/**
 *
 *  Concept in this project:
 *    - Avoid Intersecting State & Prefer Computed Value and avoid unnecessary state management.
 *
 */
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function App() {
    //const [activePlayer, setActivePlayer] = useState('X');
    const [gameTurns, setGameTurns] = useState([]);

    // Here we pass current "gameTurns" state.
    const activePlayer = deriveActivePlayer(gameTurns);

    function handleSelectSquare(rowIndex, columnIndex) {
        //setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X');
        setGameTurns((prevTurns) => {
            // Here we pass "prevTurns"
            const currentPlayer = deriveActivePlayer(prevTurns);
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
