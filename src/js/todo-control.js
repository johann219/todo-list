import { TodoCreationService } from './todo-creation-service.js';
import { TodoStorage } from './todo-storage.js';
import { TodoView } from './todo-view.js';
import { TodoFormView } from './todo-form-view.js';
import { TodoEdit } from './todo-edit.js';
import { TODO_PROPERTY_TYPE, SELECTOR, LIST_STATE } from './const.js';

const todoListElement = document.querySelector(SELECTOR.TODO_LIST);
const addTodoBtnElement = document.querySelector(SELECTOR.ADD_TODO_BUTTON);
const todoItemTemplateElement = document.querySelector(SELECTOR.TODO_ITEM_TEMPLATE);
const todoFormTemplateElement = document.querySelector(SELECTOR.TODO_FORM_TEMPLATE);

let listMode = null;

const handleCancellation = (formElement) => {
    if (listMode === LIST_STATE.CREATING) {
        TodoFormView.removeTodoForm(formElement);
    }
};

const handleConfirmation = (formElement) => {
    if (listMode === LIST_STATE.CREATING) {
        const newTodo = TodoCreationService.createTodoFromFormElement(formElement);

        TodoFormView.removeTodoForm(formElement);
        TodoStorage.addNewTodo(newTodo);
        TodoView.renderTodo(newTodo);
    }
};

const delegateTodoFormButtonClick = (event) => {
    const clickedElement = event.target;
    const formElement = clickedElement.closest(SELECTOR.TODO_FORM_ELEMENT);

    const cancelBtn = clickedElement.closest(SELECTOR.TODO_FORM_BUTTON_CANCEL);
    const confirmBtn = clickedElement.closest(SELECTOR.TODO_FORM_BUTTON_CONFIRM);

    if (confirmBtn) {
        handleConfirmation(formElement);
    }

    if (cancelBtn) {
        handleCancellation(formElement);
    }
};

const handleAddBtnClick = () => {
    if (listMode === LIST_STATE.VIEWING) {
        const todoForm = TodoFormView.createTodoForm();
        todoListElement.appendChild(todoForm);

        const todoFormButtons = todoForm.querySelector(SELECTOR.TODO_FORM_BUTTON_WRAPPER);

        todoFormButtons.addEventListener('click', delegateTodoFormButtonClick);
    }
    listMode = LIST_STATE.CREATING;
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
    const clickedTodoElement = getInteractedElementParentTodo(event.target);

    console.log(clickedTodoElement);
    // const checkboxElement = clickedElement.closest(SELECTOR.TODO_ITEM_CHECKBOX);
    // const deleteBtnElement = clickedElement.closest(SELECTOR.TODO_ITEM_DELETE_BTN);
    // const titleElement = clickedElement.closest(SELECTOR.TODO_ITEM_TITLE);
    // // const descriptionElement = clickedElement.closest(SELECTOR.TODO_ITEM_DESCRIPTION);
    // // const duedateElement = clickedElement.closest(SELECTOR.TODO_ITEM_DUEDATE);
    //
    // if (checkboxElement) {
    //     handleCheckboxClick(checkboxElement);
    // }
    //
    // if (deleteBtnElement) {
    //     handleDeleteBtnClick(deleteBtnElement);
    // }
    //
    // if (titleElement) {
    //     handleTodoChildClick(titleElement, TODO_PROPERTY_TYPE.TITLE);
    // }
    //
    // // if (descriptionElement) {
    // //     handleTodoChildClick(descriptionElement, TODO_PROPERTY_TYPE.DESCRIPTION);
    // // }
    //
    // // if (duedateElement) {
    // //     handleTodoChildClick(duedateElement, TODO_PROPERTY_TYPE.DUEDATE);
    // // }
};
        
const initControl = () => {
    listMode = LIST_STATE.VIEWING

    TodoStorage.initStorage();
    TodoView.init(todoItemTemplateElement, todoListElement);
    TodoFormView.init(todoFormTemplateElement);

    todoListElement.addEventListener('click', delegateTodoListClickEvent);

    addTodoBtnElement.addEventListener('click', handleAddBtnClick);

    TodoView.renderTodoList(TodoStorage.getStorage());
};

export const TodoControl = {
    initControl
};