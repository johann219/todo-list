const updateStorage = (itemName, itemData) => {
    localStorage.setItem(itemName, itemData);
};

const getStorage = (itemName) => localStorage.getItem(itemName);

export { updateStorage, getStorage };
