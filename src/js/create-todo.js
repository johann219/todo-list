import Todo from './todo.js';

const createTodo = (title, status) => new Todo(title, status);

export  { createTodo };