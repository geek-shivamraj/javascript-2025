import { createStore } from 'redux';
import counter from "../components/Counter";

/**
 *  Let's add "showCounter" properties to the state object based on which the counter buttons will be shown or hidden.
 *
 *  Notes:
 *   - While working with Redux, we should never mutate the state i.e., directly updating the value in the existing state object.
 *      Always overwrite it by returning a brand new state object.
 *   - If same/existing state object is updated, then it will lead to bugs, unpredictable behavior, unexpected side effects in bigger app
 *      where state gets out of sync, and it can make debugging our application harder as well.
 *   - Especially when we've a state with nexted objects and arrays, it's easy to accidentally
 *      mutate the existing state & therefore we should be super careful to handle these in immutable way.
 *
 */

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
    // This is a mutable way: state.counter++;    --> Not Recommended
    if(action.type === 'INCREMENT') {
        return {
            counter: state.counter + 1,
            showCounter: state.showCounter,
        };
    }

    if(action.type === 'INCREASE') {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter,
        }
    }

    if(action.type === 'DECREMENT') {
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter,
        };
    }

    if(action.type === 'TOGGLE') {
        return {
            counter: state.counter,
            showCounter: !state.showCounter,
        };
    }
    return state;
};

const store = createStore(counterReducer);

export default store;

