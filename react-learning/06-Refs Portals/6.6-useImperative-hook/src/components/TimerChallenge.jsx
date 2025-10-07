import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, targetTime}) {

    const timer = useRef();
    const dialogRef = useRef();

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    const handleStart = () => {
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            // Built-in dialog component has showModal() method
            // dialogRef.current.showModal();
            // Calling the exposed function by ResultModal
            dialogRef.current.open();
        }, targetTime * 1000);
        setTimerStarted(true);
    }

    const handleStop = () => {
        clearTimeout(timer.current);
    }

    return <>
        <ResultModal ref={dialogRef} targetTime={targetTime} result="lost" />
        <section className="challenge">
            <h2>{title}</h2>
            {timerExpired && <p>You lost!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>{timerStarted ? 'Stop' : 'Start'}</button>
            </p>
            <p className={timerStarted ? 'active' : undefined}>
                {timerStarted ? 'Time is running...' : 'Timer inactive'}
            </p>
        </section>
    </>
}