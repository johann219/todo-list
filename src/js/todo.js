import { Utils } from './utils.js';

export default class Todo {
    constructor(title, isCompleted, description, datetime, id = Utils.createRandomId()) {
        this._title = title;
        this._isCompleted = isCompleted;
        this._description = description;
        this._datetime = datetime;
        this._id = id;
    }

    get title() {
        return this._title;
    }

    get isCompleted() {
        return this._isCompleted;
    }

    get description() {
        return this._description;
    }

    get datetime() {
        return this._datetime;
    }

    get id() {
        return this._id;
    }

    set title(todoTitle) {
        this._title = todoTitle;
    }

    set description(todoDescription) {
        this._description = todoDescription;
    }

    set datetime(todoDateTime) {
        this._datetime = todoDateTime;
    }

    toggleCompletionStatus() {
        this._isCompleted = !this._isCompleted;
    }

    toJSON () {
        return {
            title: this._title,
            isCompleted: this._isCompleted,
            description: this._description,
            id: this._id,
        }
    }
}