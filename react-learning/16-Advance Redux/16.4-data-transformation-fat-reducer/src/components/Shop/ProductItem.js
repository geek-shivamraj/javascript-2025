import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

/**
 * Problem Set:
 *  - We can't send HTTP request (i.e., async / side effects) in/from the Reducer.
 *  - We've 2 places where we can put side effects & async tasks
 *      1. Inside the Component
 *          - Instead of adding data transformation in the Component, we can add them in reducer i.e.,
 *              we want to dispatch the addItemToCart action & do all the necessary heavy work inside the Reducer func.
 *          - But now to sync our new state (derived in Frontend) with the backend server, we can simply switch the order.
 *              i.e., Step 1: We can add the data transformation in reducer & let Redux update its store.
 *                    Step 2: We send the HTTP request to the backend server.
 *                      - Not in reducer func ofc but somewhere else like ProductItem or a totally different file like App.js
 *
 *      2. Inside the Action Creators
 *
 */

const ProductItem = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { title, price, description, id } = props;

  const addToCartHandler = () => {

    // and then send Http request
    // fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })

    dispatch(cartActions.addItemToCart({id, title, price}));
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
