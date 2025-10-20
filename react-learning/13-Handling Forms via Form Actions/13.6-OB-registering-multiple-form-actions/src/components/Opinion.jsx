import {use, useActionState} from "react";
import {OpinionsContext} from "../store/opinions-context.jsx";

/**
 *
 *  Here we've 2 buttons that do 2 different things: upvote & downvote
 *   - Since these both button has different functionality we want to send 2 different kind of request
 *      upon the form submission. i.e., 2 different form actions even though we only have 1 form.
 *
 *   - The great thing is the action function can actually not just be set as value  for the "action" prop of the form
 *      but also can be set as "formAction" prop to buttons inside the form.
 *
 *   - This allows us to trigger different form action for different buttons.
 *
 */
export function Opinion({opinion: {id, title, body, userName, votes}}) {

    const {upvoteOpinion, downvoteOpinion} = use(OpinionsContext);

    /**
     *  - We can still accept formData as arg here but since in this case,
     *      the form actually has no inputs so we can skip it.
     *  - Since these upvoteOpinion() & downvoteOpinion() func yields promise,
     *      we should mark these action functions as 'async'
     *
     *   - Since we need to use 'id' in the action func, these action func must be inside this component func.
     *
     *   - Since we've added a delay in BE to simulate slow BE, the upvote & downvote will take 1 sec to update.
     *      - We can improve UX by disabling both buttons after one of them is clicked
     *          so that we can wait for the vote to get registered.
     *      - We can do this in 2 ways
     *          1. By using 'useFormStatus' hook from react-dom
     *              - We've to create a separate new component as "Button'
     *
     *          2. By using 'pending' value returned by 'useActionState' hook as 3rd arg.
     *              - Here we've to call the hook twice for each action.
     *
     */
    async function upvoteAction() {
        await upvoteOpinion(id);
    }

    async function downvoteAction() {
        await downvoteOpinion(id);
    }

    // Assigning null to initial state as we're not managing any form state. we can also omit the initial state.
    const [upvoteFormState, upvoteFormAction, upvotePending] = useActionState(upvoteAction);

    const [downvoteFormState, downvoteFormAction, downvotePending] = useActionState(downvoteAction);


    return (
        <article>
            <header>
                <h3>{title}</h3>
                <p>Shared by {userName}</p>
            </header>
            <p>{body}</p>
            <form className="votes">
                <button formAction={upvoteFormAction} disabled={upvotePending || downvotePending}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect width="18" height="18" x="3" y="3" rx="2"/>
                        <path d="m16 12-4-4-4 4"/>
                        <path d="M12 16V8"/>
                    </svg>
                </button>

                <span>{votes}</span>

                <button formAction={downvoteFormAction} disabled={upvotePending || downvotePending}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect width="18" height="18" x="3" y="3" rx="2"/>
                        <path d="M12 8v8"/>
                        <path d="m8 12 4 4 4-4"/>
                    </svg>
                </button>
            </form>
        </article>
    );
}
