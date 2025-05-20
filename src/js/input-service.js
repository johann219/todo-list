const InputServicePrompt = (() => {
    const getTitle = () => {
        const title = prompt('Enter title:'); // temporary solution for convenience, no need for validation at this point
        return title;
    };
    
    const getStatus = () => {
        const statusPrompt = prompt('Enter status: (y/n)'); // temporary solution for convenience, no need for validation at this point
        const status = statusPrompt === 'y';
        return status; 
    }

    return { getTitle, getStatus };
})();

const InputServiceForm = (() => {
    // get form data...
})();

export { InputServicePrompt };