import { useState } from "react";

export default function Player({name, symbol}) {

    const [isEditing, setIsEditing] = useState(false);

    // Recommended way to update our state based on the previous value of that state.
    // When using below function form, React guarantees that we will always be working with latest available state value.
    function handleEditClick() {
        setIsEditing((editing) => !editing);
    }
    let playerName = <span className="player-name">{name}</span>;
    if (isEditing) {
        playerName = <input type="text" required value={name} />
    }
    return (
        <li>
            <span className="player">
                {playerName}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}