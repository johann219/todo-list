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

export const TodoView = {
    init,
    createTodoElement,
    renderNewTodo,
    renderTodoList,
    toggleCompletionView,
    removeTodo,
};