import { createTodo } from './create-todo.js';
import { TodoStorage } from './todo-storage.js';
import { TodoView } from './todo-view.js';
import { TodoEdit } from './todo-edit.js';

const TODO_LIST_ELEMENT_SELECTOR = '.todo-list';
const TODO_ITEM_ELEMENT_SELECTOR = '.todo-item';
const ADD_TODO_BUTTON_SELECTOR = '.add-todo';
const TODO_ITEM_TEMPLATE_SELECTOR = '.todo-item-template';
const TODO_ITEM_CHECKBOX_SELECTOR = '.todo-status';
const TODO_ITEM_DELETE_BTN_SELECTOR = '.todo-delete';
const TODO_ITEM_TITLE_SELECTOR = '.todo-title';

const todoListElement = document.querySelector(TODO_LIST_ELEMENT_SELECTOR);
const addTodoBtnElement = document.querySelector(ADD_TODO_BUTTON_SELECTOR);
const todoTemplateElement = document.querySelector(TODO_ITEM_TEMPLATE_SELECTOR);

const TODO_PROPERTY_TYPE_TITLE = 'title';
// const TODO_PROPERTY_TYPE_DESCRIPTION = 'description';
// const TODO_PROPERTY_TYPE_DUEDATE = 'duedate';

const handleAddBtnClick = () => {
    const newTodo = createTodo();

    TodoStorage.addNewTodo(newTodo);
    TodoView.renderTodo(newTodo);
};

const getInteractedElementParent = (interactedElement) => interactedElement.closest(TODO_ITEM_ELEMENT_SELECTOR); 

const handleCheckboxClick = (checkboxElement) => {
    const updatedTodoElement = getInteractedElementParent(checkboxElement);
    
    const updatedTodoObject = TodoStorage.toggleTodoCompletion(updatedTodoElement.id);
    
    TodoView.toggleCompletionView(updatedTodoElement, updatedTodoObject.isCompleted);
};

const handleDeleteBtnClick = (deleteBtnElement) => {
    const deletedTodoElement = getInteractedElementParent(deleteBtnElement);

    TodoStorage.deleteTodo(deletedTodoElement.id);

    TodoView.removeTodo(deletedTodoElement);
};

const handleTitleClick = (titleElement) => {
    const parentTodoId = getInteractedElementParent(titleElement).id;

    TodoEdit.initEditMode(titleElement, parentTodoId, TODO_PROPERTY_TYPE_TITLE);
};

// const handleDescriptionClick = () => {};

// const handleDuedateClick = () => {};

const delegateTodoListClickEvent = (event) => {
    const clickedElement = event.target;

    const checkboxElement = clickedElement.closest(TODO_ITEM_CHECKBOX_SELECTOR);
    const deleteBtnElement = clickedElement.closest(TODO_ITEM_DELETE_BTN_SELECTOR);
    const titleElement = clickedElement.closest(TODO_ITEM_TITLE_SELECTOR);

    if (checkboxElement) {
        handleCheckboxClick(checkboxElement);
    }

    if (deleteBtnElement) {
        handleDeleteBtnClick(deleteBtnElement);
    }

    if (titleElement) {
        handleTitleClick(titleElement);
        // need to handle deletion while editing
    }
};
        
const initControl = () => {
    TodoStorage.initStorage();
    TodoView.initView(todoTemplateElement, todoListElement);

    todoListElement.addEventListener('click', delegateTodoListClickEvent);

    addTodoBtnElement.addEventListener('click', handleAddBtnClick);

    TodoView.renderTodoList(TodoStorage.getStorage());
};

export const TodoControl = {
    initControl
};