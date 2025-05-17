import { createRandomId } from './utils.js';

export default class TodoPoint {
    constructor(title, completeStatus) {
        this.title = title;
        this.completeStatus = completeStatus;
        this.ID = createRandomId();
    }
}