import { Utils } from './utils.js';

const TodoEdit = (inputElement, confirmEditCb, cancelEditCb) => {
    const initEdit = () => {
        let isActiveEdit = true;

        const removeListeners = () => {
            inputElement.removeEventListener('blur', handleBlur);
            inputElement.removeEventListener('keydown', handleEscKey);
            inputElement.removeEventListener('keydown', handleEnterKey);
        };

        const handleBlur = () => {
            if (isActiveEdit) {
                isActiveEdit = false;
                confirmEditCb();
                removeListeners();
            }
        }

        const handleEnterKey = (event) => {
            if (Utils.isEnterKey(event) && isActiveEdit) {
                isActiveEdit = false;
                confirmEditCb();
                removeListeners();
            }
        };

        const handleEscKey = (event) => {
            if (Utils.isEscKey(event)) {
                isActiveEdit = false;
                cancelEditCb();
                removeListeners();
            }
        };

        inputElement.addEventListener('blur', handleBlur);
        inputElement.addEventListener('keydown', handleEscKey);
        inputElement.addEventListener('keydown', handleEnterKey);
    };

    return { initEdit };
};

export { TodoEdit };