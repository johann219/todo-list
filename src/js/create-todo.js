/*  
    right now this module is redundant
    but cn prove useful once we need to 
    add some complexity to creating todos
    and are not comfortable with putting 
    that logic into the Todo class
*/

import Todo from './todo.js';

const createTodo = (title, status) => new Todo(title, status);

export  { createTodo };