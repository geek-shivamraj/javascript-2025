import {useRef, useState} from "react";

/**
 * By using 'ref', we can access the input element properties & methods by using referredVal.current
 *  - We will no longer require a state to get value via onChange event.
 */
export default function Player() {

    const playerInput = useRef();
    const [playerName, setPlayerName] = useState("Player");

    //   const [buttonClicked, setButtonClicked] = useState(false);
    //
    //   const handleInputChange = (event) => {
    //       setPlayerName(event.target.value);
    //   }

    const handleClick = () => {
        // setButtonClicked(true);
        setPlayerName(playerInput.current.value);
        // Below code to reset the input field is imperative code (Not Recommended & we're violating the idea that
        //  React is all about declarative code)
        playerInput.current.value = '';
    }
    return (
        <section id="player">
            {/*<h2>Welcome {buttonClicked ? playerName : 'Unknown Entity'}</h2>*/}
            <h2>Welcome {playerName ?? 'Unknown Entity'}</h2>
            <p>
                {/*<input type="text" onChange={handleInputChange}/>*/}
                <input ref={playerInput} type="text"/>
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}
