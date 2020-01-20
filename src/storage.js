import { factories } from "./factories"

const storage = (() => {
    let projects = [];
    let localProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    let addDummies = localStorage.getItem("addDummies");

    function populateProjects(projects, addDummies) {
        if (projects.length == 0 && addDummies != "false") {
            let toDo1 = factories.todoFactory("Civil process", "Learn the civil process", "2020-1-14", "!!!");
            let toDo2 = factories.todoFactory("Family law", "Learn the family law", "2020-1-14", "!!");
            let toDo3 = factories.todoFactory("Cleanup", "Clean the bedroom", "2020-1-14", "!");
            let toDo4 = factories.todoFactory("Doors", "Doors are creaking, gotta fix it", "2020-1-14", "!!");
            let project1 = factories.projectFactory("School", toDo1, toDo2);
            let project2 = factories.projectFactory("Home", toDo3, toDo4);
            projects.push(project1);
            projects.push(project2);
            localStorage.setItem("projects", JSON.stringify(projects));
        }
    }

    function loadDummies(projects, localProjects) {
        localProjects.forEach(project => {
            projects.push(project);
        });
        populateProjects(projects, addDummies);
    }

    return { projects, localProjects, loadDummies };
})();

export { storage }