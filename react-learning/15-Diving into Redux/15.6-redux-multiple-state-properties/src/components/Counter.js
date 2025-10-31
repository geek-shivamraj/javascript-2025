import classes from './Counter.module.css';
import {useDispatch, useSelector} from "react-redux";

/**
 *  Till this point we've worked with single state i.e., counter. Now we want to handle new state i.e., toggle button
 *   - This toggle button when clicked will hide the counter text & when clicked again will show the counter.
 *
 *  Solution 1: We can use "useState" hook & set up a local state in this component (without redux)
 *      - Well this would be the proper way of doing it becoz showing or hiding the counter is something
 *          that is only relevant to this component & not to any other part of application.
 *      - But same can be said about the "counter" state as we're only using the "counter" in this component.
 *          so technically "counter" is also a local state.
 *      - So, for this demo e.g., let's assume both "counter" & "toggle" states are global states.
 *
 *  Solution 2: Manage the state via Redux
 *
 */
const Counter = () => {

    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);

    // For selecting specific state from Redux store
    const show = useSelector(state => state.showCounter);

    const incrementHandler = () => {
        dispatch({ type: 'INCREMENT' });
    };

    const increaseHandler = () => {
        dispatch({ type: 'INCREASE', amount: 5 });
    };

    const decrementHandler = () => {
        dispatch({ type: 'DECREMENT' });
    };

    // Redux managed new state
    const toggleCounterHandler = () => {
        dispatch({ type: 'TOGGLE', counter: counter });
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {show && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={incrementHandler}>Increment</button>
                <button onClick={increaseHandler}>Increase by 5</button>
                <button onClick={decrementHandler}>Decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
