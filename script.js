document.addEventListener("DOMContentLoaded", function () {
    // Array to store tasks
    let tasks = [];

    // Function to render tasks
    function renderTasks() {
        const todoList = document.getElementById("todoList");
        todoList.innerHTML = "";

        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            listItem.innerHTML = `
                <span>${task}</span>
                <div class="action-buttons">
                    <button class="btn btn-warning btn-sm" data-index="${index}" data-action="update">Update</button>
                    <button class="btn btn-danger btn-sm ml-2" data-index="${index}" data-action="remove">Remove</button>
                </div>
            `;
            todoList.appendChild(listItem);
        });

        // Add event listeners after rendering
        addEventListeners();
    }

    // Function to add a new task
    function addTask() {
        const taskInput = document.getElementById("taskInput");
        const newTask = taskInput.value.trim();

        if (newTask !== "") {
            // Limiting the task length to 100 characters
            const limitedTask = newTask.length > 100 ? newTask.substring(0, 100) + "..." : newTask;
            tasks.push(limitedTask);
            taskInput.value = "";
            renderTasks();
        }
    }

    // Function to remove a task
    function removeTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Function to update a task
    function updateTask(index) {
        const updatedTask = prompt("Update the task:", tasks[index]);
        if (updatedTask !== null) {
            // Limiting the updated task length to 100 characters
            const limitedTask = updatedTask.length > 100 ? updatedTask.substring(0, 100) + "..." : updatedTask;
            tasks[index] = limitedTask;
            renderTasks();
        }
    }

    // Function to add event listeners
    function addEventListeners() {
        const updateButtons = document.querySelectorAll('[data-action="update"]');
        const removeButtons = document.querySelectorAll('[data-action="remove"]');

        updateButtons.forEach(button => {
            button.addEventListener("click", function() {
                const index = parseInt(button.getAttribute("data-index"), 10);
                updateTask(index);
            });
        });

        removeButtons.forEach(button => {
            button.addEventListener("click", function() {
                const index = parseInt(button.getAttribute("data-index"), 10);
                removeTask(index);
            });
        });
    }

    // Event listener for "Add Task" button
    const addTaskBtn = document.getElementById("addTaskBtn");
    addTaskBtn.addEventListener("click", addTask);

    // Initial render
    renderTasks();
});
