import '../css/styles.css';

import { createTodo } from './create-todo.js';
import { renderTodo, renderTodoList } from './render-todo.js';
import { getTitle, getStatus} from './get-user-data.js';
import { saveTodoToStorage, getTodoStorage } from './todo-storage.js';

const addTodoBtn = document.querySelector('.add-todo');

document.addEventListener('DOMContentLoaded', () => {
    renderTodoList(getTodoStorage());
});

addTodoBtn.addEventListener('click', () => {
    const newTodo = createTodo(getTitle(), getStatus());

    renderTodo(newTodo);
    saveTodoToStorage(newTodo);
});