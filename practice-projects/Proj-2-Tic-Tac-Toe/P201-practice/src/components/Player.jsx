
// Task 2: Create a component player with name, symbol
import {useState} from "react";

export default function Player({initialName, symbol, isActive}) {

    // Task 3:  Add `input` on `edit` click
    const [isEditing, setIsEditing] = useState(false);

    // Task 4: Two-way binding, updating player name via input field based on user's feedback
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = () => {
        setIsEditing((prevEdit) => !prevEdit);
    }

    // Task 4: Two-way binding, updating player name via input field based on user's feedback
    const handleChange = (event) => {
        setPlayerName(event.target.value);
    }

    // Task 3:  Add `input` on `edit` click
    let editablePlayerName = <span className="player-name">{playerName}</span>
    if(isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />
    }

    return (
        // Task 7: Highlight the active player
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {/* Task 3: Add `input` on `edit` click */}
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}