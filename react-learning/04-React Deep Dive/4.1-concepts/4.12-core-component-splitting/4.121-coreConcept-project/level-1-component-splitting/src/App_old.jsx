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
 *    - For e.g., we can split <App> component into CoreConcept, Examples with Tab Button Features.
 */

import { useState } from 'react';

import { CORE_CONCEPTS } from './data.js';
import Header from './components_old/Header/Header.jsx';
import CoreConcept from './components_old/CoreConcept.jsx';
import TabButton from './components_old/TabButton.jsx';
import { EXAMPLES } from './data.js';

function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  console.log('APP COMPONENT EXECUTING');

  let tabContent = <p>Please select a topic.</p>;

  if (selectedTopic) {
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

  // Using <></> instead of <div></div>
  return (
    <>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((conceptItem) => (
              <CoreConcept key={conceptItem.title} {...conceptItem} />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton
              isSelected={selectedTopic === 'components'}
              onSelect={() => handleSelect('components')}
            >
              Components
            </TabButton>
            <TabButton
              isSelected={selectedTopic === 'jsx'}
              onSelect={() => handleSelect('jsx')}
            >
              JSX
            </TabButton>
            <TabButton
              isSelected={selectedTopic === 'props'}
              onSelect={() => handleSelect('props')}
            >
              Props
            </TabButton>
            <TabButton
              isSelected={selectedTopic === 'state'}
              onSelect={() => handleSelect('state')}
            >
              State
            </TabButton>
          </menu>
          {tabContent}
        </section>
      </main>
    </>
  );
}

export default App;
