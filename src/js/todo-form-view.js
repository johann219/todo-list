import {SELECTOR, MARKUP_CLASS} from './const.js';

let todoFormTemplateElement = null;

const init = (formTemplateElement) => {
    todoFormTemplateElement = formTemplateElement;
};

// handleTodoItemClick
    // createTodoFormElement (object)
    // replace (newForm, clickedObject)

const handleTodoItemClick = () => {

};

// handleAddTodoBtn
    // createTodoFormElement (null)
    // append (newForm, todoList)

// handleConfirmation
    // validateInputs
    // updateObjectInStorage (validatedInputs)
    // createTodoItemElement (updatedObject)
    // replace (newTodoItem, todoForm)

// handleCancellation
    // createTodoItemElement (oldObject)
    // replace (newTodo, todoForm)

const createTodoForm = (todo = null) => {
    const newTodoFormFragment = todoFormTemplateElement.content.cloneNode(true);

    const newTodoFormElement = newTodoFormFragment.querySelector(SELECTOR.TODO_FORM_ELEMENT);

    if (todo) {
        const newTodoFormTitleInput = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_TITLE_INPUT);
        newTodoFormTitleInput.value = todo.title;

        const newTodoFormDescriptionInput = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_DESCRIPTION_INPUT);
        newTodoFormDescriptionInput.value = todo.description;

        const newTodoFormDatetimeDisplay = newTodoFormElement.querySelector(SELECTOR.TODO_FORM_DATETIME_DISPLAY);
        newTodoFormDatetimeDisplay.textContent = todo.datetime;
    }

    return newTodoFormElement;
};

const removeTodoForm = (todoFormElement) => {
    todoFormElement.remove();
};

// <template className="todo-form-template">
//     <article className="todo-form">
//         <div className="todo-form-content-wrapper">
//             <label className="todo-form-title-label hidden">Title</label>
//             <input type="text" className="todo-form-title" placeholder="What to do?.."/>
//             <label className="todo-form-description-label hidden">Description</label>
//             <textarea name="" id="" className="todo-form-description" placeholder="...And how to do it?"></textarea>
//             <div className="todo-form-datetime-wrapper">
//                 <img src="./assets/icons/calendar-week.svg" alt="Datetime Picker" className="todo-form-datetime-icon"/>
//                 <span className="todo-form-datetime-display"></span>
//                 <label className="todo-form-datetime-label hidden">Datetime</label>
//                 <input type="datetime-local" className="todo-form-datetime-input"/>
//             </div>
//         </div>
//         <div className="todo-form-button-wrapper">
//             <button className="todo-form-cancel todo-form-button">Cancel</button>
//             <button className="todo-form-confirm todo-form-button">Confirm</button>
//         </div>
//     </article>
// </template>

export const TodoFormView = {
    init,
    createTodoForm,
    removeTodoForm,
};