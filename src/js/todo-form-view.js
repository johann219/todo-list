import {SELECTOR} from './const.js';

let todoFormTemplateElement = null;
let todoListElement = null;

const init = (formTemplateElement, listElement) => {
    todoFormTemplateElement = formTemplateElement;
    todoListElement = listElement;
};

const createTodoForm = (todo = null) => {
    const newTodoFormFragment = todoFormTemplateElement.content.cloneNode(true);

    const newTodoFormElement = newTodoFormFragment.querySelector(SELECTOR.TODO_FORM_ELEMENT);

    if (todo) {
        const newTodoFormTitleInput = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_TITLE_INPUT);
        newTodoFormTitleInput.value = todo.title;

        const newTodoFormDescriptionInput = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_DESCRIPTION_INPUT);
        newTodoFormDescriptionInput.value = todo.description;

        const newTodoFormDatetimeDisplay = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_DATETIME_DISPLAY);
        newTodoFormDatetimeDisplay.textContent = todo.datetime;
    }

    return newTodoFormElement;
};

const renderNewTodoForm = (todoFormElement) => {
    todoListElement.appendChild(todoFormElement);
};

const removeTodoForm = (todoFormElement) => {
    todoFormElement.remove();
};

const replaceFormWithTodo = (todoElement, formElement) => {
    formElement.parentNode.replaceChild(todoElement, formElement);
};

const replaceTodoWithForm = (formElement, todoElement) => {
    formElement.id = todoElement.id;
    todoElement.parentNode.replaceChild(formElement, todoElement);
};

const focusFormElement = (element) => {
    element.focus();
};

export const TodoFormView = {
    init,
    createTodoForm,
    renderNewTodoForm,
    removeTodoForm,
    replaceTodoWithForm,
    replaceFormWithTodo,
    focusFormElement,
}