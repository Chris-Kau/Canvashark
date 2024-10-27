let tasks = JSON.parse
    (localStorage.getItem('tasks')) || [];
let upcomingEvents = JSON.parse
    (localStorage.getItem('upcomingEvents')) || [];

document.addEventListener
    ("DOMContentLoaded", function () {
        renderTasks();
    });

// Function to render tasks on the board, updated w task details
function renderTasks() {
    const columns = ['due-today', 'due-soon', 'upcoming'];

    columns.forEach(columnId => {
        const column = document.getElementById(columnId);
        column.querySelector('.task-container').innerHTML = '';

        tasks.forEach(task => {
            if (task.status === columnId) {
                const taskElement = createTaskElement(
                    task.content, 
                    task.id,
                    task.description,
                    task.date,
                    task.tag
                );
                column.querySelector('.task-container').appendChild(taskElement);
            }
        });
    });
}



// modal stuffs -------
function openModal() {
    document.getElementById("taskModal").style.display = "block";
}
function closeModal() {
    document.getElementById("taskModal").style.display = "none";
}

function addTaskWithDetails() {
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const date = document.getElementById("taskDate").value;
    const tag = document.getElementById("taskTag").value.trim();

    if (title !== "") {
        const newTask = {
            id: "task-" + Date.now(),
            content: title,
            description: description,
            date: date,
            tag: tag,
            status: 'due-today' // Default to 'due-today' or modify as needed
        };
        tasks.push(newTask);
        updateLocalStorage();
        renderTasks();
        closeModal();
        clearModalFields();
    }
}
function clearModalFields() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTag").value = "";
}

function createTaskElement(content, id, description, date, tag) {
    const task = document.createElement("div");
    task.id = id;
    task.className = "task";
    task.draggable = true;
    task.innerHTML = `
        <h3>${content}</h3>
        <p class="description">${description}</p>
        <p class="date">${date ? new Date(date).toLocaleString() : ""}</p>
        <span class="tag">${tag ? `${tag}` : ""}</span>
        <span class="delete-btn" onclick="deleteTask('${id}')">X</span>
    `;
    // <p class="tag">${tag ? `${tag}` : ""}</p>
    // <span class="delete-btn" onclick="deleteTask('${id}')">X</span>
    const deleteBtn = document.create
    task.addEventListener("dragstart", drag);
    return task;
}

// -----


// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.
        filter(task => task.id !== taskId);
    updateLocalStorage();
    renderTasks();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.
        setData("text/plain", event.target.id);
}

function drop(event, columnId) {
    event.preventDefault();
    console.log(columnId)
    const data = event.
        dataTransfer.getData("text/plain");
    const draggedElement =
        document.getElementById(data);
    console.log(draggedElement)
    if (draggedElement) {
        const taskStatus = columnId;
        updateTaskStatus(data, taskStatus);
        event.target.querySelector('.task-container').
            appendChild(draggedElement);
    }
}

function addTask(columnId) {
    const taskInput =
        document.getElementById('taskInput');
    const taskContent = taskInput.value.trim();
    if (taskContent !== "") {
        const newTask = {
            id: "task-" + Date.now(),
            content: taskContent,
            status: columnId
        };
        tasks.push(newTask);
        updateLocalStorage();
        renderTasks();
        taskInput.value = "";
    }
}

// Function to update task status 
// when moved to another column
function updateTaskStatus(taskId, newStatus) {
    console.log(newStatus)
    tasks = tasks.map(task => {
        console.log(task)
        console.log(taskId)
        if (task.id === taskId) {
            console.log("inside if")
            return { ...task, status: newStatus };
        }
        return task;
    });
    updateLocalStorage();
}

// Function to update local 
// storage with current tasks
function updateLocalStorage() {
    console.log("task update")
    localStorage.setItem
        ('tasks', JSON.stringify(tasks));
    localStorage.setItem
        ('upcomingEvents', JSON.stringify(upcomingEvents))
}

function compareDateToToday(date){
    let date1 = new Date(Date.now())
    let date2 = new Date(date)
    let Difference_In_Days = Math.round((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    if (Difference_In_Days == 1){
        return "due-soon"
    }else if(Difference_In_Days < 1){
        return "due-today"
    }else{
        return "upcoming"
    }
}
function importedCanvasAssignments(){
    const data = JSON.parse(localStorage.getItem('upcomingEvents'));
    console.log(data)
    for(var i =0; i < data.length; i++){
        const title = data[i][0]
        const description = data[i][1]
        const date = (data[i][2].replace("T", " ")).replace("Z", "")
        const tag = "Short task"
        const status = compareDateToToday(date)
    
        if (title !== "") {
            const newTask = {
                id: "task-" + Date.now(),
                content: title,
                description: description,
                date: date,
                tag: tag,
                status: status // Default to 'due-today' or modify as needed
            };
            tasks.push(newTask);
            updateLocalStorage();
            renderTasks();
    }
    upcomingEvents = []
    updateLocalStorage();
    // renderTasks();
}
}