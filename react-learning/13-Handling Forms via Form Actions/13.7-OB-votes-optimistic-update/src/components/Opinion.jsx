import {use, useActionState, useOptimistic} from "react";
import {OpinionsContext} from "../store/opinions-context.jsx";

/**
 *  This is a good example where Optimistic updating might be a good idea
 *      - i.e., becoz when we press the button, we've to wait for 1 sec till the vote goes up or down.
 *
 *   - To achieve Optimistic Update, React offers a hook "useOptimistic" that aims to help us with optimistic updating.
 *      - useOptimistic is a new React 19 hook that lets you optimistically update the UI while an async action
 *          is in progress — giving users instant feedback before the server responds.
 *
 *      - useOptimistic hook takes
 *          - 1st args as the input value that should eventually be updated optimistically or current state
 *
 *          - 2nd args as a optimistic function that will be invoked by React but at a point of time defined by us.
 *              - This will receive a parameter i.e., old state that's managed by the hook, automatically passed by React.
 *              - This function returns the optimistic state based on the current state & user input.
 *
 *      - useOptimistic hook returns an array of 2 elements:
 *          - Element 1: optimistic state i.e., optimistically managed value
 *              - This is a temporary UI state shown while the async action is pending
 *
 *          - Element 2: function that triggers the optimistic update
 *              - This will invoke the optimistic updating function (that we've passed as 2nd arg)
 *                  & also passes the arg to the optimistic func. For e.g., mode etc.
 *
 *              - This function can be called in any form action of our choice & the args are passed for optimistic update func.
 *
 */
export function Opinion({opinion: {id, title, body, userName, votes}}) {

    const {upvoteOpinion, downvoteOpinion} = use(OpinionsContext);

    // Optimistic Update
    const [optimisticVotes, setVotesOptimistically] =
        useOptimistic(votes, (prevVotes, mode) => mode === 'up' ? prevVotes + 1 : prevVotes - 1);

    async function upvoteAction() {
        setVotesOptimistically('up');
        await upvoteOpinion(id);
    }

    async function downvoteAction() {
        setVotesOptimistically('down');
        await downvoteOpinion(id);
    }

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

                <span>{optimisticVotes}</span>

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
