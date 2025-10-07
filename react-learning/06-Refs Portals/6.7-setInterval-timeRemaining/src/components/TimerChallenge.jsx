import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

/**
 *  - For our use case, we need to show the score when the timer started & stopped and setTimeout is not enough to do that.
 *  - To measure how much time was left when the timer was stopped,  we use setInterval().
 *  - setInterval() will execute the logic every time the specified time is expired.
 */
export default function TimerChallenge({title, targetTime}) {

    const timer = useRef();
    const dialogRef = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    // Manually clearing the time interval in case time is up.
    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        // This is dangerous to directly update the state as it can create infinite loop of component re-execution
        //  but since we're in if condition, we're safe.
        setTimeRemaining(targetTime * 1000);
        dialogRef.current.open();
    }

    const handleStart = () => {
        // Every 10ms, the logic will run: Deduct 10ms from prevTimeRemaining
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    const handleStop = () => {
        dialogRef.current.open();
        // To clear interval
        clearInterval(timer.current);
        setTimeRemaining(targetTime * 1000);
    }

    return <>
        <ResultModal ref={dialogRef} targetTime={targetTime} result="lost" />
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