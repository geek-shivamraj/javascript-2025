import Todo from "../models/todo";
import React, {createContext, FC, PropsWithChildren, useState} from "react";

type TodoContextType = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
};

export const TodosContext = createContext<TodoContextType>({
    items: [],
    addTodo: () => {},
    removeTodo: (id) => {},
});

export const TodosContextProvider: FC<PropsWithChildren> = (props) => {

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

    const contextValue: TodoContextType = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler,
    }

    return <TodosContext.Provider value={contextValue}>
        {props.children}
    </TodosContext.Provider>
}
