import {useState, useEffect} from 'react';

export default function ProgressBar({timer}) {
    const [remainingTime, setRemainingTime] = useState(timer);

    /**
     *  Now we must also update this state multiple times per second to make sure that
     *  we got a smoothly animating progress bar.
     *   - To do that, we can use browser provided inbuilt function: setInterval()
     *   - setInterval() defines a function that will be executed every couple of ms
     *
     */
    useEffect(() => {
        const interval= setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 10);
        }, 10);

        // Stop the timer post modal is closed
        return () => {
            clearInterval(interval);
        }
    }, []);

    return <progress value={remainingTime} max={timer} />
}