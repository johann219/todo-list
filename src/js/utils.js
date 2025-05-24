const createRandomId = () => crypto.randomUUID();

const isEscKey = (event) => event.key === 'Escape';

const isEnterKey = (event) => event.key === 'Enter';

export const Utils = { 
    createRandomId,
    isEnterKey,
    isEscKey
};