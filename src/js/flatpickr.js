import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";

const createPicker = (datetimeInputElement) => flatpickr(datetimeInputElement, {
    enableTime: true,
    time_24hr: true,
    dateFormat: 'j F Y, H:i',
});

const openPicker = (pickerInstance) => {
    pickerInstance.open();
};

export const Flatpickr = {
    createPicker,
    openPicker,
};