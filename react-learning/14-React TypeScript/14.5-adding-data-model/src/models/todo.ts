/**
 *  - When using TS, we also have to define the type of properties ahead of time
 *      to make it clear which type of values will be stored in there.
 */
class Todo {
    id: string;
    text: string;

    constructor(todoText: string) {
        this.id = new Date().toISOString();
        this.text = todoText;
    }
}

export default Todo;