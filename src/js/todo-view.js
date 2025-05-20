const TODO_LIST_ELEMENT_CLASS = 'todo-list';
const TODO_ITEM_ELEMENT_CLASS = 'todo-item';
const TODO_ITEM_TEMPLATE_CLASS = 'todo-item-template';
const TODO_ITEM_TITLE_CLASS = 'todo-title';
const TODO_ITEM_STATUS_CLASS = 'todo-status';
const TODO_ITEM_COMPLETION_CLASS = 'todo-completed';

const TodoView = (() => {
    const todoTemplate = document.querySelector(`.${TODO_ITEM_TEMPLATE_CLASS}`);
    const todoList = document.querySelector(`.${TODO_LIST_ELEMENT_CLASS}`);

    const completionEnable = (todoElement) => {
        todoElement.classList.add(TODO_ITEM_COMPLETION_CLASS);
    };

    const completionDisable = (todoElement) => {
        todoElement.classList.remove(TODO_ITEM_COMPLETION_CLASS);
    };

    const renderTodo = (todo) => {
        const newTodoFragment= todoTemplate.content.cloneNode(true);
        
        const newTodoTitle = newTodoFragment.querySelector(`.${TODO_ITEM_TITLE_CLASS}`);
        newTodoTitle.textContent = todo.title;

        if (todo.isCompleted) {
            const newTodoStatus = newTodoFragment.querySelector(`.${TODO_ITEM_STATUS_CLASS}`);
            newTodoStatus.setAttribute('checked', '');
            completionEnable(newTodoFragment.querySelector(`.${TODO_ITEM_ELEMENT_CLASS}`));
        }

        newTodoFragment.querySelector(`.${TODO_ITEM_ELEMENT_CLASS}`).setAttribute('id', `${todo.id}`);

        todoList.appendChild(newTodoFragment);
    }

    const renderTodoList = (listToRender) => {
        todoList.innerHTML = '';
        listToRender.forEach((todo) => {
            renderTodo(todo);
        });
    };

    return { renderTodo, renderTodoList, completionEnable, completionDisable };
})();

export { TodoView };

