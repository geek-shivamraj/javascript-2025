/**
 *  Level 2: Component Splitting
 *    - Now we want to split the components further.
 *
 *  Concept: Forwarding Props to Wrapped Element
 *   - We observe that a new Component <Section> can be pulled out from CoreConcepts.jsx & Examples.jsx to enforce the common structure (title & content)
 *   - The content in both of these Components are JSX code.
 *
 *  Refer Section.jsx for further understanding
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
