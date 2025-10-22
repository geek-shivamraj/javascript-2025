import {FC, PropsWithChildren} from "react";

const TodoItem: FC<PropsWithChildren<{todoText: string}>> = (props) => (
    <li>{props.todoText}</li>
)

export default TodoItem;