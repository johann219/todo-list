import { createTodo } from './create-todo.js';
import { TodoStorage } from './todo-storage.js';
import { TodoView } from './todo-view.js';
import { TodoEdit } from './todo-edit.js';
import { TODO_PROPERTY_TYPE, SELECTOR } from './const.js';

const todoListElement = document.querySelector(SELECTOR.TODO_LIST);
const addTodoBtnElement = document.querySelector(SELECTOR.ADD_TODO_BUTTON);
const todoItemTemplateElement = document.querySelector(SELECTOR.TODO_ITEM_TEMPLATE);
const todoFormTemplateElement = document.querySelector(SELECTOR.TODO_FORM_TEMPLATE);

const handleAddBtnClick = () => {
    TodoView.renderTodoForm();
};

const getInteractedElementParentTodo = (interactedElement) => interactedElement.closest(SELECTOR.TODO_ITEM_ELEMENT); 

const handleCheckboxClick = (checkboxElement) => {
    const updatedTodoElement = getInteractedElementParentTodo(checkboxElement);
    
    const updatedTodoObject = TodoStorage.toggleTodoCompletion(updatedTodoElement.id);
    
    TodoView.toggleCompletionView(updatedTodoElement, updatedTodoObject.isCompleted);
};

const handleDeleteBtnClick = (deleteBtnElement) => {
    const deletedTodoElement = getInteractedElementParentTodo(deleteBtnElement);

    TodoStorage.deleteTodo(deletedTodoElement.id);

    TodoView.removeTodo(deletedTodoElement);
};

const handleTodoChildClick = (todoChildElement, propertyToEditType) => {
    const parentTodo = getInteractedElementParentTodo(todoChildElement);
    const initElementValue = todoChildElement.textContent;

    const newInputElement = TodoView.replaceElementByInput(todoChildElement);

    const confirmEdit = () => {
        const editedContent = TodoView.replaceInputByElement(newInputElement, todoChildElement);
        TodoStorage.editTodoProperty(parentTodo.id, propertyToEditType, editedContent);
    };

    const cancelEdit = () => {
        TodoView.replaceInputByElement(newInputElement, todoChildElement, initElementValue);
    };

    const newEdit = TodoEdit(newInputElement, confirmEdit, cancelEdit);

    newEdit.initEdit();
};

const delegateTodoListClickEvent = (event) => {
    const clickedElement = event.target;

    const checkboxElement = clickedElement.closest(SELECTOR.TODO_ITEM_CHECKBOX);
    const deleteBtnElement = clickedElement.closest(SELECTOR.TODO_ITEM_DELETE_BTN);
    const titleElement = clickedElement.closest(SELECTOR.TODO_ITEM_TITLE);
    // const descriptionElement = clickedElement.closest(SELECTOR.TODO_ITEM_DESCRIPTION);
    // const duedateElement = clickedElement.closest(SELECTOR.TODO_ITEM_DUEDATE);

    if (checkboxElement) {
        handleCheckboxClick(checkboxElement);
    }

    if (deleteBtnElement) {
        handleDeleteBtnClick(deleteBtnElement);
    }

    if (titleElement) {
        handleTodoChildClick(titleElement, TODO_PROPERTY_TYPE.TITLE);
    }

    // if (descriptionElement) {
    //     handleTodoChildClick(descriptionElement, TODO_PROPERTY_TYPE.DESCRIPTION);
    // }

    // if (duedateElement) {
    //     handleTodoChildClick(duedateElement, TODO_PROPERTY_TYPE.DUEDATE);
    // }
};
        
const initControl = () => {
    TodoStorage.initStorage();
    TodoView.initView(todoItemTemplateElement, todoFormTemplateElement, todoListElement);

    todoListElement.addEventListener('click', delegateTodoListClickEvent);

    addTodoBtnElement.addEventListener('click', handleAddBtnClick);

    TodoView.renderTodoList(TodoStorage.getStorage());
};

export const TodoControl = {
    initControl
};