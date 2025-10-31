import classes from './Counter.module.css';
import {useDispatch, useSelector} from "react-redux";

/**
 *  E.g., Let's add a new button to the Counter component that increases the count by 5.
 */
const Counter = () => {

    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);

    const incrementHandler = () => {
        dispatch({ type: 'INCREMENT' });
    };

    const increaseHandler = () => {
        dispatch({ type: 'INCREASE', amount: 5 });
    };

    const decrementHandler = () => {
        dispatch({ type: 'DECREMENT' });
    };

    const toggleCounterHandler = () => {};

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            <div className={classes.value}>{counter}</div>
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
