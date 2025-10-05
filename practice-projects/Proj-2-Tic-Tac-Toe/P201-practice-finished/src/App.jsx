import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import {WINNING_COMBINATIONS} from "./data/winning-combinations.js";

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const deriveActivePlayer = (turns) => {
    let currentPlayer = 'X';
    if (turns.length > 0 && turns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

const deriveGameBoard = (turns) => {
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
    for (const turn of turns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function checkForWinner(gameBoard, players) {
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            // Task 11
            winner = players[firstSquareSymbol];
        }
    }
    return winner;
}


export default function App() {

    const [players, setPlayers] = useState(PLAYERS);
    const [turns, setTurns] = useState([])

    const activePlayer = deriveActivePlayer(turns);
    const gameBoard = deriveGameBoard(turns);
    const winner = checkForWinner(gameBoard, players);
    const draw = turns.length === 9 && !winner;

    const handleSelectSquare = (rowIndex, colIndex) => {
        setTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);
            return [
                {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
                ...prevTurns
            ];
        });
    }

    const handleRestart = () => {
        setTurns([]);
    }

    const handlePlayerNameChange = (symbol, newName) => {
        setPlayers(prevPlayer => {
            return {
                ...prevPlayer,
                [symbol]: newName
            }
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'}
                            onChangeName={handlePlayerNameChange}/>
                    <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'}
                            onChangeName={handlePlayerNameChange}/>
                </ol>
                {(winner || draw) && <GameOver winner={winner} onRestart={handleRestart}/>}
                <GameBoard gameBoard={gameBoard} onSelectSquare={handleSelectSquare}/>
            </div>
            <Log turns={turns}/>
        </main>
    )
}
