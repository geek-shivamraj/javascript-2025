import {FC, MouseEventHandler, PropsWithChildren} from "react";
import classes from "./TodoItem.module.css";

const TodoItem: FC<{todoText: string, onRemoveTodo: () => void}> = (props) => {
    return <li className={classes.item} onClick={props.onRemoveTodo}>{props.todoText}</li>
}

export default TodoItem;