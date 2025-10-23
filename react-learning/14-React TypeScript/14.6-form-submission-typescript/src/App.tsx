import './App.css';
import Todos from "./components/Todos";
import Todo from "./models/todo";
import NewTodo from "./components/NewTodo";
import {useState} from "react";

/**
 *  - We will have problem if we just pass empty array [] to useState() hook as default value.
 *      - TS is not able to infer which types of values should be accepted in the array.
 *         That's why we can see todos type as never[].
 *      - never[] means the array must always be an empty array. No values are allowed in there.
 *      - We've to define the generic type to useState() hook to resolve above.
 *
 */

export default function App() {

    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (todoText: string) => {
        const newTodo = new Todo(todoText);

        setTodos((prevTodos) => {
            return prevTodos.concat(newTodo);
        })
    };

    const removeTodoHandler = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
    }

    return (
        <div>
            <NewTodo onAddTodo={addTodoHandler}/>
            <Todos items={todos} onRemoveTodo={removeTodoHandler}/>
        </div>
    );
}
