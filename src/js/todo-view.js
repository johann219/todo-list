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
        
    const newTodoTitle = newTodoFragment.querySelector(TODO_ITEM_TITLE_SELECTOR);
    newTodoTitle.textContent = todo.title;

    if (todo.isCompleted) {
        const newTodoStatus = newTodoFragment.querySelector(TODO_ITEM_STATUS_SELECTOR);
        newTodoStatus.setAttribute('checked', '');
        toggleCompletionView(newTodoFragment.querySelector(TODO_ITEM_ELEMENT_SELECTOR), true);
    }

    newTodoFragment.querySelector(TODO_ITEM_ELEMENT_SELECTOR).setAttribute('id', `${todo.id}`);

    todoListElement.appendChild(newTodoFragment);
}

const renderTodoList = (listToRender) => {
    todoListElement.innerHTML = '';
    listToRender.forEach((todo) => {
    renderTodo(todo);
    });
};

export const TodoView = { 
    initView,
    renderTodo, 
    renderTodoList, 
    toggleCompletionView 
};