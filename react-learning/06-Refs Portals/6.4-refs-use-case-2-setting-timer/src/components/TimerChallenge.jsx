import {useRef, useState} from "react";

// Way 2
// let timer;

export default function TimerChallenge({title, targetTime}) {

    const timer = useRef();

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    // Way 1
    // let timer;
    const handleStart = () => {
        // timer = setTimeout(() => {
        //     setTimerExpired(true);
        // }, targetTime * 1000);
        timer.current = setTimeout(() => {
            setTimerExpired(true);
        }, targetTime * 1000);
        setTimerStarted(true);
    }

    // Question: How can we stop the timer from handleStart function in handleStop function
    /** Solution 1: assign the timer reference to a variable inside the TimerChallenger function
     - This will not work as on each state change, this component is re-executed
     i.e., the timer variable doesn't have the same timer reference that got started.

     Solution 2: assign the timer reference to a variable outside the TimerChallenger function
     - This will also not work. At least for the one instance of TimerChallenge Component it will work but
     for all other instances it will not work.
     - Reason: This variable will actually be shared across all component instance based on "TimerChallenge" function.
     e.g., if we start 1 sec timer then start 5 sec timer then stop 1 sec timer & stop 5 sec timer, still 5 sec timer will give lost status.

     So, the variable is not the solution.

     Solution 3: refs is the solution.
     - We can use 'refs' to manage any kind of value & since we defined timer=useRef() inside the component function, this ref is specific to
        the "TimerChallenge" component instance.
     - Each Timer ref will be specific to each instance of "TimerChallenge" component.
     - But at the same time, this ref will not be reset or cleared when the component re-executes, instead just as state values, React will store
        these timer values behind the scenes & make sure that they don't get lost as the component function re-executes.

     */
    const handleStop = () => {
        // Builtin JS function clearTimeout() to stop the timer but it needs a reference to the timer.
        // clearTimeout(timer);
        clearTimeout(timer.current);
    }

    return <section className="challenge">
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
}