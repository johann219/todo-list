import { createRandomId } from './utils.js';

export default class Todo {
    constructor(title, isCompleted, id = createRandomId()) {
        this._title = title;
        this._isCompleted = isCompleted;
        this._id = id;
    }

    get title() {
        return this._title;
    }

    get isCompleted() {
        return this._isCompleted;
    }

    get id() {
        return this._id;
    }

    toJSON () {
        return {
            title: this._title,
            isCompleted: this._isCompleted,
            id: this._id,
        }
    }
}