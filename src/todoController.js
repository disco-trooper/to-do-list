import { format, parse } from 'date-fns'
import { todoViewer } from "./todoViewer"
import { factories } from "./factories"

const todoController = (() => {
    
    function todoHandler(projects) {
        addNewTodo(projects);
        editTodo(projects);
    }

    function removeTodo(projects) {
        let todoName;
        let counter = 0;
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("deleteTodo")) {
                todoName = event.target.parentElement.firstChild.textContent;
                projects.forEach(project => {
                    if (project.title == getSelectedProjectName()) {
                        for (let property in project) {
                            if (project[property].title == todoName) {
                                delete project[property];
                                for (property in project) {
                                    if (property != "title") {
                                        delete Object.assign(project, {[counter]: project[property] })[property];
                                        counter++;
                                    }
                                }
                            }
                        }
                    }
                });
            }
            todoViewer.showTodos(getSelectedProjectName(), projects);
        });
    }

    function addNewTodo(projects) {
        document.addEventListener("click", (event) => {
            // Opens modal
            if (event.target.getAttribute("id") == "addTodo") {
                document.querySelector("#addTodoModal").classList.add("is-active");
            }

            // Adds Todo
            if (event.target.getAttribute("id") == "addNewTodo") {
                let newTitle = document.querySelector("#addTodoTitle").value;
                let newDesc = document.querySelector("#addTodoDesc").value;
                let newDate = document.querySelector("#addTodoDate").value;
                let newPriority = document.querySelector("#addTodoPriority").value;
                projects.forEach(project => {
                    if (project.title == getSelectedProjectName()) {
                        if (!newTitle) {
                            document.querySelector("#messageTitle").classList.add("is-active");
                            return;
                        }
                        if (newDate) {
                            if (/^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/.test(newDate) != true) {
                                document.querySelector("#messageDate").classList.add("is-active");
                                return;
                            }
                        }
                        project[(Object.keys(project).length) - 1] = factories.todoFactory(newTitle, newDesc, newDate, newPriority);
                        document.querySelector("#addTodoModal").classList.remove("is-active");
                    }
                });
                document.querySelector("#addTodoTitle").value = "";
                document.querySelector("#addTodoDesc").value = "";
                document.querySelector("#addTodoDate").value = "";
            }
            todoViewer.addTodoModalHandler(event);
            todoViewer.showTodos(getSelectedProjectName(), projects);
        });
    }

    function editTodo(projects) {
        let selectedTodoName;
        document.addEventListener("click", (event) => {
            // Activate Edit To-Do modal
            if (event.target.classList.contains("editTodo")) {
                selectedTodoName = event.target.parentElement.parentElement.firstElementChild.textContent;
                document.querySelector("#editTodo").classList.add("is-active");
                document.querySelector("#editTodoTitle").value = selectedTodoName;
                document.querySelector("#editTodoDesc").value = event.target.parentElement.parentElement.lastChild.textContent;
                let formatedDate = event.target.parentElement.parentElement.firstElementChild.nextSibling.textContent.slice(5);
                document.querySelector("#editTodoDate").value = format(parse(formatedDate, "do MMM yyyy", new Date()), 'yyyy-M-d')
            }

            // Edit To-Do
            if (event.target.getAttribute("id") == "saveTodo") {
                let newTitle = document.querySelector("#editTodoTitle").value;
                let newDesc = document.querySelector("#editTodoDesc").value;
                let newDate = document.querySelector("#editTodoDate").value;
                let newPriority = document.querySelector("#priority").value;
                projects.forEach(project => {
                    if (project.title == getSelectedProjectName()) {
                        for (let toDo in project) {
                            if (project[toDo].title == selectedTodoName) {
                                if (!newTitle) {
                                    document.querySelector("#messageTitle").classList.add("is-active");
                                    return;
                                };
                                if (newDate) {
                                    if (/^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/.test(newDate) != true) {
                                        document.querySelector("#messageDate").classList.add("is-active");
                                        return;
                                    } else {
                                        project[toDo].dueDate = newDate;
                                    }
                                }
                                project[toDo].title = newTitle;
                                project[toDo].desc = newDesc;
                                project[toDo].priority = newPriority;
                                document.querySelector("#editTodo").classList.remove("is-active");
                            }
                        }
                    }
                });
                document.querySelector("#editTodoTitle").value = "";
                document.querySelector("#editTodoDesc").value = "";
                document.querySelector("#editTodoDate").value = "";
            }
            todoViewer.editTodoModalHandler(event);
            todoViewer.showTodos(getSelectedProjectName(), projects);
        });
    }

    function getSelectedProjectName() {
        return document.querySelector(".is-selected").firstElementChild.textContent;
    }

    return { todoHandler, removeTodo };
})();

export { todoController }