/**
 *  Computing / Deriving values based on State Change.
 *    - This concept is about using the state variable, we compute or derive some values/logic
 *
 *  Example: We want to load the tab Content based on the specific tab button selected i.e., selectedTopic from data.js file (EXAMPLES)
 *
 */
import Header from "./components/Header";
import CoreConcept from "./components/CoreConcept";
import {CORE_CONCEPTS} from "./data";
import TabButton from "./components/TabButton";
import {useState} from "react";
import { EXAMPLES } from "./data";

function App() {

  const [selectedTopic, setSelectedTopic] = useState('components')

  function handleSelect(selectedButton) {
      setSelectedTopic(selectedButton);
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
                  <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
                  <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
                  <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
                  <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
              </menu>
              <div id = "tab-content">
                  <h3>{EXAMPLES[selectedTopic].title}</h3>
                  <p>{EXAMPLES[selectedTopic].description}</p>
                  <pre>
                      <code>{EXAMPLES[selectedTopic].code}</code>
                  </pre>
              </div>
          </section>
      </main>
    </div>
  );
}

export default App;
