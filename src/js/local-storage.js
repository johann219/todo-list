const updateLocalStorage = (itemName, itemData) => {
    localStorage.setItem(itemName, itemData);
};

const getLocalStorage = (itemName) => localStorage.getItem(itemName);

export { updateLocalStorage, getLocalStorage };
