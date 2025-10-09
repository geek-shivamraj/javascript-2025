import {createContext, useReducer} from 'react';
import {DUMMY_PRODUCTS} from "../dummy-products.js";

/**
 *
 * Instead of managing state via useState() hook & repeating the same pattern in the state updating function i.e., (prevState) => {}
 *  - React provides useReducer() hook to manage the states in more concise way by defining the reducer function.
 *  - useReducer() hook in return provides an array with state & dispatch function.
 *  - Dispatch Function allows us to dispatch so-called Actions that will trigger the defined reducer function to produce new state.
 *
 */

export const CartContext = createContext({
    items: [], // Shopping cart items
    addItemToCart: () => {},
    updateItemQuantity: () => {}
});

/**
 *
 * Defining this reducer function outside the component function, so that reducer function will not be re-created whenever
 *  this component function executes becoz
 *   - Reducer function won't need direct access to props or any value defined, updated in component function.
 */
function shoppingCartReducer(state, action) {

    if(action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload);
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            updatedItems[existingCartItemIndex] = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state, // for complex object this will be needed but here not needed becoz we've only one value.
            items: updatedItems,
        };
    }

    if(action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex((item) => item.id === action.payload.productId);
        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state, // for complex object this will be needed but here not needed becoz we've only one value.
            items: updatedItems,
        };
    }
    return state;
}

export default function CartContextProvider({ children }) {

    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, { items: []});

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: id
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId, amount
            }
        });
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity
    }

    return <CartContext value={ctxValue}>
        {children}
    </CartContext>
}

