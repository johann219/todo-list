import '../css/styles.css';

import { createTodo } from './create-todo.js';
import { renderTodo, renderTodoList } from './render-todo.js';
import { inputServicePrompt } from './input-service.js';
import { saveTodoToLocalStorage, getLiveTodoStorage } from './todo-storage.js';

const addTodoBtn = document.querySelector('.add-todo');

document.addEventListener('DOMContentLoaded', () => {
    const loadedTodoList = getLiveTodoStorage();
    renderTodoList(loadedTodoList);
});

addTodoBtn.addEventListener('click', () => {
    const title = inputServicePrompt.getTitle();
    const status = inputServicePrompt.getStatus();
    
    const newTodo = createTodo(title, status);

    renderTodo(newTodo);
    saveTodoToLocalStorage(newTodo);
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