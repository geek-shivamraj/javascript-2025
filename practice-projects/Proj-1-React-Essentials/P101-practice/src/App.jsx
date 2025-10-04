import Header from "./components/Header.jsx";
import CoreConcepts from "./components/CoreConcepts.jsx";
import Examples from "./components/Examples.jsx";

function App() {
  return (

    // Task 9: Remove useless <div> & use empty tag <></>
    <>
      <Header />
      <main>
          {/* Task 10: Component Splitting */}
          <CoreConcepts />
          <Examples />
      </main>
    </>
  );
}

export default App;
