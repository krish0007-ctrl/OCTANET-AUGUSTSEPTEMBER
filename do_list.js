let taskList = [];

document.addEventListener("DOMContentLoaded", function() {
    const taskListElement = document.getElementById("task-list");
    const addTaskForm = document.getElementById("add-task-form");
    const newTaskInput = document.getElementById("new-task");
    const addTaskBtn = document.getElementById("add-task-btn");

    addTaskBtn.addEventListener("click", addTask);
    taskListElement.addEventListener("click", handleTaskClick);

    function addTask(event) {
        event.preventDefault();
        const newTask = newTaskInput.value.trim();
        if (newTask) {
            taskList.push({ text: newTask, completed: false });
            newTaskInput.value = "";
            renderTaskList();
            saveTaskList();
        }
    }

    // load existing tasks from local storage
    taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    renderTaskList();
});

function handleTaskClick(event) {
    if (event.target.tagName === "LI") {
        const taskIndex = taskList.findIndex(task => task.text === event.target.textContent);
        if (taskIndex !== -1) {
            if (event.target.classList.contains("completed")) {
                taskList[taskIndex].completed = false;
            } else {
                taskList[taskIndex].completed = true;
            }
            renderTaskList();
            saveTaskList();
        }
    } else if (event.target.tagName === "BUTTON" && event.target.textContent === "Delete") {
        const taskElement = event.target.parentNode;
        const taskIndex = taskList.findIndex(task => task.text === taskElement.textContent.replace("Delete", "").trim());
        if (taskIndex !== -1) {
            taskList.splice(taskIndex, 1);
            renderTaskList();
            saveTaskList();
        }
    }
}
function renderTaskList() {
    const taskListElement = document.getElementById("task-list");
    taskListElement.innerHTML = "";
    taskList.forEach(task => {
        const taskElement = document.createElement("LI");
        const taskText = document.createTextNode(task.text);
        taskElement.appendChild(taskText);
        if (task.completed) {
            taskElement.classList.add("completed");
        }
        const deleteBtn = document.createElement("BUTTON");
        deleteBtn.textContent = "Delete";
        taskElement.appendChild(deleteBtn);
        taskListElement.appendChild(taskElement);
    });
}

function saveTaskList() {
    localStorage.setItem("taskList", JSON.stringify(taskList));
}