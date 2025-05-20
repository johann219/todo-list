import '../css/styles.css';

import { TodoView } from './todo-view.js';
import { TodoStorage } from './todo-storage.js';

document.addEventListener('DOMContentLoaded', () => {
    TodoStorage.initStorage();
    TodoView.initView();
    TodoView.renderTodoList(TodoStorage.getStorage());
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