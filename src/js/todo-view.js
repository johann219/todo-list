import {SELECTOR, MARKUP_CLASS} from './const.js';

let todoItemTemplateElement = null;
let todoListElement = null;

const init = (itemTemplateElement, listElement) => {
    todoItemTemplateElement = itemTemplateElement;
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

    return newTodoFragment;
}

const renderNewTodo = (todo) => {
    const newTodo = createTodoElement(todo);

    todoListElement.appendChild(newTodo);
};

const renderTodoList = (listToRender) => {
    todoListElement.innerHTML = '';

    listToRender.forEach((todo) => {
        renderNewTodo(todo);
    });
};

const removeTodo = (todoElement) => {
    todoElement.remove();
};

const replaceFormWithTodo = (todoElement, formElement) => {
    formElement.parentNode.replaceChild(todoElement, formElement);
};

export const TodoView = {
    init,
    createTodoElement,
    renderNewTodo,
    renderTodoList,
    toggleCompletionView,
    removeTodo,
    replaceFormWithTodo,
};