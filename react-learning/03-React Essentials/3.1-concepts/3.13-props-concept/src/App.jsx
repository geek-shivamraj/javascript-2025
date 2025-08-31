/**
 *  React offers the crucial concept related to Components called "Props".
 *     - "Props" concept is all about passing the data/attributes (called as Props) into Custom Components & then use that data/attributes to built-in components.
 *
 *  Imp. Points to Note:
 *    1. We can pass all kinds of values as our Props like strings, numbers, arrays, objects.
 *          - E.g., <UserInfo name="Max" age = {34} details={{userName: 'Max'}} hobbies={['Cooking', 'Reading']} />
 *    2. Component function can accept only one props parameter.
 *    3. We can use any name for props but recommended to use "props" only.
 *    4. "props" parameter in our Component function will be set by React becoz only React will execute this function.
 *    5. The attr names we used in the Component must be same as the key names we use to access same attribute inside Component function.
 *
 *
 *  Example: We want to add CoreConcept component with 4 instances, each having different title, description & image.
 */
import Header from "./components/Header";
import CoreConcept from "./components/CoreConcept";
import componentsImg from './assets/components.png';
import {CORE_CONCEPTS} from "./data";

function App() {
  return (
    <div>
      <Header />
      <main>
          <section id="core-concepts">
              <h2>Core Concepts</h2>
              <ul>
                  <CoreConcept
                      title="Components"
                      description="The core UI building block - compose the user interface by combining multiple components."
                      image={componentsImg} />
                  <CoreConcept
                      title={CORE_CONCEPTS[1].title}
                      description={CORE_CONCEPTS[1].description}
                      image={CORE_CONCEPTS[1].image} />
                  <CoreConcept {...CORE_CONCEPTS[2]} />
                  <CoreConcept {...CORE_CONCEPTS[3]} />
              </ul>
          </section>
      </main>
    </div>
  );
}

export default App;
