import { getLocalStorage, updateLocalStorage } from './local-storage.js';
import { TodoCreationService } from './todo-creation-service.js';
import { MockTodos } from './mock-data.js';

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

    return plainStorage.map((plainTodo) => TodoCreationService.createTodoFromLocalStorageObject(plainTodo));
};

const saveToLocalStorage = () => {
    updateLocalStorage(STORAGE_NAME, JSON.stringify(storage));
};

const initStorage = () => {
    const rehydratedLocalStorage = rehydrateLocalStorage();

    if (rehydratedLocalStorage.length > 0) {
        storage = rehydratedLocalStorage;
    } else {
        storage = MockTodos;
        saveToLocalStorage();
    }
};

const addNewTodo = (todo) => {
    storage.push(todo);
    saveToLocalStorage();
};

const toggleTodoCompletion = (todoToToggleId) => {
    const todoToToggle = getTodoById(todoToToggleId);
    todoToToggle.toggleCompletionStatus();
    saveToLocalStorage();
    return todoToToggle;
};

const deleteTodo = (todoToDeleteId) => {
    const todoToDelete = getTodoById(todoToDeleteId);

    storage.splice(storage.indexOf(todoToDelete), 1);
    saveToLocalStorage();
};

const editTodo = (todoToEditId, newTodo) => {
    const todoToEdit = getTodoById(todoToEditId);

    todoToEdit.title = newTodo.title;
    todoToEdit.description = newTodo.description;
    todoToEdit.datetime = newTodo.datetime;

    saveToLocalStorage();

    return todoToEdit
};

export const TodoStorage = { 
    initStorage, 
    getStorage,
    addNewTodo, 
    toggleTodoCompletion,
    deleteTodo,
    getTodoById,
    editTodo,
};