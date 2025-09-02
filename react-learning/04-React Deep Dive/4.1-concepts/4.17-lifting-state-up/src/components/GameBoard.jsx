import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
/**
 * we need to add a new prop as activePlayerSymbol to get the active player symbol
 */
export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {

    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, columnIndex) {
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            // set the value to activePlayerSymbol
            updatedBoard[rowIndex][columnIndex] = activePlayerSymbol;
            return updatedBoard;
        });

        // This function is triggered if a square is selected by clicking the button
        onSelectSquare();
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, columnIndex) => (
                            <li key={columnIndex}>
                                <button
                                    onClick={() => handleSelectSquare(rowIndex, columnIndex)}
                                >{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}