/**
 *  Component Composition
 *    - Component Composition is a way of building Components where our components can wrap other Components/Contents.
 *    - The "children" prop contains whatever content b/w our Component tag & this content can be text or some complex JSX structure if needed.
 *
 *  There are 2 ways to add content to the Component
 *    1. By adding content to the "label" attribute as part of Component (content is passed as "label" prop)
 *    2. By adding content b/w the Component opening & closing tag (content is passed as "children" prop)
 *
 *  Example: We have to add 4 tab button having values as Component, JSX, Props, State (Refer image2.png)
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
