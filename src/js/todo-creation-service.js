import Todo from './todo.js';
import { SELECTOR } from './const.js';
import {createTodo} from "./cumulative";

const createTodoFromFormElement = (formElement) => {
    const title = formElement.querySelector(SELECTOR.TODO_FORM_TITLE_INPUT).value;
    const isCompleted = false;
    const description = formElement.querySelector(SELECTOR.TODO_FORM_DESCRIPTION_INPUT).value;
    const datetime = formElement.querySelector(SELECTOR.TODO_FORM_DATETIME_INPUT).value;

    return new Todo(title, isCompleted, description, datetime);
};

const createTodoFromLocalStorageObject = (localStorageObject) => new Todo(
    localStorageObject.title,
    localStorageObject.isCompleted,
    localStorageObject.description,
    localStorageObject.datetime,
    localStorageObject.id
);

export const TodoCreationService = {
    createTodoFromFormElement,
    createTodoFromLocalStorageObject,
}