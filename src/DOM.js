import { projectFactory } from "./factories"
import format from 'date-fns/format'

function editTodoModalHandler(event) {
    // Close Edit To-Do Modal
    if (event.target.getAttribute("id") == "editTodoModalBackground" || event.target.getAttribute("id") == "editTodoModalClose" || event.target.classList.contains("cancel")){
        let editTodoModal = document.querySelector("#editTodo");
        editTodoModal.classList.remove("is-active");
    }
    messageModalHandler(event);
}

function addTodoModalHandler(event) {
    // Close Edit To-Do Modal
    if (event.target.getAttribute("id") == "addTodoModalBackground" || event.target.getAttribute("id") == "addTodoModalClose" || event.target.classList.contains("cancel")){
        let addTodoModal = document.querySelector("#addTodoModal");
        addTodoModal.classList.remove("is-active");
    }
    messageModalHandler(event);
}

function messageModalHandler(event) {
    // Close date message
    if (event.target.getAttribute("id") == "messageBackgroundDate" || event.target.getAttribute("id") == "messageCloseDate") {
        document.querySelector("#messageDate").classList.remove("is-active");
    }

    // Close title message
    if (event.target.getAttribute("id") == "messageBackgroundTitle" || event.target.getAttribute("id") == "messageCloseTitle") {
        document.querySelector("#messageTitle").classList.remove("is-active");
    }
}

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

function addRenamedProjectRow(node, newName) {
    let projectTitleTD = document.createElement("td");
    projectTitleTD.classList.add("projectName");
    projectTitleTD.textContent = newName;
    node.appendChild(projectTitleTD);
    let editSpan = document.createElement("span");
    editSpan.classList.add("icon");
    let editI = document.createElement("i");
    editI.className = "fas fa-edit";
    editI.setAttribute("id", "editProjectName");
    editSpan.appendChild(editI);
    let editTD = document.createElement("td");
    editTD.appendChild(editSpan);
    node.appendChild(editTD);
    let deleteTD = document.createElement("td");
    let deleteA = document.createElement("a");
    deleteA.className = "delete";
    deleteA.setAttribute("id", "deleteProject");
    deleteTD.appendChild(deleteA);
    node.appendChild(deleteTD);
}

function addChangeProjectNameInputRow(node) {
    let newInputTD = document.createElement("td");
    newInputTD.setAttribute("id", "changeProjectNameInout");
    let textInput = document.createElement("input");
    textInput.classList.add("input");
    textInput.setAttribute("placeholder", "Project Name");
    textInput.setAttribute("type", "text");
    textInput.setAttribute("id", "changeProjectNameInput");
    newInputTD.appendChild(textInput);
    let submitProjectNameTD = document.createElement("td");
    let newI = document.createElement("i");
    newI.className = "fas fa-plus";
    newI.setAttribute("id", "changeProjectNameI")
    submitProjectNameTD.appendChild(newI);
    node.appendChild(newInputTD);
    node.appendChild(submitProjectNameTD);
    let deleteTD = document.createElement("td");
    let deleteA = document.createElement("a");
    deleteA.className = "delete";
    deleteA.setAttribute("id", "cancelProjectRename");
    deleteTD.appendChild(deleteA);
    node.appendChild(deleteTD)
}

function addNewProjectInputRow() {
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
            if (document.querySelector("#addTodo")) return;
            let addTodoButton = document.createElement("button");
            addTodoButton.className = "button is-dark";
            addTodoButton.setAttribute("id", "addTodo");
            addTodoButton.textContent = "Add To-Do";
            document.querySelector("#toDos").appendChild(addTodoButton);
            return event.target.textContent;
        }
    })
}

function showtoDos(eventName, projects) {
    removeAllChildren("#column0");
    removeAllChildren("#column1");
    projects.forEach(project => {
        if (project.title == eventName) {
            let currentColumn = 0;
            for (let toDo in project) {
                if (toDo == "title") continue;
                let column = document.querySelector("#column" + `${currentColumn}`);
                (!currentColumn) ? currentColumn++ : currentColumn--;
                let desc = document.createElement("span");
                desc.textContent = project[toDo].desc;
                let divBox = document.createElement("div");
                divBox.className = "box";
                let article = document.createElement("article");
                article.className = "media";
                let divMediaContent = document.createElement("div");
                divMediaContent.className = "media-content";
                let divContent = document.createElement("div");
                divContent.className = "content";
                let p = document.createElement("p");
                let strongTitle = document.createElement("strong");
                strongTitle.textContent = project[toDo].title;
                p.appendChild(strongTitle);
                let smallDueDate = document.createElement("small");
                smallDueDate.classList.add("dueDate");
                if (project[toDo].dueDate != "") {
                    const date = new Date(project[toDo].dueDate);
                    const formattedDate = format(date, 'do MMM yyyy');
                    smallDueDate.textContent = "Due: " + formattedDate;
                    p.appendChild(smallDueDate);
                }
                let smallPriority = document.createElement("small");
                smallPriority.classList.add("exclamationMark");
                for (let i = 0; i < project[toDo].priority.length; i++) {
                    let i = document.createElement("i");
                    i.className = "fas fa-exclamation";
                    smallPriority.appendChild(i);
                }
                p.appendChild(smallPriority);
                let smallEdit = document.createElement("small");
                smallEdit.classList.add("smallEdit");
                let iEdit = document.createElement("i");
                iEdit.className = "fas fa-edit editTodo";
                smallEdit.appendChild(iEdit);
                p.appendChild(smallEdit);
                let deleteA = document.createElement("a");
                deleteA.className = "delete deleteTodo";
                p.appendChild(deleteA);
                let br = document.createElement("br");
                p.appendChild(br);
                p.appendChild(desc);
                divContent.appendChild(p);
                divMediaContent.appendChild(divContent);
                article.appendChild(divMediaContent);
                divBox.appendChild(article);
                column.appendChild(divBox);
            }
        }
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

export { addTodoModalHandler, showtoDos, editTodoModalHandler, renderProjects, addNewProjectInputRow, addChangeProjectNameInputRow, addRenamedProjectRow, deleteInputRow, selectProject, removeAllChildrenOfNode }