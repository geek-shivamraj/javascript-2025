/**
 *  It might not be preferable that the TimerChallenge component depends on ResultModal component changes, & relying on whether its ref is set or not.
 *  - Therefore, it might be preferable to build this ResultModal component such that it exposes its own function that can be called with
 *      help of a ref outside of that component that will work independent of our the JSX code might change in the ResultModal.
 *  - So, the other dev working on the ResultModal component can change it however they want, as long as they keep the one function
 *      exposed to TimerChallenge component (for calling showModal()).
 *
 *   - The above can be achieved via a special hook that exposes a callable function i.e., useImperativeHandle() hook.
 *
 *   - We can use "useImperativeHandle()" hook to define properties & methods that should be accessible on below component from outside this component.
 *   - We won't be using this hook too often as in most cases we will be working with props. But for use cases like this, this hook can be very helpful
 *      to make the below component more stable & reusable.
 *
 *      e.g., useImperativeHandle(firstObject: ref received via forward refs, second: function that returns an object which groups all the properties
 *          & methods that should be exposed by the component)
 *
 *      Note: we can create a new ref referring to the dialog element to call showModal() method.
 */
import {useImperativeHandle, useRef} from "react";

export default function ResultModal({ref, result, targetTime}) {

    // Idea is to detach this dialog element from any other components.
    const dialogRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            // Function callable outside of this component.
            open() {
                dialogRef.current.showModal();
            }
        }
    });
    return <dialog ref={dialogRef} className="result-modal">
        <h2>You {result}</h2>
        <p>The target time was <strong>{targetTime}</strong> seconds.</p>
        <p>You stopped the timer with <strong>X seconds left.</strong></p>
        <form method="dialog">
            <button>Close</button>
        </form>
    </dialog>
}