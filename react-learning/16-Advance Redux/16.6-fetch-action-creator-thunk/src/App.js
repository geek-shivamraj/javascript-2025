import {useDispatch, useSelector} from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useEffect} from "react";
import Notification from "./components/UI/Notification";
import {fetchCartData, sendCartData} from "./store/cart-action";

/**
 *  - Action Creator is the alternative of putting all the side effect logic into the Component.
 *  - We can write our own Custom Action Creators called Thunks.
 *
 *  - We will observe that once we fetch the cart data on UI, a PUT call is again executed why?
 *      - Reason: Becoz the fetchCartData replaces the cart state in the redux
 *          that's why subsequently a put call is executed inside the useEffect hook.
 *      - One Possible Solution:
 *          - Add "changed" property to the cart Slice state.
 */

let isInitial = true;

function App() {

    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();

    // To fetch the cart data
    useEffect(() => {
        dispatch(fetchCartData())
    }, [dispatch]);

    // To update the cart data
    useEffect(() => {
        if(isInitial) {
            isInitial = false;
            return;
        }

        // Will dispatched sendCartData only if the "changed" property is set to true
        if(cart.changed) {
            dispatch(sendCartData(cart));
        }

    }, [cart, dispatch]);

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
