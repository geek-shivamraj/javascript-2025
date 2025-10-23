import {FC, FormEvent, useRef} from "react";
import classes from "./NewTodo.module.css";

/**
 *  - Optional Chaining (?) : Safely access nested object properties without throwing errors
 *      if something is null or undefined.
 *  - For e.g., if we're not sure if todoTextInputRef.current is null or not then use can use
 *      todoTextInputRef.current?.value;
 *
 *  - Non-null assertion Operator (!) : By using !, we're telling TS to trust that the value will not null or undefined
 *  - For e.g., todoTextInputRef.current!.value;
 *
 */
const NewTodo: FC<{ onAddTodo: (text: string) => void }> = (props) => {

    const todoTextInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        const enteredText = todoTextInputRef.current!.value;

        if (enteredText.trim().length === 0) {
            // throw an error
            return;
        }

        props.onAddTodo(enteredText);
    };

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor='text'>Todo text</label>
            <input type='text' id='text' ref={todoTextInputRef}/>
            <button>Add Todo</button>
        </form>
    );

}

export default NewTodo;