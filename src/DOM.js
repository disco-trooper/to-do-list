import { projectFactory } from "./factories"

function renderProjects(projects) {
    let projectsTable = document.querySelector("#projectsTable");
    removeAllChildren("#projectsTable");
    for (let i = 0; i < projects.length; i++) {
        if (projects[i] == undefined) continue;
        let tr = document.createElement("tr");
        let projectTitleTD = document.createElement("td");
        projectTitleTD.classList.add("projectName");
        projectTitleTD.textContent = projects[i].title;
        tr.appendChild(projectTitleTD);
        let editSpan = document.createElement("span");
        editSpan.classList.add("icon");
        let editI = document.createElement("i");
        editI.className = "fas fa-edit";
        editI.setAttribute("id", "editProjectName");
        editSpan.appendChild(editI);
        let editTD = document.createElement("td");
        editTD.appendChild(editSpan);
        tr.appendChild(editTD);
        let deleteTD = document.createElement("td");
        let deleteA = document.createElement("a");
        deleteA.className = "delete";
        deleteA.setAttribute("id", "deleteProject");
        deleteTD.appendChild(deleteA);
        tr.appendChild(deleteTD);
        projectsTable.appendChild(tr);
    }

    let newBookTR = document.createElement("tr");
    newBookTR.setAttribute("id", "newBookPlusButton");
    let newBookTD = document.createElement("td");
    let newI = document.createElement("i");
    newI.setAttribute("id", "addNewProject");
    newI.className = "fas fa-plus";
    newBookTD.appendChild(newI);
    newBookTR.appendChild(newBookTD);
    projectsTable.appendChild(newBookTR);
}

function addInputRow() {
    let projectsTable = document.querySelector("#projectsTable");
    if (document.getElementById("newBookPlusButton")) document.getElementById("newBookPlusButton").remove();
    let newTR = document.createElement("tr");
    newTR.setAttribute("id", "inputTR");
    let newInputTD = document.createElement("td");
    newInputTD.setAttribute("id", "newProjectInput");
    let textInput = document.createElement("input");
    textInput.classList.add("input");
    textInput.setAttribute("placeholder", "Project Name");
    textInput.setAttribute("type", "text");
    textInput.setAttribute("id", "projectName");
    newInputTD.appendChild(textInput);
    let submitProjectNameTD = document.createElement("td");
    let newI = document.createElement("i");
    newI.className = "fas fa-plus";
    newI.setAttribute("id", "addProjectFinal")
    submitProjectNameTD.appendChild(newI);
    newTR.appendChild(newInputTD);
    newTR.appendChild(submitProjectNameTD);
    let deleteTD = document.createElement("td");
    let deleteA = document.createElement("a");
    deleteA.className = "delete";
    deleteA.setAttribute("id", "cancelProject");
    deleteTD.appendChild(deleteA);
    newTR.appendChild(deleteTD);
    projectsTable.appendChild(newTR);
}

function deleteInputRow() {
    let inputRow = document.querySelector("#projectsTable").lastElementChild;
    inputRow.remove();
}

function unselectProjects() {
    let tableRows = document.querySelectorAll("tr");
    tableRows.forEach(row => row.classList.remove("is-selected"));
}

function selectProject(projects) {
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("projectName")) {
            unselectProjects();
            event.target.parentElement.classList.add("is-selected");
            showtoDos(event.target.textContent, projects);
        }
    })
}

function showtoDos(eventName, projects) {
    let toDosTable = document.querySelector("#toDosTable");
    removeAllChildren("#toDosTable");
    projects.forEach(project => {
        if (project.title == eventName) {
            for (let toDo in project) {
                let tr = document.createElement("tr");
                let toDoTitle = document.createElement("td");
                toDoTitle.textContent = project[toDo].title;
                tr.appendChild(toDoTitle);
                toDosTable.appendChild(tr);
            }
        }
    })
}

function toDoModalHandler() {
    document.addEventListener("click", (event) => {
        let modal = document.querySelector(".modal");
        if (event.target.classList.contains("modal-background") || event.target.classList.contains("modal-close") || event.target.classList.contains("cancel")) modal.classList.remove("is-active");
        if (event.target.classList.contains("addProject")) modal.classList.add("is-active");
    })
}

function removeAllChildren(querySelector) {
    const myNode = document.querySelector(querySelector);
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
}

function removeAllChildrenOfNode(node) {
    const myNode = node;
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
}

export { renderProjects, addInputRow, deleteInputRow, selectProject, removeAllChildrenOfNode }