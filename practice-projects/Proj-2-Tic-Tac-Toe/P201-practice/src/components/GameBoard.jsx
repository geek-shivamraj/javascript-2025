import {useState} from "react";
import {WINNING_COMBINATIONS} from "../data/winning-combinations.js";
import GameOver from "./GameOver.jsx";

// Task 5: Create a 2D GameBoard
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

// Task 8: Check for winner
function checkForWinner(gameBoard) {
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
            winner = firstSquareSymbol;
        }
    }
    return winner;
}

// Task 8: Check for Draw
function checkForDraw(gameBoard) {
    return gameBoard.every(row => row.every(cell => cell !== null));
}

// Task 5: Create a GameBoard Component
export default function GameBoard({activePlayerSymbol, onSelectSquare}) {

    // Task 6: On each Gameboard square click, set each square to either 'X' or 'O'
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // Task 8: Check for Winner & Draw
    const winner = checkForWinner(gameBoard);
    const draw = checkForDraw(gameBoard)

    // Task 6: On each Gameboard square click, set each square to either 'X' or 'O'
    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameBoard((prevGameBoard) => {
            const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedGameBoard;
        });
        // Task 7: Lifting the active player state up to App Component
        onSelectSquare();
    }

    // Task 8: Handler Restart in case we've winner or draw
    const handleRestart = () => {
        setGameBoard((prevGameBoard) => {
            return initialGameBoard;
        });
    }

    return (
        <>
            {/* Task 5: Render & Style the 2D Gameboard */}
            <ol id="game-board">
                {gameBoard.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, columnIndex) => (
                                <li key={columnIndex}>
                                    <button onClick={() => handleSelectSquare(rowIndex, columnIndex)}>{playerSymbol}</button>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ol>
            {/* Task 8: GameOver overlay display in case we've winner or draw */}
            {(winner || draw) && <GameOver winner={winner} onRestart={handleRestart} />}
        </>
    );
}