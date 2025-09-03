const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({ onSelectSquare, turns }) {
    // Logic to derive the GameBoard with turns array i.e., we need to transform turns array to GameBoard array.
    // This is called Deriving state i.e., we're producing some derived state / computed value.
    // gameBoard is a computed value that's derived from gameTurns state that's managed in the <App> Component.
    // We should manage as little state as needed & try to derive as muc info & value from present states.
    let gameBoard = initialGameBoard;

    for(const turn of turns){
        const { square, player } = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, columnIndex) => (
                            <li key={columnIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, columnIndex)}
                                >{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}