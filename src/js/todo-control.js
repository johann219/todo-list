import { createTodo } from './create-todo.js';
import { TodoStorage } from './todo-storage.js';
import { TodoView } from './todo-view.js';

const TODO_LIST_ELEMENT_SELECTOR = '.todo-list';
const TODO_ITEM_ELEMENT_SELECTOR = '.todo-item';
const ADD_TODO_BUTTON_SELECTOR = '.add-todo';
const TODO_ITEM_TEMPLATE_SELECTOR = '.todo-item-template';

const todoListElement = document.querySelector(TODO_LIST_ELEMENT_SELECTOR);
const addTodoBtnElement = document.querySelector(ADD_TODO_BUTTON_SELECTOR);
const todoTemplateElement = document.querySelector(TODO_ITEM_TEMPLATE_SELECTOR);

const handleAddBtnClick = () => {
    const newTodo = createTodo();

    TodoStorage.addNewTodo(newTodo);
    TodoView.renderTodo(newTodo);
};

const handleCheckboxChange = (checkbox) => {
    const updatedTodoElement = checkbox.closest(TODO_ITEM_ELEMENT_SELECTOR);
    
    const updatedTodoObject = TodoStorage.toggleTodoCompletion(updatedTodoElement.id);
    
    TodoView.toggleCompletionView(updatedTodoElement, updatedTodoObject.isCompleted);
};
        
const initControl = () => {
    TodoStorage.initStorage();
    TodoView.initView(todoTemplateElement, todoListElement);

    todoListElement.addEventListener('change', (event) => {
        if (event.target.getAttribute('type') === 'checkbox') {
            handleCheckboxChange(event.target);
        }
    });

    addTodoBtnElement.addEventListener('click', handleAddBtnClick);

    TodoView.renderTodoList(TodoStorage.getStorage());
};

export const TodoControl = {
    initControl
};