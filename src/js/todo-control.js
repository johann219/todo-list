import { TodoCreationService } from './todo-creation-service.js';
import { TodoStorage } from './todo-storage.js';
import { TodoView } from './todo-view.js';
import { SELECTOR, LIST_STATE } from './const.js';
import { Utils } from './utils.js';

const todoListElement = document.querySelector(SELECTOR.TODO_LIST);
const addTodoBtnElement = document.querySelector(SELECTOR.ADD_TODO_BUTTON);
const todoItemTemplateElement = document.querySelector(SELECTOR.TODO_ITEM_TEMPLATE);
const todoFormTemplateElement = document.querySelector(SELECTOR.TODO_FORM_TEMPLATE);

let listMode = null;

const handleTodoComplete = (todoToCompleteElement) => {
    const updatedTodoObject = TodoStorage.toggleTodoCompletion(todoToCompleteElement.id);
    TodoView.toggleCompletionView(todoToCompleteElement, updatedTodoObject.isCompleted);
};

const handleTodoDelete = (todoToDeleteElement) => {
    TodoStorage.deleteTodo(todoToDeleteElement.id);
    TodoView.removeTodo(todoToDeleteElement);
};

const handleTodoEdit = (todoElement) => {
    listMode = LIST_STATE.EDITING;

    const todoObjectToEdit = TodoStorage.getTodoById(todoElement.id);
    const todoEditForm = TodoView.createTodoForm(todoObjectToEdit);

    TodoView.replaceTodoWithForm(todoEditForm, todoElement);

    const todoFormCancelBtn = todoEditForm.querySelector(SELECTOR.TODO_FORM_BUTTON_CANCEL);
    const todoFormConfirmBtn = todoEditForm.querySelector(SELECTOR.TODO_FORM_BUTTON_CONFIRM);

    const cancelTodoFormEditing = (event) => {
        if (event.type === 'click' || Utils.isEscKey(event)) {
            console.log(event.type);
            console.log(event.key);

            removeListeners();

            TodoView.replaceFormWithTodo(todoElement, todoEditForm);

            listMode = LIST_STATE.VIEWING;
        }
    };

    const confirmTodoFormEditing = (event) => {
        if (event.type === 'click' || Utils.isEnterKey(event)) {
            console.log(event.type);
            console.log(event.key);

            removeListeners();

            const editedTodo = TodoCreationService.createTodoFromFormElement(todoEditForm);

            TodoStorage.editTodo(todoElement.id, editedTodo);
            const replacingTodoElement = TodoView.createTodoElement(editedTodo);

            TodoView.replaceFormWithTodo(replacingTodoElement, todoEditForm);

            listMode = LIST_STATE.VIEWING;
        }
    };

    todoFormCancelBtn.addEventListener('click', cancelTodoFormEditing);
    todoFormConfirmBtn.addEventListener('click', confirmTodoFormEditing);

    window.addEventListener('keydown', cancelTodoFormEditing);
    window.addEventListener('keydown', confirmTodoFormEditing);

    function removeListeners () {
        todoFormCancelBtn.removeEventListener('click', cancelTodoFormEditing);
        todoFormConfirmBtn.removeEventListener('click', confirmTodoFormEditing);

        window.removeEventListener('keydown', cancelTodoFormEditing);
        window.removeEventListener('keydown', confirmTodoFormEditing);
    }
};

const handleTodoItemClick = (event) => {
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

        if (listMode === LIST_STATE.VIEWING) {
            handleTodoEdit(clickedTodoElement);
        }
    }
};

const handleAddBtnClick = () => {
    if (listMode === LIST_STATE.VIEWING) {
        listMode = LIST_STATE.CREATING;

        const todoCreationForm = TodoView.createTodoForm();
        todoListElement.appendChild(todoCreationForm);

        const todoFormCancelBtn = todoCreationForm.querySelector(SELECTOR.TODO_FORM_BUTTON_CANCEL);
        const todoFormConfirmBtn = todoCreationForm.querySelector(SELECTOR.TODO_FORM_BUTTON_CONFIRM);

        const cancelTodoFormCreating = (event) => {
            if (event.type === 'click' || Utils.isEscKey(event)) {
                TodoView.removeTodoForm(todoCreationForm);

                removeEventListeners();

                listMode = LIST_STATE.VIEWING;
            }
        };

        const confirmTodoFormCreating = (event) => {
            if (event.type === 'click' || Utils.isEnterKey(event)) {
                const newTodo = TodoCreationService.createTodoFromFormElement(todoCreationForm);

                TodoView.removeTodoForm(todoCreationForm);
                TodoStorage.addNewTodo(newTodo);
                TodoView.renderNewTodo(newTodo);

                removeEventListeners();

                listMode = LIST_STATE.VIEWING;
            }
        };

        todoFormCancelBtn.addEventListener('click', cancelTodoFormCreating);
        todoFormConfirmBtn.addEventListener('click', confirmTodoFormCreating);

        window.addEventListener('keydown', cancelTodoFormCreating);
        window.addEventListener('keydown', confirmTodoFormCreating);

        function removeEventListeners () {
            todoFormCancelBtn.removeEventListener('click', cancelTodoFormCreating);
            todoFormConfirmBtn.removeEventListener('click', confirmTodoFormCreating);

            window.removeEventListener('keydown', cancelTodoFormCreating);
            window.removeEventListener('keydown', confirmTodoFormCreating);
        }
    }
};

const initControl = () => {
    listMode = LIST_STATE.VIEWING

    TodoStorage.initStorage();
    TodoView.init(todoItemTemplateElement, todoFormTemplateElement, todoListElement);

    todoListElement.addEventListener('click', handleTodoItemClick);

    addTodoBtnElement.addEventListener('click', handleAddBtnClick);

    TodoView.renderTodoList(TodoStorage.getStorage());
};

export const TodoControl = {
    initControl
};