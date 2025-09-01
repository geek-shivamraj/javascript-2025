/**
 *  Level 3: Component Splitting
 *    - Now we want to split the components further.
 *
 *  Concept 1: Working with multiple JSX Slots (i.e., passing JSX as a separate prop)
 *   - We observe that a new Component <Tabs> can be pulled out from Examples.jsx to enforce the common structure (menu with multiple TabButton & content)
 *
 *  Refer Tabs.jsx for further understanding
 */

import Header from './components/Header/Header.jsx';
import CoreConcepts from "./components/CoreConcepts.jsx";
import Examples from "./components/Examples";

function App() {

  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;
