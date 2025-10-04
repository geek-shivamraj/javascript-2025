import Header from "./components/Header.jsx";
import {CORE_CONCEPTS} from "./data/data.js";
import {EXAMPLES} from "./data/data.js";
import CoreConcept from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";
import {useState} from "react";

function App() {

  // Task 7: Managing state using useState() hook
  const [selectedTab, setSelectedTab] = useState();

  // Task 7: Event Handler function. Also state update
  const handleSelectedTab = (selectedTab) => {
      setSelectedTab(selectedTab);
  }

  // Task 7: Reading the Examples based on the selected tab value2
  let tabContent = <p>Please select a topic.</p>;
    if(selectedTab) {
        tabContent = (
            <div id="tab-content">
                <h3>{EXAMPLES[selectedTab].title}</h3>
                <p>{EXAMPLES[selectedTab].description}</p>
                <pre>
                    <code>{EXAMPLES[selectedTab].code}</code>
                </pre>
            </div>
        );
  }
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
                  {/* Task 7: On each Tab button clicked, specific Tab data will be displayed */ }
                  {/* Task 8: Highlight the tab button via isSelected prop */ }
                  <TabButton isSelected={selectedTab === 'components'}
                      onSelect={() => handleSelectedTab('components')}>Components</TabButton>
                  <TabButton isSelected={selectedTab === 'jsx'}
                      onSelect={() => handleSelectedTab('jsx')}>JSX</TabButton>
                  <TabButton isSelected={selectedTab === 'props'}
                      onSelect={() => handleSelectedTab('props')}>Props</TabButton>
                  <TabButton isSelected={selectedTab === 'state'}
                      onSelect={() => handleSelectedTab('state')}>State</TabButton>
              </menu>
              {tabContent}
          </section>
      </main>
    </div>
  );
}

export default App;
