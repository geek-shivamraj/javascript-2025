import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

/**
 * We can observe that if we increment the counter,
 *  - prime number calculation is triggered
 *  - Ideally this prime number calculation should be triggered when we set the initial counter value via "set" button.
 *  - If initial value doesn't change & if <Counter> func is re-executed on state change, isPrime() function will always produce the same result
 *  - And this can be a problem in case if our function performs a rather complex & performance intensive calculation.
 *      Therefore, re-executing all this code all the time, even though it will produce the same result as before  is not very efficient.
 *
 *   Solution: use "useMemo" hook
 *   - 	Just like we want to prevent Component func executions with memo() function, we can use "useMemo()" hook to prevent normal function execution
 *          present inside the component function unless the dependency values changed.
 *   - memo() function is wrapped around Component function & useMemo() hook is wrapped around Normal function inside the Component function.
 *
 */
function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCounter(newCount) {
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet = {handleSetCounter}/>
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
