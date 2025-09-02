/**
 *  Let's Handle the button & its associated state. -> Refer Player.jsx
 *
 *  Concept learnt: (State update based on previous of value of that state)
 *   - When updating our state based on the previous value of that state, we should pass a function to that state updating function i.e., setter function
 *   - When using function form, React guarantees that we will always be working with latest available state value.
 *
 */
import Player from "./components/Player.jsx";

function App() {
    return <main>
        <div id="game-container">
            <ol id="players">
                <Player name="Player 1" symbol="X"/>
                <Player name="Player 2" symbol="O"/>
            </ol>
        </div>
    </main>;
}

export default App
