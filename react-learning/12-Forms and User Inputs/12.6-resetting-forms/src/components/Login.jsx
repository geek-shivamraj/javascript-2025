import {useRef} from "react";

/**
 *  Now we want to access the user entered value
 *      1. Using State
 *        - Way 1: We can set up one piece of state for each input field & accordingly add change listener for each state
 *        - Way 2: Set up a combined state where we store all those state values in one object & add 1 generic change listener.
 *
 *      2. Using Refs
 *        - Can be added to all HTML element
 *        - Advantage: Typically requires less code.
 *        - Disadvantage:
 *          - Resetting the values in clean way is a bit harder becoz we're discouraged to use refs for manipulating the DOM.
 *          - We will end up with lots of ref in case we've complex form & we've to setup and connect all those refs
 *              manually step by step that can become quite some work if we're dealing with multiple input elements.
 */
export default function Login() {

    const email = useRef();
    const password = useRef();

    function handleSubmit(event) {
        event.preventDefault();

        const enteredEmail = email.current.value;
        const enteredPassword = password.current.value;

        console.log(enteredEmail, enteredPassword);

        // Absolutely not recommended or use with caution
        email.current.value = '';
        password.current.value = '';
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" ref={email} />
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
