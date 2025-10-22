import './App.css';
import Todos from "./components/Todos";

function App() {
    return (
        <div>
            <Todos items={['Learn React Native', 'Learn TypeScript']} />
        </div>
    );
}

export default App;
