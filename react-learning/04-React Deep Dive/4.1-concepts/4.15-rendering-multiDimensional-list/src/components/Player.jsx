/**
 * Concept: User Input & 2-Way-binding
 *   - Using "value" prop on <input> element sets the values on the input. Basically it overrides any changes we're trying to do.
 *      e.g., <input type="text" required value={name} />
 *   - We can use "defaultValue" prop on <input> element (it sets an initial value instead of enforcing a value)
 *      e.g., <input type="text" required defaultValue={name} />
 *
 *  We will keep using "value" prop in input element for now. As we want to use a different approach anyway
 *      as we want to set & get the changes the user applies to the value & accordingly save the playerName
 *      so that we can output the updated player name whenever it changes.
 *
 *  Solution:
 *   - We need a 2nd state here to get the changed values on the input.
 *   - We need a function that should be triggered upon some event emitted by the input field.
 *   - onChange will be triggered for every keystroke & it will provide us with an event object that contains the value that was entered by the user.
 *   - React will call the handleChange() function when the change event occurs & React will give us such an event object as a function.
 *
 *   This way of listening to a change on the input & then feeding that updated value back into the input (via "value" prop) is called 2-way-binding.
 */

import { useState } from "react";

export default function Player({initialName, symbol}) {

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editablePlayerName = <input
            type="text" required
            value={playerName}
            onChange={handleChange}/>
    }
    return (
        <li>
            <span className="player">
                {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}