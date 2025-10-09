import { createContext } from 'react';

export const CartContext = createContext({
    items: [], // Shopping cart items
    addItemToCart: () => {},
    updateItemQuantity: () => {}
});

