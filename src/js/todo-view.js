import { TodoStorage } from './todo-storage.js';
import { createTodo } from './create-todo.js';

const TODO_LIST_ELEMENT_CLASS = 'todo-list';
const TODO_ITEM_ELEMENT_CLASS = 'todo-item';
const TODO_ITEM_TEMPLATE_CLASS = 'todo-item-template';
const TODO_ITEM_TITLE_CLASS = 'todo-title';
const TODO_ITEM_STATUS_CLASS = 'todo-status';
const TODO_ITEM_COMPLETION_CLASS = 'todo-completed';
const ADD_TODO_BUTTON_CLASS = 'add-todo';

const TodoView = (() => {
    const todoTemplate = document.querySelector(`.${TODO_ITEM_TEMPLATE_CLASS}`);
    const todoList = document.querySelector(`.${TODO_LIST_ELEMENT_CLASS}`);
    const addTodoBtn = document.querySelector(`.${ADD_TODO_BUTTON_CLASS}`);

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

    const onCheckboxChange = (checkbox) => {
        const updatedTodoElement = checkbox.closest(`.${TODO_ITEM_ELEMENT_CLASS}`);
    
        if (!updatedTodoElement) {
            throw new Error('Checkbox is not inside todo element');
        }
    
        const updatedTodoObject = TodoStorage.toggleTodoCompletion(updatedTodoElement.id);
    
        if (updatedTodoObject) {
            updatedTodoObject.isCompleted ?
            completionEnable(updatedTodoElement) : 
            completionDisable(updatedTodoElement);
        } else {
            throw new Error('Object not found');
        }
    };

    const onAddTodoBtnClick = () => {
        const title = InputServicePrompt.getTitle();
        const status = InputServicePrompt.getStatus();
    
        const newTodo = createTodo(title, status);

        TodoStorage.addNewTodo(newTodo);
        renderTodo(newTodo);
    };
        
    const initView = () => {
        todoList.addEventListener('change', (event) => {
            if (event.target.getAttribute('type') === 'checkbox') {
                    onCheckboxChange(event.target);
            }
        });

        addTodoBtn.addEventListener('click', onAddTodoBtnClick);
    };

    return { renderTodo, renderTodoList, initView };
})();

export { TodoView };

