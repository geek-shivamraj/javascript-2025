import {useState} from "react";
import Input from "./Input.jsx";
import {hasMinLength, isEmail, isNotEmpty} from "../util/validation.js";

/**
 *  We want to write some reusable & easier to manage code.
 *   - In this file, we've the most complex user input management.
 *   - i.e., keeping track of all entered value on every keystroke with state,
 *      performing validation on every keystroke & whenever input field loses focus
 *
 *   - Its fine here coz we've relatively small form but for complex forms like signup & we can observe that
 *      we've quite a bit of code repetition i.e., same logic for both email & password & same JSX code just tiny difference.
 *
 *   - And whenever we've situation like this where we've some kind of duplicate JSX code, we could consider building a custom component.
 *   - e.g., Input.jsx
 *
 *
 *   We also want to outsource this validation logic so it can be re-used in different places in the app.
 *    - Let's use util/validation.js
 *
 */

export default function StateLogin() {

    const [enteredValues, setEnteredValues] = useState({
        email: '', password: ''
    });

    const [didEdit, setDidEdit] = useState({
        email: false, password: false
    });

    const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
    const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

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

        setDidEdit((prevEdit) => ({
            ...prevEdit,
            [identifier]: false
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="control-row">
                <Input label='Email' id='email' type='email' name='email'
                       onBlur={() => handleInputBlur('email')}
                       onChange={(event) =>
                           handleInputChange('email', event.target.value)}
                       value={enteredValues.email}
                       error={emailIsInvalid && 'Please enter a valid email!'}
                />

                <Input label='Password' id='password' type='password' name='password'
                       onBlur={() => handleInputBlur('password')}
                       onChange={(event) =>
                           handleInputChange('password', event.target.value)}
                       value={enteredValues.password}
                       error={passwordIsInvalid && 'Please enter a valid password!'}
                />
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button" onClick={handleSubmit}>Login</button>
            </p>
        </form>
    );
}
