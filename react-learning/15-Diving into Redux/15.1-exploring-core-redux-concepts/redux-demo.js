/**
 *  - We will execute this file via Node.js
 *      - Node.js is required for creating our React apps, for installing 3rd party packages with npm & also for running the development server.
 *  - Commands to execute:
 *      1. npm init -y : This will create package.json that is required to install 3rd party packages like Redux
 *      2. npm install redux: This will add the redux dependency to package.json
 *      3. node redux-demo.js : to run this file.
 *
 *  - Steps:
 *      - Step 1: Create the Central Store
 *      - Step 2: Create the Reducer function that changes the Store
 *      - Step 3: A component that subscribes to the Central store but since we're not using React app yet,
 *                  Any code that setups a subscription to the store.
 *      - Step 4: Action to be dispatched by the Component.
 */

// Since we're going to execute this file with Node.js, we import 3rd party packages via require in Node.js
const redux = require('redux');

/**
 *  Step 2: Reducer Function
 *      - A Reducer func is a standard JS function but it will be called by Redux library & it will then
 *          always receive 2 pieces of input i.e., 2 params
 *              1. Old or existing state
 *              2. Action that was dispatched
 *
 *      - The Reducer func returns a new state object that will replace the existing state. So the reducer func should be a pure func
 *          - Pure func means func will produce same output for same values of input & there should be no side effects inside the func
 *          - i.e., we must not send a HTTP request or write/fetch something to/from local storage.
 *              Instead, a reducer should really just be a function that takes the inputs provided by Redux & then produces the expected output i.e., a new state object.
 *
 *      - E.g., const counterReducer = (state, action) => {};
 *
 *   Imp. Point:
 *      - When the store is initialized, Redux will execute the reducer func for the first time
 *          & if we don't provide a default value for state then state = undefined & hence we will get error.
 *     - This default state value will be used only for the first time hence we should add a fallback default value.
 */
const counterReducer = (state = { counter: 0 }, action) => {

    if (action.type === 'INCREMENT') {
        return {
            counter: state.counter + 1
        };
    }
    if (action.type === 'DECREMENT') {
        return {
            counter: state.counter - 1
        };
    }
    return state;
};

/**
 *  Step 1: Creating the Central Store via createStore()
 *   - Here We don't execute counter reducer, we just point at it.
 *      As both Reducer & Subscriber func will be executed by Redux.
 */
const store = redux.createStore(counterReducer);

// Will give counter as 1 after executing for the first time if we don't add "action" logic
// & directly return state.counter + 1. In case we add action & return state as initial value finally then we wil get counter: 0
console.log('Initial State: ', store.getState());  // 1

/**
 *  Step 3: Creating a subscriber (Usually Component in case of React)
 *      - getState() is a method available on the store to get the latest state snapshot after it was updated.
 *      - So, the subscription func will soon be triggered whenever the state changes
 *          & we will get latest state after it was changed via getState() method.
 *
 *      - Now, we need to make Redux aware of this Subscriber func so that this func will be executed
 *          whenever the state changes using store.subscribe();
 *
 */
const counterSubscriber = () => {
    const latestState = store.getState();
    console.log('Latest State: ', latestState);
};

// We don't execute counter subscriber here, we just point at it.
// As both Reducer & Subscriber func will be executed by Redux.
store.subscribe(counterSubscriber);


/**
 *  Step 4: Dispatch an action
 *      - We can use store.dispatch() method to dispatch an action by passing the action obj to dispatch() method.
 *      - Action is a JS object with "type" property that acts as an unique Identifier that leads to different operations being done in the reducer.
 */
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });