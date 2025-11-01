import {createSlice} from "@reduxjs/toolkit";

const initialCounterState = {counter: 0, showCounter: true};

// counterSlice is a slice of global state which is responsible for working with the counter.
const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;
        },

        decrement(state) {
            state.counter--;
        },

        // By default, action has payload attribute
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },

        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
})

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;