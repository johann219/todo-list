export default class TodoPoint {
    constructor(title, completeStatus) {
        this.title = title;
        this.completeStatus = completeStatus;
    }

    display() {
        console.log(this.title);
        console.log(this.completeStatus);
    }
}