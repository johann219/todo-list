import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";

const createPicker = (datetimeInputElement) => flatpickr(datetimeInputElement, {
    enableTime: true,
    altInput: true,
    time_24hr: true,
    altFormat: 'j F Y, H:i',
    dateFormat: 'Y-m-d, H:i',
});

const openPicker = (pickerInstance) => {
    pickerInstance.open();
};

export const Flatpickr = {
    createPicker,
    openPicker,
};