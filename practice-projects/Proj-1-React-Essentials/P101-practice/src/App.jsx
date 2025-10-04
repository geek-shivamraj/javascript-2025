import Header from "./components/Header.jsx";
import {CORE_CONCEPTS} from "./data/data.js";
import CoreConcept from "./components/CoreConcept.jsx";

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
      </main>
    </div>
  );
}

export default App;
