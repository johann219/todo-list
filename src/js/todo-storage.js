import { updateLocalStorage, getLocalStorage } from './local-storage.js';
import Todo from './todo.js';

const STORAGE_NAME = 'todoStorage';


const getLocalTodoStorage = () => {
    const storedValue = getLocalStorage(STORAGE_NAME);
    return storedValue ? JSON.parse(storedValue) : [];
}

const saveTodoToLocalStorage = (todo) => {
    const todoLocalStorage = getLocalTodoStorage();
    todoLocalStorage.push(todo);
    updateLocalStorage(STORAGE_NAME, JSON.stringify(todoLocalStorage));
};

const getLiveTodoStorage = () => {
    const plainTodoStorage = getLocalTodoStorage();
    
    const liveTodoStorage = plainTodoStorage.map((plainTodo) => {
        return new Todo(plainTodo.title, plainTodo.isCompleted, plainTodo.id);
    });

    return liveTodoStorage;
};

export { saveTodoToLocalStorage, getLiveTodoStorage };