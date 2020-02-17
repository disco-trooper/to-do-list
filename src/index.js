import './main.css';
import 'bulma/css/bulma.css';
import { projectController } from './projectController';
import { todoController } from './todoController';
import { storage } from './storage';

storage.loadDummies(storage.projects, storage.localProjects);
projectController.projectHandler(storage.projects);
todoController.todoHandler(storage.projects);
todoController.removeTodo(storage.projects);
