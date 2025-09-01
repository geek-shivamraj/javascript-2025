/**
 *  Handling Events on the Custom Component
 *    - To show dynamic content on the button click, we must handle the events on the Custom Component.
 *    - Custom Components in the end just wraps Native HTML element/JSX element (to be precise the built-in components provided by React)
 *    - To set the value for the event-handler props on the built-in component from our Custom Component,
 *      we've to pass these props with function as value from our Custom Component to built-in component.
 *    - The function that we set on this onClick prop should then in the end be forwarded to the built-in element present
 *      inside our Custom Component having real onClick prop & React will make sure the function we provide as value will get triggered.
 *
 *  Example: We've to make <TabButton> clickable & pass the onSelect prop with func as value to the built-in component from our Custom Component <TabButton>
 *
 */
import Header from "./components/Header";
import CoreConcept from "./components/CoreConcept";
import {CORE_CONCEPTS} from "./data";
import TabButton from "./components/TabButton";

function App() {

  function handleSelect() {
     console.log("Hello World - selected!");
  }

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
                  <TabButton onSelect={handleSelect}>Components</TabButton>
                  <TabButton onSelect={handleSelect}>JSX</TabButton>
                  <TabButton onSelect={handleSelect}>Props</TabButton>
                  <TabButton onSelect={handleSelect}>State</TabButton>
              </menu>
          </section>
      </main>
    </div>
  );
}

export default App;
