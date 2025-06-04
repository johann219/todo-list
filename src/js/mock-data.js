import Todo from './todo.js';

const MockTodosData = [
    {
        title: 'Do the dishes',
        description: 'Or else!!!',
        isCompleted: false,
        datetime: '28 May 2025, 18:00'
    },
    {
        title: 'Lorem ipsum dolor sit amet consectetur',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rutrum felis eget orci ' +
            'pellentesque pellentesque. Phasellus neque orci, volutpat ut ornare nec, consequat sit amet erat.',
        isCompleted: false,
        datetime: '28 May 2025, 18:00'
    },
    {
        title: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Fusce rutrum felis eget orci pellentesque pellentesque.',
        isCompleted: false,
        datetime: null
    },
    {
        title: 'Lorem ipsum',
        description: null,
        isCompleted: false,
        datetime: null
    },
    {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        description: null,
        isCompleted: false,
        datetime: '28 May 2025, 18:00'
    },
];

const MockTodos = [];

MockTodosData.forEach(todoData => {
    const newTodo = new Todo(todoData.title, todoData.isCompleted, todoData.description, todoData.datetime);
    MockTodos.push(newTodo);
});

export { MockTodos };