import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

/**
 * We can observe that if we increment the counter,
 *  - We got unnecessary component execution/rendering like <IconButton>, <MinusIcon>, <PlusIcon>
 *  - Ideally they don't depend on any state or props so, they should not re-execute but why they are re-executing on each increment ?
 *
 *  Solution 1: Wrap IconButton with memo() to stop its re-execution unnecessarily & its further child components re-execution like <Icon> component.
 *      - This will not work
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
