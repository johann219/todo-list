const todoStorage = [];

const saveTodoToStorage = (todo) => {
    todoStorage.push(todo);
};

const getTodoStorage = () => todoStorage;

export { saveTodoToStorage, getTodoStorage };