import {SELECTOR, MARKUP_CLASS} from './const.js';

let todoItemTemplateElement = null;
let todoFormTemplateElement = null;
let todoListElement = null;

const init = (itemTemplateElement, formTemplateElement, listElement) => {
    todoItemTemplateElement = itemTemplateElement;
    todoFormTemplateElement = formTemplateElement;
    todoListElement = listElement;
};

const toggleCompletionView = (todoElement, isTodoCompleted) => {
    isTodoCompleted ?
        todoElement.classList.add(MARKUP_CLASS.TODO_ITEM_COMPLETION) :
        todoElement.classList.remove(MARKUP_CLASS.TODO_ITEM_COMPLETION);
};

const createTodoTitle = (todoTitleElement, todoTitle) => {
    todoTitleElement.textContent = todoTitle;
};

const createTodoDescription = (todoDescriptionElement, todoDescription) => {
    if (todoDescription) {
        todoDescriptionElement.textContent = todoDescription;
    } else {
        todoDescriptionElement.remove();
    }
};

const createTodoDatetime = (todoDatetimeElement, todoDatetime) => {
    if (todoDatetime) {
        todoDatetimeElement.textContent = todoDatetime;
    } else {
        todoDatetimeElement.remove();
    }
};

const createTodoElement = (todo) => {
    const newTodoFragment = todoItemTemplateElement.content.cloneNode(true);
    const newTodoItemElement = newTodoFragment.querySelector(SELECTOR.TODO_ITEM_ELEMENT);

    const newTodoTitleElement = newTodoItemElement.querySelector(SELECTOR.TODO_ITEM_TITLE);
    createTodoTitle(newTodoTitleElement, todo.title);

    const newTodoDescriptionElement = newTodoItemElement.querySelector(SELECTOR.TODO_ITEM_DESCRIPTION);
    createTodoDescription(newTodoDescriptionElement, todo.description);

    const newTodoDatetimeElement = newTodoItemElement.querySelector(SELECTOR.TODO_ITEM_DATETIME);
    createTodoDatetime(newTodoDatetimeElement, todo.datetime);

    toggleCompletionView(newTodoItemElement, todo.isCompleted);

    newTodoItemElement.id = todo.id;

    return newTodoItemElement;
}

const renderNewTodo = (todoItemElement) => {
    todoListElement.appendChild(todoItemElement);
};

const renderTodoList = (listToRender) => {
    todoListElement.innerHTML = '';

    listToRender.forEach((todo) => {
        const newTodoElement = createTodoElement(todo);

        renderNewTodo(newTodoElement);
    });
};

const removeTodo = (todoElement) => {
    todoElement.remove();
};

const replaceFormWithTodo = (todoElement, formElement) => {
    formElement.parentNode.replaceChild(todoElement, formElement);
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

const replaceTodoWithForm = (formElement, todoElement) => {
    formElement.id = todoElement.id;
    todoElement.parentNode.replaceChild(formElement, todoElement);
};

const focusElement = (element) => {
    element.focus();
};

export const TodoView = {
    init,
    createTodoElement,
    renderNewTodo,
    renderTodoList,
    toggleCompletionView,
    removeTodo,
    createTodoForm,
    renderNewTodoForm,
    removeTodoForm,
    replaceTodoWithForm,
    replaceFormWithTodo,
    focusElement,
};