import {useDispatch, useSelector} from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useEffect} from "react";
import {uiActions} from "./store/ui-slice";
import Notification from "./components/UI/Notification";

/**
 *  - Here we simply get hold of overall cart state by using useSelector & listen to changes to our cart state.
 *      And whenever our cart state changes, we can send the HTTP request.
 *
 *   Step 1: We can add the data transformation in reducer & let Redux update its store. --> Check cart-slice.js & ProductItem.js
 *    Step 2: We send the HTTP request to the backend server.
 *        - Not in reducer func ofc but somewhere else like ProductItem or a totally different file like App.js
 *
 *  - We can use "useEffect" to watch for changes in our cart state
 *  - "useEffect" allows us to run side effects whenever dependency changes.
 *
 *  - For showing Notification right from start & then success or failure,
 *      Way 1: we can set up some local state in this component
 *          e.g., isLoading state, error state etc that we will set as part of our Http request cycle &
 *              then use those state to conditionally render the notification component with appropriate content.
 *     Way 2:
 *       - Since we already have a UI slice in Redux, we can add a new state for notification --> Check ui-slice.js
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

        const sendCartData = async () => {
            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!'
            }));

            const response = await fetch('https://fir-app-9f3a1-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            });

            if (!response.ok) {
                throw new Error('Sending cart data failed!!');
            }

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!'
            }));
        };

        // This will block sendCartData() for just 1st time.
        if(isInitial) {
            isInitial = false;
            return;
        }

        sendCartData().catch((error) => {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }));
        })
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
