import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';

/**
 * Problem:
 *  - Becoz of the below input field residing in <App> component, and since <App> component is the root component,
 *      on each key stoke all the child components are getting re-executed.
 *  - We can check with console to visualize all the component getting executed.
 *
 *  Solution:
 *   1. Using "memo()" function from 'react'
 *      - React gives a built-in function that we can wrap around our component function
 *          that will prevent unnecessary component function executions.
 *      - let's wrap Counter component with memo().
 *
 *  2. Using clever component composition
 *      - We can put this section which is changing on input into a separate component.
 *      - That way, any change in this component having input will not affect other <App> components.
 */
function App() {
  log('<App /> rendered');

  const [enteredNumber, setEnteredNumber] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);

  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <>
      <Header />
      <main>
        <section id="configure-counter">
          <h2>Set Counter</h2>
          {/*  Becoz of the below input field residing in <App> component, and since
                <App> component is the root component,  on each key stoke all the child
                components are getting re-executed.*/}
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
