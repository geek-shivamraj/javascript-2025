/**
 *
 * In React, the Component (App.jsx) is a just a JavaScript Function below 2 rules:<br>
 *      1. Name starts with uppercase character
 *          - The function name must start with an uppercase character to let React know that this is a Custom Component.
 *          - Multi-word names should be written in PascalCase (e.g., MyHeader)
 *          - It's recommended to pick a name that describes the UI building block (e.g., Header, MyHeader)
 *
 *      2. Returns "Renderable" content
 *          - The function must return a value that can be rendered ("displayed on screen") by React
 *          - In most cases: Return JSX, but also returns: string, number, boolean, null, array of allowed values.
 *
 */

// Header is a custom component. (Starts with uppercase character)
function Header() {
    return (
        // header is a built-in component. (Starts with lowercase character)
        <header>
            <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
                Fundamental React concepts you will need for almost any app you are
                going to build!
            </p>
        </header>
    );
}

// App is a Custom Root Component. (Starts with uppercase character)
function App() {
  return (
    <div>
      {/* Self-Enclosing Syntax */}
      <Header />
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
