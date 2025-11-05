import {useDispatch, useSelector} from 'react-redux';

import {cartActions} from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

/**
 * Problem Set:
 *  - We can't send HTTP request (i.e., async / side effects) in/from the Reducer.
 *  - We've 2 places where we can put side effects & async tasks
 *      1. Inside the Component
 *          - We can put the side effect code inside the useEffect hook & based on state dependency
 *              i.e., cart, the HTTP request will be sent.
 *
 *      2. Inside the Action Creators Thunk
 *
 */

const ProductItem = (props) => {
    const {title, price, description, id} = props;

    const dispatch = useDispatch();
    const addToCartHandler = () => {
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
