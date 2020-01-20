import { factories } from "./factories"
import { projectViewer } from "./projectViewer"

const projectController = (() => {

    function projectHandler(projects) {
        projectViewer.renderProjects(projects);
        addNewProject(projects);
        changeProjectName(projects);
        removeProject(projects);
        projectViewer.selectProject(projects);
    }

    function addNewProject(projects) {
        document.addEventListener("click", (event) => {
            if (event.target.getAttribute("id") == "addNewProject") {
                document.querySelector(".is-selected").classList.remove("is-selected");
                projectViewer.addNewProjectInputRow();
            }
            // Add project
            if (event.target.getAttribute("id") == "addProjectFinal") {
                let inputValue = document.getElementById("projectName").value;
                if (!inputValue) return;
                let newProject = factories.projectFactory(inputValue);
                projectViewer.removeAllChildren("#column0");
                projectViewer.removeAllChildren("#column1");
                projects.push(newProject);
                localStorage.setItem("projects", JSON.stringify(projects));
                projectViewer.deleteInputRow();
                projectViewer.renderProjects(projects);
                let selectedProject = document.querySelector(".is-selected");
                selectedProject.classList.remove("is-selected");
            }
            // Cancel adding project
            if (event.target.getAttribute("id") == "cancelProject") {
                document.getElementById("inputTR").remove();
                projectViewer.renderProjects(projects);
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
                projectViewer.removeAllChildrenOfNode(projectRow);
                projectViewer.addChangeProjectNameInputRow(projectRow);
            }

            // Changes the name
            if (event.target.getAttribute("id") == "changeProjectNameI") {
                if (document.getElementById("changeProjectNameInput").value) {
                    let newName = document.getElementById("changeProjectNameInput").value;
                    let tr = event.target.parentElement.parentElement;
                    projectViewer.removeAllChildrenOfNode(tr);
                    projectViewer.addRenamedProjectRow(tr, newName);
                    projects.forEach(project => {
                        if (project.title == oldName) {
                            project.title = newName;
                        }
                    });
                    localStorage.setItem("projects", JSON.stringify(projects));
                }
            }
            if (event.target.getAttribute("id") == "cancelProjectRename") projectViewer.renderProjects(projects);
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
                        projectViewer.renderProjects(projects);
                    }
                }
                for (let i = 0; i < projects.length; i++) {
                    if (projects[i] == null) projects.splice(i, 1); 
                }
                if (projects.length == 0) {
                    localStorage.setItem("addDummies", false);
                }
                localStorage.setItem("projects", JSON.stringify(projects));
            }
        })
    }

    return { projectHandler };
})();

export { projectController }