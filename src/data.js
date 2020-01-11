import { renderProjects, addInputRow, deleteInputRow,removeAllChildrenOfNode, selectProject } from "./DOM"
import { projectFactory } from "./factories"

function projectHandler(projects) {
    renderProjects(projects);
    addNewProject(projects);
    changeProjectName(projects);
    removeProject(projects);
    selectProject(projects);
}

function addNewProject(projects) {
    document.addEventListener("click", (event) => {
        if (event.target.getAttribute("id") == "addNewProject") {
            addInputRow();
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
        if (event.target.getAttribute("id") == "editProjectName") {
            oldName = event.target.parentElement.parentElement.previousElementSibling.textContent;
            let projectRow = event.target.parentElement.parentElement.parentElement;
            removeAllChildrenOfNode(projectRow);
            // Add project name input row
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
            projectRow.appendChild(newInputTD);
            projectRow.appendChild(submitProjectNameTD);
            let deleteTD = document.createElement("td");
            let deleteA = document.createElement("a");
            deleteA.className = "delete";
            deleteA.setAttribute("id", "cancelProjectRename");
            deleteTD.appendChild(deleteA);
            projectRow.appendChild(deleteTD)
        }

        if (event.target.getAttribute("id") == "changeProjectNameI") {
            if (document.getElementById("changeProjectNameInput").value) {
                var newName = document.getElementById("changeProjectNameInput").value;
                let tr = event.target.parentElement.parentElement;
                removeAllChildrenOfNode(tr);
                let projectTitleTD = document.createElement("td");
                projectTitleTD.classList.add("projectName");
                projectTitleTD.textContent = newName;
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

export { projectHandler }