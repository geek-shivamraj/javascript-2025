import {useState} from "react";

/**
 * Validating input value on each keystroke
 *  - This can only be done if we're extracting the form data by State becoz to validate the value on keystroke,
 *    we need to listen to all changes that are made to input & that's what can be done using state & handleInputChange() function
 *
 *  - When using refs or FormData approach for extracting data, we only have the data once the form is submitted & not on every keystroke
 *
 */
export default function StateLogin() {

    const [enteredValues, setEnteredValues] = useState({
        email: '', password: '' });

    /**
     *  Input validation on each keystroke
     *
     *  - Problem: The error message will be shown till we add @ to the email input.
     *      - This is not the perfect approach coz we want to give chance to user to at least enter the value.
     */
    // const emailIsInvalid = !enteredValues.email.includes('@');

    /**
     *  Giving chance to user to enter the value
     *
     *  - Below way has 2 problems:
     *      1. If i enter a valid email & then erase it, no error msg is shown
     *      2. We don't see error msg initially but as soon as user starts typing, the error msg is shown
     *          - Here at this point of time, the user didn't get chance to even enter a valid value.
     *          - So, we're showing error msg too early.
     */
    const emailIsInvalid = enteredValues.email !== '' && !enteredValues.email.includes('@');
    console.log(enteredValues.email);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(enteredValues);
    }

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
                    <input id="email" type="email" name="email"
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
