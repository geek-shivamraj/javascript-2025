export default function Login() {

    /**
     * Problem:
     *  - The Page will get reloaded once we click on Login button & query parameters will be added to the url.
     *  - This is all happening becoz we're using the "Login" button inside the <form> element &
     *      the default browser behavior for buttons inside the <form> element is that those buttons will submit the form
     *      i.e., technically an HTTP request is created & is sent to the server (serving the website).
     *
     *  - This is default browser built-in behavior is becoz in many non-React apps, we indeed have a full stack app
     *      where every page is rendered by the server and sent to the client and where on form submission,
     *      the request will be sent back to the server so that they can be handled there.
     *
     *   - It's imp. to understand that buttons inside the <form> element will generate requests & send those to the server serving the site.
     *
     *   - But for React app, this can be a problem unless we're using some full stack React solution like Next.js.
     *   - This automatic behavior might be a problem as the server that's serving the React website on the address
     *      is actually a pure dev server that's not prepared to handle form submission.
     *   - Even if we deploy this React app on some real server that serves it to real users on internet,
     *      still that server only aims to serve the index.html files & all the JS files (not prepared for handling incoming form requests)
     *
     *
     *  Ways to disable this browser default behavior on form submission:
     *      1. Add "type" attribute/prop to the button i.e., <button type="button"></button>
     *          - This will not submit the form as default type is "submit"
     *
     *      2. Add "onSubmit" prop to the <form> element i.e., <form onSubmit={}></form>
     *          - This is more elegant way that will later help us with extracting entered values.
     *          - keep type="submit" as default.
     *          - This form will trigger a submit event that we can listen to & react when it's submitted by one of its button being pressed.
     *
     *      3. Using React 19 offered Form Actions for handling form submissions.
     */
    function handleSubmit(event) {
        // Below special method prevents the default browser behavior (generate & send HTTP request)
        event.preventDefault();

        // Actual JS/React logic
        console.log("Submit button clicked!!");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email"/>
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password"/>
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                {/* Problem */}
                {/*<button className="button" onClick={handleSubmit}>Login</button>*/}

                {/* Solution 1: To use type="button" without adding "onSubmit" prop to <form> element */}
                {/*<button type="button" className="button" onClick={handleSubmit}>Login</button>*/}

                {/* Solution 2: Add onSubmit prop on <form> element & keep this button as default */}
                <button className="button" onClick={handleSubmit}>Login</button>
            </p>
        </form>
    );
}
