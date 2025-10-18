import {useState} from "react";

/**
 *  Now we want to access the user entered value
 *      1. Using State
 *        - Way 1: We can set up one piece of state for each input field & accordingly add change listener for each state
 *        - Way 2: Set up a combined state where we store all those state values in one object & add 1 generic change listener.
 */
export default function Login() {

    // Way 1: One state per input field
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    // Way 2: Combined state for all input fields
    const [enteredValues, setEnteredValues] = useState({
        email: '',
        password: ''
    });

    function handleSubmit(event) {
        event.preventDefault();

        // console.log("User email: " + enteredEmail);
        console.log(enteredValues);
    }

    // Way 1: Adding change listener for email input field
    function handleEmailChange(event) {
        setEnteredEmail(event.target.value);
    }

    // Way 1: Adding change listener for password input field
    function handlePasswordChange(event) {
        setEnteredPassword(event.target.value);
    }

    // Way 2: Adding generic change listener
    // identifier to identify for which input field event occurred.
    function handleInputChange(identifier, value) {
        setEnteredValues((prevValues) => ({
            ...prevValues, [identifier]: value
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    {/* Way 1 */}
                    {/*<input id="email" type="email" name="email" onChange={handleEmailChange}
                        value={enteredEmail} />*/}

                    {/* Way 2 */}
                    <input id="email" type="email" name="email"
                           onChange={(event) =>
                               handleInputChange('email', event.target.value)}
                           value={enteredValues.email} />
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    {/* Way 1 */}
                    {/*<input id="password" type="password" name="password"
                        onChange={handlePasswordChange} value={enteredPassword} />*/}

                    {/* Way 2 */}
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
