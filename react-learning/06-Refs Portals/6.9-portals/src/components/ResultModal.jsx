
import {useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

export default function ResultModal({ref, targetTime, remainingTime, onReset}) {

    const dialogRef = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            // Function callable outside of this component.
            open() {
                dialogRef.current.showModal();
            }
        }
    });
    // To move the dialog code to higher level in HTML structure, we use createPortal
    // & add 1st argument the HTML element & 2nd arg as the location we want to teleport to.
    return createPortal(
        <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
            {userLost && <h2>You lost!</h2>}
            {!userLost && <h2> Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
    </dialog>, document.getElementById("modal"));
}