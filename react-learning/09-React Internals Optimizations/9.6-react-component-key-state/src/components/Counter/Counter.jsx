import {memo, useCallback, useMemo, useState} from 'react';

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
 *  To understand how State is tracked via Position by React,
 *      - commenting the "counter" state & adding "counterChanges" state
 *      - "counterChanges" state will have an array with counter changes history.
 *      - This "counterChanges" state will be used by <CounterHistory> component to render the counter history
 *
 *  Why we added <CounterHistory> component?
 *      - Becoz we're managing "selected" state in <CounterHistory> that controls whether a specific item is selected highlighted or not.
 *
 *  Problem:
 *    - We can notice on UI, if we click on a counter history item & then increment/decrement,
 *      the highlighted item will be changed & passed to upper to lower item. Why is that ?
 *    - Ideally this state should be scoped to the <HistoryItem> component ? How can it jump across component instances?
 *
 *   Reason: Becoz the state is also tracked by Position i.e., React tracks state by Component type & position of that component in the tree.
 *    - For <Counter>, we never had this problem becoz they never changed their position.
 *    - But for <CounterHistory>, since a new item is inserted at the top, all the other items move down &
 *      therefore the position of the <HistoryItem> component instances changes.
 *    - And that's why state jumps from one component to other if we increment/decrement again.
 *    - That's a problem & in most cases, we don't want the state to jump.
 *
 *   Solution:
 *    - React gives a mechanism to avoid this state jumping b/w components via defining unique key to each item - <HistoryItem> (right now we've key as index)
 *    - This problem usually only occurs in lists as this problem can only occur if we've sibling components of same type & the position of those components may change.
 *    - That's why React forces you to add such a unique key to every list item becoz "key" is another thing
 *      that's taken into account by React to map the state to a concrete component instance.
 *
 *
 */

export default function Counter({initialCount}) {
    log('<Counter /> rendered', 1);

    const initialCountIsPrime = useMemo(() =>
        isPrime(initialCount), [initialCount]);

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
            {/* Let's add CounterHistory component here that will render counter history */}
            <CounterHistory history={counterChanges}/>
        </section>
    );
}