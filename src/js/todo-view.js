import {SELECTOR, MARKUP_CLASS} from './const.js';

let todoItemTemplateElement = null;
let todoListElement = null;
let todoFormTemplateElement = null;

const initView = (itemTemplateElement, formTemplateElement, listElement) => {
    todoItemTemplateElement = itemTemplateElement;
    todoFormTemplateElement = formTemplateElement;
    todoListElement = listElement;
};

const toggleCompletionView = (todoElement, isTodoCompleted) => {
    isTodoCompleted ?
        todoElement.classList.add(MARKUP_CLASS.TODO_ITEM_COMPLETION) :
        todoElement.classList.remove(MARKUP_CLASS.TODO_ITEM_COMPLETION);
};

const renderTodoTitle = (todoTitleElement, todoTitle) => {
    todoTitleElement.textContent = todoTitle;
};

const renderTodoDescription = (todoDescriptionElement, todoDescription) => {
    if (todoDescription) {
        todoDescriptionElement.textContent = todoDescription;
    } else {
        todoDescriptionElement.remove();
    }
};

const renderTodoDatetime = (todoDatetimeElement, todoDatetime) => {
    if (todoDatetime) {
        todoDatetimeElement.textContent = todoDatetime;
    } else {
        todoDatetimeElement.remove();
    }
};

const renderTodo = (todo) => {
    const newTodoFragment = todoItemTemplateElement.content.cloneNode(true);
    const newTodoItemElement = newTodoFragment.querySelector(SELECTOR.TODO_ITEM_ELEMENT);

    const newTodoTitleElement = newTodoItemElement.querySelector(SELECTOR.TODO_ITEM_TITLE);
    renderTodoTitle(newTodoTitleElement, todo.title);

    const newTodoDescriptionElement = newTodoItemElement.querySelector(SELECTOR.TODO_ITEM_DESCRIPTION);
    renderTodoDescription(newTodoDescriptionElement, todo.description);

    const newTodoDatetimeElement = newTodoItemElement.querySelector(SELECTOR.TODO_ITEM_DATETIME);
    renderTodoDatetime(newTodoDatetimeElement, todo.datetime);

    newTodoItemElement.id = todo.id;

    todoListElement.appendChild(newTodoFragment);
}

const renderTodoList = (listToRender) => {
    todoListElement.innerHTML = '';
    listToRender.forEach((todo) => {
        renderTodo(todo);
    });
};

const renderTodoForm = (todo = null) => {
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

const removeTodo = (todoToRemove) => {
    todoToRemove.remove();
};

const replaceElementByInput = (elementToReplace) => {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.value = elementToReplace.textContent;

    elementToReplace.parentNode.replaceChild(inputElement, elementToReplace);

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
    renderTodoForm,
    toggleCompletionView,
    removeTodo,
    replaceElementByInput,
    replaceInputByElement
};