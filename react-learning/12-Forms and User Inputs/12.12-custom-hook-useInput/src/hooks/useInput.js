import {useState} from "react";

/**
 * The idea is to use "useInput" hook once per input element in our form
 *  - hence instead of managing multiple inputs together, we can manage just one input value.
 */
export function useInput(defaultValue, validationFn) {

    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    function handleInputChange(event) {
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true);
    }

    return {
        value: enteredValue,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid
    };
}