import { createStore } from 'redux';

/**
 *  Attaching payloads to Actions
 *      - Till this point, we only dispatched simple actions like a type but in reality,
 *          we often want to dispatch actions that carry extra values.
 *      - For E.g., Let's add a new button to the Counter component that increases the count by 5.
 */
const counterReducer = (state = { counter: 0 }, action) => {
    if(action.type === 'INCREMENT') {
        return {
            counter: state.counter + 1,
        };
    }

    // This is a scalable, generic & dynamic reducer
    // We've action payload with type & amount.
    // Action payloads are just extra properties we add to the action objects.
    if(action.type === 'INCREASE') {
        return {
            counter: state.counter + action.amount,
        }
    }

    if(action.type === 'DECREMENT') {
        return {
            counter: state.counter - 1,
        };
    }
    return state;
};

const store = createStore(counterReducer);

export default store;

