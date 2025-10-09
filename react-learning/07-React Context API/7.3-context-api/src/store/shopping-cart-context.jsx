import { createContext } from 'react';

// Step 1: Create a store folder & add a context for Cart by importing { createContext } from 'react'
// Step 2: Pass initial value to the context that will be shared among the components & assign this context to a const/variable.
// Step 3: Provide this created context to our application by wrapping this all components around this context. e.g., <CartContext><Header /><Shop /></CartContext>
export const CartContext = createContext({
    items: [], // Shopping cart items
    addItemToCart: () => {}
});

