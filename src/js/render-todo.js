const todoTemplate = document.querySelector('.todo-point-template');
const todoList = document.querySelector('.todo-list');

const renderTodo = (todo) => {
    const newTodoElement = todoTemplate.content.cloneNode(true);
    
    const newTodoTitle = newTodoElement.querySelector('.todo-title');
    newTodoTitle.textContent = todo.title;

    if (todo.completeStatus) {
        const newTodoStatus = newTodoElement.querySelector('.todo-status');
        newTodoStatus.setAttribute('checked', '');
    }

    todoList.appendChild(newTodoElement);
}

export { renderTodo };