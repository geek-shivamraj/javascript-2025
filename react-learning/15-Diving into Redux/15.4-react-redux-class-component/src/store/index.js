import { createStore } from 'redux';

/**
 * Step 2: Creating a Reducer function
 *  - We can give this state a default value so that when the reducer is executed first time, we've an initial state.
 *
 */
const counterReducer = (state = { counter: 0 }, action) => {
    if(action.type === 'INCREMENT') {
        return {
            counter: state.counter + 1,
        };
    }

    if(action.type === 'DECREMENT') {
        return {
            counter: state.counter - 1,
        };
    }
    return state;
};

/**
 * Step 1: Creating the Central Store via createStore() & add reducer as arg.
 *
 */
const store = createStore(counterReducer);

/**
 * Step 3: Creating subscribers (Connect our React app with Redux Store):
 *  - Previously, we did subscribe & dispatch from inside this file. Instead, we want to connect
 *      our React app to this Redux Store so that components of that app can dispatch & listen.
 *
 *  - To connect our React app with Redux store, we need to provide this store to the React app & since,
 *      we only have one Redux store, we only need to provide our store once.
 *  - For this, we need to wrap our root component (at topmost level) with Provider component from react-redux (same as we did for context Provider)
 *      & add the store reference to the Provider "store" prop. e.g., <Provider store={store}><App/></Provider>
 *
 *  - Note: We don't have to use Provider on the topmost component level, we can also wrap nested components with Provider but only wrapped components
 *      & their all subsequent child components will have access to Redux thereafter.
 *  - If the vast majority of our components need access to the store, we should typically wrap the root component with Provider component.
 *
 *  - Now that our React app is connected to Redux Store, the <App> or any child component can tap/subscribe to the store, get store data & dispatch actions.
 *
 */

export default store;

