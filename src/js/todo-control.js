import { createTodo } from './create-todo.js';
import { TodoStorage } from './todo-storage.js';
import { TodoView } from './todo-view.js';

const TODO_LIST_ELEMENT_CLASS = 'todo-list';
const TODO_ITEM_ELEMENT_CLASS = 'todo-item';
const ADD_TODO_BUTTON_CLASS = 'add-todo';

const TodoControl = (() => {
    const todoList = document.querySelector(`.${TODO_LIST_ELEMENT_CLASS}`);
    const addTodoBtn = document.querySelector(`.${ADD_TODO_BUTTON_CLASS}`);

    const handleAddBtnClick = () => {
        const newTodo = createTodo();

        TodoStorage.addNewTodo(newTodo);
        TodoView.renderTodo(newTodo);
    };

    const handleCheckboxChange = (checkbox) => {
        const updatedTodoElement = checkbox.closest(`.${TODO_ITEM_ELEMENT_CLASS}`);
    
        if (!updatedTodoElement) {
            throw new Error('Checkbox is not inside todo element');
        }
    
        const updatedTodoObject = TodoStorage.toggleTodoCompletion(updatedTodoElement.id);
    
        if (updatedTodoObject) {
            updatedTodoObject.isCompleted ?
            TodoView.completionEnable(updatedTodoElement) : 
            TodoView.completionDisable(updatedTodoElement);
        } else {
            throw new Error('Object not found');
        }
    };
        
    const initControl = () => {
        todoList.addEventListener('change', (event) => {
            if (event.target.getAttribute('type') === 'checkbox') {
                handleCheckboxChange(event.target);
            }
        });

        addTodoBtn.addEventListener('click', handleAddBtnClick);

        TodoStorage.initStorage();

        TodoView.renderTodoList(TodoStorage.getStorage());
    };

    return { initControl };
})();

export { TodoControl };