/**
 *  Rendering Content Conditionally
 *    - This concept is about loading the content conditionally.
 *    - selected === undefined or !selected: To check if it's not truthy
 *    - Outputting null in JSX code will lead to nothing being rendered.
 *
 *  There are 3 ways to render the contents conditionally:
 *
 *  Way 1: Ternary Expression ( condition ? true_statement : false_statement)
 *    -
 *  Way 2 (Sometimes really useful): Using && (logical AND) Operator
 *    - AND operator in JS will actually output the value that comes after it if the prior condition yields true.
 *
 *  Way 3 (Recommended Approach): Using variable to store the conditional render JSX code
 *
 *  Example: We want to show the tab content on when the specific tab button is clicked.
 *          Initially we want to show a message "Please select a Topic"
 */
import Header from "./components/Header";
import CoreConcept from "./components/CoreConcept";
import {CORE_CONCEPTS} from "./data";
import TabButton from "./components/TabButton";
import {useState} from "react";
import { EXAMPLES } from "./data";

function App() {

  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
      setSelectedTopic(selectedButton);
  }

  let tabContent = <p>Please select a topic.</p>;
  if(selectedTopic) {
      tabContent = (
          <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
          </div>
      );
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

              {/*  Way 1: Using Ternary Operator */}
              {/*
                !selectedTopic ? <p>Please select a topic.</p> : (
                  <div id="tab-content">
                      <h3>{EXAMPLES[selectedTopic].title}</h3>
                      <p>{EXAMPLES[selectedTopic].description}</p>
                      <pre>
                      <code>{EXAMPLES[selectedTopic].code}</code>
                  </pre>
                  </div>
              )
              */}

              {/*  Way 2: Using Logical AND (&&) Operator */}
              {/*{!selectedTopic && <p>Please select a topic.</p>}*/}
              {/*
                selectedTopic && (
                  <div id="tab-content">
                      <h3>{EXAMPLES[selectedTopic].title}</h3>
                      <p>{EXAMPLES[selectedTopic].description}</p>
                      <pre>
                      <code>{EXAMPLES[selectedTopic].code}</code>
                  </pre>
                  </div>
              )
              */}

              {/*    Way 3: Using variable to store the conditional render JSX Code & if condition */}
              {tabContent}
          </section>
      </main>
    </div>
  );
}

export default App;
