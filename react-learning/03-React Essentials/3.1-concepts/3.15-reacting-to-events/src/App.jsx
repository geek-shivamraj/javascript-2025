/**
 *  In React, we add event listener like onClick prop to elements by adding a special attribute or prop.
 *    - These built-in elements/components like <button> etc support many onSomething props which would us to listen to a broad variety of events.
 *    - The value for any event prop is a function i.e., we want to point to the function that should be executed when that event occurs.
 *    - We can define these function inside the main function since these inner functions can only be called from inside main function.
 *    - The advantage of defining these event handlers inside the component function is that they have access to the Component's Prop & State.
 *    - Function as value i.e., function without parenthesis () needs to be passed to the onClick prop. This function should not be executed by us
 *      but instead by React when click on button occurs at some point in the future.
 *    - If we add parenthesis () to the function, then the function would get executed when the specific line of code gets executed.
 *
 */
import Header from "./components/Header";
import CoreConcept from "./components/CoreConcept";
import componentsImg from './assets/components.png';
import {CORE_CONCEPTS} from "./data";
import TabButton from "./components/TabButton";

function App() {
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
                  <TabButton>Components</TabButton>
                  <TabButton>JSX</TabButton>
                  <TabButton>Props</TabButton>
                  <TabButton>State</TabButton>
              </menu>
          </section>
      </main>
    </div>
  );
}

export default App;
