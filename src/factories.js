const todoFactory = (title, desc, dueDate, priority) => {
    return { title, desc, dueDate, priority };
}

const projectFactory = (title,...toDos) => {
    return {title, ...toDos};
}

export { todoFactory, projectFactory }