import {FC, PropsWithChildren} from "react";

// No need to pass key as prop
const TodoItem: FC<PropsWithChildren<{todoText: string}>> = (props) => (
    <li>{props.todoText}</li>
)

export default TodoItem;