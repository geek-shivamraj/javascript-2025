import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

/**
 * We can use key to reset a component instead of using "useEffect" hook.
 *  -
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

        {/*  Adding the "key" prop, so that whenever chosenCount changes, the <Counter> component will be reset */}
        <Counter key={chosenCount} initialCount={chosenCount} />

        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
