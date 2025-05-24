import { TodoView } from './todo-view.js';
import { TodoStorage } from './todo-storage.js';
import { Utils } from './utils.js';

const initEditMode = (elementToEdit, parentTodoId, propertyToEditType) => {
    const newInputElement = TodoView.replaceElementByInput(elementToEdit);
    const initElementToEditValue = elementToEdit.textContent;

    let isEditActive = true;

    const confirmEditChanges = () => {
        if (isEditActive) {
            isEditActive = false;

            const editedContent = TodoView.replaceInputByElement(newInputElement, elementToEdit);

            TodoStorage.editTodoProperty(parentTodoId, propertyToEditType, editedContent);
        }
    }

    const undoEditChanges = () => {
        if (isEditActive) {
            isEditActive = false;
            TodoView.replaceInputByElement(newInputElement, elementToEdit, initElementToEditValue);
        }
    }

    const handleBlur = () => {
        confirmEditChanges();
        closeEditMode();
    };

    const handleEnterKey = (event) => {
        if (Utils.isEnterKey(event)) {
                event.preventDefault();
                confirmEditChanges();
                closeEditMode();
        }
    };

    const handleEscKey = (event) => {
        if (Utils.isEscKey(event)) {
            event.preventDefault();
            undoEditChanges()
            closeEditMode();
        }
    };

    newInputElement.addEventListener('blur', handleBlur);
    newInputElement.addEventListener('keydown', handleEscKey);
    newInputElement.addEventListener('keydown', handleEnterKey);
    

    function closeEditMode() {
        newInputElement.removeEventListener('blur', handleBlur);
        newInputElement.removeEventListener('keydown', handleEscKey);
        newInputElement.removeEventListener('keydown', handleEnterKey);
    };
};

export const TodoEdit = {
    initEditMode,
}