import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard() {

    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // This is Recommended way as we're making changes on the copy of array.
    function handleSelectSquare(rowIndex, columnIndex) {
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][columnIndex] = 'X';
            return updatedBoard;
        });
    }

    // This way of updating GameBoard (Array) is not recommended
    //  as we're directly modifying the original array in memory immediately
    function handleSelectSquareOld(rowIndex, columnIndex) {
        setGameBoard((prevGameBoard) => {
            prevGameBoard[rowIndex][columnIndex] = 'X';
            return prevGameBoard;
        });
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