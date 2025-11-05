import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

/**
 * Problem Set:
 *  - We can't send HTTP request (i.e., async / side effects) in/from the Reducer.
 *  - We've 2 places where we can put side effects & async tasks
 *      1. Inside the Component
 *          - We can use "useSelector" to get the current "cart" state before it's updated & then do all the transformation
 *              we do inside the reducer in ProductItem without mutating the Redux managed state though & then we send HTTP Request.
 *
 *          - Imp. note: We can write mutating code only inside the reducer methods in the slice (becoz of Redux Toolkit Internal Transformation)
 *              but in regular component, we should not mutate/change the JS object in memory which is also part of Redux store without making Redux aware of it
 *                  e.g., cart.totalQuantity = cart.totalQuantity + 1 // Terrible Code.
 *              - So, we should never mutate Redux State, especially outside a Reducer. Rather create a new constant without changing the quantity in the Redux Store.
 *                  e.g., const newTotalQuantity = cart.totalQuantity + 1;
 *
 *          - Problems with this approach:
 *              1. We need to duplicate all the logic we've added here to all other components. -> we can outsource this as separate func
 *              2. We perform all the data transformation logic in some helper func & in the end directly in our Component
 *                  i.e., our Redux Reducer don't do a lot of works (just get some data & store it)
 *                  - i.e., we can remove other reducers in cart-slice & just use replaceCart reducer.
 *                  - This is fine if it's your personal preference, but it's not the main idea behind using Redux becoz we've choice where we can put our code:
 *                      i.e., Fat Reducer Vs Fat Components Vs Fat Actions.
 *                      - Choice selection depends on whether we've Sync, Side effect free code (i.e., data transformation) or Async code or code with side effects.
 *                      - Prefer "Reducers" in case we're dealing with synchronous side effect free code i.e., we basically just have some
 *                          data transformation & Avoid action creators or components.
 *                      - Prefer "Action Creators or Components" in case we're dealing with Async code or code with side effects & must never use Reducers.
 *
 *          - This is a suboptimal code becoz we're performing the Data Transformation in the Component & not inside the Reducer.
 *
 *      2. Inside the Action Creators
 *
 */

const ProductItem = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { title, price, description, id } = props;

  const addToCartHandler = () => {
    const newTotalQuantity = cart.totalQuantity + 1;

    const updatedItems = cart.items.slice(); // create copy via slice to avoid mutating original state
    const existingItem = updatedItems.find((item) => item.id === id);
    if (existingItem) {
      const updatedItem = { ...existingItem }; // new object + copy existing properties to avoid state mutation
      updatedItem.quantity++;
      updatedItem.totalPrice = updatedItem.totalPrice + price;
      const existingItemIndex = updatedItems.findIndex((item) => item.id === id);
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        id: id,
        price: price,
        quantity: 1,
        totalPrice: price,
        name: title,
      });
    }

    const newCart = {
      totalQuantity: newTotalQuantity,
      items: updatedItems,
    };

    // Dispatching the Action
    dispatch(cartActions.replaceCart(newCart));

    // and then send Http request
    // fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })

    // dispatch(
    //   cartActions.addItemToCart({
    //     id,
    //     title,
    //     price,
    //   })
    // );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
