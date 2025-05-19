const TODO_LIST_ELEMENT_CLASS = '.todo-list';
const TODO_ITEM_ELEMENT_CLASS = '.todo-item';
const TODO_ITEM_TEMPLATE_CLASS = '.todo-item-template';
const TODO_ITEM_TITLE_CLASS = '.todo-title';
const TODO_ITEM_STATUS_CLASS = '.todo-status';

const todoTemplate = document.querySelector(TODO_ITEM_TEMPLATE_CLASS);
const todoList = document.querySelector(TODO_LIST_ELEMENT_CLASS);

const renderTodo = (todo) => {
    const newTodoElement = todoTemplate.content.cloneNode(true);
    
    const newTodoTitle = newTodoElement.querySelector(TODO_ITEM_TITLE_CLASS);
    newTodoTitle.textContent = todo.title;

    if (todo.isCompleted) {
        const newTodoStatus = newTodoElement.querySelector(TODO_ITEM_STATUS_CLASS);
        newTodoStatus.setAttribute('checked', '');
    }

    newTodoElement.querySelector(TODO_ITEM_ELEMENT_CLASS).setAttribute('id', `${todo.id}`);

    todoList.appendChild(newTodoElement);
}

const renderTodoList = (listToRender) => {
    todoList.innerHTML = '';
    listToRender.forEach((todo) => {
        renderTodo(todo);
    });
};

export { renderTodo, renderTodoList };