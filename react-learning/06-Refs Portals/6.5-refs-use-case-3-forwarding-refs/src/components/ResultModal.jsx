
// We can use builtin modal i.e., dialog (by default invisible, add open prop to dialog to visible)
    // e.g., <dialog className="result-modal" open>
// To add backdrop, instead of forcing the dialog to open, we have to open the dialog programmatically by sending
    // command to the browser to get the built-in backdrop.

// Question: To run dialog programmatically, TimerChallenge component need to have this dialog component. HOw ?
// Solution: via ref.

// Note forwarding ref is working since react version 19. Before React 19, forwarding ref like below was not supported.



export default function ResultModal({ref, result, targetTime}) {
    return <dialog ref={ref} className="result-modal">
        <h2>You {result}</h2>
        <p>The target time was <strong>{targetTime}</strong> seconds.</p>
        <p>You stopped the timer with <strong>X seconds left.</strong></p>
        <form method="dialog">
            <button>Close</button>
        </form>
    </dialog>
}