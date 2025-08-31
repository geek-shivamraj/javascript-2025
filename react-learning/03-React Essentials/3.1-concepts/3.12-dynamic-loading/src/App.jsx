/**
 *  Content Dynamic Loading:
 *     - Instead of just outputting static content, we can actually output Dynamic content in a Component (JSX).
 *     - By using curly braces {}
 *
 *  Note:
 *     - if-statement, for-loops, function definitions & other block statements are not allowed inside {}.
 *     - Only expressions that directly produce a value are allowed inside {}.
 *
 *  Example: We want the static content "Fundamental" in (<header>) to keep randomly changing with values as ['Core', 'Crucial']
 *
 *  Image Dynamic Loading:
 *     - We can use the same curly braces syntax {} to src attribute value & load image dynamically.
 *     - Use import
 *     - Recommended approach
 */

import reactImg from './assets/react-core-concepts.png';

const reactDescription = ['Fundamental', 'Crucial', 'Core'];

function generateRandomInt() {
    const max = reactDescription.length;
    return Math.floor(Math.random() * (max + 1));
}

function Header() {
    // It's better practice to pull the dynamic content expression out of JSX code & store it in a variable/const & use that reference.
    const description = reactDescription[generateRandomInt()];
    return (
        <header>
            <img src={reactImg} alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
                {/*{reactDescription[generateRandomInt()]}*/}
                {description} React concepts you will need for almost any app you are going to build!
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
