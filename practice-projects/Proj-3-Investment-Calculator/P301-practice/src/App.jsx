import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";
import {useState} from "react";

export default function App() {

    // Task 4
    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10
    });

    // Task 6
    const inputIsValid = userInput.duration >= 1;

    // Task 4
    function handleChange(inputIdentifier, newValue) {
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                // Using + to force the conversion of string val to number val
                [inputIdentifier]: +newValue
            }
        });
    }

    return <>
        <Header/>
        <UserInput userInput={userInput} onChange={handleChange} />
        {!inputIsValid && <p className="center">Please enter a duration greater than zero.</p>}
        {inputIsValid && <Results input={userInput} />}
    </>
}
