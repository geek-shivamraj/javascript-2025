import classes from './Counter.module.css';
import {useDispatch, useSelector} from "react-redux";

/**
 *  Step 4: Accessing the Redux Store managed data via components.
 *   - To output the current counter, we need access to the Redux store & we can do that with the help of custom hook "useSelector" from react-redux.
 *      - There is also useStore hook that we could use to directly access the store but useSelector hook
 *          is a bit more convenient to use becoz it allows us to automatically select a part of our state managed by the store.
 *
 *   - useSelector args:
 *      - arg 1: A func (will receive the state managed by Redux as arg) that will be executed by a React Redux & that basically determines which piece of data
 *          i.e., the slice of overall state object, we want to extract from the Redux Store.
 *   - Note: When we use "useSelector" hook, React Redux will automatically set up a subscription to the Redux Store for this component
 *      i.e., This component will be updated & receive the latest counter automatically whenever the data changes in the
 *          Redux store and this data change in Redux store will cause this component func to be re-executed.
 *
 *   - If we ever unmount/remove this component from DOM, React Redux would also automatically clear the subscription for us.
 *
 *
 *  Step 5: Dispatch Actions from Components.
 *   - We can use "useDispatch" hook to dispatch an action from the component.
 *   - We get dispatch func as return from useDispatch() hook that we can call, will dispatch an action against our Redux Store.
 */
const Counter = () => {

    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);

    const incrementHandler = () => {
        dispatch({ type: 'INCREMENT' });
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
                <button onClick={decrementHandler}>Decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
