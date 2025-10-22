import {FC, PropsWithChildren} from "react";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";

/**
 *  - We can set "key" prop on any functional component even though our component doesn't explicitly expect "key" prop
 *  - Becoz using React.FC as base type supports "key" prop by itself.
 */

const Todos: FC<PropsWithChildren<{ items: Todo[] }>> = (props) => {
    return (
        <ul>
            {props.items.map(item => (
                <TodoItem key={item.id} todoText={item.text}/>
            ))}
        </ul>
    );
}

export default Todos;