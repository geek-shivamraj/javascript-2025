/**
 *  Let's Handle the User Input & 2-Way-Binding -> Refer Player.jsx
 *
 *  Concept learnt: User Input & 2-Way-Binding
 *    - This way of listening to a change on the input & then feeding that updated value back into the input (via "value" prop) is called 2-way-binding.
 */
import Player from "./components/Player.jsx";

function App() {
    return <main>
        <div id="game-container">
            <ol id="players">
                <Player initialName="Player 1" symbol="X"/>
                <Player initialName="Player 2" symbol="O"/>
            </ol>
        </div>
    </main>;
}

export default App
