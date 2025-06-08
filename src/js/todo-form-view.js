import { SELECTOR } from './const.js';
import { Flatpickr } from './flatpickr.js';

let todoFormTemplateElement = null;
let todoListElement = null;

const init = (formTemplateElement, listElement) => {
    todoFormTemplateElement = formTemplateElement;
    todoListElement = listElement;
};

const createTodoForm = (todo = null) => {
    const newTodoFormFragment = todoFormTemplateElement.content.cloneNode(true);

    const newTodoFormElement = newTodoFormFragment.querySelector(SELECTOR.TODO_FORM_ELEMENT);

    const newTodoFormTitleInput = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_TITLE_INPUT);
    const newTodoFormDescriptionInput = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_DESCRIPTION_INPUT);
    const newTodoFormDatetimeInput = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_DATETIME_INPUT);
    const newTodoFormDatetimeIcon = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_DATETIME_ICON);

    if (todo) {
        newTodoFormTitleInput.value = todo.title;
        newTodoFormDescriptionInput.value = todo.description;
        newTodoFormDatetimeInput.value = todo.datetime;
    }

    const flatpickrInstance = Flatpickr.createPicker(newTodoFormDatetimeInput);

    const handleDatetimeIconClick = () => {
        Flatpickr.openPicker(flatpickrInstance);
    };

    newTodoFormDatetimeIcon.addEventListener('click', handleDatetimeIconClick);

    const descriptionInputAutoResize = () => {
        newTodoFormDescriptionInput.style.height = '20px';
        newTodoFormDescriptionInput.style.height = newTodoFormDescriptionInput.scrollHeight + 'px';
    };

    newTodoFormDescriptionInput.addEventListener('input', descriptionInputAutoResize);

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