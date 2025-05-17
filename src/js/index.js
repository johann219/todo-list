import '../css/styles.css';

import { createTodo } from './add-todo.js';
import { renderTodo } from './render-todo.js';
import { getTitle, getStatus} from './get-user-data.js';

const addTodoBtn = document.querySelector('.add-todo');

addTodoBtn.addEventListener('click', () => {
    renderTodo(createTodo(getTitle(), getStatus()));
});

