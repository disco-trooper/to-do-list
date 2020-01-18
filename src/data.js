import { showtoDos,editTodoModalHandler,renderProjects, addNewProjectInputRow, deleteInputRow,removeAllChildrenOfNode, selectProject, addChangeProjectNameInputRow, addRenamedProjectRow, addTodoModalHandler } from "./DOM"
import { projectFactory, todoFactory } from "./factories"

function projectHandler(projects) {
    renderProjects(projects);
    addNewProject(projects);
    changeProjectName(projects);
    removeProject(projects);
    selectProject(projects);
}

function toDoHandler(projects) {
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
        showtoDos(getSelectedProjectName(), projects);
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
                    project[(Object.keys(project).length) - 1] = todoFactory(newTitle, newDesc, newDate, newPriority);
                    document.querySelector("#addTodoModal").classList.remove("is-active");
                }
            });
            document.querySelector("#addTodoTitle").value = "";
        }
        addTodoModalHandler(event);
        showtoDos(getSelectedProjectName(), projects);
    });
}

function editTodo(projects) {
    let selectedTodoName;
    document.addEventListener("click", (event) => {
        // Activate Edit To-Do modal
        if (event.target.classList.contains("editTodo")) {
            selectedTodoName = event.target.parentElement.parentElement.firstElementChild.textContent;
            document.querySelector("#editTodo").classList.add("is-active");
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
        }
        editTodoModalHandler(event);
        showtoDos(getSelectedProjectName(), projects);
    });
}

function getSelectedProjectName() {
    return document.querySelector(".is-selected").firstElementChild.textContent;
}

function addNewProject(projects) {
    document.addEventListener("click", (event) => {
        if (event.target.getAttribute("id") == "addNewProject") {
            addNewProjectInputRow();
        }
        // Add project
        if (event.target.getAttribute("id") == "addProjectFinal") {
            let inputValue = document.getElementById("projectName").value;
            if (!inputValue) return;
            let newProject = projectFactory(inputValue);
            projects.push(newProject);
            deleteInputRow();
            renderProjects(projects);
        }
        // Cancel adding project
        if (event.target.getAttribute("id") == "cancelProject") {
            document.getElementById("inputTR").remove();
            renderProjects(projects);
        }
    });
}

function changeProjectName(projects) {
    let oldName;
    document.addEventListener("click", (event) => {
        // Brings up name prompt
        if (event.target.getAttribute("id") == "editProjectName") {
            oldName = event.target.parentElement.parentElement.previousElementSibling.textContent;
            let projectRow = event.target.parentElement.parentElement.parentElement;
            removeAllChildrenOfNode(projectRow);
            addChangeProjectNameInputRow(projectRow);
        }

        // Changes the name
        if (event.target.getAttribute("id") == "changeProjectNameI") {
            if (document.getElementById("changeProjectNameInput").value) {
                let newName = document.getElementById("changeProjectNameInput").value;
                let tr = event.target.parentElement.parentElement;
                removeAllChildrenOfNode(tr);
                addRenamedProjectRow(tr, newName);
                projects.forEach(project => {
                    if (project.title == oldName) {
                        project.title = newName;
                    }
                })
            }
        }
        if (event.target.getAttribute("id") == "cancelProjectRename") renderProjects(projects);
    });
}

function removeProject(projects) {
    let projectName;
    document.addEventListener("click", (event) => {
        if (event.target.getAttribute("id") == "deleteProject") {
            projectName = event.target.parentElement.parentElement.firstChild.textContent;
            for (let i = 0; i < projects.length; i++) {
                if (projects[i] == undefined) {
                    projects.splice(i, 1);
                }
            }
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].title == projectName) {
                    projects[i] = undefined;
                    renderProjects(projects);
                    return;
                }
            }
        }
    })
}

export { projectHandler, toDoHandler, removeTodo }