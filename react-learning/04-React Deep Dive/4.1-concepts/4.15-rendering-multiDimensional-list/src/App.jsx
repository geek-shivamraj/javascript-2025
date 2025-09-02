/**
 *  Now the Player functionality is finished & we will focus on building GameBoard & Log Component
 *
 *  Concept in this project: Rendering Multi-Dimensional Lists
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
