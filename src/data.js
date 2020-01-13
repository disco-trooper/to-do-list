import { renderProjects, addNewProjectInputRow, deleteInputRow,removeAllChildrenOfNode, selectProject, addProjectNameInputRow, addRenamedProjectRow } from "./DOM"
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
        // Brings up name prompts
        if (event.target.getAttribute("id") == "editProjectName") {
            oldName = event.target.parentElement.parentElement.previousElementSibling.textContent;
            let projectRow = event.target.parentElement.parentElement.parentElement;
            removeAllChildrenOfNode(projectRow);
            // Add project name input row
            addProjectNameInputRow(projectRow);
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

export { projectHandler }