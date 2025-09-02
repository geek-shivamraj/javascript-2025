export default function Player({playerName, playerSymbol}) {
    return (
        <li>
            <span className="player">
                <span className="player-name">{playerName}</span>
            <span className="player-symbol">{playerSymbol}</span>
            </span>
            <button>Edit</button>
        </li>
    );
}