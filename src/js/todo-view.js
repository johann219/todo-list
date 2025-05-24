const TODO_ITEM_ELEMENT_SELECTOR = '.todo-item';
const TODO_ITEM_TITLE_SELECTOR = '.todo-title';
const TODO_ITEM_STATUS_SELECTOR = '.todo-status';
const TODO_ITEM_COMPLETION_CLASS = 'todo-completed';

let todoTemplateElement = null;
let todoListElement = null;

const initView = (templateElement, listElement) => {
    todoTemplateElement = templateElement;
    todoListElement = listElement;
};

const toggleCompletionView = (todoElement, isTodoCompleted) => {
    isTodoCompleted ? 
    todoElement.classList.add(TODO_ITEM_COMPLETION_CLASS) : 
    todoElement.classList.remove(TODO_ITEM_COMPLETION_CLASS);
};

const renderTodo = (todo) => {
    const newTodoFragment= todoTemplateElement.content.cloneNode(true);
    const newTodoItemElement = newTodoFragment.querySelector(TODO_ITEM_ELEMENT_SELECTOR);

    const newTodoTitleElement = newTodoItemElement.querySelector(TODO_ITEM_TITLE_SELECTOR);
    newTodoTitleElement.textContent = todo.title;

    if (todo.isCompleted) {
        const newTodoStatusElement = newTodoItemElement.querySelector(TODO_ITEM_STATUS_SELECTOR);
        newTodoStatusElement.setAttribute('checked', '');
        toggleCompletionView(newTodoItemElement, true);
    }

    newTodoItemElement.setAttribute('id', `${todo.id}`);

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

const replaceElementByInput = (elementToEdit) => {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.value = elementToEdit.textContent;

    elementToEdit.parentNode.replaceChild(inputElement, elementToEdit);

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