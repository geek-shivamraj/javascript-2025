import {useEffect, useCallback, useMemo, useState} from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import {log} from '../../log.js';
import CounterHistory from "./CounterHistory.jsx";

function isPrime(number) {
    log(
        'Calculating if is prime number',
        2,
        'other'
    );
    if (number <= 1) {
        return false;
    }

    const limit = Math.sqrt(number);

    for (let i = 2; i <= limit; i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

/**
 *  To understand how key helps in resetting the component, let's add the initial Counter setter functionality.
 *
 *  Way 1: By using useEffect hook
 *      - This approach would work if it's encouraged to limit the usage of "useEffect" hook.
 *      - Becoz it is often used in suboptimal way & it also triggers an extra component execution as the side effects run after the component function execution.
 *
 *  Way 2: Adding key to the component
 *      - We can use key prop to any component & assign it a value or state value so that whenever the key value
 *          i.e., state value changes, React will basically throw away the old component instance & recreate it.
 *
 *      - By using this approach, we avoid extra component function execution (like in useEffect()) as now the old component is
 *          simply removed & a new component of same type is re-inserted & therefore executed by React (only executed once)
 */
export default function Counter({initialCount}) {
    log('<Counter /> rendered', 1);

    const initialCountIsPrime = useMemo(() =>
        isPrime(initialCount), [initialCount]);

    /*
    useEffect(() => {
        setCounterChanges([{value: initialCount, id: Math.random() * 1000}]);
    }, [initialCount]);
    */

    // Defining unique id for initial counter item
    const [counterChanges, setCounterChanges] = useState([
        {value: initialCount, id: Math.random()}]);

    const currentCounter = counterChanges.reduce(
        (prevCounter, counterChange) => prevCounter + counterChange.value, 0);

    const handleDecrement = useCallback(function handleDecrement() {
        // Defining unique id for each counter
        setCounterChanges(prevCounterChanges => [
            {value: -1, id: Math.random() * 1000},
            ...prevCounterChanges]);
    }, []);

    const handleIncrement = useCallback(function handleIncrement() {
        // Defining unique id for each counter
        setCounterChanges(prevCounterChanges => [
            {value: 1, id: Math.random() * 1000},
            ...prevCounterChanges]);
    }, []);

    return (
        <section className="counter">
            <p className="counter-info">
                The initial counter value was <strong>{initialCount}</strong>. It{' '}
                <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
            </p>
            <p>
                <IconButton icon={MinusIcon} onClick={handleDecrement}>
                    Decrement
                </IconButton>
                <CounterOutput value={currentCounter}/>
                <IconButton icon={PlusIcon} onClick={handleIncrement}>
                    Increment
                </IconButton>
            </p>
            <CounterHistory history={counterChanges}/>
        </section>
    );
}