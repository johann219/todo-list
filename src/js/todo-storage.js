import { updateLocalStorage, getLocalStorage } from './local-storage.js';
import Todo from './todo.js';

const STORAGE_NAME = 'todoStorage';

const TODO_PROPERTY_TYPE_TITLE = 'title';
// const TODO_PROPERTY_TYPE_DESCRIPTION = 'description';
// const TODO_PROPERTY_TYPE_DUEDATE = 'duedate';

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

const toggleTodoCompletion = (todoToToggleId) => {
    const todoToToggle = getTodoById(todoToToggleId);
        
    if (todoToToggle) {
        todoToToggle.toggleCompletionStatus();
        saveToLocalStorage();
        return todoToToggle;
    }

    return null
};

const editTodoTitle = (todoToEdit, newTitle) => {
    todoToEdit.title = newTitle;
};

// const editTodoDescription = (todoToEdit, newDescription) => {
//     todoToEdit.description = description;
// };

// const editTodoDuedate = (todoToEdit, newDuedate) => {
//     todoToEdit.duedate = newDuedate;
// };

const editTodoProperty = (todoToEditId, propertyToEditType, newContent) => {
    const todoToEdit = getTodoById(todoToEditId);

    if(todoToEdit) {
        switch(propertyToEditType) {
            case TODO_PROPERTY_TYPE_TITLE:
                editTodoTitle(todoToEdit, newContent);
                break;
            // case TODO_PROPERTY_TYPE_DESCRIPTION:
            //     editTodoDescription(todoToEdit, newContent);
            //     break;
            // case TODO_PROPERTY_TYPE_DUEDATE:
            //     editTodoDuedate(todoToEdit, newContent);
            //     break;
        }

        saveToLocalStorage();
    }

};

const deleteTodo = (todoToDeleteId) => {
    const todoToDelete = getTodoById(todoToDeleteId);

    storage.splice(storage.indexOf(todoToDelete), 1);
    saveToLocalStorage();
};

export const TodoStorage = { 
    initStorage, 
    getStorage,
    addNewTodo, 
    toggleTodoCompletion,
    deleteTodo,
    editTodoProperty,
};