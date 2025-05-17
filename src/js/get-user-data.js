const getTitle = () => {
    const title = prompt('Enter title:');
    return title;
};

const getStatus = () => {
    const statusPrompt = prompt('Enter status: (y/n)');
    const status = statusPrompt === 'y';
    return status; 
}

export { getTitle, getStatus };