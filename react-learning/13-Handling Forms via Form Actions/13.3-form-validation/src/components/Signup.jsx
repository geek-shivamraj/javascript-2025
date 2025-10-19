import {useActionState} from "react";
import {isEmail, isNotEmpty, hasMinLength, isEqualToOtherValue} from "../util/validation.js";

/**
 *
 *  - From action function, we can return any value or no value.
 *
 *  - React gives a special hook "useActionState" that aims to manage form-related or action-related state for us
 *      - useActionState hook wants 1st arg as action function & 2nd arg as initial state value.
 *          - Note: When passing the actionFunction: signupAction to the useActionState() hook, we need to pass actionFunction in below template
 *              e.g., Action function will be signupAction(prevFormSate, formData);
 *              i.e., formData will be 2nd arg to action function & 1st will be prevFormState.
 *              - It's possible that the action is invoked multiple times & in that case, React will give you the last form state.
 *              - 1st time, prevFormSate will be the initial value that's being passed to the useStateAction hook
 *
 *      - useActionState hook return an array of 3 elements:
 *          - Element 1: Current form state (state returned by action function)
 *          - Element 2: formAction
 *              - React creates new updated formAction enhanced wrt the formAction we provided as 1st arg
 *                      so that it could listen to the invocation of the action
 *
 *              - We set this returned formAction to the "action" prop of <form> element.
 *
 *          - Element 3: pending
 *              - values can be true or false based on whether the form is currently submitted or not.
 *              - In below example, the action executes pretty much instantly so it won't be pending for long
 *              - But this will be useful when we explore async actions.
 *
 *  - Note: When using React Form action's feature, every time we submit the form, React by default resets the form.
 *      - We may not want this i.e., reset the filled value, in case user submits the invalid form with some checks missing.
 *      - This is not good user experience.
 *
 *    Solution to default React reset form action:
 *     - We've to adjust our action function to return an object with already entered/extracted values
 *          so that we can use them to set "defaultValue" manually on each form field.
 *     - Ofc we've to check first if the extract value object is not null as we're not using it in initial state.
 *     - This check will be useful in case of valid form submission, the default values will not show.
 *
 *     - Right now, React doesn't provide an automatic way to disable this form resetting.
 *
 *   - Now the Reset button will also work different as by default "reset" button resets all input values to their default values
 *      but now we've changed those default values to make sure the entered value persists on the form.
 *      - Solution: We've to add custom logic on reset click to clear out the form
 */

function signupAction(prevFormState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const role = formData.get('role');
    const terms = formData.get('terms');
    const acquisitionChannel = formData.getAll('acquisition');

    let errors = [];

    if (!isEmail(email)) {
        errors.push('Invalid email address.');
    }

    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
        errors.push('You must provide a password with at least 6 characters.');
    }

    if (!isEqualToOtherValue(password, confirmPassword)) {
        errors.push('Passwords do not match.');
    }

    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
        errors.push('Please provide both your first name and last name.');
    }

    if (!isNotEmpty(role)) {
        errors.push('Please select a role.');
    }

    if (!terms) {
        errors.push('You must agree to the terms and conditions.');
    }

    if (acquisitionChannel.length === 0) {
        errors.push('Please select at least one acquisition channel.');
    }

    if (errors.length > 0) {
        // This "enteredValues" key will be used to set default value in case of invalid form submission.
        return {
            errors: errors, enteredValues: {
                email, password, confirmPassword, firstName, lastName, role, terms, acquisitionChannel
            }
        };
    }

    console.log("Form submitted successfully.");
    return {errors: null}
}

export default function Signup() {

    // Since formState will contain the error messages, we can use it to output error to user.
    const [formState, formAction] = useActionState(signupAction, {errors: null});

    return (
        <form action={formAction}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                {/* Adding ? to enterValues will check if enteredValues is undefined or not */}
                <input id="email" type="email" name="email"
                    defaultValue={formState.enteredValues?.email}/>
            </div>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password"
                           defaultValue={formState.enteredValues?.password}/>
                </div>

                <div className="control">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password" type="password"
                        name="confirm-password"
                        defaultValue={formState.enteredValues?.confirmPassword}
                    />
                </div>
            </div>

            <hr/>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name"
                        defaultValue={formState.enteredValues?.firstName}/>
                </div>

                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name"
                        defaultValue={formState.enteredValues?.lastName}/>
                </div>
            </div>

            <div className="control">
                <label htmlFor="phone">What best describes your role?</label>
                {/* use this key={formState?.enteredValues?.role ?? 'other'} OR key={formState.enteredValues?.role}
                    to fix the default value persistence */}
                {/*  Adding a key to your select element can sometimes help to force a re-render when you submit the form. */}
                <select id="role" name="role" key={formState.enteredValues?.role || 'roleDefault'}
                        defaultValue={formState.enteredValues?.role}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                    <option value="founder">Founder</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <fieldset>
                <legend>How did you find us?</legend>
                <div className="control">
                    <input
                        type="checkbox"
                        id="google"
                        name="acquisition"
                        value="google"
                        defaultChecked={formState.enteredValues?.acquisitionChannel.includes('google')}
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                        defaultChecked={formState.enteredValues?.acquisitionChannel.includes('friend')}
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className="control">
                    <input type="checkbox" id="other" name="acquisition" value="other"
                        defaultChecked={formState.enteredValues?.acquisitionChannel.includes('other')}/>
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className="control">
                <label htmlFor="terms-and-conditions">
                    <input type="checkbox" id="terms-and-conditions" name="terms"
                        defaultChecked={formState.enteredValues?.terms}/>I
                    agree to the terms and conditions
                </label>
            </div>

            {formState.errors && (
                <ul className="error">
                    {formState.errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}

            <p className="form-actions">
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button className="button">Sign up</button>
            </p>
        </form>
    );
}
