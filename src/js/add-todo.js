import TodoPoint from './todo-point.js';

const createTodo = (title, status) => new TodoPoint(title, status);

export  { createTodo };