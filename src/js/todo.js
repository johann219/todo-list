import { Utils } from './utils.js';

export default class Todo {
    constructor(title, isCompleted, /*description, duedate,*/id = Utils.createRandomId()) {
        this._title = title;
        this._isCompleted = isCompleted;
        // this._description = description;
        // this._duedate = duedate;
        this._id = id;
    }

    get title() {
        return this._title;
    }

    get isCompleted() {
        return this._isCompleted;
    }

    // get description() {
    //     return this._description;
    // }

    // get duedate() {
    //     return this._duedate;
    // }

    get id() {
        return this._id;
    }

    set title(todoTitle) {
        this._title = todoTitle;
    }

    toggleCompletionStatus() {
        this._isCompleted = !this._isCompleted;
    }

    toJSON () {
        return {
            title: this._title,
            isCompleted: this._isCompleted,
            id: this._id,
        }
    }
}