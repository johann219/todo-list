import { updateStorage, getStorage } from './local-storage.js';

const STORAGE_NAME = 'todoStorage';

const getTodoStorage = () => {
    const storedValue = getStorage(STORAGE_NAME);
    return storedValue ? JSON.parse(storedValue) : [];
}

const saveTodoToStorage = (todo) => {
    const todoStorage = getTodoStorage();
    todoStorage.push(todo);
    updateStorage(STORAGE_NAME, JSON.stringify(todoStorage));
};

export { saveTodoToStorage, getTodoStorage };