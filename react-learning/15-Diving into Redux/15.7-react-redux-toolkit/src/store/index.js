import {configureStore, createSlice} from "@reduxjs/toolkit";

/**
 * Redux Toolkit simplifies a couple of aspects of working with Redux
 *  - We can use "createSlice" func (more enhanced than createReducer func) to prepare a slice of our global state.
 *  - In case we've different piece of state not directly related e.g., Authentication state & Counter state, we can
 *      create different slices in same/different files to make our code maintainable.
 *  - Since both of our states are counter related state, we can create 1 slice for now.
 *  - Every slice needs
 *      - 'name': identifier for that piece of state
 *      - 'initialState'
 *      - 'reducers': it's an object of all the reduces the state slice needs
 *          - We can add methods of any name inside the reducers.
 *          - These methods will be automatically called by Redux depending on which action is triggered i.e., no more if checks,
 *              & they will receive the current/latest state as arg and action having extra payload/data.
 *          - Based on the automatically generated reducer func identifier for each method, the action will be dispatched.
 *          - Inside the reducer func, we're allowed to mutate the state as by using Redux toolkit & its functions like createSlice we can't accidentally manipulate
 *              the existing state becoz Redux toolkit internally uses another package called Immer that detects any mutable code
 *               & will automatically clone the existing state & override the edited state in immutable way.
 *
 *          - So, as a developer, we don't have to create a copy manually.
 *
 *  - To register the slice with our redux store
 *      - Way 1: const store = createStore(counterSlice.reducer);
 *          - In case of bigger applications with multiple state slices with multiple reducers we would face problem if we try like above
 *              becoz there can only be one reducer passed to createStore() func.
 *
 *      - Way 2: Standard Redux combineReducers() func
 *
 *      - Way 3: Using configureStore() func from @reduxjs/toolkit
 *          - configureStore() func like createStore() creates a store, but it makes merging multiple reducers into one reducer easier.
 *          - we pass configuration object (not a reducer func) as argument to configureStore() func.
 *          - We set "reducer" property as single reducer obj / map of reducers in configuration object.
 *          - Imp. note: No matter if we use createStore or configureStore, Redux expects one main reducer function as "reducer" property
 *              which is responsible for the global state.
 *
 *  - For dispatching actions, createSlice() automatically creates unique action identifiers for different reducers.
 *      - To get hold of these action identifiers, we can use counterSlice.actions. This will give us object full of keys (key name same as reducer method name)
 *      - But these keys are created by Redux Toolkit which when called, create action objects for us. Therefore, these methods are called Action creators.
 *      - These Action objects will already have a type property with a unique identifier per action.
 *
 *  - So, we export the store & counter actions.
 *
 */
const initialState = { counter: 0, showCounter: true };

// counterSlice is a slice of global state which is responsible for working with the counter.
const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
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

const store = configureStore({
    // reducer: { counter: counterSlice.reducer }
    reducer: counterSlice.reducer
});

export const counterActions = counterSlice.actions;

export default store;

