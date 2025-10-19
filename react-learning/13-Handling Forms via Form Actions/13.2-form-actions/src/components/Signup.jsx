/**
 *
 * - In React, when adding "action" prop, React will make sure that the function we pass as value
 *      to "action" prop will be executed when the form is submitted.
 *
 * - React will behind the scene call preventDefault() for us so that browser default will be suppressed
 *      & instead the function executes.
 *
 * - The passed func to "action" prop will receive "formData" as arg rather than "event".
 *      It's the same formData obj we created manually in previous section.
 *
 * - Make sure to add "name" prop to all input/form fields as it will be used as key to extract the form data
 *
 * - React will also by default reset the form for us & we can also keep value if we want (later part we will learn)
 *
 */
export default function Signup() {

    function signupAction(formData) {
        const enteredData = Object.fromEntries(formData);
        console.log(enteredData);

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        const firstName = formData.get('first-name');
        const lastName = formData.get('last-name');
        const role = formData.get('role');
        const terms = formData.get('terms');
        const acquisitionChannel = formData.getAll('acquisition');

        console.log(email, password, confirmPassword, firstName, lastName, role, terms, acquisitionChannel);
    }

    return (
        <form action={signupAction}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email"/>
            </div>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password"/>
                </div>

                <div className="control">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                    />
                </div>
            </div>

            <hr/>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name"/>
                </div>

                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name"/>
                </div>
            </div>

            <div className="control">
                <label htmlFor="phone">What best describes your role?</label>
                <select id="role" name="role">
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
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className="control">
                    <input type="checkbox" id="other" name="acquisition" value="other"/>
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className="control">
                <label htmlFor="terms-and-conditions">
                    <input type="checkbox" id="terms-and-conditions" name="terms"/>I
                    agree to the terms and conditions
                </label>
            </div>

            <p className="form-actions">
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button className="button">Sign up</button>
            </p>
        </form>
    );
}
