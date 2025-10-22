import './App.css';
import Todos from "./components/Todos";
import Todo from "./models/todo";

/**
 *  - With all these type annotations & all these classes, we're making it clear which shape our data
 *      should have & which shape our component should have.
 *  - This simply allows us as a dev to ensure that the code is clean & has a clear structure so
 *      that it's way harder to misuse our components.
 *  - This way error can be prevented during development instead of at runtime, when we test the app.
 *
 */
function App() {

    // Create instances of Todo class
    const todos = [
        new Todo('Learn React'),
        new Todo('Learn TypeScript')
    ];

    return (
        <div>
            <Todos items={todos} />
        </div>
    );
}

export default App;
