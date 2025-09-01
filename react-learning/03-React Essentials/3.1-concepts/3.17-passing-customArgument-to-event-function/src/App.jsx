/**
 *  Passing Custom Arguments to Event Functions
 *   - Now that we've passed the event handler function as value from our Custom Component to built-in component.
 *   - To differentiate which button is clicked, we need an identifier or value on the respective button clicked.
 *
 *  Problem:
 *   - By default, just passing handleSelect to onSelect prop & finally to our built-in button inside custom component, we won't get the identifier
 *      becoz that's a custom logic specific to our application & React doesn't know that we want such an identifier when button is clicked.
 *
 *  Solution:
 *   - We've to control how handleSelect() function will be executed by React by passing Arrow/Anonymous function as value to onSelect prop.
 *   - Then we can write the specific custom logic inside the arrow function body that will be executed when Anonymous func will be executed by React.
 *   - hence we can now write function with () i.e., handleSelect() as this code will not be executed immediately but when Anonymous func will be executed by React.
 *
 *  Example: Pass the button name which will be clicked as Identifier & according print the selected button.
 *  Not Related to use case right now: Do add Dynamic content after the <menu> element.
 *
 */
import Header from "./components/Header";
import CoreConcept from "./components/CoreConcept";
import {CORE_CONCEPTS} from "./data";
import TabButton from "./components/TabButton";

function App() {

  function handleSelect(selectedButton) {
     // selectedButton values = 'components', 'jsx', 'props', 'state'
     console.log(selectedButton);
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
              Dynamic Content
          </section>
      </main>
    </div>
  );
}

export default App;
