import {useState} from "react";

/**
 * Validating input value on lost focus
 *  - For this, we've to react to an input field losing focus by adding an event listening prop "onBlur"
 *  - Becoz the blur event is a built-in default browser event that will be fired whenever the input loses focus.
 *  - We can add event handling func on blur event.
 *
 *  Imp. Note:
 *   - Now we've to manage a new piece of state or merge it to existing state i.e., whether the user has touched the input or not.
 *   - Merge can be like email: {value: '', isEdit" ''}
 *
 *  Final Conclusion:
 *   - Combining validation on every keystroke with validation on lost focus & resetting that focus state
 *      whenever the user starts typing again can be a good pattern for validating user input.
 *
 */
export default function StateLogin() {

    const [enteredValues, setEnteredValues] = useState({
        email: '', password: ''
    });

    // New state to keep track of whether the input field is touched/edited or not i.e., lost focus
    const [didEdit, setDidEdit] = useState({
        email: false, password: false
    });

    /**
     *  Validating the input by giving user chance of editing before showing the error message.
     *
     *  Problem:
     *      - When validating on lost focus, error may be shown too long i.e.,
     *          even after lost focus if user start typing, still the error msg is shown till @ is added.
     *      - This may be argued that this is the experience you might want to provide
     *      - But it can also be argued that this error msg should disappear as soon as the user start typing again.
     *
     *  Solution:
     *      - We can solve the issue & remove the error msg once the user start typing again by updating "didEdit" state on every keystroke.
     *      - We can reset "didEdit" state values to false once the user starts typing again.
     *
     */
    const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');

    function handleInputBlur(identifier) {
        setDidEdit((prevEdit) => ({
            ...prevEdit,
            [identifier]: true
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(enteredValues);
    }

    function handleInputChange(identifier, value) {
        setEnteredValues((prevValues) => ({
            ...prevValues, [identifier]: value
        }));

        // We can reset "didEdit" state values to false once the user starts typing again.
        setDidEdit((prevEdit) => ({
            ...prevEdit,
            [identifier]: false
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email"
                           onBlur={() => handleInputBlur('email')}
                           onChange={(event) =>
                               handleInputChange('email', event.target.value)}
                           value={enteredValues.email} />
                    <div className="control-error">{emailIsInvalid && <p>Please enter a valid email address.</p> }</div>
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password"
                           onChange={(event) =>
                               handleInputChange('password', event.target.value)}
                           value={enteredValues.password} />
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button" onClick={handleSubmit}>Login</button>
            </p>
        </form>
    );
}
