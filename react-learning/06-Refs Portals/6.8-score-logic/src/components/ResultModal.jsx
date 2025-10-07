
import {useImperativeHandle, useRef} from "react";

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
    // To make sure that onReset gets triggered when the dialog is closed via the escape key,
    // we should add the built-in onClose prop to the <dialog> element and bind it to the onReset prop value.
    return <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
        {userLost && <h2>You lost!</h2>}
        {!userLost && <h2> Your Score: {score}</h2>}
        <p>The target time was <strong>{targetTime}</strong> seconds.</p>
        <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>
}