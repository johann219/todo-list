import {SELECTOR, MARKUP_CLASS} from './const.js';

let todoTemplateElement = null;
let todoListElement = null;

const initView = (templateElement, listElement) => {
    todoTemplateElement = templateElement;
    todoListElement = listElement;
};

const toggleCompletionView = (todoElement, isTodoCompleted) => {
    isTodoCompleted ?
        todoElement.classList.add(MARKUP_CLASS.TODO_ITEM_COMPLETION) :
        todoElement.classList.remove(MARKUP_CLASS.TODO_ITEM_COMPLETION);
};

const renderTodoTitle = (todoTitleElement, todoTitle) => {
    todoTitleElement.textContent = todoTitle;
};

const renderTodoDescription = (todoDescriptionElement, todoDescription) => {
    if (todoDescription) {
        todoDescriptionElement.textContent = todoDescription;
    } else {
        todoDescriptionElement.remove();
    }
};

const renderTodoDatetime = (todoDatetimeElement, todoDatetime) => {
    if (todoDatetime) {
        todoDatetimeElement.textContent = todoDatetime;
    } else {
        todoDatetimeElement.remove();
    }
};

const renderTodo = (todo) => {
    const newTodoFragment = todoTemplateElement.content.cloneNode(true);

    const newTodoTitleElement = newTodoFragment.querySelector(SELECTOR.TODO_ITEM_TITLE);
    renderTodoTitle(newTodoTitleElement, todo.title);

    const newTodoDescriptionElement = newTodoFragment.querySelector(SELECTOR.TODO_ITEM_DESCRIPTION);
    renderTodoDescription (newTodoDescriptionElement, todo.description);

    const newTodoDatetimeElement = newTodoFragment.querySelector(SELECTOR.TODO_ITEM_DATETIME);
    renderTodoDatetime(newTodoDatetimeElement, todo.datetime);

    todoListElement.appendChild(newTodoFragment);
}

const renderTodoList = (listToRender) => {
    todoListElement.innerHTML = '';
    listToRender.forEach((todo) => {
        renderTodo(todo);
    });
};

const removeTodo = (todoToRemove) => {
    todoToRemove.remove();
};

const replaceElementByInput = (elementToReplace) => {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.value = elementToReplace.textContent;

    elementToReplace.parentNode.replaceChild(inputElement, elementToReplace);

    inputElement.focus();

    return inputElement;
};

const replaceInputByElement = (inputElement, replacerElement, replacingValue = null) => {
    replacerElement.textContent = replacingValue ? replacingValue : inputElement.value;

    inputElement.parentNode.replaceChild(replacerElement, inputElement);

    return inputElement.value;
};

export const TodoView = {
    initView,
    renderTodo,
    renderTodoList,
    toggleCompletionView,
    removeTodo,
    replaceElementByInput,
    replaceInputByElement
};