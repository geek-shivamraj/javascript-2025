/**
 *  Managing State
 *   - By default, React Components execute only once i.e., when loaded 1st time in the browser.
 *   - We've to tell React explicitly that a particular Component should execute again when there is some state changes in the Component.
 *
 *  State
 *   - State concept is all about registering variables that are going to be handled by React i.e., any change to the state of variable will be taken care by React
 *   - React provides special functions called "Hooks" that must be imported from React lib to create these special variables.
 *      e.g., Import { useState } from 'react';
 *
 *  React Hooks
 *   - All the functions whose name starts with "use" in React are React Hooks.
 *   - React Hooks are technically regular functions, but they should only be called from inside the React Component functions or inside other React Hooks
 *   - Must not be called from inside the nested function or other codes i.e., Top-level in the Component.
 *
 *  useState() Hook
 *   - useState() hook allows us to manage Component specific states i.e., any change in the data stored by React in the Component,
 *      will trigger the Component complete function to be re-executed & re-evaluated by React.
 *   - useState() hook accepts default value as argument that will be used by React when the Component will be rendered first time.
 *   - useState() hook return an array with exactly 2 element:
 *       - Element 1: Current data snapshot i.e., variable/const initial value when component was executed.
 *       - Element 2: a setter function to update the current data snapshot with new value or state, accordingly React will re-execute the Component function
 *          Convention: Element2 should start with set{1st letter Uppercase}Element1 e.g., const [initialValue, setInitialValue] = useState('Initial val');
 *
 *  How State Change works ?
 *   - When we add the logic in setter function of useState() hook, React will schedule the state update (i.e., not immediately state will be updated) and
 *      then re-executes the Component function. So, the updated value/state will not reflect immediately but once the main component function re-executes.
 *   - We can verify this by logging the value right after scheduling the update.
 *
 *
 *  Example: We want to update the Dynamic Content with the clicked Button identifier specific to the Tab Button.
 *          i.e., when jsx TabButton will be clicked, the dynamic content should be 'jsx' & so on.
 *
 *
 *  Problem without useState() hook
 *   - Since the React component executes only once, the handleSelect function will not trigger the component re-execution.
 *
 */
import Header from "./components/Header";
import CoreConcept from "./components/CoreConcept";
import {CORE_CONCEPTS} from "./data";
import TabButton from "./components/TabButton";
import {useState} from "react";

function App() {

  const [selectedButton, setSelectedButton] = useState('Please click a button')

  function handleSelect(selectedButton) {
      setSelectedButton(selectedButton);
  }

 /**
  *
  let tabContent = 'Please click a button';

  function handleSelect(selectedButton) {
     // selectedButton values = 'components', 'jsx', 'props', 'state'
     console.log(selectedButton);
     tabContent = selectedButton;
  }
*/
  // Check to verify if component is re-executed (Check Browser Console)
  console.log("App Component executed!!");

  return (
    <div>
      <Header />
      <main>
          <section id="core-concepts">
              <h2>Core Concepts</h2>
              <ul>
                  <CoreConcept {...CORE_CONCEPTS[0]} />
                  <CoreConcept {...CORE_CONCEPTS[1]} />
                  <CoreConcept {...CORE_CONCEPTS[2]} />
                  <CoreConcept {...CORE_CONCEPTS[3]} />
              </ul>
          </section>
          <section id="examples">
              <h2>Examples</h2>
              <menu>
                  <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
                  <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
                  <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
                  <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
              </menu>
              {/*{tabContent}*/}
              {selectedButton}
          </section>
      </main>
    </div>
  );
}

export default App;
