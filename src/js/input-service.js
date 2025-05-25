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

    // const getDescription = () => {
    //     const description = prompt('Describe your task: '); // temporary solution for convenience, no need for validation at this point
    //     return description; 
    // }

    // const getDuedate = () => {
    //     const duedate = prompt('Enter duedate: '); // temporary solution for convenience, no need for validation at this point
    //     return duedate; 
    // }

    return { getTitle, getStatus };
})();

const InputServiceForm = (() => {
    // get form data...
})();

export { InputServicePrompt };