import "./main.css"
import { todoFactory, projectFactory } from "./factories"
import { renderProjects, selectProject, addNewProject } from "./DOM"
import "bulma/css/bulma.css"
import format from 'date-fns/format'

let toDo1 = todoFactory("Civil process", "Learn the civil process", "Today", "***");
let toDo2 = todoFactory("Family law", "Learn the family law", "Today", "**");
let toDo3 = todoFactory("Cleanup", "Clean the bedroom", "Tomorrow", "*");
let toDo4 = todoFactory("Rice", "Cook rice", "Today", "***");

let project1 = projectFactory("School", toDo1, toDo2);
let project2 = projectFactory("Home", toDo3, toDo4);
let projects = [project1, project2];
renderProjects(projects);
selectProject(projects);
addNewProject(projects);
const newYears = new Date("2019-3-13");
const formattedDate = format(newYears, 'do MMM yyyy');
document.addEventListener("click", (event) => console.log(event.target));
