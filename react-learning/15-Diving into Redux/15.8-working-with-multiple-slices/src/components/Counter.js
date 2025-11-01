import classes from './Counter.module.css';
import {useDispatch, useSelector} from "react-redux";
import {counterActions} from "../store/counter-slice";

/**
 *  We can import the counterActions & use its reducer keys to dispatch the action by executing the key as method
 */
const Counter = () => {

    const dispatch = useDispatch();
    /**
     *  - Since we're using keys in the store configuration object, we need to use these keys to access the states.
     *  - By using state.counter, we're making Redux aware that we want to dive into this slice's reducer
     *      & then in that state slice, we want properties "counter" & "showCounter"
     *  - Here we've multiple slices of global state like counter, auth.
     */
    const counter = useSelector(state => state.counter.counter);
    const show = useSelector(state => state.counter.showCounter);

    const incrementHandler = () => {
        dispatch(counterActions.increment());
    };

    const increaseHandler = () => {
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