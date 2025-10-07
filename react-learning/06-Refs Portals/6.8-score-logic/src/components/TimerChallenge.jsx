import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

/**
 *  - Now we should remove the result prop in ResultModal component and pass timeRemaining to calculate the score.
 */
export default function TimerChallenge({title, targetTime}) {

    const timer = useRef();
    const dialogRef = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    // Manually clearing the time interval in case time is up.
    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        // setTimeRemaining(targetTime * 1000);
        dialogRef.current.open();
    }

    // To be called when dialog is closed.
    const handleReset = () => {
        setTimeRemaining(targetTime * 1000);
    }

    const handleStart = () => {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    const handleStop = () => {
        dialogRef.current.open();
        clearInterval(timer.current);
        // setTimeRemaining(targetTime * 1000);
    }

    return <>
        <ResultModal ref={dialogRef} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop' : 'Start'}</button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Time is running...' : 'Timer inactive'}
            </p>
        </section>
    </>
}