import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./counter-slice";
import authReducer from "./auth-slice";

/**
 *  - Where we should add authentication state ?
 *      - Logically, it doesn't make sense to add "authentication" to counter state as it has no explicit relation with counter.
 *      - In programming, we typically want to separate our concerns i.e., make sure the slice really focuses on specific state & action
 *          For e.g., the CounterSlice should focus on the counter-related state & actions.
 *      - Rather we should create a brand-new slice for Authentication state.
 *
 */
const store = configureStore({
    // reducer: counterSlice.reducer
    reducer: { counter: counterReducer, auth: authReducer },
});

export default store;

