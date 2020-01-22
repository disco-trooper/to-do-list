import format from "date-fns/format"

const todoViewer = (() => {
    
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

    function showTodos(eventName, projects) {
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
                        try {
                            let date = new Date(project[toDo].dueDate);
                            let formattedDate = format(date, 'do MMM yyyy');
                            smallDueDate.textContent = "Due: " + formattedDate;
                        }

                        catch(err) {
                            smallDueDate.textContent = "Due: " + project[toDo].dueDate;
                        }
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

    return {
            editTodoModalHandler,
            addTodoModalHandler,
            showTodos,
    };

})();

export { todoViewer }