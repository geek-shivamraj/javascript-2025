/**
 *  Component Splitting
 *    - To identify good places for extra Components & being able to separate responsibilities &
 *          split Big Components into smaller ones is an imp. skill for every React Dev.
 *    - A Single Component that deals with different things typically is not recommended. For e.g., Our <App> Component.
 *    - Right now, App_old.jsx has a lots of different responsibilities & a bug as well:
 *      1. Rending the <CoreConcept>, Managing the <TabButton> & its interactive part etc.
 *      2. Bug: Since we're managing the selectedTopic state in this component, on TabButton click, the CoreConcept & Header component is also getting re-executed
 *
 *  Components can be split by Feature or State
 *    - For e.g., we can split <App> component into CoreConcept, Examples with Tab Button Features i.e., CoreConcepts & Examples component.
 */

import Header from './components/Header/Header.jsx';
import CoreConcepts from "./components/CoreConcepts.jsx";
import Examples from "./components/Examples";

function App() {

  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;
