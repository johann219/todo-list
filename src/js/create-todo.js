import Todo from './todo.js';
import { InputServicePrompt } from './input-service.js';

const createTodo = () => {
    const title = InputServicePrompt.getTitle();
    const status = InputServicePrompt.getStatus();
    // const description = InputServicePrompt.getDescription();
    // const dueDate = InputServicePrompt.getDueDate();

    return new Todo(title, status/*, description, dueDate*/);
};

export  { createTodo };