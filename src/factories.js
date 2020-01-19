const factories = (() => {    
    const todoFactory = (title, desc, dueDate, priority) => {
        return { title, desc, dueDate, priority };
    }

    const projectFactory = (title,...toDos) => {
        return {title, ...toDos};
    }
    
    return { todoFactory, projectFactory }
})();

export { factories }