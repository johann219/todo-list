import '../css/styles.css';

import { createTodo } from './create-todo.js';
import { renderTodo, renderTodoList } from './render-todo.js';
import { inputServicePrompt } from './input-service.js';
import { TodoStorage } from './todo-storage.js';
import { TodoStatusChange } from './todo-change.js';

const addTodoBtn = document.querySelector('.add-todo');

document.addEventListener('DOMContentLoaded', () => {
    TodoStorage.initStorage();
    TodoStatusChange.initChange();
    renderTodoList(TodoStorage.getStorage());
});

addTodoBtn.addEventListener('click', () => {
    const title = inputServicePrompt.getTitle();
    const status = inputServicePrompt.getStatus();
    
    const newTodo = createTodo(title, status);

    TodoStorage.addNewTodo(newTodo);
    renderTodo(newTodo);
});

/* temporary for debugging and managing localStorage */

const clearBtn = document.querySelector('.clear');

clearBtn.addEventListener('click', () => {
    localStorage.clear();
});

const logBtn = document.querySelector('.log');

logBtn.addEventListener('click', () => {
    console.log(localStorage.getItem('todoStorage'))
});

/* temporary for debugging and managing localStorage */