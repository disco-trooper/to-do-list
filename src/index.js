import "./main.css"
import { todoFactory, projectFactory } from "./factories"
import { projectHandler, toDoHandler, removeTodo } from "./data"
import "bulma/css/bulma.css"
import { format, parse } from 'date-fns'

let toDo1 = todoFactory("Civil process", "Learn the civil process", "2020-1-14", "!!!");
let toDo2 = todoFactory("Family law", "Learn the family law", "2020-1-14", "!!");
let toDo3 = todoFactory("Cleanup", "Clean the bedroom", "2020-1-14", "!");
let toDo4 = todoFactory("Rice", "Cook rice", "2020-1-14", "!!");

let project1 = projectFactory("School", toDo1, toDo2);
let project2 = projectFactory("Home", toDo3, toDo4);
let projects = [project1, project2];
projectHandler(projects);
toDoHandler(projects);
removeTodo(projects)
console.log(projects)

document.addEventListener("click", (event) => console.log(event.target));