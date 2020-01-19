import { todoViewer } from "./todoViewer"

const projectViewer = (() => {

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
                todoViewer.showTodos(event.target.textContent, projects);
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

    return {
            renderProjects,
            addNewProjectInputRow,
            deleteInputRow,
            removeAllChildrenOfNode,
            addChangeProjectNameInputRow,
            addRenamedProjectRow,
            selectProject,
            removeAllChildren,
    };
})();

export { projectViewer }