import {FC, PropsWithChildren} from "react";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";


/**
 *  bind() is a default method in JS which allows us to pre-configure a function for future execution.
 *      - The bind() method of Function   instances creates a new function that, when called,
 *          calls this function with its this keyword set to the provided value, and a given sequence of arguments
 *          preceding any provided when the new function is called.
 *
 */
const Todos: FC<{ items: Todo[], onRemoveTodo: (id: string) => void }> = (props) => {
    return (
        <ul className={classes.todos}>
            {props.items.map(item => (
                <TodoItem key={item.id} todoText={item.text} onRemoveTodo={props.onRemoveTodo.bind(null, item.id)}/>
            ))}
        </ul>
    );
}

export default Todos;