import {useDispatch, useSelector} from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useEffect} from "react";
import Notification from "./components/UI/Notification";
import {sendCartData} from "./store/cart-slice";

/**
 *  - Action Creator is the alternative of putting all the side effect logic into the Component.
 *  - We can write our own Custom Action Creators called Thunks.
 *      - Thunk is simply a function that delays an action until later or something else finished.
 *      - We could write an action creator as a thunk that doesn't immediately return the action object but
 *          instead, returns another function which eventually return the action so that we can run some other code before we dispatch the actual object.
 *
 *      - Move the dispatch action code, sending & receiving HTTP request & response into the action creator in the cart-slice.
 *
 *  - The great thing about Redux toolkit is it's prepared for accepting Action object with "type" property
 *      and also action creators that return functions.
 *      - If Redux observes that we're dispatching an action i.e., a function instead of action object, it will execute that func for us.
 *      - i.e., sendCartData() func or thunk will be executed by Redux & Redux provides "dispatch" arg automatically so that in the thunk we can dispatch again.
 *      - It's very common pattern to have "Action creators that can perform side effect & then dispatch other actions which eventually reaches to the reducers"
 *
 *  - High Recommendation:
 *      - Keep the component lean (not much logic) by moving the logic to Action creator functions.
 */

// Using "isInitial" flag to check if App is loaded first time so that this useEffect code
//  i.e., empty cart data will not be sent/executes first time
let isInitial = true;

function App() {

    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();

    // Here we're dispatching different Notification states depending on the current status we've.
    useEffect(() => {

        // This will block sendCartData() for just 1st time.
        if(isInitial) {
            isInitial = false;
            return;
        }

        // Dispatching Custom Action Creator or Thunk
        dispatch(sendCartData(cart));

    }, [cart, dispatch]);

    // Using "notification" here to conditionally rendering the Notification component.
    return (
        <>
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
            <Layout>
                {showCart && <Cart/>}
                <Products/>
            </Layout>
        </>

    );
}

export default App;
