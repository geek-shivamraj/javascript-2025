/**
 *  Now the Player functionality is finished & we will focus on building GameBoard & Log Component
 *
 *  Concept in this project: Best Practice: Update Object State Immutability
 *    - If our state is an object or Array, we should update the state in an immutable way
 *      i.e., we create a copy of the old state & then just change the copy instead of the existing object or array.
 *
 */
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

function App() {
    return <main>
        <div id="game-container">
            <ol id="players">
                <Player initialName="Player 1" symbol="X"/>
                <Player initialName="Player 2" symbol="O"/>
            </ol>
            <GameBoard />
        </div>
    </main>;
}

export default App
