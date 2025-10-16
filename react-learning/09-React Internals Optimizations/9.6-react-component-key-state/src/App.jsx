import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

/**
 * It's super important to understand the state you register in a component function is scoped to that component & also is re-created whenever you re-use this component.
 *    - For e.g., if we create 2 instance of same <Counter> component, then both instances will have their own independent
 *      & isolated "counter" state. The state is not shared but scoped to the Component.
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

        {/*  New instance of Counter with independent state */}
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
