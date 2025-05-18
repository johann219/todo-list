import '../css/styles.css';

import { createTodo } from './create-todo.js';
import { renderTodo, renderTodoList } from './render-todo.js';
import { getTitle, getStatus} from './get-user-data.js';
import { saveTodoToLocalStorage, getLiveTodoStorage } from './todo-storage.js';

const addTodoBtn = document.querySelector('.add-todo');

document.addEventListener('DOMContentLoaded', () => {
    const loadedTodoList = getLiveTodoStorage();
    renderTodoList(loadedTodoList);
});

addTodoBtn.addEventListener('click', () => {
    const title = getTitle();
    const status = getStatus();
    
    const newTodo = createTodo(title, status);

    renderTodo(newTodo);
    saveTodoToLocalStorage(newTodo);
});

// import { updateStorage, getStorage } from './local-storage.js';

// const todoList = document.querySelector('.todo-list');

// const onTodoCheckClick = (event) => {

// };

const clearBtn = document.querySelector('.clear');

clearBtn.addEventListener('click', () => {
    localStorage.clear();
});

const logBtn = document.querySelector('.log');

logBtn.addEventListener('click', () => {
    console.log(localStorage.getItem('todoStorage'))
});