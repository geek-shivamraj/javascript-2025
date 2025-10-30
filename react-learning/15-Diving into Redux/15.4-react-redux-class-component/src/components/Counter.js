import classes from './Counter.module.css';
import { connect } from 'react-redux';
import {Component} from 'react';

/**
 *  Step 4: Accessing the Redux Store managed data via components.
 *   - Hooks like useSelector or useDispatch are not usable in class-based components.
 *   - We can use "connect" function from redux to connect class-based components to Redux Store.
 *   - mapStateToProps func will be used.
 *
 *   connect() function
 *    - It's a higher order function.
 *    - We execute the connect() function, it then returns a new function & we execute this returned new func as well with Counter as arg.
 *
 *  Step 5: Dispatch Actions from Components
 *   - mapDispatchToProps func will be used.
 */
class Counter extends Component {

    incrementHandler() {
        this.props.increment();
    }

    decrementHandler() {
        this.props.decrement();
    }

    toggleCounterHandler() {}

    render() {
        return (
            <main className={classes.counter}>
                <h1>Redux Counter</h1>
                <div className={classes.value}>{this.props.counter}</div>
                <div>
                    <button onClick={this.incrementHandler.bind(this)}>Increment</button>
                    <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
                </div>
                <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
            </main>
        );
    }

}

/**
 * This func maps Redux state to props
 *  - Equivalent to useSelector hook.
 */
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

/**
 * This func maps dispatch to props
 *  - Equivalent to useDispatch hook.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch({type: 'INCREMENT'}),
        decrement: () => dispatch({type: 'DECREMENT'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
