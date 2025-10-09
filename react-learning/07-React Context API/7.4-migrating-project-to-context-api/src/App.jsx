import { useState } from 'react';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from "./components/Product.jsx";
import { CartContext } from './store/shopping-cart-context.jsx';
/**
 *  <Product> component will change/update the value stored in the context
 *  <Cart> component inside the <Header> component will read & update the items i.e., CartContext
 *  - Step 4: Therefore <App> component is the best place to wrap <Header> & <Shop> with <CartContext> so that all their child
 *      components can use that context.
 *
 *  - Step 5: Consume the context in the Cart component by using 'use' or 'useContext' hook
 *  - Step 6: Imp. step: Even though we've set a default value while creating the context, we must supply a 'value' prop to our <CartContext> component.
 */
export default function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
      items: shoppingCart.items,
      addItemToCart: handleAddItemToCart,
      updateItemQuantity: handleUpdateCartItemQuantity
  }
  return (
    <CartContext value={ctxValue}>
        <Header />
        <Shop>
            {DUMMY_PRODUCTS.map((product) => (
                <li key={product.id}>
                    <Product {...product} />
                </li>
            ))}
        </Shop>
    </CartContext>
  );
}



