const TODO_PROPERTY_TYPE = {
    TITLE: 'title',
    DESCRIPTION: 'description',
    DUEDATE: 'duedate',
}

const SELECTOR = {
    ADD_TODO_BUTTON: '.add-todo',
    TODO_LIST: '.todo-list',
    TODO_ITEM_ELEMENT: '.todo-item',
    TODO_ITEM_TEMPLATE: '.todo-item-template',
    TODO_ITEM_CHECKBOX: '.todo-status',
    TODO_ITEM_DELETE_BTN: '.todo-delete',
    TODO_ITEM_STATUS: '.todo-status',
    TODO_ITEM_TITLE: '.todo-title',
    // TODO_ITEM_DESCRIPTION: '.todo-description',
    // TODO_ITEM_DUEDATE: '.todo-duedate',
}

const MARKUP_CLASS = {
    TODO_ITEM_COMPLETION: 'todo-completed',
}

export { TODO_PROPERTY_TYPE, SELECTOR, MARKUP_CLASS };