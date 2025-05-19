import { TodoStorage } from './todo-storage';

const TODO_LIST_ELEMENT_CLASS = 'todo-list';
const TODO_ITEM_ELEMENT_CLASS = 'todo-item';
const TODO_ITEM_COMPLETION_CLASS = 'todo-completed';

const todoList = document.querySelector(`.${TODO_LIST_ELEMENT_CLASS}`);

const TodoStatusChange = (() => {
    const onCheckboxChange = (checkbox) => {
        const updatedTodoElement = checkbox.closest(`.${TODO_ITEM_ELEMENT_CLASS}`);

        if (!updatedTodoElement) {
            throw new Error('Checkbox is not inside todo element');
        }

        const updatedTodoObject = TodoStorage.toggleTodoCompletion(updatedTodoElement.id);

        if (updatedTodoObject) {
            updatedTodoObject.isCompleted ?
            updatedTodoElement.classList.add(TODO_ITEM_COMPLETION_CLASS):
            updatedTodoElement.classList.remove(TODO_ITEM_COMPLETION_CLASS);
        } else {
            throw new Error('Object not found');
        }
        
    };
    
    const initChange = () => {
        todoList.addEventListener('change', (event) => {
            if (event.target.getAttribute('type') === 'checkbox') {
                onCheckboxChange(event.target);
            }
        });
    };

    return { initChange };
})();

export { TodoStatusChange };