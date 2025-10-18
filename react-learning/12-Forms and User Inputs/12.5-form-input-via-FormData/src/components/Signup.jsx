/**
 *  Here we can extract input values via states or refs, but they can be a lot of work.
 *
 *  - We can use Native Built-in feature for getting hold of all those values becoz
 *      - The browser helps us by allowing to create a special kind of object based
 *          on a special kind of constructor function that's built into the browser i.e., FormData construction function.
 *      - We need to pass the form as input to FormData i.e, new FormData(event.target) gives formData object
 *          through which we can access all the entered inputs
 *      - For formData to work, we must have a "name" prop set on each input/select or any kind of field.
 *
 *      - FormData is relatively straightforward & simple way to quickly extract all the values entered by the user.
 *
 */
export default function Signup() {

    function handleSubmit(event) {
        event.preventDefault()

        const fd = new FormData(event.target);
        const enterEmail = fd.get('email');

        // Use Object.fromEntries() method to group all input values together & give us key, value pair.
        // Note: While using below function, we lose multivalue input fields like acquisition.
        // Solution: Just manually extract & store the multi-value input & add it to the data.
        const acquisitionChannel = fd.getAll('acquisition');
        const data = Object.fromEntries(fd.entries());
        data.acquisition = acquisitionChannel;
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" />
            </div>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" />
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

            <hr />

            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" />
                </div>

                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" />
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
                    <input type="checkbox" id="other" name="acquisition" value="other" />
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className="control">
                <label htmlFor="terms-and-conditions">
                    <input type="checkbox" id="terms-and-conditions" name="terms" />I
                    agree to the terms and conditions
                </label>
            </div>

            <p className="form-actions">
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button type="submit" className="button">
                    Sign up
                </button>
            </p>
        </form>
    );
}