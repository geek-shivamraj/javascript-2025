import classes from './Counter.module.css';
import {useDispatch, useSelector} from "react-redux";
import { counterActions } from "../store/index";

/**
 *  We can import the counterActions & use its reducer keys to dispatch the action by executing the key as method
 *
 */
const Counter = () => {

    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);
    const show = useSelector(state => state.showCounter);

    const incrementHandler = () => {
        dispatch(counterActions.increment());
    };

    // We pass our payload data to the method
    // we can pass simple value or an object as payload to reducer func.
    const increaseHandler = () => {
        // Redux Toolkit generated Action object: { type: SOME_UNIQUE_IDENTIFIER, payload: 5 }
        dispatch(counterActions.increase(5));
    };

    const decrementHandler = () => {
        dispatch(counterActions.decrement());
    };

    const toggleCounterHandler = () => {
        dispatch(counterActions.toggleCounter());
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

