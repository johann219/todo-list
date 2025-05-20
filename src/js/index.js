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
    console.log(localStorage.getItem('todoStorage'))
});

/* temporary for debugging and managing localStorage */