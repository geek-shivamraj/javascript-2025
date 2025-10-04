import Header from "./components/Header.jsx";
import {CORE_CONCEPTS} from "./data/data.js";
import CoreConcept from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";

function App() {
  return (
    <div>
      <Header />
      <main>
          {/*  Task 4: Read the CORE_CONCEPTS from data.js via map */}
          <section id="core-concepts">
              <h2>Core Concepts</h2>
              <ul>
                  {CORE_CONCEPTS.map((conceptItem) => (
                      <CoreConcept key={conceptItem.title} {...conceptItem} />
                  ))}
              </ul>
          </section>
          {/* Task 5: Add a new section "examples" with title, menu & paragraph */}
          <section id="examples">
              <h2>Examples</h2>
              <menu>
                  <TabButton>Components</TabButton>
                  <TabButton>JSX</TabButton>
                  <TabButton>Props</TabButton>
                  <TabButton>State</TabButton>
              </menu>
              <p>Please select a topic.</p>
          </section>
      </main>
    </div>
  );
}

export default App;
