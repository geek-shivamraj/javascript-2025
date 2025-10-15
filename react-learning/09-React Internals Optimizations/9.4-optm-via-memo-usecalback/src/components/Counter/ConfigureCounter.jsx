import {useState} from "react";
import {log} from "../../log.js";

export default function ConfigureCounter({ onSet }) {
    log('<ConfigureCounter />', 1);

    const [enteredNumber, setEnteredNumber] = useState(0);

    function handleChange(event) {
        setEnteredNumber(+event.target.value);
    }

    function handleSetClick() {
        onSet(enteredNumber);
        setEnteredNumber(0);
    }

   return (
       <section id="configure-counter">
           <h2>Set Counter</h2>
           {/*  Becoz we've isolated below input field in a separate component, no other component will be re-executed.
                Hence, we can remove "memo" now */}
           <input type="number" onChange={handleChange} value={enteredNumber} />
           <button onClick={handleSetClick}>Set</button>
       </section>
   );
}