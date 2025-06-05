import '../css/styles.css';

import { TodoControl } from './todo-control.js';

document.addEventListener('DOMContentLoaded', () => {
    TodoControl.initControl();
});

/* temporary for debugging and managing localStorage */

const clearBtn = document.querySelector('.clear');

clearBtn.addEventListener('click', () => {
    localStorage.clear();
});

const logBtn = document.querySelector('.log');

logBtn.addEventListener('click', () => {
    const storage = JSON.parse(localStorage.getItem('todoStorage'));

    storage.forEach((item) => {console.log(item)});
});

/* temporary for debugging and managing localStorage */