import { updateLocalStorage, getLocalStorage } from './local-storage.js';
import Todo from './todo.js';

const STORAGE_NAME = 'todoStorage';

let storage = [];

const getPlainStorage = () => {
    const plainStorage = getLocalStorage(STORAGE_NAME);
    return plainStorage ? JSON.parse(plainStorage) : [];
}    

const getStorage = () => [...storage];

const getTodoById = (todoToFindId) => storage.find((todo) => todo.id === todoToFindId);

const rehydrateLocalStorage = () => {
    const plainStorage = getPlainStorage();
        
    const rehydratedStorage = plainStorage.map((plainTodo) => {
        return new Todo(plainTodo.title, plainTodo.isCompleted, plainTodo.id);
    });
    
    return rehydratedStorage;
};

const initStorage = () => {
    storage = rehydrateLocalStorage();
};

const saveToLocalStorage = () => {
    updateLocalStorage(STORAGE_NAME, JSON.stringify(storage));
};

const addNewTodo = (todo) => {
    storage.push(todo);
    saveToLocalStorage();
};

const toggleTodoCompletion = (todoToChangeId) => {
    const todoToChange = storage.find((todo) => todo.id === todoToChangeId);
        
    if (todoToChange) {
        todoToChange.toggleCompletionStatus();
        saveToLocalStorage();
        return todoToChange;
    }

    return null
};

export const TodoStorage = { 
    initStorage, 
    getStorage, 
    getTodoById, 
    addNewTodo, 
    toggleTodoCompletion
};