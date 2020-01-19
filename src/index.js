import "./main.css"
import "bulma/css/bulma.css"
import { factories } from "./factories"
import { projectController } from "./projectController"
import { todoController } from "./todoController"

let toDo1 = factories.todoFactory("Civil process", "Learn the civil process", "2020-1-14", "!!!");
let toDo2 = factories.todoFactory("Family law", "Learn the family law", "2020-1-14", "!!");
let toDo3 = factories.todoFactory("Cleanup", "Clean the bedroom", "2020-1-14", "!");
let toDo4 = factories.todoFactory("Doors", "Doors are creaking, gotta fix it", "2020-1-14", "!!");

let project1 = factories.projectFactory("School", toDo1, toDo2);
let project2 = factories.projectFactory("Home", toDo3, toDo4);
let projects = [project1, project2];
projectController.projectHandler(projects)
todoController.todoHandler(projects);
todoController.removeTodo(projects);
console.log(projects)

document.addEventListener("click", (event) => console.log(event.target));