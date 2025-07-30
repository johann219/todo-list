const SELECTOR = {
    ADD_TODO_BUTTON: '.add-todo-button',
    TODO_LIST: '.todo-list',

    TODO_ITEM_TEMPLATE: '.todo-item-template',
    TODO_ITEM_ELEMENT: '.todo-item',
    TODO_CONTENT_WRAPPER: '.todo-content-wrapper',
    TODO_ITEM_TITLE: '.todo-title',
    TODO_ITEM_DESCRIPTION: '.todo-description',
    TODO_ITEM_DATETIME: '.todo-datetime',
    TODO_ITEM_BUTTON_WRAPPER: '.todo-button-wrapper',
    TODO_ITEM_BUTTON_COMPLETE: '.todo-complete',
    TODO_ITEM_BUTTON_DELETE: '.todo-delete',

    TODO_FORM_TEMPLATE: '.todo-form-template',
    TODO_FORM_ELEMENT: '.todo-form',
    TODO_FORM_CONTENT_WRAPPER: '.todo-form-content-wrapper',
    TODO_FORM_TITLE_INPUT: '.todo-form-title',
    TODO_FORM_DESCRIPTION_INPUT: '.todo-form-description',
    TODO_FORM_DATETIME_WRAPPER: '.todo-form-datetime-wrapper',
    TODO_FORM_DATETIME_ICON: '.todo-form-datetime-icon',
    TODO_FORM_DATETIME_INPUT: '.todo-form-datetime',
    TODO_FORM_BUTTON_WRAPPER: '.todo-form-button-wrapper',
    TODO_FORM_BUTTON_CONFIRM: '.todo-form-confirm',
    TODO_FORM_BUTTON_CANCEL: '.todo-form-cancel',
}

const MARKUP_CLASS = {
    TODO_ITEM_COMPLETION: 'todo-completed',
}

const LIST_MODE = {
    VIEWING: 'viewing',
    EDITING: 'editing',
    CREATING: 'creating',
}

export { SELECTOR, MARKUP_CLASS, LIST_MODE };