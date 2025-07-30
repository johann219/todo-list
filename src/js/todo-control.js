import { TodoCreationService } from './todo-creation-service.js';
import { TodoStorage } from './todo-storage.js';
import { TodoView } from './todo-view.js';
import { SELECTOR, LIST_MODE } from './const.js';
import { Utils } from './utils.js';
import { TodoFormView } from './todo-form-view.js';

const todoListElement = document.querySelector(SELECTOR.TODO_LIST);
const addTodoBtnElement = document.querySelector(SELECTOR.ADD_TODO_BUTTON);
const todoItemTemplateElement = document.querySelector(SELECTOR.TODO_ITEM_TEMPLATE);
const todoFormTemplateElement = document.querySelector(SELECTOR.TODO_FORM_TEMPLATE);

let listMode = null;

const handleTodoForm = (formElement, onCancelCb, onConfirmCb) => {
    const todoFormCancelBtn = formElement.querySelector(SELECTOR.TODO_FORM_BUTTON_CANCEL);
    const todoFormConfirmBtn = formElement.querySelector(SELECTOR.TODO_FORM_BUTTON_CONFIRM);
    const todoFormDescriptionInput = formElement.querySelector(SELECTOR.TODO_FORM_DESCRIPTION_INPUT);

    const handleCancel = () => {
        onCancelCb();
        removeListeners();
        addTodoBtnElement.disabled = false;
        listMode = LIST_MODE.VIEWING;
    };

    const handleConfirm = () => {
        onConfirmCb();
        removeListeners();
        addTodoBtnElement.disabled = false;
        listMode = LIST_MODE.VIEWING;
    };

    const handleTodoFormKeydown = (event) => {
        if (Utils.isEnterKey(event)) {
            if (document.activeElement !== todoFormDescriptionInput) {
                event.preventDefault();
                handleConfirm();
            }
        }

        if (Utils.isEscKey(event)) {
            event.preventDefault();
            handleCancel();
        }
    };

    const todoFormTitle = formElement.querySelector(SELECTOR.TODO_FORM_TITLE_INPUT);

    if (todoFormTitle) {
        TodoFormView.focusFormElement(todoFormTitle);
    }

    todoFormCancelBtn.addEventListener('click', handleCancel);
    todoFormConfirmBtn.addEventListener('click', handleConfirm);

    window.addEventListener('keydown', handleTodoFormKeydown);

    function removeListeners() {
        todoFormCancelBtn.removeEventListener('click', handleCancel);
        todoFormConfirmBtn.removeEventListener('click', handleConfirm);

        window.removeEventListener('keydown', handleTodoFormKeydown);
    }
};

const handleAddBtnClick = () => {
    if (listMode !== LIST_MODE.VIEWING) return;

    listMode = LIST_MODE.CREATING;

    addTodoBtnElement.disabled = true;;

    const todoCreationForm = TodoFormView.createTodoForm();
    TodoFormView.renderNewTodoForm(todoCreationForm);

    const cancelTodoFormCreating = () => {
        TodoFormView.removeTodoForm(todoCreationForm);
    };

    const confirmTodoFormCreating = () => {
        const newTodo = TodoCreationService.createTodoFromFormElement(todoCreationForm);

        TodoStorage.addNewTodo(newTodo);

        const newTodoElement = TodoView.createTodoElement(newTodo);

        TodoFormView.replaceFormWithTodo(newTodoElement, todoCreationForm);
    };

    handleTodoForm(todoCreationForm, cancelTodoFormCreating, confirmTodoFormCreating);
};

const handleTodoItemClick = (todoElement) => {
    if (listMode !== LIST_MODE.VIEWING) return;

    listMode = LIST_MODE.EDITING;

    addTodoBtnElement.disabled = true;

    const todoObjectToEdit = TodoStorage.getTodoById(todoElement.id);
    const todoEditForm = TodoFormView.createTodoForm(todoObjectToEdit);

    TodoFormView.replaceTodoWithForm(todoEditForm, todoElement);

    const cancelTodoFormEditing = () => {
        TodoFormView.replaceFormWithTodo(todoElement, todoEditForm);
    };

    const confirmTodoFormEditing = () => {
        const editedTodo = TodoCreationService.createTodoFromFormElement(todoEditForm);

        TodoStorage.editTodo(todoElement.id, editedTodo);
        const replacingTodoElement = TodoView.createTodoElement(editedTodo);

        TodoFormView.replaceFormWithTodo(replacingTodoElement, todoEditForm);
    };

    handleTodoForm(todoEditForm, cancelTodoFormEditing, confirmTodoFormEditing);
};

const handleTodoComplete = (todoToCompleteElement) => {
    const updatedTodoObject = TodoStorage.toggleTodoCompletion(todoToCompleteElement.id);
    TodoView.toggleCompletionView(todoToCompleteElement, updatedTodoObject.isCompleted);
};

const handleTodoDelete = (todoToDeleteElement) => {
    console.log('About to delete this item: ', todoToDeleteElement);
    TodoStorage.deleteTodo(todoToDeleteElement.id);
    TodoView.removeTodo(todoToDeleteElement);
};

const handleTodoListClick = (event) => {
    const clickedElement = event.target;
    const clickedTodoElement = clickedElement.closest(SELECTOR.TODO_ITEM_ELEMENT);

    if (clickedTodoElement) {
        const completeBtn = clickedElement.closest(SELECTOR.TODO_ITEM_BUTTON_COMPLETE);
        const deleteBtn = clickedElement.closest(SELECTOR.TODO_ITEM_BUTTON_DELETE);

        if (completeBtn) {
            handleTodoComplete(clickedTodoElement);
            return;
        }

        if (deleteBtn) {
            handleTodoDelete(clickedTodoElement);
            return;
        }

        handleTodoItemClick(clickedTodoElement);
    }
};

const initControl = () => {
    listMode = LIST_MODE.VIEWING

    TodoStorage.init();
    TodoView.init(todoItemTemplateElement, todoListElement);
    TodoFormView.init(todoFormTemplateElement, todoListElement);

    todoListElement.addEventListener('click', handleTodoListClick);

    addTodoBtnElement.addEventListener('click', handleAddBtnClick);

    TodoView.renderTodoList(TodoStorage.getStorage());
};

export const TodoControl = {
    initControl,
};