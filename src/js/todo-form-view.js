import { SELECTOR } from './const.js';
import { Flatpickr } from './flatpickr.js';
import { Utils } from './utils.js';

let todoFormTemplateElement = null;
let todoListElement = null;

const init = (formTemplateElement, listElement) => {
    todoFormTemplateElement = formTemplateElement;
    todoListElement = listElement;
};

const textAreaAutoResize = (textareaElement) => {
    textareaElement.style.height = '';
    textareaElement.style.height = textareaElement.scrollHeight + 'px';
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

const createTodoFormTextInput = (formTextInputElement, todoTextValue) => {
    if (todoTextValue) {
        formTextInputElement.value = todoTextValue;
    }

    const handleTodoTextInputResize = () => {
        textAreaAutoResize(formTextInputElement);
    };

    formTextInputElement.addEventListener('input', handleTodoTextInputResize);
}

const createTodoFormDatetimeInput = (formDatetimeInput, formDatetimeIcon, todoDatetimeValue) => {
    if (todoDatetimeValue) {
        formDatetimeInput.value = todoDatetimeValue;
    }

    const flatpickrInstance = Flatpickr.createPicker(formDatetimeInput);

    const handleDatetimeIconClick = () => {
        Flatpickr.openPicker(flatpickrInstance);
    };

    formDatetimeIcon.addEventListener('click', handleDatetimeIconClick);
};

const createTodoForm = (todo = null) => {
    const newTodoFormFragment = todoFormTemplateElement.content.cloneNode(true);

    const newTodoFormElement = newTodoFormFragment.querySelector(SELECTOR.TODO_FORM_ELEMENT);

    const newTodoFormTitleInput = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_TITLE_INPUT);
    const newTodoFormDescriptionInput = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_DESCRIPTION_INPUT);
    const newTodoFormDatetimeInput = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_DATETIME_INPUT);
    const newTodoFormDatetimeIcon = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_DATETIME_ICON);

    createTodoFormTextInput(
        newTodoFormTitleInput,
        todo ? todo.title : null
    );

    createTodoFormTextInput(
        newTodoFormDescriptionInput,
        todo ? todo.description : null
    );

    createTodoFormDatetimeInput(
        newTodoFormDatetimeInput,
        newTodoFormDatetimeIcon,
        todo ? todo.datetime : null
    );

    return newTodoFormElement;
};

const handleTodoForm = (formElement, onCancelCb, onConfirmCb) => {
    const todoFormCancelBtn = formElement.querySelector(SELECTOR.TODO_FORM_BUTTON_CANCEL);
    const todoFormConfirmBtn = formElement.querySelector(SELECTOR.TODO_FORM_BUTTON_CONFIRM);
    const todoFormDescriptionInput = formElement.querySelector(SELECTOR.TODO_FORM_DESCRIPTION_INPUT);
    const todoFormTitleInput = formElement.querySelector(SELECTOR.TODO_FORM_TITLE_INPUT);

    const handleCancel = () => {
        onCancelCb();
        removeListeners();
    };

    const handleConfirm = () => {
        onConfirmCb();
        removeListeners();
    };

    const handleTodoFormKeydown = (event) => {
        if (Utils.isEnterKey(event) && document.activeElement !== todoFormDescriptionInput) {
            event.preventDefault();
            handleConfirm();
        }
        if (Utils.isEscKey(event)) {
            event.preventDefault();
            handleCancel();
        }
    };

    todoFormCancelBtn.addEventListener('click', handleCancel);
    todoFormConfirmBtn.addEventListener('click', handleConfirm);
    window.addEventListener('keydown', handleTodoFormKeydown);

    todoFormTitleInput.focus();

    function removeListeners() {
        todoFormCancelBtn.removeEventListener('click', handleCancel);
        todoFormConfirmBtn.removeEventListener('click', handleConfirm);

        window.removeEventListener('keydown', handleTodoFormKeydown);
    }
};

export const TodoFormView = {
    init,
    createTodoForm,
    handleTodoForm,
    renderNewTodoForm,
    removeTodoForm,
    replaceTodoWithForm,
    replaceFormWithTodo,
}