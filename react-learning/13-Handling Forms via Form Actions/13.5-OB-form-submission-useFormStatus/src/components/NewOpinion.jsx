import {use, useActionState} from "react";
import {OpinionsContext} from "../store/opinions-context.jsx";
import Submit from "./Submit.jsx";

/**
 * - Extract the value & add validation as learnt into last section using useActionState() hook.
 * - Now we want to submit the data to the backend if valid data has been entered.
 *      - We can use "opinions-context" that has backend HTTP method call logic to store a new opinion.
 *
 * - To simulate slow backend, we've a timeout added i.e.,  await new Promise((resolve) => setTimeout(resolve, 1000));
 *      - Since we're stuck for 1 second till the response from BE is back when we click submit button.
 *      - Well it would be great if the "submit" button will be disabled or text would be changed whilst the form is being submitted.
 *      - We've 2 ways of adding this:
 *          1. By using the "pending" value returned by useActionState hook as 3rd argument.
 *              - Pending value would be true if the form is currently being submitted & false otherwise.
 *              - That's why it's important to await here because pending will be true till the promise is resolved.
 *
 *          2. By using 'useFormStatus()' hook from react-dom
 *              - This is a new hook meant to be used in conjunction with formActions.
 *              - This hook can't be used in the component that contains the form & the formAction & instead
 *                  it must be used in some nested component.
 *              - Let's create a new component "Submit.jsx" & move the submit button from this component to new one.
 */
export function NewOpinion() {

    const { addOpinion } = use(OpinionsContext)

    /**
     *  - React supports both Sync & Async form action functions.
     *  - React will actually wait for the Promise that is returned by async action function
     *      to resolve before it internally marks the form as submitted.
     */
    async function shareOpinionAction(prevFormState, formData) {

        const title = formData.get('title');
        const body = formData.get('body');
        const userName = formData.get('userName');

        let errors = [];

        if (title.trim().length < 5) {
            errors.push('Title must be at least 5 characters long.');
        }

        if (body.trim().length < 10 || body.trim().length > 300) {
            errors.push('Opinion must be between 10 and 300 characters long.');
        }

        if (!userName.trim()) {
            errors.push('Please provide your name.');
        }

        if (errors.length > 0) {
            return {
                errors, enteredValues: {
                    title, body, userName
                }
            }
        }

        /**
         *  - Added await to addOpinion() func coz We want to wait for the result of calling addOpinion() before
         *      marking this form action as completed by executing the last bit of code i.e., return
         *
         *  - In order to use "await", we've to add async to this action function.
         *
         */
        //
        await addOpinion({title, body, userName});

        return {errors: null};
    }

    const [formState, formAction] = useActionState(shareOpinionAction, {errors: null});

    return (
        <div id="new-opinion">
            <h2>Share your opinion!</h2>
            <form action={formAction}>
                <div className="control-row">
                    <p className="control">
                        <label htmlFor="userName">Your Name</label>
                        <input type="text" id="userName" name="userName"
                               defaultValue={formState.enteredValues?.userName}/>
                    </p>

                    <p className="control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title"
                               defaultValue={formState.enteredValues?.title}/>
                    </p>
                </div>
                <p className="control">
                    <label htmlFor="body">Your Opinion</label>
                    <textarea id="body" name="body" rows={5}
                              defaultValue={formState.enteredValues?.body}></textarea>
                </p>

                {formState.errors && (
                    <ul className="errors">
                        {formState.errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}

                <Submit/>
            </form>
        </div>
    );
}
