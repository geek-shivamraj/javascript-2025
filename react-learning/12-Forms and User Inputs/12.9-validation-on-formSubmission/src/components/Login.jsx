import {useRef, useState} from "react";

/**
 *  - We're providing a decent UX by combining validation on every keystroke
 *      + focus-based validation while managing & extracting input value by State.
 *
 *  - But it's not the only way of adding validation. For refs, ofc we can't validate on every keystroke.
 *  - So, we can validate the input via refs only when the user submits the form & this is also a popular strategy.
 *
 *  Final Conclusion:
 *   - It's upto you to decide which approach you want to take & which UX we want to provide.
 *     - Validating on submission definitely takes a bit less code than validating on every keystroke & combining it with lost focus
 *     - But using keystroke + lost focus, we can give user more direct feedback.
 *
 *   - Also, we often might want to & its good idea to add submission based validation even if we're already validating on keystroke + lost focus
 *      - If we switch back to <StateLogin> form & perform validation on just clicking submit button with any input,
 *          we will see the request is sent to handleSubmit func.
 *      - That's why, it's good idea to add validation on form submit inside the "handleSubmit" func of <StateLogin> component.
 */
export default function Login() {

    // Using this state to manage UI in case of validation.
    // We can keep 1 state for all input i.e., FormIsValid or individual state for each input field
    const [emailIsInValid, setEmailIsInValid] = useState(false);

    const email = useRef();
    const password = useRef();

    function handleSubmit(event) {
        event.preventDefault();

        const enteredEmail = email.current.value;
        const enteredPassword = password.current.value;

        const emailIsValid = enteredEmail.includes('@');
        if (!emailIsValid) {
            setEmailIsInValid(true);
            // Returning so that no further code is executed.
            return;
        }

        // After validation check for email
        setEmailIsInValid(false);

        console.log("Sending HTTP request...");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" ref={email} />
                    <div className="control-error">{emailIsInValid
                        && <p>Please enter a valid email address.</p> }</div>
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" ref={password} />
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button" onClick={handleSubmit}>Login</button>
            </p>
        </form>
    );
}
