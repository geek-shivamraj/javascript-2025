export default function GameBoard({gameBoard, onSelectSquare}) {
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, columnIndex) => (
                            <li key={columnIndex}>
                                <button disabled={playerSymbol !== null}
                                        onClick={() => onSelectSquare(rowIndex, columnIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>

    );
}